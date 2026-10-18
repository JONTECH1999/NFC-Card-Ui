# Digital Calling Card Project Documentation

## Project overview

This project is a mobile-friendly digital business card for sharing a business's
contact details, services, work samples, and social pages. It also includes a
gallery of 12 sample card layouts so a visitor can preview designs and open a
full layout.

The current card is the Jontech example. For a new client, replace the sample
business content and images with information the client approves for public
display.

## Project goals

- Give a business one easy-to-share online calling card.
- Let customers call, message, email, find, and follow the business.
- Showcase services and examples of completed work.
- Make the card usable on mobile and installable where supported.
- Provide layout previews that do not interfere with scrolling the gallery.

## Current features

- **Business card:** profile, business details, service highlights, and contact
  links.
- **Direct actions:** call, text, email, location, and social links as
  configured in the card.
- **QR code:** generates a QR code for the current card URL.
- **Share:** uses the device share dialog where available, with a copy-link
  fallback.
- **Install support:** provides an install prompt or browser-specific install
  instructions where supported.
- **Theme toggle:** switches between light and dark themes and remembers the
  preference in local storage.
- **Design gallery:** `/shop` displays 12 mini previews, each with a “View
  layout” link to open its full example.
- **Progressive Web App support:** includes a web manifest, icons, and service
  worker registration.

## Technology and project structure

- **React 18** renders the card and gallery.
- **Vite** serves the development app and builds the site.
- **qrcode.react** renders the QR code.
- **Firebase Hosting** serves the production build from `dist`.

| Path | Purpose |
| --- | --- |
| `src/App.jsx` | Card content, links, QR/share/install interactions, and gallery |
| `src/style.css` | Card, gallery, theme, and responsive styles |
| `src/main.jsx` | React entry point and service worker registration |
| `index.html` | Main card page |
| `index1.html`–`index12.html` | Standalone sample layout pages |
| `public/` | Static images, app icons, manifest, and service worker |
| `vite.config.js` | Configures Vite to build all 13 HTML entry points |
| `firebase.json` | Firebase Hosting configuration; build output is `dist` |

The project is static and has no server-side database or client-management
system. Business details and service content are currently maintained in the
source code.

## Development and deployment

Install dependencies and start the local development server:

```sh
npm install
npm run dev
```

Create and preview a production build:

```sh
npm run build
npm run preview
```

Deploy the Hosting build to the intended Firebase project:

```sh
npx firebase-tools deploy --only hosting --project digital-callingcard
```

The Firebase project must be explicitly supplied: the repository's `.firebaserc`
default project may differ from the `digital-callingcard` project that owns the
`calling-card` Hosting site. Confirm the project and site before deploying.

## Client discovery and content checklist

Collect only information the client wants published. Public page URLs are
enough; do not ask for social account passwords.

### Business identity

- Owner or primary contact name, if they want it shown
- Business name and preferred spelling/capitalization
- Business role/title, if useful
- Short business introduction
- Logo, if available
- Preferred colors, style, or examples of cards they like

### Contact and location

- Public business phone number
- WhatsApp, Viber, or other preferred messaging number
- Business email address
- Shop address, only if customers can visit
- Service area, if work is provided at customer locations
- Preferred contact method and business hours, if they want these displayed

### Sofa and upholstery services

Ask which services they actually offer. Examples to confirm:

- Custom sofa or couch design and creation
- Reupholstery, including fabric or leather replacement
- Sofa repair and restoration
- Frame or structural repair
- Foam, cushion, or padding replacement
- Recliner or other furniture repair
- Pickup, delivery, or on-site assessment

Ask for a brief description of any specialist service and the areas served.
Do not list a service unless the client confirms they provide it.

### Work samples and online pages

- Website URL
- Facebook business page
- Instagram, TikTok, YouTube, or other relevant social pages
- A small selection of finished-work photos
- Before-and-after photos, if available
- Customer testimonials, only with the customer's permission

Confirm the client has permission to publish each photo, logo, testimonial, and
other supplied asset.

### Desired customer action

Agree on the main action the card should encourage:

- Call or message for an estimate
- Request a quote
- Send photos of furniture for an initial assessment
- View the work portfolio
- Visit the showroom or workshop
- Follow a social page

The final card should make the chosen action easy to find.

## Copy-and-send client questionnaire

> Hi! To prepare your digital calling card, please send the details you want
> customers to see:
>
> 1. Your business name and the name/title you want displayed
> 2. A short introduction to your business
> 3. The phone number, messaging number, and email you want customers to use
> 4. Your shop address or the areas you serve
> 5. The sofa or furniture services you offer
> 6. Your website and public social-media page links
> 7. Your logo and a few photos of your work (before-and-after photos are
>    welcome)
> 8. The main action you want customers to take, such as calling, messaging, or
>    requesting a quote
> 9. Any information or photos you do not want displayed
>
> Please send page links, not account passwords. Make sure you have permission
> to share any photos, logos, or testimonials you provide. I’ll confirm the
> finished details with you before publishing.

## Privacy and approval

- Do not request passwords, government ID numbers, payment details, or other
  sensitive personal information for a calling card.
- Avoid publishing a home address; use a public shop address or service area
  only when approved.
- Get the client's approval for all public-facing contact details, service
  claims, links, and assets before launch.
- Keep a clear distinction between the card's public business details and
  private project communications.

## Client delivery checklist

- [ ] Client has approved the business name, description, and services.
- [ ] Phone, messaging, email, address/service area, and links have been tested.
- [ ] Photos and logo are approved for public use.
- [ ] Primary customer action is clear and works on mobile.
- [ ] QR code points to the final public card URL.
- [ ] Card and gallery have been checked on a phone-sized screen.
- [ ] Client has reviewed the live card and approved publication.
