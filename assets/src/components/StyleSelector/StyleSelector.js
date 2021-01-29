import {
  PanelBody,
  Tooltip,
} from '@wordpress/components';
const { __ } = wp.i18n;

const getStyleLabel = (label, help) => {
  if (help) {
    return (
      <Tooltip text={help}>
        <div className='style-selector-label'>{label}</div>
      </Tooltip>
    );
  }
  return <div className='style-selector-label'>{label}</div>;
};

export const StyleSelector = ({ styles = [], active, selectStyle }) => (
  <PanelBody title={__('Styles', 'planet4-blocks-backend')}>
    <div className='block-editor-block-styles'>
      {styles.map(style => {
        const { name, label, help, image } = style;
        return (
          <div
            key={name}
            onClick={() => selectStyle(name)}
            className={`block-editor-block-styles__item ${active === name ? 'is-active' : ''}`}
          >
            <div className='style-selector-image-preview'>
              <img src={image} />
            </div>
            {getStyleLabel(label, help)}
          </div>
        );
      })}
    </div>
  </PanelBody>
);
