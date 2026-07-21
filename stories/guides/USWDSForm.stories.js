// ============================================================
// USWDS Form Templates — Baseline Integration Test
// ============================================================
// Unmodified USWDS form pattern and component markup rendered
// under the HDS Core theme as a multi-step form. Tests how
// stock USWDS form components appear when an existing USWDS
// site adopts HDS Core CSS.
//
// Source: https://designsystem.digital.gov/templates/
//         https://designsystem.digital.gov/patterns/
//         https://designsystem.digital.gov/components/
//
// Components exercised:
//   Form (large), Fieldset, Legend, Label, Hint, Error message,
//   Input (default, xl, medium, tel, email), Textarea, Select,
//   Radio, Checkbox, Memorable date, Date picker (JS),
//   Time picker (JS), Combo box (JS), File input (JS),
//   Character count (JS), Input prefix/suffix, Range slider,
//   Step indicator, Icon list, Modal (JS), Alert (error),
//   Form group (default + error)
//
// USWDS JS components rely on event delegation attached at
// DOMContentLoaded. The Storybook accordion initial-state
// decorator handles collapsed panels. Other JS components
// (combo box, date picker, time picker, character count,
// file input, modal) depend on the same delegation pattern.
// ============================================================

import { paletteModes } from '../../.storybook/modes';

export default {
  title: 'Guides/Existing USWDS Site/Multi-Step Form',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
    chromatic: {
      disableSnapshot: false,
      delay: 300,
      modes: paletteModes,
    },
    a11y: {
      test: 'todo',
    },
  },
};

const siteAlert = `
  <section
    class="usa-site-alert usa-site-alert--info"
    aria-label="Site alert"
  >
    <div class="usa-alert">
      <div class="usa-alert__body">
        <p class="usa-alert__text">
          This page uses unmodified USWDS template markup rendered under the
          HDS Core theme.
          <a class="usa-link" href="/?path=/docs/guides-existing-uswds-site-guidance--docs">
            Learn about migrating a USWDS site to HDS Core
          </a>
        </p>
      </div>
    </div>
  </section>
`;

// Step indicator helper — generates a 4-step progress bar.
// currentStep: 1–4 (which step is current), 0 = overview (none current)
const stepLabels = ['Personal information', 'Contact information', 'Additional details', 'Supporting documents'];

const stepIndicator = (currentStep) => {
  const segments = stepLabels
    .map((text, i) => {
      const stepNum = i + 1;
      let className = 'usa-step-indicator__segment';
      let srText = '';
      if (currentStep > 0 && stepNum < currentStep) {
        className += ' usa-step-indicator__segment--complete';
        srText = ' <span class="usa-sr-only">completed</span>';
      } else if (stepNum === currentStep) {
        className += ' usa-step-indicator__segment--current';
      } else {
        srText = ' <span class="usa-sr-only">not completed</span>';
      }
      const ariaCurrent = stepNum === currentStep ? ' aria-current="true"' : '';
      return `
      <li class="${className}"${ariaCurrent}>
        <span class="usa-step-indicator__segment-label">${text}${srText}</span>
      </li>`;
    })
    .join('');

  const heading =
    currentStep > 0
      ? `
    <div class="usa-step-indicator__header">
      <h2 class="usa-step-indicator__heading">
        <span class="usa-step-indicator__heading-counter">
          <span class="usa-sr-only">Step</span>
          <span class="usa-step-indicator__current-step">${currentStep}</span>
          <span class="usa-step-indicator__total-steps">of ${stepLabels.length}</span>
        </span>
        <span class="usa-step-indicator__heading-text">${stepLabels[currentStep - 1]}</span>
      </h2>
    </div>`
      : `
    <div class="usa-step-indicator__header">
      <h2 class="usa-step-indicator__heading">
        <span class="usa-step-indicator__heading-text">Form overview</span>
      </h2>
    </div>`;

  return `
  <div class="usa-step-indicator margin-bottom-4">
    <ol class="usa-step-indicator__segments">
      ${segments}
    </ol>
    ${heading}
  </div>`;
};

