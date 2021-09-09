import { useContext, useEffect, useRef } from '@wordpress/element';
import { HubspotFormContext } from '../HubspotFormContext';
import { ShareButtons } from '../../ENForm/ShareButtons';

export const ThankYouFrontend = ({ userName }) => {
  const {
    thankyou_title_step_1,
    thankyou_description_step_1,
    thankyou_title_step_2,
    thankyou_description_step_2,
    thankyou_title_step_3,
    thankyou_description_step_3,
  } = useContext(HubspotFormContext);
  const ref = useRef(null);

  useEffect(() => {
    if(ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <section ref={ref} className='hubspot-form-thank-you'>
      <div className='hubspot-form-thank-you__step'>
        <div className='hubspot-form-thank-you__step-id hubspot-form-thank-you__step-id--checked'>1</div>
        <div>
          {userName && <h2 className='hubspot-form-thank-you__step-title hubspot-form-thank-you__step-title--with-comma'>{userName},&nbsp;</h2>}
          <h2 className='hubspot-form-thank-you__step-title'>{thankyou_title_step_1}</h2>
        </div>
        <p className='hubspot-form-thank-you__step-description'>{thankyou_description_step_1}</p>
      </div>
      <div className='hubspot-form-thank-you__step'>
        <div className='hubspot-form-thank-you__step-id'>2</div>
        <h2 className='hubspot-form-thank-you__step-title'>{thankyou_title_step_2}</h2>
        <p className='hubspot-form-thank-you__step-description'>{thankyou_description_step_2}</p>
        {/* <ShareButtons /> */}
      </div>
      <div className='hubspot-form-thank-you__step'>
        <div className='hubspot-form-thank-you__step-id'>3</div>
        <h2 className='hubspot-form-thank-you__step-title'>{thankyou_title_step_3}</h2>
        <p className='hubspot-form-thank-you__step-description'>{thankyou_description_step_3}</p>
      </div>
    </section>
  );
};
