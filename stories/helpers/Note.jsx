import React from 'react';

const iconConfig = {
  uswds: { sprite: 'hds-sprite', id: 'logo-uswds' },
  figma: { sprite: 'hds-sprite', id: 'logo-figma' },
  code:  { sprite: 'sprite',     id: 'code' },
};

const labels = {
  uswds: 'Differs from USWDS',
  figma: 'Differs from Figma',
  code:  'How this works',
};

export function Note({ type, children }) {
  const icon = iconConfig[type];
  return (
    <div className="usa-alert usa-alert--info usa-alert--slim usa-alert--no-icon hds-note" role="note">
      <div className="usa-alert__body">
        <div className="usa-alert__text">
          <svg className="hds-icon hds-note__icon" aria-hidden="true" focusable="false">
            <use xlinkHref={`/assets/img/${icon.sprite}.svg#${icon.id}`} />
          </svg>
          <strong>{labels[type]}:</strong> {children}
        </div>
      </div>
    </div>
  );
}