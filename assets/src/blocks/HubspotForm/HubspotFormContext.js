import { createContext } from '@wordpress/element';

const Context = createContext({});
Context.displayName = 'HubspotFormContext';
const { Provider, Consumer } = Context;

const ContextProvider = ({
  form_title,
  form_description,
  block_background_image_url,
  block_title,
  block_text,
  cta_link,
  cta_text,
  cta_new_tab,
  hubspot_shortcode,
  hubspot_thankyou_message,
  enable_custom_hubspot_thankyou_message,
  thankyou_title_step_1,
  thankyou_description_step_1,
  thankyou_title_step_2,
  thankyou_description_step_2,
  thankyou_title_step_3,
  thankyou_description_step_3,
  children,
}) => (
  <Provider
    value={{
      form_title,
      form_description,
      block_background_image_url,
      block_title,
      block_text,
      cta_link,
      cta_text,
      cta_new_tab,
      hubspot_shortcode,
      hubspot_thankyou_message,
      enable_custom_hubspot_thankyou_message,
      thankyou_title_step_1,
      thankyou_description_step_1,
      thankyou_title_step_2,
      thankyou_description_step_2,
      thankyou_title_step_3,
      thankyou_description_step_3,
    }}>
    {children}
  </Provider>
);

export {
  ContextProvider as HubspotFormProvider,
  Consumer as HubspotFormConsumer,
  Context as HubspotFormContext,
};
