<?php
/**
 * Table displaying blocks usage
 *
 * @package P4BKS\Controllers
 */

namespace P4GBKS\Controllers;

use WP_List_Table;

/**
 * Block usage, using native WordPress table
 */
class Block_Usage_Table extends WP_List_Table {

	/**
	 * @var wpdb
	 */
	private $wpdb;

	/**
	 * @var string Group column
	 */
	private $group_by = 'block_type';

	/**
	 * @var string[]|null
	 */
	private $sort_by = [ 'post_title', 'post_id' ];

	/**
	 * @var string[]|null Columns name => title
	 */
	private $columns = null;

	/**
	 * @var string|null Search string
	 */
	private $search = null;

	/**
	 * @var string[]|null Search filters
	 */
	private $filters = null;

	/**
	 * @var string|null Latest row content displayed
	 */
	private $latest_row = null;

	/**
	 * @var string[]|null Blocks namespaces
	 */
	private $blocks_ns = null;

	/**
	 * @var string[]|null Blocks types
	 */
	private $blocks_types = null;

	/**
	 * @var int|null Block count from search result
	 */
	private $block_count = null;

	/**
	 * @var int|null Post count from search result
	 */
	private $post_count = null;

	/**
	 * @var string[]
	 */
	private $allowed_groups = [ 'block_type', 'post_id', 'post_title' ];

	/**
	 * @var string[]
	 */
	private $allowed_sorts = [ 'post_title', 'post_id' ];

	/**
	 * @param array $args Args.
	 * @see WP_List_Table::__construct()
	 */
	public function __construct( $args = [] ) {
		parent::__construct( $args );

		$this->wpdb     = $args['wpdb'];
		$this->search   = $args['search'] ?? null;
		$this->filters  = $args['filters'] ?? [];
		$this->group_by = in_array( $args['group_by'] ?? '', $this->allowed_groups, true )
			? $args['group_by']
			: $this->allowed_groups[0];
	}

	/**
	 * Columns list for table.
	 */
	public function get_columns() {
		if ( null !== $this->columns ) {
			return $this->columns;
		}

		$default_columns = [
			'post_title'    => 'Title',
			'block_type'    => 'Block',
			'block_opts'    => 'Block options',
			'post_date'     => 'Date',
			'post_modified' => 'Modified',
			'post_id'       => 'ID',
			'match'         => 'Match',
		];

		$this->columns = array_merge(
			[ $this->group_by => $default_columns[ $this->group_by ] ],
			$default_columns
		);

		return $this->columns;
	}

	/**
	 * All, hidden and sortable columns.
	 */
	private function get_column_headers() {
		return [
			$this->get_columns(),
			[],
			[ 'post_title', 'post_date', 'post_modified' ],
		];
	}

	/**
	 * Available grouping as views.
	 */
	protected function get_views() {
		$base = 'admin.php?page=plugin_blocks_report';
		return [
			'block_type' => sprintf(
				'<a href="%s">%s</a>',
				$base . '&group=block_type',
				'Group by block type'
			),
			'post_title' => sprintf(
				'<a href="%s">%s</a>',
				$base . '&group=post_title',
				'Group by post title'
			),
			'post_id'    => sprintf(
				'<a href="%s">%s</a>',
				$base . '&group=post_id',
				'Group by post ID'
			),
		];
	}

	/**
	 * Prepares table data.
	 */
	public function prepare_items() {
		$this->_column_headers = $this->get_column_headers();
		$this->items           = $this->get_blocks_list();

		$this->blocks_ns = array_unique(
			array_column( $this->items, 'block_ns' )
		);

		$this->blocks_types = array_unique(
			array_column( $this->items, 'block_type' )
		);
	}

	/**
	 * Select blocks namespaces.
	 */
	private function blockns_dropdown() {
		sort( $this->blocks_ns );

		echo '<select name="ns" id="filter-by-ns">';
		echo '<option value="">- All namespaces -</option>';
		foreach ( $this->blocks_ns as $ns ) {
			echo sprintf(
				'<option value="%s">%s</option>',
				esc_attr( $ns ),
				esc_html( $ns )
			);
		}
		echo '</select>';
	}

	/**
	 * Select blocks types.
	 */
	private function blocktype_dropdown() {
		sort( $this->blocks_types );

		echo '<select name="type" id="filter-by-type">';
		echo '<option value="">- All blocks -</option>';
		foreach ( $this->blocks_types as $types ) {
			echo sprintf(
				'<option value="%s">%s</option>',
				esc_attr( $types ),
				esc_html( $types )
			);
		}
		echo '</select>';
	}

	/**
	 * Add filters to table.
	 *
	 * @param string $which Tablenav identifier.
	 */
	protected function extra_tablenav( $which ) {
		$this->blockns_dropdown();
		$this->blocktype_dropdown();
		submit_button(
			__( 'Filter', 'planet4-blocks-backend' ),
			'',
			'filter_action',
			false,
			[ 'id' => 'block-query-submit' ]
		);
	}

	/**
	 * Add pagination information to table.
	 *
	 * @param string $which Tablenav identifier.
	 */
	protected function pagination( $which ) {
		echo sprintf(
			'<div class="tablenav-pages">
			<span class="displaying-num">%d blocks, %d posts</span>
			</div>',
			esc_html( $this->block_count() ),
			esc_html( $this->post_count() )
		);
	}

