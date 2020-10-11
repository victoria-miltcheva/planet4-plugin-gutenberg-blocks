<?php

namespace P4GBKS\Controllers\Menu;

class Block_Amount_Controller extends Controller {

	private const FRONTEND_RENDERED = [
		'planet4-blocks/spreadsheet',
		'planet4-blocks/counter',
		'planet4-blocks/articles',
		'planet4-blocks/cookies',
		'planet4-blocks/split-two-columns',
		'planet4-blocks/happypoint',
		'planet4-blocks/gallery',
	];
	public function create_admin_menu() {

		add_submenu_page(
			P4GBKS_PLUGIN_SLUG_NAME,
			__( 'N frontend rendered', 'planet4-blocks-backend' ),
			__( 'N frontend rendered', 'planet4-blocks-backend' ),
			'manage_options',
			'n_frontend_rendered',
			[ $this, 'page' ]
		);
	}

	public function page(  ): void {
		$all_counts = [];
		$posts = get_posts(['numberposts'=>-1, 'post_type'=>'any']);
		echo '<p>' . count($posts) . '</p>';
		foreach ( $posts as $post ) {
			$blocks = parse_blocks( $post->post_content );

			$frontendRenderedBlocks = array_filter($blocks, function ($block) {
				return in_array( $block['blockName'], self::FRONTEND_RENDERED, true );
			});

			$all_counts[] = [$post, count($frontendRenderedBlocks)];
		}
		usort($all_counts, function ($a, $b) {
			[, $nA] = $a;
			[, $nB] = $b;
			return -($nA <=> $nB);
		});
		foreach ( $all_counts as [$post, $count] ) {
			echo '<div>';
			echo '<a href="' . get_permalink($post) . '">' .$post->post_title . "($count)" .'</a>';
			echo '</div>';
		}
	}
}
