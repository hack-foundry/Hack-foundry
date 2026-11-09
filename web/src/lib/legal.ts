/**
 * PLACEHOLDER legal templates. These are NOT legal advice and must be replaced
 * with documents reviewed by a lawyer for every jurisdiction you sell into.
 */
type Doc = { title: string; sections: { heading: string; body: string }[] };
type DocId = "disclaimer" | "terms" | "privacy";

const en: Record<DocId, Doc> = {
  disclaimer: {
    title: "Medical disclaimer",
    sections: [
      { heading: "Educational purposes only", body: "Rootwell Health programs, coaching, community content and materials are for educational and informational purposes only. They are not medical advice and do not create a doctor–patient relationship." },
      { heading: "Not a substitute for care", body: "Do not stop or change any medication or treatment without speaking to your healthcare provider. Always seek the advice of a qualified provider with any questions about a medical condition." },
      { heading: "Emergencies", body: "If you think you may have a medical emergency, call your local emergency number immediately." },
      { heading: "Clinical services", body: "Where clinical services are offered, they are provided only by clinicians licensed in the customer’s jurisdiction, under separate terms." },
    ],
  },
  terms: {
    title: "Terms of service",
    sections: [
      { heading: "Memberships", body: "Memberships renew automatically each month until cancelled. You may cancel anytime; access continues until the end of the current billing period." },
      { heading: "Programs", body: "Group programs are a one-time purchase. Refund policy: [TO BE DEFINED — check consumer-law cooling-off rules, e.g. 14 days in the EU/UK]." },
      { heading: "Regional pricing", body: "Prices may vary by country. Using tools to misrepresent your location to obtain a lower price may result in cancellation." },
      { heading: "Governing law", body: "[TO BE DEFINED by your lawyer]." },
    ],
  },
  privacy: {
    title: "Privacy policy",
    sections: [
      { heading: "What we collect", body: "Account and contact details, payment information (processed by Stripe — we never see your full card number), and information you choose to share in programs or coaching." },
      { heading: "Health information", body: "We ask you not to share sensitive health information in community spaces. Clinical health data, when collected, is stored only with providers who have signed the required agreements (e.g. HIPAA BAAs, GDPR DPAs)." },
      { heading: "Your rights", body: "Depending on where you live (e.g. GDPR, UK GDPR, CCPA), you may access, correct, export or delete your data. Contact: [privacy@your-domain]." },
      { heading: "Processors", body: "Hosting (Vercel), payments (Stripe), database (Supabase), email: [list every vendor]." },
    ],
  },
};

const es: Record<DocId, Doc> = {
  disclaimer: {
    title: "Aviso médico",
    sections: [
      { heading: "Solo con fines educativos", body: "Los programas, el coaching, la comunidad y los materiales de Rootwell Health tienen fines educativos e informativos. No constituyen consejo médico ni crean una relación médico–paciente." },
      { heading: "No sustituye la atención médica", body: "No suspendas ni cambies ningún medicamento o tratamiento sin hablar con tu profesional de salud." },
      { heading: "Emergencias", body: "Si crees que tienes una emergencia médica, llama de inmediato al número de emergencias local." },
      { heading: "Servicios clínicos", body: "Cuando se ofrezcan servicios clínicos, serán prestados únicamente por profesionales con licencia en la jurisdicción del cliente, bajo términos separados." },
    ],
  },
  terms: {
    title: "Términos del servicio",
    sections: [
      { heading: "Membresías", body: "Las membresías se renuevan automáticamente cada mes hasta que se cancelen. Puedes cancelar en cualquier momento." },
      { heading: "Programas", body: "Los programas grupales son un pago único. Política de reembolso: [POR DEFINIR]." },
      { heading: "Precios regionales", body: "Los precios pueden variar según el país. Falsear tu ubicación para obtener un precio menor puede causar la cancelación." },
      { heading: "Ley aplicable", body: "[POR DEFINIR por tu abogado]." },
    ],
  },
  privacy: {
    title: "Política de privacidad",
    sections: [
      { heading: "Qué recopilamos", body: "Datos de cuenta y contacto, información de pago (procesada por Stripe) y la información que decidas compartir." },
      { heading: "Información de salud", body: "Te pedimos no compartir información de salud sensible en los espacios comunitarios. Los datos clínicos se almacenan solo con proveedores que hayan firmado los acuerdos requeridos." },
      { heading: "Tus derechos", body: "Según dónde vivas, puedes acceder, corregir, exportar o eliminar tus datos. Contacto: [privacy@tu-dominio]." },
      { heading: "Encargados del tratamiento", body: "Alojamiento (Vercel), pagos (Stripe), base de datos (Supabase), correo: [lista de proveedores]." },
    ],
  },
};

export const LEGAL_DOCS = { en, es };

export function isLegalDoc(v: string): v is DocId {
  return v in en;
}