const beforeYouStart = `
  <section class="margin-bottom-6">
    ${stepIndicator(0)}
    <div class="grid-container padding-0">
      <div class="grid-row">
        <div class="tablet:grid-col">
          <h3 class="margin-top-0 font-lang-lg margin-bottom-2">Before you get started on this form</h3>
          <p class="margin-top-0">
            It will take most people about one hour to complete this form.
            You will need the following information:
          </p>
          <ul class="usa-icon-list">
            <li class="usa-icon-list__item">
              <div class="usa-icon-list__icon text-green">
                <svg class="usa-icon" aria-hidden="true" role="img">
                  <use href="assets/img/sprite.svg#check_circle"></use>
                </svg>
              </div>
              <div class="usa-icon-list__content">
                Names and birth dates of all family members living with you.
              </div>
            </li>
            <li class="usa-icon-list__item">
              <div class="usa-icon-list__icon text-green">
                <svg class="usa-icon" aria-hidden="true" role="img">
                  <use href="assets/img/sprite.svg#check_circle"></use>
                </svg>
              </div>
              <div class="usa-icon-list__content">
                Social Security Numbers (or the equivalent) for all family
                members living with you.
              </div>
            </li>
            <li class="usa-icon-list__item">
              <div class="usa-icon-list__icon text-green">
                <svg class="usa-icon" aria-hidden="true" role="img">
                  <use href="assets/img/sprite.svg#check_circle"></use>
                </svg>
              </div>
              <div class="usa-icon-list__content">
                The addresses of each of the places you've lived in the last
                five years.
              </div>
            </li>
            <li class="usa-icon-list__item">
              <div class="usa-icon-list__icon text-green">
                <svg class="usa-icon" aria-hidden="true" role="img">
                  <use href="assets/img/sprite.svg#check_circle"></use>
                </svg>
              </div>
              <div class="usa-icon-list__content">
                Names and phone numbers for three people who are not related
                to you, but who have known you for at least three years.
              </div>
            </li>
          </ul>
          <p>
            We will be asking you to describe your experience. We know these
            questions can be difficult. If at any time you need to take a
            break, simply save the form. You can start again where you left
            off when you are ready.
          </p>
        </div>
      </div>
    </div>
  </section>
`;
const step1 = `
  <section class="margin-bottom-6">
    ${stepIndicator(1)}
    <form class="usa-form usa-form--large">

      <!-- Name -->
      <fieldset class="usa-fieldset margin-bottom-4">
        <legend class="usa-legend usa-legend--large">Name</legend>
        <label class="usa-label" for="form-given-name">First or given name</label>
        <div class="usa-hint" id="form-gnHint">For example, Jose, Darren, or Mai</div>
        <input
          class="usa-input usa-input--xl"
          id="form-given-name"
          name="first-name"
          aria-describedby="form-gnHint"
        />
        <label class="usa-label" for="form-middle-name">Middle name</label>
        <input
          class="usa-input usa-input--xl"
          id="form-middle-name"
          name="middle-name"
        />
        <label class="usa-label" for="form-family-name">Last or family name</label>
        <div class="usa-hint" id="form-lnHint">
          For example, Martinez Gonzalez, Gu, or Smith
        </div>
        <input
          class="usa-input usa-input--xl"
          id="form-family-name"
          name="last-name"
          aria-describedby="form-lnHint"
        />
      </fieldset>

      <!-- Date of Birth -->
      <fieldset class="usa-fieldset margin-bottom-4">
        <legend class="usa-legend usa-legend--large">Date of birth</legend>
        <span class="usa-hint" id="form-dob-hint">For example: January 19 2000</span>
        <div class="usa-memorable-date">
          <div class="usa-form-group usa-form-group--month usa-form-group--select">
            <label class="usa-label" for="form-dob-month">Month</label>
            <select class="usa-select" id="form-dob-month" name="dob_month" aria-describedby="form-dob-hint">
              <option value>- Select -</option>
              <option value="1">01 - January</option>
              <option value="2">02 - February</option>
              <option value="3">03 - March</option>
              <option value="4">04 - April</option>
              <option value="5">05 - May</option>
              <option value="6">06 - June</option>
              <option value="7">07 - July</option>
              <option value="8">08 - August</option>
              <option value="9">09 - September</option>
              <option value="10">10 - October</option>
              <option value="11">11 - November</option>
              <option value="12">12 - December</option>
            </select>
          </div>
          <div class="usa-form-group usa-form-group--day">
            <label class="usa-label" for="form-dob-day">Day</label>
            <input
              class="usa-input"
              aria-describedby="form-dob-hint"
              id="form-dob-day"
              name="dob_day"
              maxlength="2"
              pattern="[0-9]*"
              inputmode="numeric"
              value=""
            />
          </div>
          <div class="usa-form-group usa-form-group--year">
            <label class="usa-label" for="form-dob-year">Year</label>
            <input
              class="usa-input"
              aria-describedby="form-dob-hint"
              id="form-dob-year"
              name="dob_year"
              minlength="4"
              maxlength="4"
              pattern="[0-9]*"
              inputmode="numeric"
              value=""
            />
          </div>
        </div>
      </fieldset>

      <!-- Sex -->
      <fieldset class="usa-fieldset margin-bottom-4">
        <legend class="usa-legend usa-legend--large">Sex</legend>
        <span class="usa-hint" id="form-sex-hint">
          Please select your sex from the following options.
          <a href="#form-sex-modal" aria-controls="form-sex-modal" data-open-modal>
            Why do we ask for sex information?
          </a>
        </span>
        <div class="usa-radio">
          <input class="usa-radio__input" id="form-sex-male" type="radio" name="sex" value="male" />
          <label class="usa-radio__label" for="form-sex-male">Male</label>
        </div>
        <div class="usa-radio">
          <input class="usa-radio__input" id="form-sex-female" type="radio" name="sex" value="female" />
          <label class="usa-radio__label" for="form-sex-female">Female</label>
        </div>
      </fieldset>

      <!-- Race and Ethnicity -->
      <fieldset class="usa-fieldset">
        <legend class="usa-legend usa-legend--large">Race and ethnicity</legend>
        <span class="usa-hint">Select all that apply.</span>
        <div class="usa-checkbox">
          <input class="usa-checkbox__input" id="form-race-aian" type="checkbox"
            name="race" value="american-indian-or-alaska-native" />
          <label class="usa-checkbox__label" for="form-race-aian">American Indian or Alaska Native</label>
        </div>
        <div class="usa-checkbox">
          <input class="usa-checkbox__input" id="form-race-asian" type="checkbox"
            name="race" value="asian" />
          <label class="usa-checkbox__label" for="form-race-asian">Asian</label>
        </div>
        <div class="usa-checkbox">
          <input class="usa-checkbox__input" id="form-race-black" type="checkbox"
            name="race" value="black-or-african-american" />
          <label class="usa-checkbox__label" for="form-race-black">Black or African American</label>
        </div>
        <div class="usa-checkbox">
          <input class="usa-checkbox__input" id="form-race-mena" type="checkbox"
            name="race" value="middle-eastern-or-north-african" />
          <label class="usa-checkbox__label" for="form-race-mena">Middle Eastern or North African</label>
        </div>
        <div class="usa-checkbox">
          <input class="usa-checkbox__input" id="form-race-nhpi" type="checkbox"
            name="race" value="native-hawaiian-or-pacific-islander" />
          <label class="usa-checkbox__label" for="form-race-nhpi">Native Hawaiian or other Pacific Islander</label>
        </div>
        <div class="usa-checkbox">
          <input class="usa-checkbox__input" id="form-race-white" type="checkbox"
            name="race" value="white" />
          <label class="usa-checkbox__label" for="form-race-white">White</label>
        </div>
        <div class="usa-checkbox">
          <input class="usa-checkbox__input" id="form-race-other" type="checkbox"
            name="race" value="some-other-race" />
          <label class="usa-checkbox__label" for="form-race-other">Some other race</label>
        </div>
        <div class="usa-checkbox margin-top-3">
          <input class="usa-checkbox__input" id="form-race-decline" type="checkbox"
            name="race" value="prefer-not-to-answer" />
          <label class="usa-checkbox__label" for="form-race-decline">Prefer not to share my race and ethnicity</label>
        </div>
      </fieldset>

    </form>
  </section>
`;

