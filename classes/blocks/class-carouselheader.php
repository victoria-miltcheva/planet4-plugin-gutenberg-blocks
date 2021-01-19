<?php
/**
 * Carousel Header block class
 *
 * @package P4GBKS
 * @since 0.1
 */

namespace P4GBKS\Blocks;

/**
 * Class CarouselHeader
 * Registers planet4-blocks/carousel-header block.
 *
 * @package P4BKS
 * @since 0.1
 */
class CarouselHeader extends Base_Block {

	/**
	 * Block name.
	 *
	 * @const string BLOCK_NAME.
	 */
	const BLOCK_NAME = 'carousel-header';

	/**
	 * Block category.
	 *
	 * @const string BLOCK_CATEGORY.
	 */
	const BLOCK_CATEGORY = 'planet4-blocks';

	/**
	 * Gallery constructor.
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'init_carouselheader_block' ] );
	}

	public function init_carouselheader_block() {
		self::register_scripts();

		register_block_type(
			self::BLOCK_CATEGORY . '/' . self::BLOCK_NAME,
			[
				'apiVersion' => 2,
				'render_callback' => [ $this, 'render_hydratable' ],
				'attributes'      => [
					'carousel_autoplay' => [
						'type'    => 'boolean',
						'default' => false,
					],
					'slides'            => [
						'type'    => 'array',
						'default' => [],
						'items'   => [
							'type'       => 'object',
							// In JSON Schema you can specify object properties in the properties attribute.
							'properties' => [
								'image'            => [
									'type' => 'integer',
								],
								'image_src'        => [
									'type' => 'integer',
								],
								'image_srcset'     => [
									'type' => 'integer',
								],
								'image_sizes'      => [
									'type' => 'integer',
								],
								'image_alt'        => [
									'type' => 'integer',
								],
								'header'           => [
									'type' => 'string',
								],
								'header_size'      => [
									'type' => 'string',
								],
								'subheader'        => [
									'type' => 'string',
								],
								'description'      => [
									'type' => 'string',
								],
								'link_text'        => [
									'type' => 'string',
								],
								'link_url'         => [
									'type' => 'string',
								],
								'focal_points'     => [
									'type' => 'object',
								],
								'link_url_new_tab' => [
									'type' => 'boolean',
								],
							],
						],
					],
				],
				'editor_script'   => self::BLOCK_CATEGORY . '/' . self::BLOCK_NAME . '-editor-script',
				'editor_style'    => self::BLOCK_CATEGORY . '/' . self::BLOCK_NAME . '-editor-style',
				'script'          => self::BLOCK_CATEGORY . '/' . self::BLOCK_NAME . '-script',
				'style'           => self::BLOCK_CATEGORY . '/' . self::BLOCK_NAME . '-style',
			]
		);
	}

	public function render_hydratable( $attributes, $content ) {
		if ( ! empty( $attributes['slides'] ) && empty( $attributes['slides'][0]['image_url'] )  ) {
			$attributes['slides'] = $this->prepare_data( $attributes['slides'] );
		}

		if ( is_string($content) && trim($content) === '' ) {
			$content = self::convert_to_static_block( $attributes );
		}

		return self::as_hydratable_block( $attributes, $content );
	}

	public static function convert_to_static_block( $attributes ) {
		$node_script = 'assets/build/CarouselHeaderMigrate-server.js';
		$blocks_dir = P4GBKS_PLUGIN_DIR;
		$attributes_json = json_encode( $attributes );

		exec("cd ${blocks_dir} && node ${node_script} '${attributes_json}' 2>&1", $out, $err);

		return $out[0];
	}

	/**
	 * Get image data for block that have.
	 *
	 * @param array $fields This is the array of fields of this block.
	 *
	 * @return array The data to be passed in the View.
	 */
	public function prepare_data( $slides ): array {
		if ( ! empty( $slides ) ) {
			foreach ( $slides as &$slide ) {
				$image_id   = $slide['image'];
				$temp_array = wp_get_attachment_image_src( $image_id, 'retina-large' );
				if ( false !== $temp_array && ! empty( $temp_array ) ) {
					$slide['image_url']    = $temp_array[0];
					$slide['image_srcset'] = wp_get_attachment_image_srcset( $image_id, 'retina-large', wp_get_attachment_metadata( $image_id ) );
					$slide['image_sizes']  = wp_calculate_image_sizes( 'retina-large', null, null, $image_id );
				}

				$temp_image         = wp_prepare_attachment_for_js( $image_id );
				$slide['image_alt'] = $temp_image['alt'] ?? '';
			}
		}

		return $slides;
	}
}
