<?php

namespace P4GBKS\Controllers;

use WP_List_Table;

class Block_Usage_Table extends WP_List_Table
{
	private $wpdb;

	private $latest_row = null;
	private $group_by = 'block_type';
	private $sort_by = ['post_title', 'post_id'];
	private $columns = null;
	private $search = null;
	private $filters = null;

	private $blocks_ns = null;
	private $blocks_types = null;
	private $block_count = null;
	private $post_count = null;

	private $allowedGroups = ['block_type', 'post_id', 'post_title'];
	private $allowedSorts = ['post_title', 'post_id'];

	/**
	 *
	 */
	public function __construct( $args = [] ) {
		parent::__construct($args);

		$this->wpdb = $args['wpdb'];
		$this->search = $args['search'] ?? null;
		$this->filters = $args['filters'] ?? [];
		$this->group_by = in_array($args['group_by'] ?? '', $this->allowedGroups)
				? $args['group_by']
				: $this->allowedGroups[0];
	}

	/**
	 *
	 */
	public function get_columns() {
		if ($this->columns !== null) {
			return $this->columns;
		}

		$default_columns = [
			'post_title' => 'Title',
			'block_type' => 'Block',
			'block_opts' => 'Block options',
			'post_date' => 'Date',
			'post_modified' => 'Modified',
			'post_id' => 'ID',
			'match' => 'Match',
		];

		$this->columns = array_merge(
			[$this->group_by => $default_columns[$this->group_by]],
			$default_columns
		);

		return $this->columns;
	}

	private function get_column_headers() {
		return [
			$this->get_columns(),
			[],
			['post_title', 'post_date', 'post_modified'],
		];
	}

	protected function get_views() {
		$base = 'admin.php?page=plugin_blocks_report';
		return [
			'block_type' => sprintf(
				'<a href="%s">%s</a>', $base.'&group=block_type',
				'Group by block type'
			),
			'post_title' => sprintf(
				'<a href="%s">%s</a>', $base.'&group=post_title',
				'Group by post title'
			),
			'post_id' => sprintf(
				'<a href="%s">%s</a>', $base.'&group=post_id',
				'Group by post ID'
			),
		];
	}

	public function prepare_items() {
		$this->_column_headers = $this->get_column_headers();
		$this->items = $this->get_blocks_list();

		$this->blocks_ns = array_unique(array_column(
			$this->items, 'block_ns'
		));
		$this->blocks_types = array_unique(array_column(
			$this->items, 'block_type'
		));
	}

	private function blockns_dropdown() {
		sort($this->blocks_ns);

		echo '<select name="ns" id="filter-by-ns">';
		echo '<option value="">- All namespaces -</option>';
		foreach ($this->blocks_ns as $ns) {
			echo sprintf('<option value="%s">%s</option>', $ns, $ns);
		}
		echo '</select>';
	}

	private function blocktype_dropdown() {
		sort($this->blocks_types);

		echo '<select name="type" id="filter-by-type">';
		echo '<option value="">- All blocks -</option>';
		foreach ($this->blocks_types as $types) {
			echo sprintf('<option value="%s">%s</option>', $types, $types);
		}
		echo '</select>';
	}

	protected function extra_tablenav( $which ) {
		$this->blockns_dropdown();
		$this->blocktype_dropdown();
		submit_button(
			__( 'Filter' ),
			'',
			'filter_action',
			false,
			array( 'id' => 'block-query-submit' )
		);
	}

	protected function pagination( $which ) {
		echo sprintf(
			'<div class="tablenav-pages">
			<span class="displaying-num">%d blocks, %d posts</span>
			</div>',
			$this->block_count(),
			$this->post_count()
		);
	}

	public function column_default( $item, $column_name ) {
		return $item[$column_name] ?? '';
	}

	public function column_block_opts( $item ) {
		$content = $item['block_opts'] ?? null;
		return $content ?
			sprintf(
				'<span title="%s">%s</span>',
				htmlentities($content),
				(strlen($content) > 19 ? substr($content, 0, 19).'...' : $content)
			)
			: '';
	}

