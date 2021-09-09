import { RichText } from '@wordpress/block-editor';
import { ShareButtons } from '../../ENForm/ShareButtons';

const { __ } = wp.i18n;

export const ThankYouEditor = ({
  attributes: {
    thankyou_title_step_1,
    thankyou_description_step_1,
    thankyou_title_step_2,
    thankyou_description_step_2,
    thankyou_title_step_3,
    thankyou_description_step_3,
  },
  setAttributes,
}) => {
  const toAttribute = (attributeName) => value => {
    if(setAttributes) {
      setAttributes({
        [attributeName]: value,
      });
    }
  };

  return (
    <section className='hubspot-form-thank-you hubspot-form-thank-you--editor'>
      <div className='hubspot-form-thank-you__step'>
        <div className='hubspot-form-thank-you__step-id hubspot-form-thank-you__step-id'>1</div>
        <div>
          <h2
            className='hubspot-form-thank-you__step-title hubspot-form-thank-you__step-title--disable'
          >{__('Name', 'planet4-blocks-backend')},</h2>&nbsp;
          <RichText
            tagName='h2'
            className='hubspot-form-thank-you__step-title'
            placeholder={__('thank you for signing the petition!', 'planet4-blocks-backend')}
            value={thankyou_title_step_1}
            onChange={toAttribute('thankyou_title_step_1')}
            keepPlaceholderOnFocus={true}
            withoutInteractiveFormatting={true}
            allowedFormats={[]}
          />
        </div>
        <RichText
          tagName='p'
          className='hubspot-form-thank-you__step-description'
          placeholder={__('Enter text', 'planet4-blocks-backend')}
          value={thankyou_description_step_1}
          onChange={toAttribute('thankyou_description_step_1')}
          keepPlaceholderOnFocus={true}
          withoutInteractiveFormatting={true}
          allowedFormats={[]}
        />
      </div>
      <div className='hubspot-form-thank-you__step'>
        <div className='hubspot-form-thank-you__step-id'>2</div>
        <RichText
          tagName='h2'
          className='hubspot-form-thank-you__step-title'
          placeholder={__('Share to boost your global impact', 'planet4-blocks-backend')}
          value={thankyou_title_step_2}
          onChange={toAttribute('thankyou_title_step_2')}
          keepPlaceholderOnFocus={true}
          withoutInteractiveFormatting={true}
          allowedFormats={[]}
        />
        <RichText
          tagName='p'
          className='hubspot-form-thank-you__step-description'
          placeholder={__('Enter text', 'planet4-blocks-backend')}
          value={thankyou_description_step_2}
          onChange={toAttribute('thankyou_description_step_2')}
          keepPlaceholderOnFocus={true}
          withoutInteractiveFormatting={true}
          allowedFormats={[]}
        />
        <ShareButtons />
      </div>
      <div className='hubspot-form-thank-you__step'>
        <div className='hubspot-form-thank-you__step-id'>3</div>
        <RichText
          tagName='h2'
          className='hubspot-form-thank-you__step-title'
          placeholder={__('Take more actions', 'planet4-blocks-backend')}
          value={thankyou_title_step_3}
          onChange={toAttribute('thankyou_title_step_3')}
          keepPlaceholderOnFocus={true}
          withoutInteractiveFormatting={true}
          allowedFormats={[]}
        />
        <RichText
          tagName='p'
          className='hubspot-form-thank-you__step-description'
          placeholder={__('Enter text', 'planet4-blocks-backend')}
          value={thankyou_description_step_3}
          onChange={toAttribute('thankyou_description_step_3')}
          keepPlaceholderOnFocus={true}
          withoutInteractiveFormatting={true}
          allowedFormats={[]}
        />
      </div>
    </section>
  );
};
