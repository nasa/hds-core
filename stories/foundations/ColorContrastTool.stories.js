import { hdsColors } from '../helpers/hdsColors';

export default {
  title: 'Foundations/Color Contrast Tool',
  argTypes: {
    foreground: {
      options: Object.keys(hdsColors),
      mapping: hdsColors,
      control: { type: 'select' },
      type: { name: 'string', required: true },
      description: 'Select a foreground text color',
    },
    background: {
      options: Object.keys(hdsColors),
      mapping: hdsColors,
      control: { type: 'select' },
      type: { name: 'string', required: true },
      description: 'Select a background color',
    },
  },
};

function getLuminance(hex) {
  if (!hex || typeof hex !== 'string') return 0;
  // Handle 3-character hex codes (e.g., #fff -> #ffffff)
  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let a = [r, g, b].map(function (v) {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(color1, color2) {
  let lum1 = getLuminance(color1);
  let lum2 = getLuminance(color2);
  let brightest = Math.max(lum1, lum2);
  let darkest = Math.min(lum1, lum2);
  let ratio = (brightest + 0.05) / (darkest + 0.05);
  // Truncate to 2 decimal places per WCAG 2.1 spec
  return Math.floor(ratio * 100) / 100;
}

function getWCAGLevel(ratio) {
  if (isNaN(ratio)) return '❌ Fail';
  if (ratio >= 7) return '💎 AAA';
  if (ratio >= 4.5) return '✅ AA';
  if (ratio >= 3) return '⚠️ AA Large';
  return '❌ Fail';
}

export const Checker = {
  tags: ['!dev'],
  args: {
    foreground: 'carbon-90',
    background: 'spacesuit-white',
  },
  render: ({ foreground, background }) => {
    // If Storybook passes the key instead of the mapped value (e.g. on initial load or string input), look it up
    const fgHex = hdsColors[foreground] || foreground || '#17171b';
    const bgHex = hdsColors[background] || background || '#ffffff';

    const ratio = getContrastRatio(fgHex, bgHex);
    const level = getWCAGLevel(ratio);

    return `
      <div style="font-family: var(--hds-font-family-body, sans-serif); display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: stretch;">
        <div style="flex: 1 1 400px; background-color: ${bgHex}; color: ${fgHex}; padding: 2.5rem; border-radius: 8px; border: 1px solid #d1d1d1; display: flex; flex-direction: column; justify-content: center;">
          <div style="display: flex; gap: 1.5rem; align-items: flex-start; justify-content: space-between;">
            <div style="flex: 1;">
              <h2 style="margin: 0 0 1rem 0; font-family: var(--hds-font-family-heading, sans-serif); font-size: 1.5rem;">
                Sample Heading
              </h2>
              <p style="margin: 0; font-size: 1rem; line-height: 1.6;">
                This is sample body text to demonstrate the visual contrast between the selected foreground and background colors. Accessibility guidelines recommend different ratios depending on the size and weight of the text.
              </p>
            </div>
            <div style="font-size: 4.5rem; font-weight: bold; line-height: 1;">
              Aa
            </div>
          </div>
        </div>

        <div style="flex: 0 1 320px; padding: 2.5rem; background-color: #f6f6f6; border-radius: 8px; border: 1px solid #e3e3e3; display: flex; flex-direction: column; justify-content: center;">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.125rem; color: #17171b;">Contrast Result</h3>
          <div style="font-size: 3rem; font-weight: bold; margin-bottom: 0.25rem; color: #17171b; line-height: 1;">
            ${ratio.toFixed(2)}:1
          </div>
          <div style="font-size: 1.5rem; font-weight: 500; margin-bottom: 1rem; color: #17171b;">
            ${level}
          </div>
          ${
            level === '⚠️ AA Large' || level === '❌ Fail'
              ? `
          <div style="margin-top: auto;">
            <p style="margin: 0; font-size: 0.875rem; color: #58585b; line-height: 1.4;">
              <strong>Note:</strong> "AA Large" requires a ratio of at least 3:1 and applies only to text that is ≥18pt, or ≥14pt and bold.
            </p>
          </div>
          `
              : ''
          }
        </div>
      </div>
    `;
  },
};