	public function column_post_title( $item ) {
		return sprintf(
			'<a href="%s">%s</a>',
			get_page_uri($item['post_id']),
			$item['post_title']
		);
	}

	public function column_post_id( $item ) {
		return sprintf(
			'<a href="%s">%s</a>',
			get_page_uri($item['post_id']),
			$item['post_id']
		);
	}

	public function column_match( $item ) {
		$content = $item['match'] ?? null;
		return $content ?
			sprintf(
				'<span title="%s">%s</span>',
				htmlentities($content),
				htmlentities(
					(strlen($content) > 19 ? substr($content, 0, 19).'...' : $content)
				)
			)
			: '';
	}

	/**
	 *
	 */
	public function single_row( $item ) {
		$columns = $this->get_columns();
		$colspan = count($columns);
		$first_col = array_key_first($columns);

		if ($this->latest_row !== $item[$first_col]) {
			echo "<tr>";
			echo sprintf('<th colspan="%s"><strong>%s</strong></th>',
				$colspan, $item[$first_col]);
			echo "</tr>";
		}

		$this->latest_row = $item[$first_col];
		$item[$first_col] = '';
		parent::single_row($item);
	}

	/**
	 *
	 */
	protected function display_tablenav( $which ) {
		if ( 'bottom' === $which ) {
			return;
		}
		parent::display_tablenav($which);
	}

	/**
	 *
	 */
	private function get_blocks_list(): array {
		$regex = empty($this->search)
			? '.*<!-- wp:.* /?-->.*'
			: '.*<!-- wp:.*' . $this->search . '.* /?-->.*';
		$hasBlock = $this->wpdb->prepare("select ID, post_content, post_title,
			post_status, post_type,
			post_date, post_modified,
			guid "
			." from wp_posts where
				post_status <> 'inherit'
				AND post_content REGEXP %s",
			$regex
		);
		$results = $this->wpdb->get_results($hasBlock);

		$list = [];
		foreach ($results as $post) {
			preg_match_all('#<!-- wp:(.*) /?-->#ui', $post->post_content, $matches);
			if (empty($matches[1])) {
				continue;
			}

			//print_r($matches);

			foreach ($matches[1] as $k => $match) {

				[$type, $options] = explode(' ', $match . ' ', 2);
				$list[] = [
					'post_id' => $post->ID,
					'post_title' => $post->post_title ?: '(no title)',
					'post_status' => $post->post_status,
					'post_type' => $post->post_type,
					'post_date' => $post->post_date,
					'post_modified' => $post->post_modified,
					'guid' => $post->guid,
					'block_ns' => strpos($type, '/') !== false ? explode('/', $type)[0] : 'wordpress',
					'block_type' => $type,
					'block_opts' => $options,
					'match' => $matches[0][$k],
				];
			}
		}

		$items = $this->filter_items($list);
		$this->block_count = count($items);
		$this->post_count = count(array_unique(array_column($items, 'post_id')));

		$groups = array_column($items, $this->group_by);
		$args = [];
		foreach ($this->sort_by as $sort) {
			$args[] = array_column($items, $sort);
			$args[] = SORT_NATURAL;
		}
		$args[] = &$items;

		array_multisort($groups, SORT_NATURAL, ...$args);
		return $items;
	}

	/**
	 *
	 */
	private function filter_items( $items ) {
		if (empty($this->filters)) {
			return $items;
		}

		$filtered = $items;
		foreach ($this->filters as $name => $value) {
			if (empty($value)) {
				continue;
			}

			$filtered = array_filter($filtered, function ($i) use($name, $value) {
				return $i[$name] === $value;
			});
		}

		return $filtered;
	}

	public function block_count(): int {
		return (int) $this->block_count;
	}
	public function post_count(): int {
		return (int) $this->post_count;
	}
}
