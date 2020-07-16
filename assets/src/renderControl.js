import { ColorPicker, TextControl, FontSizePicker, RangeControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
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

  if ( cssVar.usages.some( usage => [ 'font-size', 'border', 'border-bottom', 'line-height' ].includes( usage.property ) ) ) {
    return <div>
        <div key={1}>
          <span>px</span>
          <FontSizePicker
            value={ isPx( value ) ? value.replace('px', '') : convertRemToPixels( parseFloat( value.replace( 'rem', '' ) ) ) }
            onChange={ value => {
              onChange( `${ value }px` );
            } }
            style={{minWidth: '100px'}}
          />
        </div>
        <div key={2}>
          <span>rem</span>
          <input
            type={'number'}
            value={ isRem( value ) ? value.replace('rem', '') : convertPixelsToRem( parseFloat( value.replace( 'px', '' ) ) ) }
            onChange={ event => {
              onChange(`${event.currentTarget.value}rem`);
            } }
            style={{minWidth: '100px'}}
          />
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

  return <Fragment>
    { !isNaN( value ) && <input type={ 'number' } onChange={ onChange } value={ value }/> }
    <TextControl
      value={ value }
      onChange={ onChange }
    />
  </Fragment>
};
