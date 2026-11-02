
# Changelog — Prime Pele Website

This file documents changes and improvements made to the
Prime Pele | Mobile Waxing website throughout the project.

## Part 3 — Corrections Based on Part 2 Feedback

### HTML Structure
- Added the `navbar` class to the navigation elements in
  `index.html`, `about.html`, and `services.html`.
- Standardised call-to-action buttons to use the `btn` class.
- Improved HTML indentation and code readability.
- Added `aria-current="page"` to the active navigation links
  on the About and Services pages.

### CSS and Responsive Design
- Added styling for the previously undefined `intro` class.
- Added styling for the previously undefined `eyebrow` class.
- Added styling for the `services-preview` section.
- Added reusable text-link styling.
- Changed navigation hover and active-link colours from
  pale pink to dark pink to improve readability.
- Improved keyboard focus indicators for navigation,
  buttons, links, and form controls.
- Added support for reduced-motion preferences.
- Retained the existing responsive breakpoints for
  tablets and smaller mobile screens.

  ### JavaScript Enhancements

- Implemented an interactive FAQ accordion.
- Added JavaScript to close other FAQ answers when a new one opens.
- Implemented a gallery lightbox using the HTML dialog element.
- Added image enlargement, captions and close controls.
- Added keyboard accessibility using the Escape key.
- Tested the FAQ accordion and gallery lightbox in the browser.
- Added real-time service search using JavaScript.
- Implemented service filtering by price range.
- Added DOM manipulation to show and hide service cards.
- Added a dynamic results counter and no-results message.
- Tested search and price filters on the Services page.
- Updated the general contact form with client-side validation.
- Added validation for name, email, subject and message.
- Implemented email preparation using a mailto link.
- Configured cptbeautyccn@gmail.com as the contact recipient.
- Added a status message explaining the manual email sending process.
- Created a dedicated appointment enquiry page.
- Implemented dynamic service price display using JavaScript.
- Added validation for required fields and preferred appointment dates.
- Prevented past dates from being selected.
- Implemented appointment email preparation using mailto.
- Clarified that appointment requests require availability confirmation.
- Embedded an interactive OpenStreetMap showing Cape Town.
- Added a responsive map section to the Contact page.
- Clarified that the map represents the general mobile service area.

### Testing
- Tested the updated Home, About, and Services pages
  in the browser.
- Checked navigation, buttons, section layouts, and
  responsive presentation.
- Confirmed that the updated stylesheet displays
  correctly during local testing.

 ## Part 2 — CSS and Responsive Design

- Created the main `css/style.css` stylesheet.
- Added a CSS reset and reusable colour variables.
- Styled the navigation, hero sections, buttons,
  service cards, forms, and footer.
- Implemented responsive layouts using media queries
  at 768px and 480px.
- Used CSS Grid for the service cards and contact layout.
- Added hover transitions and consistent typography.

## Part 1 — Initial Website Structure

- Created the initial multi-page website structure.
- Added pages for Home, About, Services, Gallery,
  Testimonials, FAQ, and Contact.
- Added initial website content and navigation links.