	/**
	 * Default column value representation.
	 *
	 * @param array  $item Item.
	 * @param string $column_name Column name.
	 *
	 * @return mixed
	 */
	public function column_default( $item, $column_name ) {
		return $item[ $column_name ] ?? '';
	}

	/**
	 * Block option display.
	 *
	 * @param array $item Item.
	 * @return string
	 */
	public function column_block_opts( $item ): string {
		$content = $item['block_opts'] ?? null;
		return $content ?
			sprintf(
				'<span title="%s">%s</span>',
				htmlentities( $content ),
				( strlen( $content ) > 19 ? substr( $content, 0, 19 ) . '...' : $content )
			)
			: '';
	}

	/**
	 * Post title display.
	 *
	 * @param array $item Item.
	 * @return string
	 */
	public function column_post_title( $item ): string {
		return sprintf(
			'<a href="%s">%s</a>',
			get_page_uri( $item['post_id'] ),
			$item['post_title']
		);
	}

	/**
	 * Post ID display.
	 *
	 * @param array $item Item.
	 * @return string
	 */
	public function column_post_id( $item ): string {
		return sprintf(
			'<a href="%s">%s</a>',
			get_page_uri( $item['post_id'] ),
			$item['post_id']
		);
	}

	/**
	 * Match display.
	 *
	 * @param array $item Item.
	 * @return string
	 */
	public function column_match( $item ): string {
		$content = $item['match'] ?? null;
		return $content ?
			sprintf(
				'<span title="%s">%s</span>',
				htmlentities( $content ),
				htmlentities(
					( strlen( $content ) > 19 ? substr( $content, 0, 19 ) . '...' : $content )
				)
			)
			: '';
	}

	/**
	 * Full row display, edited for grouping functionality.
	 *
	 * @param array $item Item.
	 */
	public function single_row( $item ) {
		$columns   = $this->get_columns();
		$colspan   = count( $columns );
		$first_col = array_key_first( $columns );

		if ( $this->latest_row !== $item[ $first_col ] ) {
			echo '<tr>';
			echo sprintf(
				'<th colspan="%s"><strong>%s</strong></th>',
				esc_attr( $colspan ),
				esc_html( $item[ $first_col ] )
			);
			echo '</tr>';
		}

		$this->latest_row   = $item[ $first_col ];
		$item[ $first_col ] = '';
		parent::single_row( $item );
	}

	/**
	 * Show only top tablenav (duplicate form post bug)
	 *
	 * @param string $which Tablenav identifier.
	 */
	protected function display_tablenav( $which ) {
		if ( 'bottom' === $which ) {
			return;
		}
		parent::display_tablenav( $which );
	}

	/**
	 * Search matching blocks in all posts.
	 */
	public function get_blocks_list(): array {
		$regex = empty( $this->search )
			? '.*<!-- wp:.* /?-->.*'
			: '.*<!-- wp:.*' . $this->search . '.* /?-->.*';

		$has_block = $this->wpdb->prepare(
			'select ID, post_content, post_title,
			post_status, post_type,
			post_date, post_modified,
			guid '
			. " from wp_posts where
				post_status <> 'inherit'
				AND post_content REGEXP %s",
			$regex
		);

		// phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		$results = $this->wpdb->get_results( $has_block );
		$list    = [];
		foreach ( $results as $post ) {
			preg_match_all( '#<!-- wp:(.*) /?-->#ui', $post->post_content, $matches );
			if ( empty( $matches[1] ) ) {
				continue;
			}

			foreach ( $matches[1] as $k => $match ) {
				[$type, $options] = explode( ' ', $match . ' ', 2 );
				$list[]           = [
					'post_id'       => $post->ID,
					'post_title'    => $post->post_title ?? '(no title)',
					'post_status'   => $post->post_status,
					'post_type'     => $post->post_type,
					'post_date'     => $post->post_date,
					'post_modified' => $post->post_modified,
					'guid'          => $post->guid,
					'block_ns'      => strpos( $type, '/' ) !== false ? explode( '/', $type )[0] : 'wordpress',
					'block_type'    => $type,
					'block_opts'    => $options,
					'match'         => $matches[0][ $k ],
				];
			}
		}

		$items             = $this->filter_items( $list );
		$this->block_count = count( $items );
		$this->post_count  = count( array_unique( array_column( $items, 'post_id' ) ) );

		$groups = array_column( $items, $this->group_by );
		$args   = [];
		foreach ( $this->sort_by as $sort ) {
			$args[] = array_column( $items, $sort );
			$args[] = SORT_NATURAL;
		}
		$args[] = &$items;

		array_multisort( $groups, SORT_NATURAL, ...$args );
		return $items;
	}

	/**
	 * Filter result items.
	 *
	 * @param array[] $items Items.
	 * @return array
	 */
	private function filter_items( $items ): array {
		if ( empty( $this->filters ) ) {
			return $items;
		}

		$filtered = $items;
		foreach ( $this->filters as $name => $value ) {
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

		return $filtered;
	}

	/**
	 * Block count in search result.
	 *
	 * @return int
	 */
	public function block_count(): int {
		return (int) $this->block_count;
	}

	/**
	 * Post count in search result.
	 *
	 * @return int
	 */
	public function post_count(): int {
		return (int) $this->post_count;
	}
}
