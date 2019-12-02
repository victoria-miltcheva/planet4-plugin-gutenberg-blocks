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
              { withPostMeta( 'campaign_logo', SelectControl, {
                label: __( 'Change the campaign logo' ),
                options: logoOptions,
              } )() }
              { withPostMeta( 'campaign_nav_color', ColorPicker, {
                label: __( 'Set the campaign nav color' ),
              } )() }
            </PanelBody>
          </PluginSidebar>
        </>
      )
    }
  } )
}

/**
 * Example function that is not used. Here the fields are defined outside render, which makes for a better overview
 * in the render method, but it doesn't have the advantage of having everything in one place.
 */
const exampleWithSeparateDeclaration = () => {
  const Logo = withPostMeta( 'campaign_logo', SelectControl, {
    label: __( 'Change the campaign logo' ),
    options: logoOptions
  } )
  const NavColor = withPostMeta( 'campaign_nav_color', ColorPicker, {
    label: __( 'Set the campaign nav color' )
  } )


  registerPlugin( 'planet4-test', {
    icon: 'smiley',
    render: () => {
      return (
        <>
          <PluginSidebar
            name={ 'planet4-test' }
            title={ __( 'Campaign Options', 'planet4-blocks-backend' ) }
          >
            <PanelBody
              title={ __( "Logo", '' ) }
              intialOpen={ true }
            >
              <Logo/>
              <NavColor/>
            </PanelBody>
          </PluginSidebar>
        </>
      )
    }
  } )

}
