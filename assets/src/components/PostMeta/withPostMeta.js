import { withSelect, withDispatch } from "@wordpress/data";
import { ColorPicker } from "@wordpress/components"
import { compose } from '@wordpress/compose';
import { Component} from '@wordpress/element';

const getValuePropName = ( Component ) => {
  switch ( Component ) {
    case ColorPicker:
      return 'color'
  }

  return 'value'
}

const getOnChangePropName = ( Component ) => {
  switch (Component) {
    // ColorPicker doing it differently for some reason, even though it doesn't have an `onChange` prop.
    case ColorPicker:
      return 'onChangeComplete'
  }

  return 'onChange'
}

const getValueFromValue = (Component, value) => {
  switch (Component) {
    case ColorPicker:
      return value.hex
  }

  return value
}

// This function takes a component...
export function withPostMeta( metaKey, WrappedComponent, additionalProps ) {

  class WrappingComponent extends Component {
    constructor( props ) {
      super( props );
      this.onChange = this.onChange.bind( this )
      this.metaKey = metaKey
    }

    onChange( value ) {
      this.props.writeMeta( getValueFromValue( WrappedComponent, value ) )
    }

    render() {
      const valueProp = getValuePropName( WrappedComponent )
      const onChangePropName = getOnChangePropName( WrappedComponent )

      return <WrappedComponent
        { ...{
          [ valueProp ]: this.props.value,
          [ onChangePropName ]: ( value ) => {
            this.onChange( value )
          }
        } }
        { ...additionalProps }
      />;
    }
  }

  // ...and returns another component...
  return compose(
    withSelect(
      ( select ) => {
        return {
          value: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ metaKey ]
        }
      }
    ),
    withDispatch(
      ( dispatch ) => {
        return {
          writeMeta: ( value ) => {
            dispatch( 'core/editor' ).editPost( { meta: { [ metaKey ]: value } } )
          }
        }
      }
    )
  )( WrappingComponent )
}
