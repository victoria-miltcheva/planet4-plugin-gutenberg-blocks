import { CountrySelector } from './CountrySelector';
import { PositionSelector } from './PositionSelector';
import { inputName } from './inputName';

const { __ } = wp.i18n;

export const FormGenerator = ({fields, attributes, onInputChange}) => {
  const { en_form_style } = attributes;
  const is_side_style = 'side-style' === en_form_style;

  let dependent_field = null;
  return (
    <div className="formblock-flex donations-formsection-info">
      {fields.map((field, index) => {
        dependent_field = field.dependency || dependent_field;

        return (
          <Input
            key={ `field-${field.id || index}` }
            {...{field, index, onInputChange, dependent_field, is_side_style}}
          />
        );
      })}
    </div>
  );
}

const Input = (props) => {
  const {
    field,
    index,
    onInputChange = () => {},
    dependent_field,
    is_side_style
  } = props;

  return ((field) => {
    switch (field.input_type) {
      case 'text':
      case 'email':
        return <TextInput {...{field, onInputChange, is_side_style}} />;
      case 'checkbox':
        return <CheckboxInput {...{field, onInputChange, index, dependent_field, is_side_style}} />;
      case 'radio':
        return <RadioInput {...{field, onInputChange, is_side_style}} />;
      case 'country':
        return <CountryInput {...{field, onInputChange, is_side_style}} />;
      case 'position':
        return <PositionInput {...{field, onInputChange, is_side_style}} />;
      case 'hidden':
        return <HiddenInput {...{field}} />;
      default:
        console.error(`Input type <${field.input_type}> unknown.`, field);
        return null;
    }
  })(field);
}

const HiddenInput = ({field}) => {
  const input_name = inputName(field);
  return (
    <input
      type="hidden"
      name={input_name}
      value={field.default_value}
      readOnly={true} />
  );
}

const TextInput = ({field, onInputChange, is_side_style}) => {
  const input_name = inputName(field);
  const errorMessage = field.input_type === 'email'
    ? __( 'Please enter a valid e-mail address.', 'planet4-engagingnetworks' )
    : __( 'This field is required', 'planet4-engagingnetworks' )

  const label = `${field.label}${field.required ? ' *' : ''}`;

  return (
    <div
      className={`en__field en__field--text en__field--${field.id} en__field--${field.property}`}
    >
      <div
        className="en__field__element en__field__element--text form-group animated-label"
        style={field.en_type === 'GEN' ? {display: "flex", "flex-direction": "row"} : {display: "block"} }
      >
        <input
          id={`en__field_supporter_${ field.property }`}
          name={ input_name }
          type={ 'phoneNumber' == field.name ? 'tel' : field.input_type }
          className="en__field__input en__field__input--text form-control"
          defaultValue={ field.default_value }
          data-errormessage={ errorMessage }
          data-validate_regex={ field.js_validate_regex }
          data-validate_regex_msg={ field.js_validate_regex_msg }
          data-validate_callback={ field.js_validate_function }
          placeholder={ label }
          required={field.required || field.input_type === 'email'}
          size="40"
          onChange={ onInputChange }
        />
        {is_side_style &&
          <label
            className="en__field__top__label"
            htmlFor={`en__field_supporter_questions_${ field.id }`}
          >
            {label}
          </label>
        }
      </div>
    </div>
  );
}

const CheckboxInput = ({field, onInputChange, index, dependent_field}) => {
  return field.en_type === 'GEN'
    ? <CheckboxGen {...{field, onInputChange, index, dependent_field}} />
    : <CheckboxOpt {...{field, onInputChange, dependent_field}} />
}

const CheckboxOpt = ({field, onInputChange, dependent_field}) => {
  const input_name = inputName(field);
  const locale = field.selected_locale;
  const errorMessage = __( 'This field is required', 'planet4-engagingnetworks' )

  return (
    <div className={`en__field en__field--check en__field--${field.id}`}>
      <div
        className="en__field__element en__field__element--check form-group form-check-label-block custom-control p4-custom-control-input"
      >
        <label className={`custom-checkbox ${field.name == dependent_field ? 'disable-checkbox' : ''}`}>
        <input
          id={`en__field_supporter_questions_${field.id}`}
          name={ input_name }
          type="checkbox"
          className={`en__field__input en__field__input--checkbox ${field.name == dependent_field ? 'dependency-' + field.name : '' }`}
          defaultValue={ field.default_value }
          data-errormessage={ errorMessage }
          defaultChecked={ 1 == field.selected }
          required={ field.required }
          disabled={ field.name == dependent_field }
          data-dependency={ field.dependency }
          onClick={ toggleDependencies }
          onChange={ onInputChange }
        />
        <span
          className="custom-control-description"
          dangerouslySetInnerHTML={{__html: `${field.label}${field.required ? ' *' : ''}`}}
        />
        </label>
      </div>
    </div>
  );
}

