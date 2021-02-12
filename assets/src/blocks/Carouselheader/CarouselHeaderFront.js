/* global jQuery */
import { FullWidthCarouselHeader } from './FullWidthCarouselHeader';

const $ = jQuery;
export const initializeCarouselHeader = function() {
  const $CarouselHeaderWrapper = $('#carousel-wrapper-header');
  if ($CarouselHeaderWrapper.length > 0) {
    FullWidthCarouselHeader.setup();
  }
};
