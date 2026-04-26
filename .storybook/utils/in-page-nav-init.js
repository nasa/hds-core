// ============================================================
// Ported USWDS inPageNavigation.createInPageNav() logic.
// Storybook-only — works around USWDS JS timing issue where
// DOMContentLoaded fires before story content exists.
//
// NOT shipped to consumers. In production, consumers load
// uswds.min.js which handles initialization natively.
//
// Source: @uswds/uswds/packages/usa-in-page-navigation/src/index.js
// Tested: test-in-page-nav.html (all checks passing)
// ============================================================

const PREFIX = 'usa';
const CURRENT_CLASS = `${PREFIX}-current`;
const IN_PAGE_NAV_CLASS = `${PREFIX}-in-page-nav`;
const IN_PAGE_NAV_ANCHOR_CLASS = `${PREFIX}-anchor`;
const IN_PAGE_NAV_NAV_CLASS = `${IN_PAGE_NAV_CLASS}__nav`;
const IN_PAGE_NAV_LIST_CLASS = `${IN_PAGE_NAV_CLASS}__list`;
const IN_PAGE_NAV_ITEM_CLASS = `${IN_PAGE_NAV_CLASS}__item`;
const IN_PAGE_NAV_PRIMARY_ITEM_CLASS = `${IN_PAGE_NAV_ITEM_CLASS}--primary`;
const IN_PAGE_NAV_LINK_CLASS = `${IN_PAGE_NAV_CLASS}__link`;
const IN_PAGE_NAV_TITLE_CLASS = `${IN_PAGE_NAV_CLASS}__heading`;

const VALID_HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const DEFAULT_HEADING_ELEMENTS = 'h2 h3';
const DEFAULT_TITLE_TEXT = 'On this page';
const DEFAULT_TITLE_HEADING_LEVEL = 'h4';
const DEFAULT_ROOT_MARGIN = '0px 0px 0px 0px';
const DEFAULT_THRESHOLD = '1';
const DEFAULT_CONTENT_SELECTOR = 'main';
const DEFAULT_SCROLL_OFFSET = 0;
const DEFAULT_MIN_HEADINGS = 2;

/**
 * Generate a unique slug ID for a heading element.
 * Matches USWDS getHeadingId() logic exactly.
 */
function getHeadingId(heading) {
  const baseId = heading.textContent
    .toLowerCase()
    .replace(/[^a-z\d]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');

  let id;
  let suffix = 0;
  do {
    suffix += 1;
    id = suffix > 1 ? `${baseId}-${suffix}` : baseId;
  } while (document.getElementById(id));

  return id;
}

/**
 * Return visible headings from a content region.
 * Filters out display:none and visibility:hidden elements.
 */
function getVisibleHeadings(contentSelector, headingTypes) {
  const typesArray = headingTypes.includes(' ') ? headingTypes.split(' ') : [headingTypes];

  typesArray.forEach((type) => {
    if (!VALID_HEADINGS.includes(type)) {
      throw new Error(`initInPageNav: invalid heading type "${type}". Use: ${VALID_HEADINGS.join(', ')}`);
    }
  });

  const contentRegion = document.querySelector(contentSelector);
  if (!contentRegion) {
    console.warn(`initInPageNav: content region "${contentSelector}" not found.`);
    return [];
  }

  return Array.from(contentRegion.querySelectorAll(typesArray.join(','))).filter((heading) => {
    const style = window.getComputedStyle(heading);
    return style.getPropertyValue('display') !== 'none' && style.getPropertyValue('visibility') !== 'hidden';
  });
}

/**
 * IntersectionObserver callback — highlights the current
 * nav link as the user scrolls through content sections.
 */
function setActive(entries) {
  const allLinks = document.querySelectorAll(`.${IN_PAGE_NAV_LINK_CLASS}`);
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 1) {
      allLinks.forEach((link) => link.classList.remove(CURRENT_CLASS));
      const match = document.querySelector(`a[href="#${entry.target.id}"]`);
      if (match) match.classList.add(CURRENT_CLASS);
    }
  });
}

/**
 * Smooth-scroll to a section and update the URL hash.
 */
function scrollToSection(el, scrollOffset) {
  const getOffset = (current) => {
    if (!current.offsetParent) return current.offsetTop;
    return current.offsetTop + getOffset(current.offsetParent);
  };
  window.scroll({
    behavior: 'smooth',
    top: getOffset(el) - scrollOffset,
  });
  if (window.location.hash.slice(1) !== el.id) {
    window.history.pushState(null, '', `#${el.id}`);
  }
}

