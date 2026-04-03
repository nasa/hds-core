// ============================================================
// Site Alert — Stories
// @nasa/hds-core
// ============================================================
// NAMING: HDS Figma calls this "Banner." HDS Core uses
// "Site Alert" to match the USWDS component and avoid
// confusion with the USWDS Banner (government compliance bar).
//
// CSS: components/_site-alert.scss
// USWDS: https://designsystem.digital.gov/components/site-alert/
//
// Sidebar structure:
//   Guidance   — SiteAlert.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — Emergency (default), Info (visible in sidebar)
// ============================================================

export default {
  title: 'Components/Site Alert',
};

// --- Helpers (used in multiple stories) ---

const siteAlert = ({
  variant = 'emergency',
  heading = '',
  text = '',
  slim = false,
  noIcon = false,
  noHeading = false,
} = {}) => {
  const classes = [
    'usa-site-alert',
    `usa-site-alert--${variant}`,
    slim && 'usa-site-alert--slim',
    noIcon && 'usa-site-alert--no-icon',
    !slim && noHeading && 'usa-site-alert--no-heading',
  ]
    .filter(Boolean)
    .join(' ');

  const showHeading = heading && !slim && !noHeading;

  return `<section class="${classes}" aria-label="Site alert">
  <div class="usa-alert">
    <div class="usa-alert__body">
      ${showHeading ? `<h4 class="usa-alert__heading">${heading}</h4>` : ''}
      <p class="usa-alert__text">${text}</p>
    </div>
  </div>
</section>`;
};

// Shared argTypes for both sidebar stories
const sharedArgTypes = {
  heading: {
    control: 'text',
    description: 'Alert heading (hidden in slim mode)',
  },
  text: {
    control: 'text',
    description: 'Alert body text — supports inline HTML links',
  },
  slim: {
    control: 'boolean',
    description: 'Slim variant — smaller padding, no heading',
  },
  noIcon: {
    control: 'boolean',
    description: 'Remove the alert icon',
  },
  noHeading: {
    control: 'boolean',
    description: 'Remove the heading (non-slim only)',
  },
};

// --- Stories (visible in sidebar) ---

export const Emergency = {
  name: 'Emergency (default)',
  args: {
    heading: 'Scheduled site maintenance',
    text: 'NASA.gov will be undergoing maintenance on Saturday, March 22 from 10 p.m. to 2 a.m. ET. Some services may be temporarily unavailable.',
    slim: false,
    noIcon: false,
    noHeading: false,
  },
  argTypes: sharedArgTypes,
  render: (args = {}) => {
    const {
      heading = 'Scheduled site maintenance',
      text = 'NASA.gov will be undergoing maintenance on Saturday, March 22 from 10 p.m. to 2 a.m. ET. Some services may be temporarily unavailable.',
      slim = false,
      noIcon = false,
      noHeading = false,
    } = args;
    return siteAlert({ variant: 'emergency', heading, text, slim, noIcon, noHeading });
  },
};

export const Info = {
  args: {
    heading: 'NASA TV live event',
    text: 'The NASA Administrator will hold a media briefing on the Artemis II mission today at 2 p.m. ET. <a class="usa-link" href="#">Watch live on NASA TV</a>.',
    slim: false,
    noIcon: false,
    noHeading: false,
  },
  argTypes: sharedArgTypes,
  render: (args = {}) => {
    const {
      heading = 'NASA TV live event',
      text = 'The NASA Administrator will hold a media briefing on the Artemis II mission today at 2 p.m. ET. <a class="usa-link" href="#">Watch live on NASA TV</a>.',
      slim = false,
      noIcon = false,
      noHeading = false,
    } = args;
    return siteAlert({ variant: 'info', heading, text, slim, noIcon, noHeading });
  },
};

// --- Guidance embeds (MDX only) ---

export const EmergencyWithHeading = {
  tags: ['!dev'],
  render: () =>
    siteAlert({
      variant: 'emergency',
      heading: 'Scheduled site maintenance',
      text: 'NASA.gov will be undergoing maintenance on Saturday, March 22 from 10 p.m. to 2 a.m. ET. Some services may be temporarily unavailable.',
    }),
};

export const EmergencySlim = {
  tags: ['!dev'],
  render: () =>
    siteAlert({
      variant: 'emergency',
      text: 'Due to the lapse in federal government funding, NASA is not updating this website.',
      slim: true,
      noIcon: true,
    }),
};

export const InfoWithHeading = {
  tags: ['!dev'],
  render: () =>
    siteAlert({
      variant: 'info',
      heading: 'NASA TV live event',
      text: 'The NASA Administrator will hold a media briefing on the Artemis II mission today at 2 p.m. ET. <a class="usa-link" href="#">Watch live on NASA TV</a>.',
    }),
};

export const InfoSlim = {
  tags: ['!dev'],
  render: () =>
    siteAlert({
      variant: 'info',
      text: 'Esta página solo está disponible en inglés. <a class="usa-link" href="#">Ir a NASA en español</a>.',
      slim: true,
    }),
};

export const EmergencyNoIcon = {
  tags: ['!dev'],
  render: () =>
    siteAlert({
      variant: 'emergency',
      heading: 'Notice',
      text: 'Due to the lapse in federal government funding, NASA is not updating this website.',
      noIcon: true,
    }),
};

export const InfoNoIcon = {
  tags: ['!dev'],
  render: () =>
    siteAlert({
      variant: 'info',
      heading: 'Informational statement',
      text: 'Additional context and followup information including <a class="usa-link" href="#">a link</a>.',
      noIcon: true,
    }),
};