// Modal for Sex field — placed outside form per USWDS pattern
const sexModal = `
  <div
    class="usa-modal"
    id="form-sex-modal"
    aria-labelledby="form-sex-modal-heading"
    aria-describedby="form-sex-modal-description"
  >
    <div class="usa-modal__content">
      <div class="usa-modal__main">
        <h3 class="usa-modal__heading" id="form-sex-modal-heading">
          Why do we ask for sex information?
        </h3>
        <div class="usa-prose">
          <p id="form-sex-modal-description">
            This agency collects sex information to ensure equitable service
            delivery across all populations. This data is used for aggregate
            statistical reporting only and is not shared with third parties.
          </p>
        </div>
        <div class="usa-modal__footer">
          <button type="button" class="usa-button" data-close-modal>
            Return to the form
          </button>
        </div>
      </div>
      <button
        type="button"
        class="usa-button usa-modal__close"
        aria-label="Close this window"
        data-close-modal
      >
        <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
          <use href="assets/img/sprite.svg#close"></use>
        </svg>
      </button>
    </div>
  </div>
`;

const step2 = `
  <section class="margin-bottom-6">
    ${stepIndicator(2)}
    <form class="usa-form usa-form--large">

      <!-- Phone -->
      <fieldset class="usa-fieldset margin-bottom-4">
        <legend class="usa-legend usa-legend--large">Phone number</legend>
        <label class="usa-label" for="form-phone">Primary phone number</label>
        <div class="usa-hint" id="form-phone-hint">
          10-digit, U.S. only, for example 999-999-9999
        </div>
        <input
          class="usa-input margin-bottom-1"
          id="form-phone"
          name="phone"
          type="tel"
          aria-describedby="form-phone-hint"
        />
        <fieldset class="usa-fieldset">
          <legend class="usa-legend">Potentially sensitive information</legend>
          <div class="usa-radio">
            <input class="usa-radio__input" id="form-phone-yes" type="radio"
              name="phone-sensitive" value="yes" />
            <label class="usa-radio__label" for="form-phone-yes">
              Yes, you may leave sensitive information in voicemail or text message
            </label>
          </div>
          <div class="usa-radio">
            <input class="usa-radio__input" id="form-phone-no" type="radio"
              name="phone-sensitive" value="no" />
            <label class="usa-radio__label" for="form-phone-no">
              No, please do not leave sensitive information in voicemail or text messages
            </label>
          </div>
        </fieldset>
      </fieldset>

      <!-- Contact Preferences with Character Count -->
      <fieldset class="usa-fieldset margin-bottom-4">
        <legend class="usa-legend usa-legend--large">Contact preferences</legend>
        <label class="usa-label" for="form-contact-method">
          We will only contact you if there is a question about your application.
        </label>
        <div class="usa-radio">
          <input class="usa-radio__input" id="form-contact-phone" type="radio"
            name="contact-method" value="telephone" />
          <label class="usa-radio__label" for="form-contact-phone">Telephone call</label>
        </div>
        <div class="usa-radio">
          <input class="usa-radio__input" id="form-contact-text" type="radio"
            name="contact-method" value="text" />
          <label class="usa-radio__label" for="form-contact-text">Text message</label>
        </div>
        <div class="usa-radio">
          <input class="usa-radio__input" id="form-contact-email" type="radio"
            name="contact-method" value="email" />
          <label class="usa-radio__label" for="form-contact-email">Email</label>
        </div>
        <div class="usa-radio">
          <input class="usa-radio__input" id="form-contact-mail" type="radio"
            name="contact-method" value="postal" />
          <label class="usa-radio__label" for="form-contact-mail">Postal mail</label>
        </div>
        <div class="usa-character-count margin-top-3">
          <div class="usa-form-group">
            <label class="usa-label" for="form-contact-notes">
              Additional information that will help us contact you
            </label>
            <span class="usa-hint" id="form-contact-notes-hint">
              For example, "Please leave a message" or "I'm a TTY/TDD user"
            </span>
            <textarea
              class="usa-textarea usa-character-count__field"
              id="form-contact-notes"
              name="contact-notes"
              maxlength="200"
              rows="3"
              aria-describedby="form-contact-notes-info form-contact-notes-hint"
            ></textarea>
          </div>
          <span id="form-contact-notes-info" class="usa-character-count__message">
            You can enter up to 200 characters
          </span>
        </div>
      </fieldset>

      <!-- Appointment Date (Date Picker) -->
      <div class="usa-form-group margin-bottom-4">
        <label class="usa-label" id="form-appt-date-label" for="form-appt-date">
          Appointment date
        </label>
        <div class="usa-hint" id="form-appt-date-hint">mm/dd/yyyy</div>
        <div class="usa-date-picker">
          <input
            class="usa-input"
            id="form-appt-date"
            name="appointment-date"
            aria-labelledby="form-appt-date-label"
            aria-describedby="form-appt-date-hint"
          />
        </div>
      </div>

      <!-- Appointment Time (Time Picker) -->
      <div class="usa-form-group">
        <label class="usa-label" id="form-appt-time-label" for="form-appt-time">
          Appointment time
        </label>
        <div class="usa-hint" id="form-appt-time-hint">
          Select a time from the dropdown. Type into the input to filter options.
        </div>
        <div class="usa-time-picker">
          <input
            class="usa-input"
            id="form-appt-time"
            name="appointment-time"
            aria-describedby="form-appt-time-label form-appt-time-hint"
          />
        </div>
      </div>

    </form>
  </section>
`;

