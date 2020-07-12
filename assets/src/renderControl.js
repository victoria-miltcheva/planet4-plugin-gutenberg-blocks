import { ColorPicker, TextControl, FontSizePicker } from '@wordpress/components';
import FontPicker from 'font-picker-react';

const googleApiKey = 'AIzaSyBt0d8TsNo0wJn8Pj2zICtBY614IsEqrHw';

const COLOR_REGEXP = /color$/;

const convertRemToPixels = ( rem ) => rem * parseFloat( getComputedStyle( document.documentElement ).fontSize );
const convertPixelsToRem = ( px ) =>  px / parseFloat( getComputedStyle( document.documentElement ).fontSize ) ;

const isPx = value => !!value && !!value.match( /[\d.]+px$/ );
const isRem = value => !!value && !!value.match( /[\d.]+rem$/ );

export const renderControl = ( { cssVar, value, onChange } ) => {

  if ( cssVar.usages.some( usage =>
    !! usage.property.match( COLOR_REGEXP )
    || [ 'background' ].includes( usage.property )
  ) ) {
    return <ColorPicker
      color={ value }
      onChangeComplete={ color => {
        const hasTransparency = color.rgb.a !== 1;

        const { r, g, b, a } = color.rgb;

        onChange( hasTransparency ? `rgba(${r} , ${g}, ${b}, ${a})` : color.hex );
      } }
    />
  }

  if ( cssVar.usages.some( usage => usage.property === 'font-size' ) ) {
    return <div>
        <div key={1}>
          <FontSizePicker
            value={ isPx( value ) ? value.replace('px', '') : convertRemToPixels( parseFloat( value.replace( 'rem', '' ) ) ) }
            onChange={ value => {
              onChange( `${ value }px` );
            } }
          />
          <span style={{float: 'right'}}>px</span>
        </div>
        <div key={2}>
          <FontSizePicker
            value={ isRem( value ) ? value.replace('rem', '') : convertPixelsToRem( parseFloat( value.replace( 'px', '' ) ) ) }
            onChange={ value => {
              onChange(`${value}rem`);
            } }
          />
          <span style={{float: 'right'}}>rem</span>
        </div>
      </div>
  }

  if ( cssVar.usages.some( usage => usage.property === 'font-family' ) ) {
    return <FontPicker
      apiKey={ googleApiKey }
      activeFontFamily={ value }
      onChange={ value => onChange( value.family ) }
    />
  }

  // if ( cssVar.usages.some( usage => usage.property === 'font-weight' ) ) {
  // }

  return <TextControl
    value={ value }
    onChange={ onChange }
  />;
};
