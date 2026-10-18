/**
 * Helper to dynamically update browser favicon and tab title
 * across Chrome, Safari, Edge, Firefox, and mobile browsers.
 */

export function applyFavicon(iconUrl) {
  if (!iconUrl) return;

  // Remove all previous icon link tags to force browser to re-fetch
  const existingIcons = document.querySelectorAll("link[rel*='icon']");
  existingIcons.forEach((el) => el.remove());

  // Create standard icon link
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = iconUrl;
  document.head.appendChild(link);

  // Create shortcut icon link
  const shortcut = document.createElement("link");
  shortcut.rel = "shortcut icon";
  shortcut.href = iconUrl;
  document.head.appendChild(shortcut);

  // Create apple touch icon link
  const apple = document.createElement("link");
  apple.rel = "apple-touch-icon";
  apple.href = iconUrl;
  document.head.appendChild(apple);
}

export function applySiteTitle(title, isAdmin = false) {
  if (!title) return;
  document.title = isAdmin ? `${title} — Admin` : title;
}
