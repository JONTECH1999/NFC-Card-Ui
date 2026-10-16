import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const profile = {
  name: "Aljon Alonzo",
  business: "Jontech",
  role: "Website & Digital Business Associate",
  phone: "0951 364 4817",
  phoneLink: "+639513644817",
  email: "aljonrisasalonzo@gmail.com",
  address:
    "Brgy. 185, North B12, L9 Manggahan Road, Barangay 185, Caloocan, Metro Manila",
  facebook: "https://www.facebook.com/aljon11onsi/",
  youtube: "https://www.youtube.com/@aljonalonzo2195",
};

const actions = [
  {
    label: "Call",
    icon: "fa-solid fa-phone",
    href: `tel:${profile.phoneLink}`,
    ariaLabel: `Call ${profile.name} at ${profile.phone}`,
  },
  {
    label: "Email",
    icon: "fa-regular fa-envelope",
    href: `mailto:${profile.email}`,
    ariaLabel: `Email ${profile.name}`,
  },
  {
    label: "Text",
    icon: "fa-regular fa-comment-dots",
    href: `sms:${profile.phoneLink}`,
    ariaLabel: `Text ${profile.name}`,
  },
  {
    label: "Location",
    icon: "fa-solid fa-location-dot",
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.address)}`,
    ariaLabel: `Find ${profile.business} at ${profile.address}`,
    external: true,
  },
  {
    label: "Facebook",
    icon: "fa-brands fa-facebook-f",
    href: profile.facebook,
    ariaLabel: `${profile.business} on Facebook`,
    external: true,
    social: true,
  },
  {
    label: "YouTube",
    icon: "fa-brands fa-youtube",
    href: profile.youtube,
    ariaLabel: `${profile.business} on YouTube`,
    external: true,
    social: true,
  },
];

const products = [
  {
    name: "Website Design & Development",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=720&q=85",
    alt: "Brand identity colors and design materials",
  },
  {
    name: "Digital Business Cards",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=720&q=85",
    alt: "Social media campaign displayed on a phone",
  },
  {
    name: "Small Business Websites",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=720&q=85",
    alt: "Team planning a marketing strategy together",
  },
  {
    name: "Online Store Setup",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=720&q=85",
    alt: "Website analytics and design on a laptop",
  },
  {
    name: "Website Maintenance & Support",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=720&q=85",
    alt: "Camera prepared for professional content creation",
  },
];

const demoLayouts = Array.from({ length: 12 }, (_, index) => {
  const number = index + 1;

  return {
    number,
    href: `/index${number}.html`,
  };
});

function LayoutGallery() {
  return (
    <main className="shop-placeholder">
      <header className="layout-gallery-header">
        <a className="layout-gallery-back" href="/">
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          <span>Back to business card</span>
        </a>
        <p className="layout-gallery-eyebrow">Jontech design collection</p>
        <h1>Choose your digital card design</h1>
        <p className="layout-gallery-description">
          Browse the mini previews, then select View layout to open a complete
          card.
        </p>
      </header>

      <section className="layout-gallery-grid" aria-label="Available layouts">
        {demoLayouts.map(({ number, href }) => (
          <article className="layout-preview-card" key={number}>
            <div className="layout-preview-frame">
              <iframe
                src={href}
                title={`Preview of layout ${number}`}
                loading="lazy"
                scrolling="no"
                tabIndex={-1}
              />
            </div>
            <div className="layout-preview-details">
              <div>
                <p className="layout-preview-label">DESIGN {number.toString().padStart(2, "0")}</p>
                <h2>Layout {number}</h2>
              </div>
              <a
                className="layout-preview-link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                View layout
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function ActionLink({ action }) {
  return (
    <a
      className="action"
      href={action.href}
      aria-label={action.ariaLabel}
      {...(action.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <i className={action.icon} aria-hidden="true" />
      <span>{action.label}</span>
    </a>
  );
}

function getInstallGuide() {
  const userAgent = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

  if (isIOS) {
    return {
      browser: "On iPhone or iPad",
      steps: [
        "Open this page in Safari.",
        "Tap the Share button.",
        "Choose Add to Home Screen, then tap Add.",
      ],
    };
  }

  if (isAndroid) {
    return {
      browser: "On Android",
      steps: [
        "Open this page in Chrome or your preferred browser.",
        "Open the browser menu (⋮).",
        "Choose Install app or Add to Home screen, then confirm.",
      ],
    };
  }

  if (isSafari) {
    return {
      browser: "In Safari on Mac",
      steps: [
        "Open the File menu.",
        "Choose Add to Dock.",
        "Confirm to add Jontech to your Dock and apps.",
      ],
    };
  }

  return {
    browser: "On this computer",
    steps: [
      "Open this page in Chrome or Microsoft Edge.",
      "Select the install icon in the address bar, or open the browser menu.",
      "Choose Install page as app or Install Jontech, then confirm.",
    ],
  };
}

function App() {
  const [introPhase, setIntroPhase] = useState("loading");
  const [tapRipple, setTapRipple] = useState(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [installHelpOpen, setInstallHelpOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [installPrompt, setInstallPrompt] = useState(null);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("nfc_card_theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const toastTimer = useRef(null);
  const rippleTimer = useRef(null);
  const pageRef = useRef(null);
  const qrButton = useRef(null);
  const closeButton = useRef(null);
  const installButton = useRef(null);
  const installCloseButton = useRef(null);
  const installHelpWasOpen = useRef(false);

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute(
        "content",
        theme === "light" ? "#f6f1e8" : "#0b1120"
      );
    }
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    try {
      localStorage.setItem("nfc_card_theme", nextTheme);
    } catch (e) {
      console.error("Could not save theme preference:", e);
    }
    document.documentElement.setAttribute("data-theme", nextTheme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute(
        "content",
        nextTheme === "light" ? "#f6f1e8" : "#0b1120"
      );
    }
  }

  useEffect(() => {
    if (pageRef.current) pageRef.current.inert = introPhase !== "done";
  }, [introPhase]);

  useEffect(() => {
    function handleInstallAvailable(event) {
      event.preventDefault();
      setInstallPrompt(event);
    }

    function handleAppInstalled() {
      setInstallPrompt(null);
      setInstallHelpOpen(false);
      showToast("Jontech was added to your apps.");
    }

    window.addEventListener("beforeinstallprompt", handleInstallAvailable);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallAvailable);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const revealDelay = reducedMotion ? 80 : 1550;
    const exitDelay = reducedMotion ? 0 : 650;
    const revealTimer = window.setTimeout(
      () => setIntroPhase("exiting"),
      revealDelay,
    );
    const finishTimer = window.setTimeout(
      () => setIntroPhase("done"),
      revealDelay + exitDelay,
    );

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
      window.clearTimeout(toastTimer.current);
      window.clearTimeout(rippleTimer.current);
    };
  }, []);

  useEffect(() => {
    if (qrOpen) closeButton.current?.focus();
  }, [qrOpen]);

  useEffect(() => {
    if (installHelpOpen) {
      installHelpWasOpen.current = true;
      installCloseButton.current?.focus();
    } else if (installHelpWasOpen.current) {
      installHelpWasOpen.current = false;
      installButton.current?.focus();
    }
  }, [installHelpOpen]);

  const installGuide = getInstallGuide();

  function showToast(message) {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 3200);
  }

  function closeQR() {
    setQrOpen(false);
    window.requestAnimationFrame(() => qrButton.current?.focus());
  }

  function closeInstallHelp() {
    setInstallHelpOpen(false);
  }

  function animateCardTap(event) {
    if (
      event.target instanceof Element &&
      event.target.closest("a, button")
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const ripple = {
      id: Date.now(),
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
    setTapRipple(ripple);
    window.clearTimeout(rippleTimer.current);
    rippleTimer.current = window.setTimeout(() => setTapRipple(null), 850);
  }

  async function shareCard() {
    const shareData = {
      title: `${profile.name} | ${profile.business}`,
      text: `Connect with ${profile.name}, ${profile.role} at ${profile.business}.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Business card link copied.");
      } else {
        const input = document.createElement("textarea");
        input.value = window.location.href;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        if (!copied) throw new Error("The browser did not copy the link.");
        showToast("Business card link copied.");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Unable to share business card:", error);
        showToast(
          "Unable to share the link. Please copy it from your browser address bar.",
        );
      }
    }
  }

  async function installCard() {
    const isInstalled =
      window.matchMedia("(display-mode: standalone)").matches ||
      navigator.standalone === true;

    if (isInstalled) {
      showToast("Jontech is already open as an app.");
      return;
    }

    if (installPrompt) {
      try {
        await installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        setInstallPrompt(null);
        if (outcome === "accepted") {
          showToast("Jontech was added to your apps.");
        } else {
          setInstallHelpOpen(true);
        }
      } catch (error) {
        console.error("Unable to install Jontech:", error);
        setInstallHelpOpen(true);
      }
      return;
    }

    setInstallHelpOpen(true);
  }

  useEffect(() => {
    if (!qrOpen && !installHelpOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        if (installHelpOpen) closeInstallHelp();
        else closeQR();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [qrOpen, installHelpOpen]);

  if (window.location.pathname.replace(/\/+$/, "") === "/shop") {
    return <LayoutGallery />;
  }

  return (
    <>
      {introPhase !== "done" && (
        <div
          className={`intro-screen${introPhase === "exiting" ? " is-exiting" : ""}`}
          role="status"
          aria-live="polite"
          aria-label="Preparing your introduction"
        >
          <div className="intro-content">
            <div className="intro-emblem">
              <span className="intro-orbit intro-orbit-one" />
              <span className="intro-orbit intro-orbit-two" />
              <span className="intro-emblem-core">
                <img src="/aljon-profile.jfif" alt="" />
              </span>
            </div>
            <p className="intro-eyebrow">Your digital growth partner</p>
            <h1 className="intro-brand">{profile.name}</h1>
            <p className="intro-role">{profile.role}</p>
            <div className="intro-loader" role="presentation">
              <span />
            </div>
            <p className="intro-caption">
              <span className="intro-loading-dot" aria-hidden="true" />
              Preparing your digital card
            </p>
          </div>
        </div>
      )}

      <main
        ref={pageRef}
        className="page"
        aria-hidden={introPhase !== "done"}
      >
        <article
          className={`business-card${introPhase === "loading" ? " is-loading" : " is-entering"}${tapRipple ? " is-tapped" : ""}`}
          aria-labelledby="person-name"
          onClick={animateCardTap}
        >
          {tapRipple && (
            <>
              <span
                key={`sweep-${tapRipple.id}`}
                className="card-light-sweep"
                aria-hidden="true"
              />
              <span
                key={`ripple-${tapRipple.id}`}
                className="card-ripple"
                style={{ left: tapRipple.x, top: tapRipple.y }}
                aria-hidden="true"
              />
            </>
          )}
          <header className="app-status-bar" aria-label="Device status">
            <span className="status-brand">{profile.business}</span>
            <button
              className="status-theme-button"
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "light"
                  ? "Switch to dark theme"
                  : "Switch to light theme"
              }
              title="Change color theme"
            >
              <i
                className={
                  theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"
                }
                aria-hidden="true"
              />
            </button>
          </header>

          <section className="profile-panel" aria-label="Business owner profile">
            <div className="profile-halo" aria-hidden="true" />
            <div className="profile-avatar-frame">
              <img
                className="profile-photo"
                src="/aljon-profile.jfif"
                alt={`Portrait of ${profile.name}`}
                onError={(event) => {
                  event.currentTarget.hidden = true;
                }}
              />
            </div>
            <div className="profile-copy">
              <p className="eyebrow">Your digital growth partner</p>
              <h1 id="person-name">{profile.name}</h1>
              <span className="profile-divider" aria-hidden="true" />
              <p className="role">{profile.role}</p>
              <div className="company-name">
                <i className="fa-solid fa-arrow-trend-up" aria-hidden="true" />
                <span>{profile.business}</span>
              </div>
            </div>
          </section>

          <section className="details-panel" aria-labelledby="about-heading">
            <section className="connect-section" aria-labelledby="about-heading">
              <p className="section-kicker">Digital business card</p>
              <h2 id="about-heading">Connect with {profile.name}</h2>
              <nav className="action-grid" aria-label="Contact and profile actions">
                {actions.map((action) => (
                  <ActionLink action={action} key={action.label} />
                ))}
                <button
                  className="action"
                  ref={installButton}
                  type="button"
                  aria-label="Install Jontech"
                  onClick={installCard}
                >
                  <i className="fa-solid fa-download" aria-hidden="true" />
                  <span>Install</span>
                </button>
                <button
                  className="action"
                  ref={qrButton}
                  type="button"
                  aria-label="Show QR code for this business card"
                  onClick={() => setQrOpen(true)}
                >
                  <i className="fa-solid fa-qrcode" aria-hidden="true" />
                  <span>QR Code</span>
                </button>
              </nav>
            </section>

            <section className="showcase-frame" aria-labelledby="showcase-heading">
              <div className="showcase-image">
                <img
                  src={products[0].image}
                  alt={products[0].alt}
                  loading="lazy"
                />
                <span>Website &amp; digital services</span>
              </div>
              <h2 id="showcase-heading">About {profile.name.split(" ")[0]}</h2>
              <p className="description">
                {profile.business} helps individuals and small businesses build
                their online presence with professional websites, digital
                business cards, and practical digital support.
              </p>
              <div className="contact-list" aria-label="Direct contact details">
                <a href={`tel:${profile.phoneLink}`}>
                  <i className="fa-solid fa-phone" aria-hidden="true" />
                  <span><small>Direct call</small>{profile.phone}</span>
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                </a>
                <a href={`mailto:${profile.email}`}>
                  <i className="fa-regular fa-envelope" aria-hidden="true" />
                  <span><small>Email</small>{profile.email}</span>
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-location-dot" aria-hidden="true" />
                  <span><small>Business location</small>{profile.address}</span>
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                </a>
              </div>
            </section>

            <section className="product-section" aria-labelledby="products-heading">
              <div className="product-heading">
                <div>
                  <p className="product-kicker">What we do</p>
                  <h2 id="products-heading">Featured services</h2>
                </div>
                <span className="sample-label">SAMPLE</span>
              </div>
              <div className="products-grid">
                {products.map((product) => (
                  <article className="product-card" key={product.name}>
                    <h3>{product.name}</h3>
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.alt}
                      loading="lazy"
                    />
                  </article>
                ))}
              </div>
            </section>
          </section>

          <nav className="bottom-nav" aria-label="Card actions">
            <button
              className="bottom-nav-icon"
              type="button"
              aria-label="Share this business card"
              onClick={shareCard}
            >
              <i className="fa-solid fa-arrow-up-from-bracket" aria-hidden="true" />
            </button>
            <a
              className="contact-button"
              href="/shop"
              aria-label="Visit the shop"
            >
              <span>Visit Shop</span>
              <span className="contact-button-icon">
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
              </span>
            </a>
          </nav>
        </article>
      </main>

      {installHelpOpen && (
        <div
          className="modal"
          role="presentation"
          onKeyDown={(event) => {
            if (event.key === "Escape") closeInstallHelp();
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeInstallHelp();
          }}
        >
          <section
            className="modal-card install-guide"
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-title"
          >
            <button
              className="modal-close"
              ref={installCloseButton}
              type="button"
              aria-label="Close install instructions"
              onClick={closeInstallHelp}
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
            <div className="install-guide-icon" aria-hidden="true">
              <i className="fa-solid fa-mobile-screen-button" />
            </div>
            <h2 id="install-title">Install Jontech</h2>
            <p>
              Add this digital card to your device to open it from your home
              screen or apps without the browser address bar.
            </p>
            <h3>{installGuide.browser}</h3>
            <ol>
              {installGuide.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <button
              className="install-guide-done"
              type="button"
              onClick={closeInstallHelp}
            >
              Got it
            </button>
          </section>
        </div>
      )}

      {qrOpen && (
        <div
          className="modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeQR();
          }}
        >
          <section
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-title"
          >
            <button
              className="modal-close"
              ref={closeButton}
              type="button"
              aria-label="Close QR code"
              onClick={closeQR}
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
            <h2 id="qr-title">Scan to connect</h2>
            <p>Point your camera at the code to open {profile.business}&apos;s digital card.</p>
            <div className="qr-frame">
              <QRCodeSVG
                value={window.location.href}
                size={148}
                fgColor={theme === "light" ? "#4a3319" : "#163c83"}
                level="H"
                includeMargin
              />
            </div>
          </section>
        </div>
      )}

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </>
  );
}

export default App;
