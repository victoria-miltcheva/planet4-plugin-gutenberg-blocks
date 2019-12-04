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
export function withPostMeta( WrappedComponent ) {

  class WrappingComponent extends Component {
    constructor( props ) {
      super( props );
      this.onChange = this.onChange.bind( this )
      this.valueProp = getValuePropName( WrappedComponent )
      this.onChangePropName = getOnChangePropName( WrappedComponent )
    }

    onChange( metaKey, value ) {
      this.props.writeMeta( metaKey, getValueFromValue( WrappedComponent, value ) )
    }

    componentDidMount() {
      console.log('mounted')
    }

    render() {

      const { metaKey, postMeta, ...passThroughProps } = this.props

      return <WrappedComponent
        { ...{
          [ this.valueProp ]: postMeta[ metaKey ],
          [ this.onChangePropName ]: ( value ) => {
            this.onChange( metaKey, value )
          }
        } }
        { ...passThroughProps }
      />;
    }
  }

  return compose(
    withSelect(
      ( select ) => {
        return {
          postMeta: select( 'core/editor' ).getEditedPostAttribute( 'meta' )
        }
      }
    ),
    withDispatch(
      ( dispatch ) => {
        return {
          writeMeta: ( metaKey, value ) => {
            dispatch( 'core/editor' ).editPost( { meta: { [ metaKey ]: value } } )
          }
        }
      }
    )
  )( WrappingComponent )
}