const CheckboxGen = ({field, onInputChange, index, dependent_field}) => {
  const input_name = inputName(field);
  const locale = field.selected_locale;
  const question_option={};
  const errorMessage = __( 'This field is required', 'planet4-engagingnetworks' );

  return (
    <div className={`en__field en__field--check en__field--${field.id}`}>
      <div className="en__field__element en__field__element--check form-group form-check-label-block custom-control p4-custom-control-input">
        <label className="custom-checkbox">
          <input
            id={`en__field_supporter_questions_${field.id}${index}`}
            name={ input_name }
            type="checkbox"
            className={`en__field__input en__field__input--checkbox ${field.name == dependent_field ? 'dependency-' + field.name : '' }`}
            defaultValue={ question_option.option_value }
            data-errormessage={ errorMessage }
            defaultChecked={ question_option.option_selected }
            required={ field.required }
            disabled={ field.name == dependent_field }
            data-dependency={ field.dependency }
            onClick={ toggleDependencies }
            onChange={ onInputChange }
          />
          <span
            className="custom-control-description"
            dangerouslySetInnerHTML={{__html: `${question_option.option_label}${field.required ? ' *' : ''}`}}
          />
          <br />
        </label>
      </div>
    </div>
  );
}

const RadioInput = ({field, onInputChange}) => {
  const input_name = inputName(field);

  const options = field.radio_options[field.locale] || [];
  const inputs = options.map((opt, index) => {
    return (
      <div key={index} className={`en__field en__field--check en__field--${field.id}`}>
        <div className="en__field__element en__field__element--check form-group form-check-label-block custom-control p4-custom-control-input">
          <label className="custom-radio">
            <input
              id={`en__field_supporter_questions_${field.id}${index}`}
              name={ input_name }
              type="radio"
              className="en__field__input en__field__input--radio"
              value={ opt.option_value }
              data-errormessage={ __( 'This field is required', 'planet4-engagingnetworks' ) }
              checked={ opt.option_selected }
              required={ field.required }
              onChange={ onInputChange }
            />
            <span className="custom-control-description">
              { opt.option_label }
            </span><br />
          </label>
        </div>
      </div>
    )
  });

  if (inputs.length <= 0) {
    return null;
  }

  return (
    <div className="en__field">
      <span className="custom-control-description">
        {field.label}
      </span><br />
      { inputs }
    </div>
  );
}

const CountryInput = ({field, onInputChange, is_side_style}) => {
  const input_name = inputName(field);
  const props = {
    id: `en__field_supporter_${ field.property }`,
    name: input_name,
    class_name: `en__field__input en__field__input--select en_select_country form-select`,
    default_text: `${__( 'Select Country or Region', 'planet4-engagingnetworks' )}${field.required ? ' *' : ''}`,
    error_message: __( 'Please select a country.', 'planet4-engagingnetworks' ),
    required: field?.required || false,
    label: `${field.label}${field.required ? ' *' : ''}`,
    onInputChange
  };

  return (
    <div
      className={`en__field en__field--${field.id} en__field--${field.property} en__field--select`}
    >
      <div className="en__field__element en__field__element--select form-group animated-label">
        <CountrySelector {...props} />
      </div>
    </div>
  );
}

const PositionInput = ({field, onInputChange, is_side_style}) => {
  const input_name = inputName(field);
  const props = {
    id: `en__field_supporter_${field.property}`,
    name: input_name,
    class_name: `en__field__input en__field__input--select en_select_position form-select`,
    default_text: `${__( 'Select Affiliation, Position or Profession', 'planet4-engagingnetworks' )}${field.required ? ' *' : ''}`,
    error_message: __( 'Please select a position.', 'planet4-engagingnetworks' ),
    required: field?.required || false,
    onInputChange
  };

  return (
    <div
      className={`en__field en__field--${field.id} en__field--${field.property} en__field--select`}
    >
      <div className="en__field__element en__field__element--select form-group animated-label">
        {is_side_style &&
          <label className="en__field__top__label" htmlFor={input_name}>
            {field.label}{field.required ? ' *' : ''}
          </label>
        }
        <PositionSelector {...props} />
      </div>
    </div>
  );
}

/**
 * Toggles availability of checkboxes depending on the one clicked
 */
const toggleDependencies = (e) => {
  const target = e.target;
  const dependency = target?.dataset?.dependency;
  if (! target || ! dependency) {
    return;
  }

  const dep_element = document.querySelector(`.dependency-${dependency}`);
  if (!dep_element) {
    return;
  }

  if (target.checked) {
    dep_element.removeAttribute('disabled');
    dep_element.parentElement?.classList.remove('disable-checkbox');
  } else {
    dep_element.setAttribute('disabled', '');
    dep_element.checked = false;
    dep_element.parentElement?.classList.add('disable-checkbox');
  }
}
