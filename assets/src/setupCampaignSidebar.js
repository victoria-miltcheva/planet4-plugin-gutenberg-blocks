import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar } from "@wordpress/edit-post";
import { PanelBody, SelectControl, RadioControl, ColorPalette } from "@wordpress/components"
import { withPostMeta } from "./components/PostMeta/withPostMeta"

const { __ } = wp.i18n;

const sidebarId = 'planet4-campaign-sidebar'

const templateOptions = [
  { value: 'antarctic', label:  __( 'Antarctic', 'planet4-master-theme-backend' ),},
  { value: 'arctic', label:     __( 'Arctic', 'planet4-master-theme-backend' ),},
  { value: 'climate', label:    __( 'Climate Emergency', 'planet4-master-theme-backend' ),},
  { value: 'forest', label:     __( 'Forest', 'planet4-master-theme-backend' ),},
  { value: 'oceans', label:     __( 'Oceans', 'planet4-master-theme-backend' ),},
  { value: 'oil', label:        __( 'Oil', 'planet4-master-theme-backend' ),},
  { value: 'plastic', label:    __( 'Plastics', 'planet4-master-theme-backend' ),}
]

const logoColorOptions = [
  { value: 'light', label: __('Light', 'planet4-master-theme-backend') },
  { value: 'dark', label: __('Dark', 'planet4-master-theme-backend') },
]

const navTypeOptions = [
  { value: 'planet4', label: __('Planet 4 Navigation', 'planet4-master-theme-backend') },
  { value: 'minimal', label: __('Minimal Navigation', 'planet4-master-theme-backend') },
]

const navColorOptions = {
  antarctic: [
    { name: 'white', color: '#FFFFFF', },
    { name: 'a little less white', color: '#E5E5E5', },
    { name: 'blue', color: '#1BB6D6', },
    { name: 'also blue?', color: '#22938D', },
    { name: 'dark blue', color: '#186A70', },
  ],
  arctic: [
    { name: 'white', color: '#FFFFFF', },
    { name: 'a little less white', color: '#E5E5E5', },
    { name: 'blue', color: '#1BB6D6', },
    { name: 'also blue?', color: '#22938D', },
    { name: 'dark blue', color: '#186A70', },
    { name: 'dark green/blueish', color: '#043029', },
  ],
  climate: [
    { name: 'blue', color: '#1BB6D6', },
    { name: 'also blue?', color: '#22938D', },
    { name: 'dark blue', color: '#186A70', },
    { name: 'dark green/blueish', color: '#043029', },
    { name: 'some blue again', color: '#093944', },
  ],
  forest: [
    { name: 'green', color: '#66CC00', },
    { name: 'apple blue sea green ( my language)', color: '#32CA89', },
    { name: 'dark green/blueish', color: '#043029', },
    { name: 'and green again', color: '#1B4A1B', },
  ],
  oceans: [
    { name: 'blue', color: '#1BB6D6', },
    { name: 'also blue?', color: '#22938D', },
    { name: 'dark blue', color: '#186A70', },
    { name: 'something dark', color: '#042233', },
  ],
  oil: [
    { name: 'some blue again', color: '#093944', },
    { name: 'something dark', color: '#042233', },
    { name: 'kinda black', color: '#1A1A1A', },
    { name: 'and green again', color: '#1B4A1B', },
  ],
  plastic: [
    { name: 'white', color: '#FFFFFF', },
    { name: 'a little less white', color: '#E5E5E5', },
    { name: 'green', color: '#66CC00', },
    { name: 'apple blue sea green ( my language)', color: '#32CA89', },
    { name: 'blue', color: '#1BB6D6', },
    { name: 'also blue?', color: '#22938D', },
    { name: 'dark blue', color: '#186A70', },
    { name: 'dark green/blueish', color: '#043029', },
    { name: 'some blue again', color: '#093944', },
    { name: 'something dark', color: '#042233', },
    { name: 'kinda black', color: '#1A1A1A', },
    { name: 'and green again', color: '#1B4A1B', },
  ],
}

export const setupCampaignSidebar = () => {

  const Select = withPostMeta(SelectControl)
  const Radio = withPostMeta(RadioControl)
  const Swatch = withPostMeta(ColorPalette)

  registerPlugin( sidebarId, {
    icon: 'dashboard',
    render: () => {
      return (
        <>
          <PluginSidebar
            name={ sidebarId }
            title={ __( 'Campaign Options', 'planet4-blocks-backend' ) }
          >
            <Select
              metaKey='campaign_page_template'
              options={ templateOptions }
              label={ __('Campaign Template')}
            />
            <PanelBody
              title={ __( "Logo", '' ) }
              intialOpen={ true }
            >
              <Select
                metaKey='campaign_logo'
                options={ templateOptions }
                label={ __( 'Change the campaign logo' ) }
              />
              <Radio
                metaKey='campaign_logo_color'
                options={ logoColorOptions }
                label={ __( 'Logo Color' ) }
                help={ __( 'Change the campaign logo color (if not default)' ) }
              />
            </PanelBody>
            <PanelBody
              title={ __( "Navigation", '' ) }
            >
              <Radio
                metaKey='campaign_nav_type'
                options={ navTypeOptions }
                label={ __( 'Navigation' ) }
              />
              <Swatch
                metaKey='campaign_nav_color'
                dependsOn='campaign_page_template'
                dependentOptions={ navColorOptions }
              />
            </PanelBody>
          </PluginSidebar>
        </>
      )
    }
  } )
}

