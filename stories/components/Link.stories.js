export default {
  title: 'Components/Link',
};

export const Default = {
  render: () => `
    <p>
      This is <a class="usa-link" href="#">a text link</a> on the
      current palette.
    </p>
  `,
};

export const ExternalLink = {
  name: 'External Link',
  render: () => `
    <p>
      This is an
      <a class="usa-link usa-link--external" href="https://flickr.com/nasa"
         rel="noreferrer">external link</a>.
    </p>
    <p>
      This links to a NASA subdomain and suppresses the arrow:
      <a class="usa-link usa-link--external hds-link--internal"
         href="https://science.nasa.gov/"
         rel="noreferrer">science.nasa.gov</a>.
    </p>
  `,
};

export const MixedUsage = {
  name: 'Mixed Usage',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <h2>
        <a class="usa-link usa-link--external" href="https://example.com"
           rel="noreferrer">Heading with external link</a>
      </h2>

      <h4>
        <a class="usa-link" href="#">Heading with internal link</a>
      </h4>

      <p>
        As NASA advances its plans to explore the Moon under its
        <a class="usa-link" href="#">Artemis program</a>, the two will
        discuss areas of collaboration that include support for
        <a class="usa-link" href="#">human spaceflight</a>, emerging
        space transportation, and
        <a class="usa-link usa-link--external"
           href="https://science.nasa.gov/"
           rel="noreferrer">scientific research</a>.
      </p>

      <p style="max-width: 320px;">
        On narrow viewports, this longer link wraps to multiple lines:
        <a class="usa-link usa-link--external" href="https://example.com"
           rel="noreferrer">a multi-line external link that demonstrates
        the underline following across line breaks</a>.
      </p>
    </div>
  `,
};