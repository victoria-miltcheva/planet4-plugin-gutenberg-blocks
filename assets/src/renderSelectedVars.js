import { VarPicker } from './VarPicker';

export const renderSelectedVars = ( rootElement, cssVars = [] ) => {

  wp.element.render(
    <VarPicker
      initialOpen={ false }
      selectedVars={ cssVars }
      onCloseClick={ close }
    />,
    rootElement
  );
};
