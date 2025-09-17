// src/App.jsx
import { useMemo } from "react";

export default function App() {
  // 👉 Renseigne tes infos ici
  const contact = {
    fullName: "Prénom Nom",
    org: "Entreprise / Poste",
    email: "prenom.nom@email.com",
    phone: "+33 6 12 34 56 78",
    website: "https://www.votre-site.com",
    linkedin: "https://www.linkedin.com/in/votre-profil/",
    address: {
      street: "12 Rue Exemple",
      city: "Paris",
      region: "Île-de-France",
      postalCode: "75000",
      country: "France",
    },
    note: "Carte de visite numérique",
  };

  // vCard
  const vcardText = useMemo(() => {
    const { fullName, org, email, phone, website, linkedin, address, note } = contact;
    const escape = (s = "") => String(s).replace(/\n/g, "\\n");
    return [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${escape(fullName)};;;;`,
      `FN:${escape(fullName)}`,
      org ? `ORG:${escape(org)}` : null,
      email ? `EMAIL;TYPE=INTERNET:${escape(email)}` : null,
      phone ? `TEL;TYPE=CELL:${escape(phone)}` : null,
      website ? `URL:${escape(website)}` : null,
      linkedin ? `item1.URL:${escape(linkedin)}` : null,
      address
        ? `ADR;TYPE=WORK:;;${escape(address.street)};${escape(address.city)};${escape(
            address.region
          )};${escape(address.postalCode)};${escape(address.country)}`
        : null,
      note ? `NOTE:${escape(note)}` : null,
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n");
  }, [contact]);

  const vcardDataUrl = useMemo(() => {
    const blob = new Blob([vcardText], { type: "text/vcard;charset=utf-8" });
    return URL.createObjectURL(blob);
  }, [vcardText]);

  const mailto = `mailto:${encodeURIComponent(contact.email)}`;
  const tel = `tel:${contact.phone.replace(/\s+/g, "")}`;
  const sms = `sms:${contact.phone.replace(/\s+/g, "")}`;
  const whatsapp = `https://wa.me/${contact.phone.replace(/\D/g, "")}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl shadow-lg bg-white p-6 space-y-5">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">{contact.fullName}</h1>
          {contact.org && <p className="text-gray-600">{contact.org}</p>}
        </header>

        <section className="space-y-2 text-sm">
          {contact.email && (
            <p>
              <span className="font-medium">Email :</span>{" "}
              <a className="text-blue-600 underline" href={mailto}>
                {contact.email}
              </a>
            </p>
          )}
          {contact.phone && (
            <p>
              <span className="font-medium">Téléphone :</span>{" "}
              <a className="text-blue-600 underline" href={tel}>
                {contact.phone}
              </a>
            </p>
          )}
          {contact.website && (
            <p>
              <span className="font-medium">Site :</span>{" "}
              <a className="text-blue-600 underline" href={contact.website} target="_blank" rel="noreferrer">
                {contact.website}
              </a>
            </p>
          )}
          {contact.linkedin && (
            <p>
              <span className="font-medium">LinkedIn :</span>{" "}
              <a className="text-blue-600 underline" href={contact.linkedin} target="_blank" rel="noreferrer">
                Profil
              </a>
            </p>
          )}
        </section>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={vcardDataUrl}
            download={`${contact.fullName.replace(/\s+/g, "_")}.vcf`}
            className="inline-flex items-center justify-center rounded-xl border px-3 py-2 hover:bg-gray-50"
          >
            ➕ Ajouter le contact
          </a>
          <a href={mailto} className="inline-flex items-center justify-center rounded-xl border px-3 py-2 hover:bg-gray-50">
            ✉️ Email
          </a>
          <a href={tel} className="inline-flex items-center justify-center rounded-xl border px-3 py-2 hover:bg-gray-50">
            📞 Appeler
          </a>
          <a href={sms} className="inline-flex items-center justify-center rounded-xl border px-3 py-2 hover:bg-gray-50">
            💬 SMS
          </a>
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border px-3 py-2 hover:bg-gray-50"
          >
            🟢 WhatsApp
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border px-3 py-2 hover:bg-gray-50"
          >
            in LinkedIn
          </a>
          <a
            href={contact.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border px-3 py-2 hover:bg-gray-50"
          >
            🌐 Site web
          </a>
        </div>
      </div>

      {/* Styles fallback si Tailwind n'est pas installé */}
      <style>{`
        .min-h-screen{min-height:100vh}
        .bg-gray-50{background:#f9fafb}
        .bg-white{background:#fff}
        .text-gray-900{color:#111827}
        .text-gray-600{color:#4b5563}
        .rounded-2xl{border-radius:1rem}
        .rounded-xl{border-radius:.75rem}
        .shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)}
        .p-6{padding:1.5rem}
        .px-3{padding-left:.75rem;padding-right:.75rem}
        .py-2{padding-top:.5rem;padding-bottom:.5rem}
        .space-y-5 > * + *{margin-top:1.25rem}
        .space-y-2 > * + *{margin-top:.5rem}
        .font-semibold{font-weight:600}
        .font-medium{font-weight:500}
        .text-2xl{font-size:1.5rem;line-height:2rem}
        .text-sm{font-size:.875rem;line-height:1.25rem}
        .w-full{width:100%}
        .max-w-md{max-width:28rem}
        .flex{display:flex}
        .items-center{align-items:center}
        .justify-center{justify-content:center}
        .grid{display:grid}
        .grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
        .gap-3{gap:.75rem}
        .hover\\:bg-gray-50:hover{background:#f9fafb}
        .border{border:1px solid #e5e7eb}
        .underline{text-decoration:underline}
      `}</style>
    </div>
  );
}
