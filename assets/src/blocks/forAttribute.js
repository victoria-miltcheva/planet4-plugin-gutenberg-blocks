/**
 * Return the attributes that input components need to read and control a block attribute. Also set a class name so the
 * input element can be found by shepherd. Intended to be spread in the target component.
 *
 * @param attributeName The attribute an element is controlling.
 * @param changeOn The even on which the attribute should be updated
 * @param valueTo The props to assign the attribute's value to.
 * @param sanitize
 * @param attributes
 * @param setAttributes
 */
export const forAttribute = (
  attributeName,
  {
    changeOn = 'onChange',
    valueTo = [ 'value' ],
    sanitize = value => value,
  },
  attributes,
  setAttributes,
) => {
  const valueProps = Object.assign(
    {},
    ...valueTo.map( prop => ( {
        [ prop ]: attributes[ attributeName ]
      } )
    )
  );

  return {
    className: `attribute-control-${ attributeName.replace( '_', '-' ) }`,
    [ changeOn ]: value => setAttributes( { [ attributeName ]: sanitize( value ) } ),
    ...valueProps,
    value: attributes[ attributeName ],
  };
};
