// src/App.jsx
import { useMemo } from "react";

export default function App() {
  // ───────────────────── À PERSONNALISER ─────────────────────
  const contact = {
    fullName: "Bruno Gerard",
    org: "Alouette / CEO Co-fondateur",
    email: "bruno.gerard@alouette.ai",
    phone: "+33 06 87 50 53 51",
    website: "https://www.alouette.ai/",
    linkedin: "https://www.linkedin.com/in/bruno-gerard-entrepreneur/",
    address: {
      city: "Paris - Niort",
      region: "Île-de-France",
      postalCode: "79000",
      country: "France",
    },
    note: "Carte de visite numérique",
    // Chemins des médias (met les fichiers dans /public)
    logo: "/logo.svg",        // ex: /public/logo.svg
    photo: "/portrait.jpg",   // ex: /public/portrait.jpg
  };
  // ────────────────────────────────────────────────────────────

  // vCard (compat iOS/Android/Outlook)
  const vcardText = useMemo(() => {
    const { fullName, org, email, phone, website, linkedin, address, note } = contact;
    const esc = (s = "") => String(s).replace(/\n/g, "\\n");
    return [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${esc(fullName)};;;;`,
      `FN:${esc(fullName)}`,
      org ? `ORG:${esc(org)}` : null,
      email ? `EMAIL;TYPE=INTERNET:${esc(email)}` : null,
      phone ? `TEL;TYPE=CELL:${esc(phone)}` : null,
      website ? `URL:${esc(website)}` : null,
      linkedin ? `item1.URL:${esc(linkedin)}` : null,
      address
        ? `ADR;TYPE=WORK:;;${esc(address.street || "")};${esc(address.city || "")};${esc(
            address.region || ""
          )};${esc(address.postalCode || "")};${esc(address.country || "")}`
        : null,
      note ? `NOTE:${esc(note)}` : null,
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n");
  }, [contact]);

  const vcardDataUrl = useMemo(() => {
    const blob = new Blob([vcardText], { type: "text/vcard;charset=utf-8" });
    return URL.createObjectURL(blob);
  }, [vcardText]);

  // Liens
  const mailto = contact.email ? `mailto:${encodeURIComponent(contact.email)}` : "#";
  const tel = contact.phone ? `tel:${contact.phone.replace(/\s+/g, "")}` : "#";
  const sms = contact.phone ? `sms:${contact.phone.replace(/\s+/g, "")}` : "#";
  const whatsapp = contact.phone ? `https://wa.me/${contact.phone.replace(/\D/g, "")}` : "#";

  return (
    <div className="page">
      <div className="shell">
        <header className="topbar" aria-label="Header">
          {contact.logo && <img src={contact.logo} alt="Logo" className="logo" />}
        </header>

        <main className="card" role="main">
          <div className="card-header">
            <div className="avatar-wrap">
              {contact.photo && (
                <img src={contact.photo} alt={contact.fullName} className="avatar" loading="lazy" />
              )}
            </div>
            <div className="title">
              <h1 className="name">{contact.fullName}</h1>
              {contact.org && <p className="org">{contact.org}</p>}
            </div>
          </div>

          <section className="info">
            {contact.email && (
              <p>
                <span className="label">Email</span>
                <a href={mailto} className="link" aria-label="Envoyer un email">
                  {contact.email}
                </a>
              </p>
            )}
            {contact.phone && (
              <p>
                <span className="label">Téléphone</span>
                <a href={tel} className="link" aria-label="Appeler">
                  {contact.phone}
                </a>
              </p>
            )}
            {contact.website && (
              <p>
                <span className="label">Site</span>
                <a href={contact.website} target="_blank" rel="noreferrer" className="link">
                  {contact.website.replace(/^https?:\/\//, "")}
                </a>
              </p>
            )}
            {contact.linkedin && (
              <p>
                <span className="label">LinkedIn</span>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="link">
                  Profil
                </a>
              </p>
            )}
          </section>

          <nav className="actions" aria-label="Actions rapides">
            <a href={vcardDataUrl} download={`${contact.fullName.replace(/\s+/g, "_")}.vcf`} className="btn">
              <Icon id="plus" /> Ajouter le contact
            </a>
            {contact.email && (
              <a href={mailto} className="btn" aria-label="Email">
                <Icon id="mail" /> Email
              </a>
            )}
            {contact.phone && (
              <a href={tel} className="btn" aria-label="Appeler">
                <Icon id="phone" /> Appeler
              </a>
            )}
            {contact.phone && (
              <a href={sms} className="btn" aria-label="SMS">
                <Icon id="sms" /> SMS
              </a>
            )}
            {contact.phone && (
              <a href={whatsapp} className="btn" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <Icon id="whatsapp" /> WhatsApp
              </a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} className="btn" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Icon id="in" /> LinkedIn
              </a>
            )}
            {contact.website && (
              <a href={contact.website} className="btn" target="_blank" rel="noreferrer" aria-label="Site web">
                <Icon id="globe" /> Site web
              </a>
            )}
          </nav>
        </main>

        <footer className="foot">
          <small>© {new Date().getFullYear()} Alouette — Carte de visite numérique</small>
        </footer>
      </div>

      {/* ─────────── Styles (univers sombre + accent bleu/teal) ─────────── */}
      <style>{`
        :root{
          /* Palette proche d'alouette.ai (ajuste si besoin) */
          --bg: #0b0d10;           /* fond global très sombre */
          --surface: #0f1217;      /* carte */
          --text: #e6e8ec;         /* texte principal */
          --muted: #a9b0bb;        /* texte secondaire */
          --accent: #4fd1e8;       /* bleu/teal lumineux pour CTA */
          --accent-2: #6ee7f0;     /* variante claire (hover) */
          --ring: rgba(79, 209, 232, 0.35);
          --border: #1a202a;       /* bordures discrètes */
          --shadow: 0 10px 25px rgba(0,0,0,.35);
          --radius: 18px;

          /* Typo moderne */
          --font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
        }

        /* Page */
        .page{
          min-height:100vh;
          background: radial-gradient(1200px 600px at 20% -10%, rgba(79,209,232,.12), transparent 60%),
                      radial-gradient(900px 500px at 80% 110%, rgba(110,231,240,.08), transparent 65%),
                      var(--bg);
          color: var(--text);
          font-family: var(--font);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .shell{
          max-width: 980px;
          margin: 0 auto;
          padding: clamp(16px, 3vw, 32px);
          display: grid;
          gap: clamp(16px, 2.5vw, 24px);
        }

        /* Header simple */
        .topbar{
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .logo{ height: 100px; opacity:.95; filter: drop-shadow(0 1px 0 rgba(255,255,255,.05)); }

      .card{
  /* vraie bordure transparente + coins arrondis */
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden; /* pour que tout suive les coins */

  /* 2 calques :
     1) fond de la carte (padding-box)
     2) dégradé pour la bordure (border-box) */
  background:
    linear-gradient(var(--surface, #0f1217), var(--surface, #0f1217)) padding-box,
    linear-gradient(180deg, #ffaf15, #ff228d) border-box;

  box-shadow: var(--shadow, 0 10px 25px rgba(0,0,0,.35));
  padding: clamp(18px, 3.5vw, 28px);
  backdrop-filter: blur(2px);
}
        .card-header{
          display:grid;
          grid-template-columns: auto 1fr;
          gap: 16px;
          align-items:center;
          margin-bottom: 10px;
        }

        .avatar-wrap{
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), transparent 60%);
          padding: 2px;
        }
        .avatar{
          width:100%; height:100%; border-radius:50%;
          object-fit: cover; display:block;
          background:#fff;
        }

        .title{min-width:0}
        .name{
          font-size: clamp(22px, 3.2vw, 28px);
          line-height: 1.15;
          margin: 0 0 4px;
          letter-spacing: 0.2px;
        }
        .org{
          margin:0;
          color: var(--muted);
          font-size: clamp(14px, 2.2vw, 15px);
        }

        /* Infos */
        .info{
          display:grid;
          gap: 8px 16px;
          grid-template-columns: 1fr;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }
        .info p{margin:0; display:flex; gap:10px; align-items:center; flex-wrap: wrap;}
        .label{color:var(--muted); min-width:84px; font-size: 13px;}
        .link{
          color: var(--text);
          text-underline-offset: 3px;
          border-bottom: 1px dashed transparent;
          transition: border-color .2s ease, color .2s ease;
        }
        .link:hover{ color: var(--accent-2); border-bottom-color: var(--accent-2); }

        /* Actions */
        .actions{
          display:grid;
          gap: 10px;
          grid-template-columns: 1fr 1fr;
          margin-top: 18px;
        }
        @media (min-width: 560px){
          .actions{ grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 900px){
          .actions{ grid-template-columns: repeat(4, 1fr); }
        }

        .btn{
          display:inline-flex; align-items:center; justify-content:center;
          gap: 8px;
          padding: 12px 12px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,0));
          color: var(--text);
          text-decoration: none;
          font-size: 14px;
          transition: transform .06s ease, box-shadow .2s ease, border-color .2s ease, color .2s ease;
          will-change: transform;
        }
        .btn:hover {
  border: 2px solid transparent;
  border-radius: 12px;

  /* 1) fond du bouton (transparent ou ton fond normal)
     2) dégradé appliqué à la bordure */
  background:
    linear-gradient(var(--surface, #0f1217), var(--surface, #0f1217)) padding-box,
    linear-gradient(180deg, #ffaf15, #ff228d) border-box;

  box-shadow: 0 0 0 2px rgba(79, 209, 232, 0.35);
  color: #ffaf15;
}

        /* Accessibilité / Responsive typographique */
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }

        /* Adaptations layout tablette/desktop */
        @media (min-width: 860px){
          .card-header{ grid-template-columns: 84px 1fr; gap: 18px; }
          .avatar-wrap{ width:84px; height:84px; }
        }
      `}</style>
    </div>
  );
}

/* Icônes SVG minimalistes (inline, pas de dépendances) */
function Icon({ id }) {
  const props = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  switch (id) {
    case "plus":    return (<svg {...props}><path d="M12 5v14M5 12h14"/></svg>);
    case "mail":    return (<svg {...props}><path d="M4 6h16v12H4z"/><path d="m22 6-10 7L2 6"/></svg>);
    case "phone":   return (<svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.89.31 1.76.57 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.09a2 2 0 0 1 2.11-.45c.84.26 1.71.45 2.6.57A2 2 0 0 1 22 16.92z"/></svg>);
    case "sms":     return (<svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 11h8M8 15h5"/></svg>);
    case "whatsapp":return (<svg {...props}><path d="M20 11.5a8.5 8.5 0 1 1-15 5l-1.5 4 4-1.5a8.5 8.5 0 0 1 12.5-7.5z"/><path d="M9 9c.5 2 2.5 4 4.5 4.5L15 12l2 2"/></svg>);
    case "in":      return (<svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8v8M8 6h.01M12 16v-5a3 3 0 1 1 6 0v5"/></svg>);
    case "globe":   return (<svg {...props}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>);
    default:        return null;
  }
}
