import { withSelect, withDispatch } from "@wordpress/data";
import { ColorPalette, ColorPicker, RadioControl, SelectControl } from "@wordpress/components"
import { compose } from '@wordpress/compose';
import { Component} from '@wordpress/element';

const getValuePropName = ( Component ) => {
  switch ( Component ) {
    case RadioControl:
      return 'selected'
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

    handleDependency(dependency, passThroughProps) {
      if ( !dependency ) {
        return passThroughProps
      }

      let optionsKey

      switch ( WrappedComponent ) {
        case SelectControl:
          optionsKey = 'options'
          break
        case ColorPalette:
          optionsKey = 'colors'
          break
        default:
          throw `Cannot handle dependency for type ${ WrappedComponent.name }`
      }

      const { dependentOptions, ...resolvedProps } = passThroughProps
      const dependencyValue = this.props.postMeta[ dependency ]
      resolvedProps[optionsKey] = dependentOptions[ dependencyValue ]
      return resolvedProps
    }

    render() {

      // postMeta and writeMeta are only extracted here to remove the from passThroughProps
      const { metaKey, dependsOn, postMeta, writeMeta, ...otherProps } = this.props

      const passThroughProps = this.handleDependency(dependsOn, otherProps)

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
