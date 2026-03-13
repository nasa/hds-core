export default {
  title: 'Elements/Link',
};

export const Default = {
  render: () => `
    <p>
      This is <a class="usa-link" href="#">a text link</a> on the current palette.
    </p>
  `,
};

export const ExternalLink = {
  name: 'External Link',
  render: () => `
    <p>
      This is an <a class="usa-link usa-link--external" href="https://flickr.com/nasa" rel="noreferrer">external link</a>.
    </p>
  `,
};

export const InlineInParagraph = {
  name: 'Inline in Paragraph',
  render: () => `
    <p>
      As NASA advances its plans to explore the Moon under its 
      <a class="usa-link" href="#">Artemis program</a>, the two will discuss 
      areas of collaboration that include support for 
      <a class="usa-link" href="#">human spaceflight</a>, emerging space 
      transportation, and 
      <a class="usa-link usa-link--external" href="https://science.nasa.gov/" rel="noreferrer">scientific research</a>.
    </p>
  `,
};

export const BareVsStyled = {
  name: '🔬 Bare vs Styled',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <strong>Bare &lt;a&gt; (browser default):</strong><br>
        <a href="#">bare link</a> |
        <a href="https://example.com">bare external</a>
      </div>
      <div>
        <strong>.usa-link (HDS styled):</strong><br>
        <a class="usa-link" href="#">styled link</a> |
        <a class="usa-link usa-link--external" href="https://example.com">styled external</a>
      </div>
    </div>
  `,
};