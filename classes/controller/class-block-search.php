<?php
/**
 * Block search
 *
 * @package P4BKS\Controllers
 */

namespace P4GBKS\Controllers;

use wpdb;

/**
 * Block search in post content
 *
 * Usage:
 *   $search = new Search ( $wpdb );
 *   // All blocks with a className attribute in block options
 *   $search->find( 'className' );
 *   // All blocks of type planet4-blocks/covers
 *   $search->find( null, ['block_type' => 'planet4-blocks/covers'] );
 *   // All blocks sorted by post_title
 *   $search->find( null, null, [ 'post_title' ] );
 */
class Block_Search {

	/**
	 * @var wpdb
	 */
	private $db;

	/**
	 * @var array[]
	 */
	private $results = [];

	/**
	 * @var int
	 */
	private $block_count = 0;

	/**
	 * @var int
	 */
	private $post_count = 0;

	/**
	 * @param wpdb $wpdb WP DB object.
	 */
	public function __construct( wpdb $wpdb ) {
		$this->db = $wpdb;
	}

	/**
	 * @param ?string   $search  Search in blocks names and options.
	 * @param ?array    $filters Filter by exact dimension value.
	 * @param ?string[] $sort    Sort by dimension (natural sort).
	 *
	 * @return array[] Array of parsed items
	 * Item format:
	 * [
	 *   'post_id'       => int,
	 *   'post_title'    => string,
	 *   'post_status'   => string,
	 *   'post_type'     => string,
	 *   'post_date'     => string (datetime),
	 *   'post_modified' => string (datetime),
	 *   'guid'          => string,
	 *   'block_ns'      => string,
	 *   'block_type'    => string,
	 *   'block_opts'    => string (json),
	 *   'match'         => string,
	 * ]
	 */
	public function find(
		?string $search = null,
		?array $filters = null,
		?array $sort = null
	): array {
		$this->reset();

		$query = $this->get_query( $search );
		$res   = $this->db->get_results( $query );
		$items = [];
		foreach ( $res as $post ) {
			$items = array_merge( $items, $this->parse_post( $post ) );
		}

		$filtered = $this->filter_items( $items, $filters, $search );
		$sorted   = $this->sort_items( $filtered, $sort );

		$this->results     = $sorted;
		$this->block_count = count( $this->results );
		$this->post_count  = count( array_unique( array_column( $this->results, 'post_id' ) ) );

		return $this->results;
	}

	/**
	 * @return array
	 */
	public function results(): array {
		return $this->results;
	}

	/**
	 * Number of posts in items.
	 *
	 * @return int
	 */
	public function post_count(): int {
		return $this->post_count;
	}

	/**
	 * Number of blocks in items.
	 *
	 * @return int
	 */
	public function block_count(): int {
		return $this->block_count;
	}

	/**
	 * @param ?string $search Search string.
	 * @return string
	 * @throws \UnexpectedValueException Empty prepared query.
	 */
	private function get_query( ?string $search ) {
		$regex = empty( $search )
			? '.*<!-- wp:.* /?-->.*'
			: '.*<!-- wp:.*' . $search . '.* /?-->.*';

		$query = $this->db->prepare(
			"SELECT
				ID, post_content, post_title, post_status,
				post_type, post_date, post_modified, guid
			FROM wp_posts WHERE
				post_status <> 'inherit'
				AND post_content REGEXP %s",
			$regex
		);

		if ( empty( $query ) ) {
			throw new \UnexpectedValueException( 'Search query is invalid' );
		}

		return $query;
	}

	/**
	 * Parse posts content to blocks.
	 *
	 * @param object $post Post.
	 * @return array[]
	 */
	private function parse_post( $post ): array {
		preg_match_all( '#<!-- wp:(.*) /?-->#ui', $post->post_content, $matches );
		if ( empty( $matches[1] ) ) {
			return [];
		}

		$items = [];
		foreach ( $matches[1] as $k => $match ) {
			[$type, $opts] = explode( ' ', $match . ' ', 2 );
			$namespace     = strpos( $type, '/' ) !== false
				? explode( '/', $type )[0]
				: 'WordPress';

			$items[] = [
				'post_id'       => $post->ID,
				'post_title'    => $post->post_title ?? __( '(no title)', 'planet4-blocks-backend' ),
				'post_status'   => $post->post_status,
				'post_type'     => $post->post_type,
				'post_date'     => $post->post_date,
				'post_modified' => $post->post_modified,
				'guid'          => $post->guid,
				'block_ns'      => $namespace,
				'block_type'    => $type,
				'block_opts'    => $opts,
				'match'         => $matches[0][ $k ],
			];
		}

		return $items;
	}

	/**
	 * Filter parsed search items
	 *
	 * @param array[]   $items   Parsed search items.
	 * @param ?string[] $filters Filters [name => value].
	 * @param ?string   $search  Search in block name and options.
	 * @return array
	 */
	private function filter_items(
		array $items,
		?array $filters = [],
		?string $search = ''
	): array {
		if ( empty( $filters ) && empty( $search ) ) {
			return $items;
		}

		$filtered = $items;

		foreach ( $filters as $name => $value ) {
			if ( empty( $value ) ) {
				continue;
			}

			$filtered = array_filter(
				$filtered,
				function ( $i ) use ( $name, $value ) {
					return $i[ $name ] === $value;
				}
			);
		}

		if ( ! empty( $search ) ) {
			$filtered = array_filter(
				$filtered,
				function ( $i ) use ( $search ) {
					return strpos( $i['block_opts'], $search ) !== false
						|| strpos( $i['block_type'], $search ) !== false;
				}
			);
		}

		return $filtered;
	}

	/**
	 * Sort parsed items
	 *
	 * @param array  $items Items.
	 * @param ?array $sort  Sort dimensions.
	 * @return array
	 */
	private function sort_items( array $items, ?array $sort = [] ): array {
		if ( empty( $sort ) ) {
			return $items;
		}

		$args = [];
		foreach ( $sort as $name ) {
			$args[] = array_column( $items, $name );
			$args[] = SORT_NATURAL;
		}
		$args[] = &$items;

		array_multisort( ...$args );

		return $items;
	}

	/**
	 * Reset search.
	 */
	private function reset(): void {
		$this->results     = [];
		$this->block_count = 0;
		$this->post_count  = 0;
	}
}