const step3 = `
  <section class="margin-bottom-6">
    ${stepIndicator(3)}
    <form class="usa-form usa-form--large">

      <!-- Mailing Address -->
      <fieldset class="usa-fieldset margin-bottom-4">
        <legend class="usa-legend usa-legend--large">Mailing address</legend>
        <p>
          Required fields are marked with an asterisk (<abbr
            title="required"
            class="usa-hint usa-hint--required"
            >*</abbr
          >).
        </p>
        <label class="usa-label" for="form-address-1">Street address</label>
        <input class="usa-input" id="form-address-1" name="address-1" />
        <label class="usa-label" for="form-address-2">Street address line 2</label>
        <input class="usa-input" id="form-address-2" name="address-2" />
        <label class="usa-label" for="form-city">
          City
          <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
        </label>
        <input class="usa-input" id="form-city" name="city" required />
        <label class="usa-label" for="form-state">
          State, territory, or military post
          <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
        </label>
        <select class="usa-select" id="form-state" name="state">
          <option value>- Select -</option>
          <option value="AL">AL - Alabama</option>
          <option value="AK">AK - Alaska</option>
          <option value="AS">AS - American Samoa</option>
          <option value="AZ">AZ - Arizona</option>
          <option value="AR">AR - Arkansas</option>
          <option value="CA">CA - California</option>
          <option value="CO">CO - Colorado</option>
          <option value="CT">CT - Connecticut</option>
          <option value="DE">DE - Delaware</option>
          <option value="DC">DC - District of Columbia</option>
          <option value="FL">FL - Florida</option>
          <option value="GA">GA - Georgia</option>
          <option value="GU">GU - Guam</option>
          <option value="HI">HI - Hawaii</option>
          <option value="ID">ID - Idaho</option>
          <option value="IL">IL - Illinois</option>
          <option value="IN">IN - Indiana</option>
          <option value="IA">IA - Iowa</option>
          <option value="KS">KS - Kansas</option>
          <option value="KY">KY - Kentucky</option>
          <option value="LA">LA - Louisiana</option>
          <option value="ME">ME - Maine</option>
          <option value="MD">MD - Maryland</option>
          <option value="MA">MA - Massachusetts</option>
          <option value="MI">MI - Michigan</option>
          <option value="MN">MN - Minnesota</option>
          <option value="MS">MS - Mississippi</option>
          <option value="MO">MO - Missouri</option>
          <option value="MT">MT - Montana</option>
          <option value="NE">NE - Nebraska</option>
          <option value="NV">NV - Nevada</option>
          <option value="NH">NH - New Hampshire</option>
          <option value="NJ">NJ - New Jersey</option>
          <option value="NM">NM - New Mexico</option>
          <option value="NY">NY - New York</option>
          <option value="NC">NC - North Carolina</option>
          <option value="ND">ND - North Dakota</option>
          <option value="MP">MP - Northern Mariana Islands</option>
          <option value="OH">OH - Ohio</option>
          <option value="OK">OK - Oklahoma</option>
          <option value="OR">OR - Oregon</option>
          <option value="PA">PA - Pennsylvania</option>
          <option value="PR">PR - Puerto Rico</option>
          <option value="RI">RI - Rhode Island</option>
          <option value="SC">SC - South Carolina</option>
          <option value="SD">SD - South Dakota</option>
          <option value="TN">TN - Tennessee</option>
          <option value="TX">TX - Texas</option>
          <option value="UM">UM - United States Minor Outlying Islands</option>
          <option value="UT">UT - Utah</option>
          <option value="VT">VT - Vermont</option>
          <option value="VI">VI - Virgin Islands</option>
          <option value="VA">VA - Virginia</option>
          <option value="WA">WA - Washington</option>
          <option value="WV">WV - West Virginia</option>
          <option value="WI">WI - Wisconsin</option>
          <option value="WY">WY - Wyoming</option>
          <option value="AA">AA - Armed Forces Americas</option>
          <option value="AE">AE - Armed Forces Africa</option>
          <option value="AE">AE - Armed Forces Canada</option>
          <option value="AE">AE - Armed Forces Europe</option>
          <option value="AE">AE - Armed Forces Middle East</option>
          <option value="AP">AP - Armed Forces Pacific</option>
        </select>
        <label class="usa-label" for="form-zip">ZIP code</label>
        <input
          class="usa-input usa-input--medium"
          id="form-zip"
          name="zip"
          pattern="[\\d]{5}(-[\\d]{4})?"
        />
      </fieldset>

      <!-- Input Prefix — Annual Income -->
      <div class="usa-form-group margin-bottom-4">
        <label class="usa-label" for="form-income">Annual household income</label>
        <div class="usa-input-group">
          <div class="usa-input-prefix" aria-hidden="true">
            <svg aria-hidden="true" role="img" focusable="false" class="usa-icon">
              <use href="assets/img/sprite.svg#attach_money"></use>
            </svg>
          </div>
          <input
            id="form-income"
            class="usa-input"
            pattern="[0-9]*"
            inputmode="numeric"
          />
        </div>
      </div>

      <!-- Input Suffix — Weight -->
      <div class="usa-form-group margin-bottom-4">
        <label class="usa-label" for="form-weight">Shipment weight</label>
        <div class="usa-input-group usa-input-group--sm">
          <input
            id="form-weight"
            class="usa-input"
            pattern="[0-9]*"
            inputmode="numeric"
          />
          <div class="usa-input-suffix" aria-hidden="true">lbs.</div>
        </div>
      </div>

      <!-- Combo Box — Preferred Language -->
      <div class="usa-form-group margin-bottom-4">
        <label class="usa-label" for="form-language">Preferred language</label>
        <div class="usa-hint" id="form-language-hint">
          Start typing to filter options
        </div>
        <div class="usa-combo-box" aria-describedby="form-language-hint">
          <select class="usa-select" name="language" id="form-language">
            <option value>Select a language</option>
            <option value="arabic">Arabic</option>
            <option value="bengali">Bengali</option>
            <option value="chinese-cantonese">Chinese (Cantonese)</option>
            <option value="chinese-mandarin">Chinese (Mandarin)</option>
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="gujarati">Gujarati</option>
            <option value="haitian-creole">Haitian Creole</option>
            <option value="hindi">Hindi</option>
            <option value="italian">Italian</option>
            <option value="japanese">Japanese</option>
            <option value="korean">Korean</option>
            <option value="navajo">Navajo</option>
            <option value="persian">Persian</option>
            <option value="polish">Polish</option>
            <option value="portuguese">Portuguese</option>
            <option value="russian">Russian</option>
            <option value="somali">Somali</option>
            <option value="spanish">Spanish</option>
            <option value="tagalog">Tagalog</option>
            <option value="thai">Thai</option>
            <option value="urdu">Urdu</option>
            <option value="vietnamese">Vietnamese</option>
          </select>
        </div>
      </div>

      <!-- Range Slider — Satisfaction -->
      <div class="usa-form-group">
        <label class="usa-label" for="form-satisfaction">
          Overall satisfaction with this process
        </label>
        <div class="usa-hint" id="form-satisfaction-hint">
          1 = very dissatisfied, 100 = very satisfied
        </div>
        <input
          id="form-satisfaction"
          class="usa-range"
          type="range"
          min="1"
          max="100"
          step="1"
          value="50"
          aria-describedby="form-satisfaction-hint"
        />
      </div>

    </form>
  </section>
`;

