/* global p4ge_vars */

export const setupCampaignThemeSwitcher = () => {
  $('#campaign_page_template').on('change', function() {
    $('#campaign-theme-css').remove();
    const themeName = $(this).val();
    $('body').addClass('theme-' + themeName);
    $('head').append(`<link id="campaign-theme-css" href="${p4ge_vars.plugin_root}assets/build/theme_${themeName}.min.css" rel="stylesheet" />`);
  });
};
