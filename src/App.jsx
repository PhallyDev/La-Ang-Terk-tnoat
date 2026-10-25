import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Facebook,
  Image as ImageIcon,
  MapPin,
  Menu,
  MessageCircle,
  Store,
  X,
} from "lucide-react";
import business from "./config/business.js";

const navigation = [
  { label: "ទំព័រដើម", href: "#home" },
  { label: "ម៉ឺនុយ", href: "#products" },
  { label: "ទីតាំង", href: "#location" },
  { label: "ទំនាក់ទំនង", href: "#contact" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          className="brand"
          href="#home"
          aria-label={`${business.name} — ទំព័រដើម`}
          onClick={() => setIsMenuOpen(false)}
        >
          {business.logo ? (
            <img className="brand-logo" src={business.logo} alt="" />
          ) : (
            <span className="brand-mark" aria-hidden="true">
              <Store size={21} />
            </span>
          )}
          <span className="brand-name">{business.name}</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "បិទម៉ឺនុយ" : "បើកម៉ឺនុយ"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <nav
          className={`navigation${isMenuOpen ? " navigation-open" : ""}`}
          id="main-navigation"
          aria-label="ម៉ឺនុយមេ"
        >
          {navigation.map((item) => (
            <a
              className="navigation-link"
              href={item.href}
              key={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="button button-small navigation-cta"
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
          >
            ទាក់ទងមកយើង
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            
          </span>
          <h1>
            រីករាយស្វាគមន៍
            <br />
            មកកាន់ <span>{business.name}</span>
          </h1>
          <p className="hero-description">{business.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#products">
              មើលម៉ឺនុយ
              <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a
              className={`button button-outline${business.mapsUrl ? "" : " button-disabled"}`}
              href={business.mapsUrl || undefined}
              target={business.mapsUrl ? "_blank" : undefined}
              rel={business.mapsUrl ? "noreferrer" : undefined}
              aria-disabled={!business.mapsUrl}
              title={!business.mapsUrl ? "សូមបន្ថែមតំណផែនទីក្នុងការកំណត់" : undefined}
            >
              មើលទីតាំងហាង
              <MapPin size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-note">
            <span className="note-line" />
            រក្សាទុកដោយក្ដីស្រឡាញ់ ធ្វើជូនដោយចិត្ត
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-art-frame">
            <img
              className="hero-image"
              src={business.heroImage}
              alt="រូបភាពបង្ហាញជំនួស សូមដាក់រូបថតពិតរបស់អាជីវកម្មនៅទីនេះ"
            />
            <div className="hero-image-caption">
              <span className="caption-icon">
                <ImageIcon size={17} aria-hidden="true" />
              </span>
              <span>
                <strong>ពេលវេលាដ៏កក់ក្តៅ</strong>
                <small>បន្ថែមរូបថតហាងរបស់អ្នក</small>
              </span>
            </div>
          </div>
          <span className="decor decor-one" aria-hidden="true" />
          <span className="decor decor-two" aria-hidden="true" />
          <span className="hero-side-note">ធ្វើដោយក្តីស្រឡាញ់</span>
        </div>
      </div>
      <div className="hero-bottom" aria-hidden="true" />
    </section>
  );
}

function ProductGallery({ onSelectProduct }) {
  return (
    <section className="section products-section" id="products">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">ជ្រើសរើសសម្រាប់អ្នក</span>
          <h2>មុខម្ហូប និងផលិតផលរបស់យើង</h2>
          <p>សូមទស្សនារូបថតមុខម្ហូប និងផលិតផលពីហាងយើងខ្ញុំ។</p>
        </div>

        {business.products.length > 0 ? (
          <div className="product-grid">
            {business.products.map((product, index) => (
              <button
                className="product-card"
                key={`${product.image}-${index}`}
                type="button"
                onClick={() => onSelectProduct(index)}
                aria-label={`មើលរូបភាព${product.name || "ផលិតផល"}`}
              >
                <span className="product-image-wrap">
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.alt || product.name || "រូបថតផលិតផល"}
                    loading="lazy"
                  />
                  <span className="product-view">ចុចដើម្បីមើលរូបធំ</span>
                </span>
                {(product.name || product.price) && (
                  <span className="product-details">
                    {product.name && <strong>{product.name}</strong>}
                    {product.price && <span>{product.price}</span>}
                  </span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="gallery-empty">
            <span className="empty-icon">
              <ImageIcon size={26} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3>រូបថតផលិតផលនឹងបង្ហាញនៅទីនេះ</h3>
            <p>
              សូមដាក់រូបថតក្នុងថតរូបភាពរបស់គម្រោង ហើយបន្ថែមទីតាំងរូបថតក្នុងឯកសារព័ត៌មានអាជីវកម្ម។
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="location-section" id="location">
      <div className="container location-card">
        <div className="location-copy">
          <span className="eyebrow">មកជួបយើងខ្ញុំ</span>
          <h2>ទីតាំងហាងរបស់យើង</h2>
          <p>{business.address || "សូមបន្ថែមអាសយដ្ឋានហាងរបស់អ្នកនៅទីនេះ។"}</p>
          <a
            className={`button button-primary${business.mapsUrl ? "" : " button-disabled"}`}
            href={business.mapsUrl || undefined}
            target={business.mapsUrl ? "_blank" : undefined}
            rel={business.mapsUrl ? "noreferrer" : undefined}
            aria-disabled={!business.mapsUrl}
            title={!business.mapsUrl ? "សូមបន្ថែមតំណផែនទីក្នុងការកំណត់" : undefined}
          >
            <MapPin size={17} aria-hidden="true" />
            មើលទីតាំងលើផែនទី
          </a>
        </div>
        <div className="map-illustration" aria-hidden="true">
          <div className="map-road map-road-one" />
          <div className="map-road map-road-two" />
          <span className="map-label map-label-one">ផ្លូវ</span>
          <span className="map-label map-label-two">តំបន់ជិតខាង</span>
          <span className="map-pin">
            <MapPin size={23} fill="currentColor" />
          </span>
          <span className="map-caption">បន្ថែមទីតាំងពិតរបស់អ្នក</span>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contacts = [
    {
      name: "Facebook",
      label: "ទាក់ទងតាម Facebook",
      url: business.facebookUrl,
      icon: Facebook,
      style: "facebook",
    },
    {
      name: "Telegram",
      label: "ទាក់ទងតាម Telegram",
      url: business.telegramUrl,
      icon: MessageCircle,
      style: "telegram",
    },
  ];

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-inner">
        <div className="section-heading">
          <span className="eyebrow">យើងរង់ចាំស្វាគមន៍អ្នក</span>
          <h2>ទាក់ទងមកយើងខ្ញុំ</h2>
          <p>មានចម្ងល់ ឬចង់សួរព័ត៌មានបន្ថែម? សូមទាក់ទងមកយើងខ្ញុំ។</p>
        </div>
        <div className="contact-cards">
          {contacts.map(({ name, label, url, icon: Icon, style }) => (
            <a
              className={`contact-card ${style}${url ? "" : " contact-card-disabled"}`}
              href={url || undefined}
              target={url ? "_blank" : undefined}
              rel={url ? "noreferrer" : undefined}
              aria-disabled={!url}
              title={!url ? `សូមកំណត់តំណ ${name} ក្នុងឯកសារព័ត៌មានអាជីវកម្ម` : undefined}
              key={name}
            >
              <span className="contact-icon">
                <Icon size={24} fill={name === "Facebook" ? "currentColor" : "none"} />
              </span>
              <span className="contact-label">{label}</span>
              <ArrowRight className="contact-arrow" size={18} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#home">
              {business.logo ? (
                <img className="brand-logo" src={business.logo} alt="" />
              ) : (
                <span className="brand-mark" aria-hidden="true">
                  <Store size={21} />
                </span>
              )}
              <span className="brand-name">{business.name}</span>
            </a>
            <p>ដោយក្តីស្រឡាញ់ពីគ្រួសារយើងខ្ញុំជូនដល់អ្នក។</p>
          </div>
          <nav className="footer-nav" aria-label="តំណភ្ជាប់បាតទំព័រ">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="footer-external">
            <a
              href={business.facebookUrl || undefined}
              target={business.facebookUrl ? "_blank" : undefined}
              rel={business.facebookUrl ? "noreferrer" : undefined}
              aria-disabled={!business.facebookUrl}
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={business.telegramUrl || undefined}
              target={business.telegramUrl ? "_blank" : undefined}
              rel={business.telegramUrl ? "noreferrer" : undefined}
              aria-disabled={!business.telegramUrl}
              aria-label="Telegram"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href={business.mapsUrl || undefined}
              target={business.mapsUrl ? "_blank" : undefined}
              rel={business.mapsUrl ? "noreferrer" : undefined}
              aria-disabled={!business.mapsUrl}
              aria-label="Google Maps"
            >
              <MapPin size={18} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {business.name}។ រក្សាសិទ្ធិគ្រប់យ៉ាង។</span>
          <a href="#home">ត្រឡប់ទៅផ្នែកខាងលើ ↑</a>
        </div>
      </div>
    </footer>
  );
}

function Lightbox({ products, activeIndex, onClose, onChange }) {
  const closeButtonRef = useRef(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousFocus = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onChange(-1);
      if (event.key === "ArrowRight") onChange(1);
      if (event.key === "Tab") {
        const dialog = closeButtonRef.current?.closest('[role="dialog"]');
        const focusableElements = dialog?.querySelectorAll("button");
        if (!focusableElements?.length) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.classList.add("lightbox-open");
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onChange, onClose]);

  if (!isOpen) return null;

  const product = products[activeIndex];

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="មើលរូបភាពផលិតផល"
      onClick={onClose}
    >
      <button
        className="lightbox-close"
        type="button"
        aria-label="បិទរូបភាព"
        ref={closeButtonRef}
        onClick={onClose}
      >
        <X size={25} />
      </button>
      {products.length > 1 && (
        <>
          <button
            className="lightbox-arrow lightbox-previous"
            type="button"
            aria-label="រូបភាពមុន"
            onClick={(event) => {
              event.stopPropagation();
              onChange(-1);
            }}
          >
            <ArrowLeft size={23} />
          </button>
          <button
            className="lightbox-arrow lightbox-next"
            type="button"
            aria-label="រូបភាពបន្ទាប់"
            onClick={(event) => {
              event.stopPropagation();
              onChange(1);
            }}
          >
            <ArrowRight size={23} />
          </button>
        </>
      )}
      <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}>
        <img
          className="lightbox-image"
          src={product.image}
          alt={product.alt || product.name || "រូបថតផលិតផល"}
        />
        {(product.name || product.price) && (
          <figcaption className="lightbox-caption">
            {product.name}
            {product.price && <span>{product.price}</span>}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

export default function App() {
  const [activeProduct, setActiveProduct] = useState(null);

  const closeLightbox = useCallback(() => setActiveProduct(null), []);
  const changeProduct = useCallback((offset) => {
    setActiveProduct((current) =>
      (current + offset + business.products.length) % business.products.length,
    );
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductGallery onSelectProduct={setActiveProduct} />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
      <Lightbox
        products={business.products}
        activeIndex={activeProduct}
        onClose={closeLightbox}
        onChange={changeProduct}
      />
    </>
  );
}
