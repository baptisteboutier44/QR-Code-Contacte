// src/App.jsx
import { useMemo } from "react";

export default function App() {
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
    logo: "/logo.svg",
    photo: "/portrait.jpg",
  };

  // Génération vCard
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

  // Liens utiles
  const mailto = contact.email ? `mailto:${encodeURIComponent(contact.email)}` : "#";
  const tel = contact.phone ? `tel:${contact.phone.replace(/\s+/g, "")}` : "#";
  const sms = contact.phone ? `sms:${contact.phone.replace(/\s+/g, "")}` : "#";

  return (
    <div className="page">
      <div className="shell">
        <header className="topbar">
          {contact.logo && <img src={contact.logo} alt="Logo" className="logo" />}
        </header>

        <main className="card">
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

          {/* Infos */}
          <section className="info">
            {contact.email && (
              <p>
                <Icon id="mail" />
                <a href={mailto} className="link">{contact.email}</a>
              </p>
            )}
            {contact.phone && (
              <p>
                <Icon id="phone" />
                <a href={tel} className="link">{contact.phone}</a>
              </p>
            )}
            {contact.website && (
              <p>
                <Icon id="globe" />
                <a href={contact.website} target="_blank" rel="noreferrer" className="link">
                  {contact.website.replace(/^https?:\/\//, "")}
                </a>
              </p>
            )}
            {contact.linkedin && (
              <p>
                <Icon id="in" />
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="link">
                  LinkedIn
                </a>
              </p>
            )}
            {contact.address && (
              <p>
                <Icon id="map" />
                {`${contact.address.city}, ${contact.address.region}`}
              </p>
            )}
          </section>

          {/* Actions */}
          <nav className="actions">
            <a href={vcardDataUrl} download={`${contact.fullName.replace(/\s+/g, "_")}.vcf`} className="btn">
              <Icon id="plus" /> Ajouter le contact
            </a>
            {contact.email && (
              <a href={mailto} className="btn">
                <Icon id="mail" /> Email
              </a>
            )}
            {contact.phone && (
              <a href={tel} className="btn">
                <Icon id="phone" /> Appeler
              </a>
            )}
            {contact.phone && (
              <a href={sms} className="btn">
                <Icon id="sms" /> SMS
              </a>
            )}
          </nav>
        </main>

        <footer className="foot">
          <small>© {new Date().getFullYear()} Alouette — Carte de visite numérique</small>
        </footer>
      </div>

      {/* Styles optimisés */}
      <style>{`
        :root {
        --surface: #0f1217;
  --bg: #0b0d10;
  --gradient-border: linear-gradient(180deg, #ffaf15, #ff228d); /* juste le dégradé */
  --text: #e6e8ec;
  --muted: #a9b0bb;
  --accent: #4fd1e8;
  --accent-2: #6ee7f0;
  --ring: rgba(79, 209, 232, 0.35);
  --border: #1a202a;
  --shadow: 0 10px 25px rgba(0,0,0,.35);
  --radius: 18px;
  --font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial;
}
        .page {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: var(--font);
        }

        .shell {
          max-width: 960px;
          margin: 0 auto;
          padding: clamp(16px, 3vw, 32px);
          display: grid;
          gap: 24px;
        }

        .topbar { display:flex; justify-content:center; }
        .logo { height: 80px; }

        .card {
          border: 2px solid transparent;
          border-radius: 16px;
          background:
            linear-gradient(var(--surface), var(--surface)) padding-box,
            var(--gradient-border) border-box;
          box-shadow: var(--shadow);
          padding: 24px;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .avatar-wrap {
          width: 80px; height: 80px; border-radius: 50%;
          padding: 2px; background: linear-gradient(135deg, var(--accent), transparent 60%);
        }
        .avatar { width:100%; height:100%; border-radius:50%; object-fit:cover; }

        .name { font-size: 1.5rem; margin: 0; }
        .org { color: var(--muted); font-size: 0.9rem; margin: 0; }

        .info {
          display: grid;
          gap: 10px;
          margin-top: 16px;
          border-top: 1px solid var(--border);
          padding-top: 16px;
        }
        .info p {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .link {
          color: var(--text);
          text-decoration: none;
          border-bottom: 1px dashed transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .link:hover { color: var(--accent-2); border-bottom-color: var(--accent-2); }

        .actions {
          display: grid;
          gap: 10px;
          margin-top: 20px;
        }
        @media (min-width: 600px) {
          .actions { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .actions { grid-template-columns: repeat(3, 1fr); }
        }

        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 12px;
          border: 2px solid var(--border); /* stable */
          background: rgba(255,255,255,.03);
          color: var(--text);
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }
        .btn:hover {
  border: 2px solid ;
  border-radius: 12px;

  background:
    linear-gradient(var(--surface, #0f1217), var(--surface, #0f1217)) padding-box,
    var(--gradient-border) border-box; /* ton dégradé ici */
  color: #ffaf15;
  
}

        .foot {
          text-align: center;
          color: var(--muted);
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}

/* Icônes SVG */
function Icon({ id }) {
  const props = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (id) {
    case "plus":  return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "mail":  return <svg {...props}><path d="M4 6h16v12H4z"/><path d="m22 6-10 7L2 6"/></svg>;
    case "phone": return <svg {...props}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.6-3.1 20 20 0 0 1-6-6A20 20 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z"/></svg>;
    case "sms":   return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 11h8M8 15h5"/></svg>;
    case "in":    return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8v8M8 6h.01M12 16v-5a3 3 0 1 1 6 0v5"/></svg>;
    case "globe": return <svg {...props}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>;
    case "map":   return <svg {...props}><path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
    default: return null;
  }
}
