<?php
/**
 * Blocks Usage class
 *
 * @package P4BKS\Controllers\Menu
 * @since 1.40.0
 */

namespace P4GBKS\Controllers\Menu;

use P4\MasterTheme\Exception\SqlInIsEmpty;
use P4\MasterTheme\SqlParameters;
use P4GBKS\Controllers\Block_Usage_Table;
use WP_Block_Type_Registry;

if ( ! class_exists( 'Blocks_Usage_Controller' ) ) {

	/**
	 * Class Blocks_Usage_Controller
	 */
	class Blocks_Usage_Controller extends Controller {
		/**
		 * @var string[] Possible prefixes for planet4 blocks.
		 */
		private const PLANET4_PREFIXES = [
			'planet4',
			'p4',
		];

		/**
		 * String to use for Post with no title.
		 */
		private const NO_TITLE = '(no title)';


		/**
		 * Blocks_Usage_Controller constructor.
		 *
		 * @param View $view The view object.
		 */
		public function __construct( $view ) {
			parent::__construct( $view );
			$this->hooks();
		}

		/**
		 * Class hooks.
		 */
		private function hooks() {
			add_action( 'rest_api_init', [ $this, 'plugin_blocks_report_register_rest_route' ] );
		}

		/**
		 * Register API route for report of blocks usage in pages/posts.
		 */
		public function plugin_blocks_report_register_rest_route() {
			register_rest_route(
				'plugin_blocks/v2',
				'/plugin_blocks_report/',
				[
					'methods'             => 'GET',
					'callback'            => [ $this, 'plugin_blocks_report_json' ],
					'permission_callback' => function () {
						return true;
					},
				]
			);
		}

		/**
		 * Finds blocks usage in pages/posts.
		 */
		public function plugin_blocks_report_json() {
			$cache_key = 'plugin-blocks-report';
			$report    = wp_cache_get( $cache_key );
			if ( ! $report ) {
				$report = $this->plugin_blocks_report( 'json' );
				wp_cache_add( $cache_key, $report, '', 3600 );
			}

			return $report;
		}

		/**
		 * Create menu/submenu entry.
		 */
		public function create_admin_menu() {

			$current_user = wp_get_current_user();

			if ( in_array( 'administrator', $current_user->roles, true ) && current_user_can( 'manage_options' ) ) {
				add_submenu_page(
					P4GBKS_PLUGIN_SLUG_NAME,
					__( 'Usage', 'planet4-blocks-backend' ),
					__( 'Usage', 'planet4-blocks-backend' ),
					'manage_options',
					'plugin_blocks_report',
					[ $this, 'plugin_blocks_report' ]
				);
			}
		}

		/**
		 * Finds blocks usage in pages/posts.
		 *
		 * @param String $type The Block report type.
		 *
		 * @throws SqlInIsEmpty Should not happen in practice as everyone has types with blocks.
		 */
		public function plugin_blocks_report( $type = 'text' ) {
			global $wpdb;

			$tb = new Block_Usage_Table([
				'wpdb' => $wpdb,
				'group_by' => $_REQUEST['group'] ?? null,
				'search' => $_REQUEST['s'] ?? null,
				'filters' => [
					'block_ns' => $_REQUEST['ns'] ?? null,
					'block_type' => $_REQUEST['type'] ?? null,
				],
			]);
			$tb->prepare_items();

			echo sprintf('<div class="wrap">
				<h1 class="wp-heading-inline">Block usage</h1>
				<hr class="wp-header-end">',
				$tb->block_count(),
				$tb->post_count()
			);

			echo '<form id="blocks-search" method="post">';
			$tb->views();
			$tb->search_box('Search blocks', 'block-search');
			$tb->display();
			echo '</form>';

			echo '</div>';
		}

		/**
		 * Get all registered post types that "support blocks". This actually is not explicitly defined by itself, but
		 * depends on 2 things: type is registered with `show_in_rest => true` and the type supports `editor`. If both
		 * conditions are met the block editor is shown. If something weird and custom is done so that a post type does
		 * have blocks without these conditions being true then the blocks will not be picked up by the report.
		 *
		 * @return array All posts types that support blocks.
		 */
		private static function get_post_types_with_blocks(): array {
			$supports_editor = static function ( $type ) {
				return post_type_supports( $type, 'editor' );
			};

			return array_filter( get_post_types( [ 'show_in_rest' => true ] ), $supports_editor );
		}

		/**
		 * Return P4 and allowed core WP block types.
		 *
		 * @return string[]
		 */
		private function get_block_types(): array {
			$registered_block_types = WP_Block_Type_Registry::get_instance()->get_all_registered();

			$p4_block_types = array_filter(
				$registered_block_types,
				static function ( \WP_Block_Type $block_type ) {
					// even though the blocks in this repo all use namespace "planet4-blocks", NRO developed blocks
					// can have a different namespace. They do all start with "planet4-".
					foreach ( self::PLANET4_PREFIXES as $prefix ) {
						if ( strpos( $block_type->name, $prefix ) === 0 ) {
							return true;
						}
					}
					return false;
				}
			);
			// we only need the name.
			$p4_block_types = array_map(
				static function ( \WP_Block_Type $block_type ) {
					return $block_type->name;
				},
				$p4_block_types
			);

			$core_block_types = [
				'html',
				'table',
				'button',
				'separator',
				'spacer',
				'shortcode',
				'group',
			];

			return array_merge( $p4_block_types, $core_block_types );
		}
	}
}
