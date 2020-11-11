const { addFilter } = wp.hooks;

import P4ButtonEdit from './components/p4_button/edit';
import P4TableEdit from './components/p4_table/edit';

import { CoverEdit, CoverRegister, CoverSaveElement } from './components/CoverFields/CoverFields.js';

export const addBlockFilters = () => {
  addFileBlockFilter();
  addButtonBlockFilter();
  addTableBlockFilter();
  // addCoreCoverBlockFilter();
};

const addCoreCoverBlockFilter = () => {
  addFilter('blocks.registerBlockType', 'core/cover/inner', CoverRegister);
  addFilter('editor.BlockEdit', 'core/cover/inner', CoverEdit);
  // addFilter('blocks.getSaveElement', 'core/cover/inner', CoverSaveElement);
}

const addFileBlockFilter = () => {
  const setDownloadButtonToggleDefaultFalse = (settings, name) => {

    if ('core/file' !== name) {
      return settings;
    }

    settings.attributes['showDownloadButton']['default'] = false;

    return settings;
  };

  addFilter('blocks.registerBlockType', 'planet4-blocks/filters/file', setDownloadButtonToggleDefaultFalse);
};

const addButtonBlockFilter = () => {

  const updateButtonBlockEditMethod = (settings, name) => {

    if ('core/button' !== name) {
      return settings;
    }

    if ( settings.name === 'core/button' ) {
      lodash.assign( settings, {
        edit: P4ButtonEdit,
      } );
    }

    return settings;
  };

  addFilter('blocks.registerBlockType', 'planet4-blocks/filters/button', updateButtonBlockEditMethod);
};

const addTableBlockFilter = () => {

  const updateTableBlockEditMethod = (settings, name) => {

    if ('core/table' !== name) {
      return settings;
    }

    if ( settings.name === 'core/table' ) {
      lodash.assign( settings, {
        edit: P4TableEdit,
      } );
    }

    return settings;
  };

  addFilter('blocks.registerBlockType', 'planet4-blocks/filters/table', updateTableBlockEditMethod);
};
