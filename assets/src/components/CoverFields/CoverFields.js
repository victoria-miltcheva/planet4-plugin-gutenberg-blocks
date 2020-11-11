
import { TextControl, ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { debounce, assign } from 'lodash';
const { InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow } = wp.components;
const { useSelect } = wp.data;
const { __ } = wp.i18n;

export const CoverSaveElement = (element, blockType, attributes) => {
  if ( 'core/cover' !== blockType.name ) {
    return element;
  }

  // console.log('save', element, blockType, attributes);
  const Stuff = (attributes) => {
    const { mailing_list_iframe, iframe_url } = attributes;
    if (! mailing_list_iframe || ! iframe_url) {
      return null;
    }

    return (
      <div className={'wp-block-cover__inner-container'}>
        <iframe
          src={iframe_url}
          cellSpacing={0}
          allowtransparency="true"
          frameBorder={0}
          scrolling="no"
          width="100%"
        />
      </div>
    )
  }

  //let children = element.props.children;
  //children.push(Stuff());
  const el = wp.element.cloneElement(
		element, // The saved element
		{}, // Overwrite props here
		element.props.children, // Original content (children)
		Stuff(attributes) // Any additional content
  );
  // console.log('save', el);
  return el;
}

// Add attributes definition to block
export const CoverRegister = (settings, name) => {
  if ( 'core/cover' !== name ) {
    return settings;
  }

  // console.log('register', name, settings);
  return assign({}, settings, {
    attributes: assign( {}, settings.attributes, {
      mailing_list_iframe: {type: 'boolean', default: false},
      iframe_url: {type: 'string', default: ''}
    }),
  });
}

// Add panels for edition
export const CoverEdit = (BlockEdit) => {
  return (props) => {
    if ( 'core/cover' !== props.name ) {
      return <BlockEdit { ...props } />;
    }
    console.log('core/cover BlockEdit', props);

    const { attributes, setAttributes } = props;
    const { mailing_list_iframe = false, iframe_url = '', id = 0 } = attributes;

    const [iframeUrl, setIframeUrl] = useState(iframe_url || '');
    const debounceIframeUrl = debounce(url => {
      setAttributes( { iframe_url: url } );
    }, 300);

    const { media = null } = useSelect(select => {
      return id ? { media: select('core').getMedia(id) } : { media: null };
    });

    const mediaIsTooLong = mediaIsVideo && media.media_details.length > 0;
    const mediaIsVideo = media?.media_details?.mime_type?.includes('video')


    return (
      <>
      { mediaIsVideo &&
        <InspectorControls>
          <PanelBody title={ __('P4 good practices') } initialOpen={ true }>
            <PanelRow>
              <ul>
                { mediaIsTooLong && <li>VIdeo is too long !</li> }
              </ul>
            </PanelRow>
          </PanelBody>
        </InspectorControls>
      }

      <BlockEdit { ...props } />

      <InspectorControls>
        <PanelBody title={ __('IFrame') } initialOpen={ false }>
          <PanelRow>
            <ToggleControl
              label={__('Use mailing list iframe', 'planet4-blocks-backend')}
              help={__('Use mailing list iframe', 'planet4-blocks-backend')}
              value={ mailing_list_iframe }
              checked={ mailing_list_iframe }
              onChange={ (mailing_list_iframe) => {setAttributes({mailing_list_iframe})} }
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label={__('Iframe url', 'planet4-blocks-backend')}
              placeholder={__('Enter Iframe url', 'planet4-blocks-backend')}
              help={__('If a url is set in this field and the \'mailing list iframe\' option is enabled, it will override the planet4 engaging network setting.', 'planet4-blocks-backend')}
              value={ iframeUrl }
              onChange={ url => {
                setIframeUrl(url);
                debounceIframeUrl(url);
              } }
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      </>
    );
  }
}