/**
 * Initialize all .usa-in-page-nav elements within the given root.
 * Idempotent — skips elements that already contain a built nav.
 *
 * @param {HTMLElement|Document} [root=document] Scope to search
 */
export default function initInPageNav(root) {
  const scope = root || document;

  const navElements = scope.querySelectorAll
    ? scope.querySelectorAll(`.${IN_PAGE_NAV_CLASS}`)
    : [scope].filter((el) => el.classList?.contains(IN_PAGE_NAV_CLASS));

  navElements.forEach((inPageNavEl) => {
    // Idempotency: skip if already initialized
    if (inPageNavEl.querySelector(`.${IN_PAGE_NAV_NAV_CLASS}`)) return;

    // Read data attributes (with defaults)
    const titleText = inPageNavEl.dataset.titleText || DEFAULT_TITLE_TEXT;
    const titleHeadingLevel = inPageNavEl.dataset.titleHeadingLevel || DEFAULT_TITLE_HEADING_LEVEL;
    const rootMargin = inPageNavEl.dataset.rootMargin || DEFAULT_ROOT_MARGIN;
    const threshold = inPageNavEl.dataset.threshold || DEFAULT_THRESHOLD;
    const contentSelector = inPageNavEl.dataset.mainContentSelector || DEFAULT_CONTENT_SELECTOR;
    const headingElements = inPageNavEl.dataset.headingElements || DEFAULT_HEADING_ELEMENTS;
    const scrollOffset = Number(inPageNavEl.dataset.scrollOffset) || DEFAULT_SCROLL_OFFSET;
    const minHeadings = Number(inPageNavEl.dataset.minimumHeadingCount) || DEFAULT_MIN_HEADINGS;

    // Get visible headings
    const headings = getVisibleHeadings(contentSelector, headingElements);

    // Check minimum heading count
    const acceptedLevels = headingElements.split(' ').map((h) => h.toLowerCase());
    const validCount = headings.filter((h) => acceptedLevels.includes(h.tagName.toLowerCase())).length;

    if (validCount < minHeadings) {
      console.warn(
        `initInPageNav: only ${validCount} headings found in "${contentSelector}" (minimum: ${minHeadings}). Skipping.`,
      );
      return;
    }

    // Determine top-level heading for primary/sub classification
    const topLevel = headings[0].tagName.toLowerCase();

    // Build <nav>
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', titleText);
    nav.classList.add(IN_PAGE_NAV_NAV_CLASS);

    // Build title heading
    const title = document.createElement(titleHeadingLevel);
    title.classList.add(IN_PAGE_NAV_TITLE_CLASS);
    title.setAttribute('tabindex', '0');
    title.textContent = titleText;
    nav.appendChild(title);

    // Build link list
    const list = document.createElement('ul');
    list.classList.add(IN_PAGE_NAV_LIST_CLASS);
    nav.appendChild(list);

    headings.forEach((heading) => {
      const headingId = getHeadingId(heading);
      const tag = heading.tagName.toLowerCase();

      // Inject anchor into heading (same as USWDS)
      const anchor = document.createElement('a');
      anchor.setAttribute('id', headingId);
      anchor.setAttribute('class', IN_PAGE_NAV_ANCHOR_CLASS);
      heading.insertAdjacentElement('afterbegin', anchor);

      // Create list item + link
      const listItem = document.createElement('li');
      listItem.classList.add(IN_PAGE_NAV_ITEM_CLASS);
      if (tag === topLevel) {
        listItem.classList.add(IN_PAGE_NAV_PRIMARY_ITEM_CLASS);
      }

      const link = document.createElement('a');
      link.setAttribute('href', `#${headingId}`);
      link.setAttribute('class', IN_PAGE_NAV_LINK_CLASS);
      link.textContent = heading.textContent;

      listItem.appendChild(link);
      list.appendChild(listItem);
    });

    inPageNavEl.appendChild(nav);

    // Set up IntersectionObserver for scroll spy
    const observer = new IntersectionObserver(setActive, {
      root: null,
      rootMargin: rootMargin,
      threshold: [Number(threshold)],
    });

    document.querySelectorAll(`.${IN_PAGE_NAV_ANCHOR_CLASS}`).forEach((a) => {
      observer.observe(a);
    });

    // Click handler for smooth scroll
    list.addEventListener('click', (event) => {
      const target = event.target.closest(`.${IN_PAGE_NAV_LINK_CLASS}`);
      if (!target) return;
      event.preventDefault();
      const id = target.getAttribute('href').replace('#', '');
      const anchorEl = document.getElementById(id);
      if (anchorEl) scrollToSection(anchorEl, scrollOffset);
    });
  });
}