const step4 = `
  <section class="margin-bottom-6">
    ${stepIndicator(4)}
    <form class="usa-form usa-form--large">

      <!-- File Input — Single -->
      <div class="usa-form-group margin-bottom-4">
        <label class="usa-label" for="form-file-single">
          Upload a supporting document
        </label>
        <span class="usa-hint" id="form-file-single-hint">
          Select a PDF or image file
        </span>
        <input
          id="form-file-single"
          class="usa-file-input"
          type="file"
          name="file-single"
          aria-describedby="form-file-single-hint"
          accept=".pdf,.jpg,.png"
        />
      </div>

      <!-- File Input — Multiple with specific types -->
      <div class="usa-form-group margin-bottom-4">
        <label class="usa-label" for="form-file-multiple">
          Upload additional documentation
        </label>
        <span class="usa-hint" id="form-file-multiple-hint">
          Select one or more PDF or TXT files
        </span>
        <input
          id="form-file-multiple"
          class="usa-file-input"
          type="file"
          name="file-multiple"
          aria-describedby="form-file-multiple-hint"
          accept=".pdf,.txt"
          multiple="multiple"
        />
      </div>

      <!-- File Input — Error state -->
      <div class="usa-form-group usa-form-group--error margin-bottom-4">
        <label class="usa-label usa-label--error" for="form-file-error">
          Upload certification letter
        </label>
        <span class="usa-hint" id="form-file-error-hint">
          Select any valid file
        </span>
        <span class="usa-error-message" id="form-file-error-message">
          This file is too large. Please select a file under 10 MB.
        </span>
        <input
          id="form-file-error"
          class="usa-file-input"
          type="file"
          name="file-error"
          aria-invalid="true"
          aria-describedby="form-file-error-hint form-file-error-message"
        />
      </div>

      <!-- Certification Checkboxes -->
      <fieldset class="usa-fieldset margin-bottom-4">
        <legend class="usa-legend usa-legend--large">Certification</legend>
        <div class="usa-checkbox">
          <input class="usa-checkbox__input" id="form-cert-accurate" type="checkbox"
            name="certification" value="accurate" required />
          <label class="usa-checkbox__label" for="form-cert-accurate">
            I certify that the information provided in this form is accurate
            and complete to the best of my knowledge.
          </label>
        </div>
        <div class="usa-checkbox">
          <input class="usa-checkbox__input" id="form-cert-terms" type="checkbox"
            name="certification" value="terms" required />
          <label class="usa-checkbox__label" for="form-cert-terms">
            I agree to the terms and conditions of this application.
          </label>
        </div>
      </fieldset>

      <!-- Additional Comments (plain textarea, no char count) -->
      <div class="usa-form-group margin-bottom-4">
        <label class="usa-label" for="form-comments">
          Additional comments
        </label>
        <span class="usa-hint" id="form-comments-hint">Optional</span>
        <textarea
          class="usa-textarea"
          id="form-comments"
          name="comments"
          rows="5"
          aria-describedby="form-comments-hint"
        ></textarea>
      </div>

      <!-- Submit -->
      <button type="button" class="usa-button usa-button--big">
        Submit application
      </button>

    </form>
  </section>
`;

