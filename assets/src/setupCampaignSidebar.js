import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar } from "@wordpress/edit-post";
import { PanelBody, SelectControl, ColorPicker } from "@wordpress/components"
import { withPostMeta } from "./components/PostMeta/withPostMeta"

const { __ } = wp.i18n;

const sidebarId = 'planet4-campaign-sidebar'

const logoOptions = [
  { value: 'antarctic', label: __( 'Antarctic', 'planet4-blocks-backend' ) },
  { value: 'arctic', label: __( 'Arctic', 'planet4-blocks-backend' ) },
  { value: 'climate', label: __( 'Climate Emergency', 'planet4-blocks-backend' ) },
  { value: 'forest', label: __( 'Forest', 'planet4-blocks-backend' ) },
  { value: 'oceans', label: __( 'Oceans', 'planet4-blocks-backend' ) },
  { value: 'oil', label: __( 'Oil', 'planet4-blocks-backend' ) },
  { value: 'plastic', label: __( 'Plastics', 'planet4-blocks-backend' ) },
]

export const setupCampaignSidebar = () => {

  const SelectMeta = withPostMeta(SelectControl)
  const ColorPickerMeta = withPostMeta(ColorPicker)

  registerPlugin( sidebarId, {
    icon: 'dashboard',
    render: () => {
      return (
        <>
          <PluginSidebar
            name={ sidebarId }
            title={ __( 'Campaign Options', 'planet4-blocks-backend' ) }
          >
            <PanelBody
              title={ __( "Logo own class", '' ) }
              intialOpen={ true }
            >
              <SelectMeta
                metaKey={ 'campaign_logo' }
                options={ logoOptions }
                label={ __( 'Change the campaign logo' ) }
              />
              <ColorPickerMeta
                metaKey={ 'campaign_nav_color' }
              />
            </PanelBody>
          </PluginSidebar>
        </>
      )
    }
  } )
}

