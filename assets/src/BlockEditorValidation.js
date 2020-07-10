const { registerPlugin } = wp.plugins;
const { PluginPrePublishPanel } = wp.editPost;
const { select, dispatch } = wp.data;
const {__} = wp.i18n;

const blockValidations = {};

export const blockEditorValidation = () => {
  registerPlugin( 'pre-publish-checklist', { render: PrePublishCheckList } );
  wp.hooks.addFilter(
    'blocks.registerBlockType',
    'planet4-plugin-gutenberg-blocks',
    registerAttributeValidations
  );
};

const registerAttributeValidations = ( settings, blockName ) => {
  const { attributes } = settings;

  Object.keys(settings.attributes).forEach( attrName => {
    const attr = attributes[ attrName ];

    if ( typeof attr.validation === 'function' ) {
      blockValidations[ blockName ] = blockValidations[ blockName ] || {};
      blockValidations[ blockName ][ attrName ] = attr.validation;
    }
  });

  return settings;
}

const isValid = element => {
  // Apply validation only for campaign post types.
  if ('campaign' === $('#post_type').val() && 'required' === $(element).data('validation')) {
    if (!$(element).val() || 'not set' === $(element).val()) {
      return false;
    }
  }

  return true;
};

const PrePublishCheckList = () => {
  let checkListMsg = [];

  // Filter CMB2 fields that have the 'data-validation' attribute set to 'required'.
  const elements = Array.from( document.querySelectorAll( '[data-validation]' ) );
  const invalidElements = elements.filter( element => !isValid( element ) );
  elements.forEach( element => { element.classList.remove( 'cmb2_required_field_error') } );
  invalidElements.forEach( element => { element.classList.toggle( 'cmb2_required_field_error') } );
  const metaInvalid = invalidElements.length > 0

  if ( metaInvalid ) {
    // Open "Analytics & Tracking" fields metabox, if closed.
    $('#p4_campaign_fields').removeClass('closed');
    checkListMsg.push( __( 'Please check "Analytics & Tracking" section for required fields.', 'planet4-master-theme-backend' ) );
    invalidElements.forEach( element => { checkListMsg.push( ' - ' + $(element).parent().find('label').text() + ' is a required field' ) } );
  }

  const blocks = select( 'core/block-editor' ).getBlocks();
  const blockResults = blocks.map( ( block ) => {
    const validations = blockValidations[ block.name ];
    if ( !validations ) {
      return {block, invalids: []};
    }
    const results = Object.keys( validations ).map( attrName => {
      const validate = validations[ attrName ];

      return { attr: attrName, ...validate( block.attributes[ attrName ] ) };
    } );
    const invalids = results.filter( result => !result.isValid );

    return { block, invalids };
  } );

  const invalidBlocks = blockResults.filter( block => block.invalids.length > 0 );

    let classname = '';
  if ( metaInvalid || invalidBlocks.length > 0) {
    dispatch( 'core/editor' ).lockPostSaving();
    classname = 'p4-plugin-pre-publish-panel-error';
    invalidBlocks.forEach( block => block.invalids.forEach( invalid => checkListMsg.push( ...invalid.messages ) ) );
  } else {
    dispatch( 'core/editor' ).unlockPostSaving();
    checkListMsg.push( __( 'All good.', 'planet4-master-theme-backend' ) );
  }

  return (
    <PluginPrePublishPanel
      title={ __( 'Publish Checklist', 'planet4-master-theme-backend' ) }
      initialOpen="true"
      className={ classname }
      icon="none">
        <ul>
          {checkListMsg.map((msg, index) => {
            return (
              <li key={index} >
                <p>{msg}</p>
              </li>
            );
          })}
        </ul>
    </PluginPrePublishPanel>
  )
};