const errorStates = `
  <section class="margin-bottom-6">
    <h2 class="margin-bottom-2">Error states</h2>
    <p class="usa-intro margin-top-0">
      The following shows how USWDS form error patterns render under the
      HDS Core theme. In a real application, these states would be triggered
      by validation on submit.
    </p>

    <div class="usa-alert usa-alert--error margin-bottom-4" role="alert">
      <div class="usa-alert__body">
        <h3 class="usa-alert__heading">Your form has errors</h3>
        <div class="usa-alert__text">
          <p>Please correct the following before continuing:</p>
          <ul class="usa-list">
            <li>
              <a href="#form-err-name" class="usa-link">
                First or given name is required
              </a>
            </li>
            <li>
              <a href="#form-err-dob-month" class="usa-link">
                Date of birth must include a valid month
              </a>
            </li>
            <li>
              <a href="#form-err-email" class="usa-link">
                Enter a valid email address
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <form class="usa-form usa-form--large">

      <!-- Text input error -->
      <div class="usa-form-group usa-form-group--error margin-bottom-4">
        <label class="usa-label usa-label--error" for="form-err-name">
          First or given name
        </label>
        <span class="usa-hint" id="form-err-name-hint">
          For example, Jose, Darren, or Mai
        </span>
        <span class="usa-error-message" id="form-err-name-message">
          This field is required
        </span>
        <input
          class="usa-input usa-input--error usa-input--xl"
          id="form-err-name"
          name="err-name"
          aria-invalid="true"
          aria-describedby="form-err-name-hint form-err-name-message"
        />
      </div>

      <!-- Memorable date error -->
      <fieldset class="usa-fieldset margin-bottom-4">
        <legend class="usa-legend">Date of birth</legend>
        <span class="usa-hint" id="form-err-dob-hint">
          For example: January 19 2000
        </span>
        <span class="usa-error-message" id="form-err-dob-message">
          Date of birth must include a valid month
        </span>
        <div class="usa-memorable-date">
          <div class="usa-form-group usa-form-group--month usa-form-group--select usa-form-group--error">
            <label class="usa-label usa-label--error" for="form-err-dob-month">Month</label>
            <select class="usa-select usa-input--error" id="form-err-dob-month" name="err-dob-month" aria-invalid="true" aria-describedby="form-err-dob-hint form-err-dob-message">
              <option value>- Select -</option>
              <option value="1">01 - January</option>
              <option value="2">02 - February</option>
              <option value="3">03 - March</option>
              <option value="4">04 - April</option>
              <option value="5">05 - May</option>
              <option value="6">06 - June</option>
              <option value="7">07 - July</option>
              <option value="8">08 - August</option>
              <option value="9">09 - September</option>
              <option value="10">10 - October</option>
              <option value="11">11 - November</option>
              <option value="12">12 - December</option>
            </select>
          </div>
          <div class="usa-form-group usa-form-group--day">
            <label class="usa-label" for="form-err-dob-day">Day</label>
            <input
              class="usa-input"
              id="form-err-dob-day"
              name="err-dob-day"
              maxlength="2"
              pattern="[0-9]*"
              inputmode="numeric"
              value="19"
            />
          </div>
          <div class="usa-form-group usa-form-group--year">
            <label class="usa-label" for="form-err-dob-year">Year</label>
            <input
              class="usa-input"
              id="form-err-dob-year"
              name="err-dob-year"
              minlength="4"
              maxlength="4"
              pattern="[0-9]*"
              inputmode="numeric"
              value="2000"
            />
          </div>
        </div>
      </fieldset>

      <!-- Email input error -->
      <div class="usa-form-group usa-form-group--error">
        <label class="usa-label usa-label--error" for="form-err-email">
          Email address
        </label>
        <span class="usa-error-message" id="form-err-email-message">
          Enter a valid email address
        </span>
        <input
          class="usa-input usa-input--error"
          id="form-err-email"
          name="err-email"
          type="email"
          value="not-an-email"
          aria-invalid="true"
          aria-describedby="form-err-email-message"
        />
      </div>

    </form>
  </section>
`;

// ============================================================
// Final story export
// ============================================================

const page = `
  ${siteAlert}
  <main id="main-content">
    <div class="grid-container usa-section">
      <h1>USWDS Multi-Step Form</h1>
      ${beforeYouStart}
      ${step1}
      ${step2}
      ${step3}
      ${step4}
      ${errorStates}
    </div>
  </main>
  ${sexModal}
`;

export const FormTemplates = {
  name: 'Multi-Step Form',
  render: () => page,
};
