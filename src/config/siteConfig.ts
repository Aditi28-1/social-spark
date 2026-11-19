export interface SiteContactConfig {
  email: string;
  isEmailConfigured: boolean;
  whatsappNumber: string;
  isWhatsappConfigured: boolean;
  instagramUrl: string;
  instagramHandle: string;
  isInstagramConfigured: boolean;
  enquiryEndpoint: string;
  isBackendConfigured: boolean;
  location: string;
}

const rawEmail = (import.meta.env.VITE_CONTACT_EMAIL as string | undefined)?.trim() || '';
const rawWhatsapp = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.trim() || '';
const rawInstagram = (import.meta.env.VITE_INSTAGRAM_URL as string | undefined)?.trim() || '';
const rawEndpoint = (import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined)?.trim() || '';

const normalizedWhatsapp = rawWhatsapp.replace(/[^\d]/g, '');

function deriveInstagramHandle(url: string): string {
  if (!url) return '@socialspark.dehradun (placeholder)';
  try {
    const parsed = new URL(url);
    const segment = parsed.pathname.split('/').filter(Boolean)[0];
    return segment ? `@${segment}` : '@socialspark.dehradun';
  } catch {
    return url.startsWith('@') ? url : `@${url}`;
  }
}

export const siteConfig: SiteContactConfig = {
  email: rawEmail || 'hello@socialspark-placeholder.example',
  isEmailConfigured: Boolean(rawEmail),
  whatsappNumber: normalizedWhatsapp,
  isWhatsappConfigured: normalizedWhatsapp.length >= 10,
  instagramUrl: rawInstagram,
  instagramHandle: deriveInstagramHandle(rawInstagram),
  isInstagramConfigured: Boolean(rawInstagram),
  enquiryEndpoint: rawEndpoint,
  isBackendConfigured: Boolean(rawEndpoint),
  location: 'Dehradun, Uttarakhand, India',
};

export function buildWhatsappHref(prefillMessage: string): string | null {
  if (!siteConfig.isWhatsappConfigured) return null;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(prefillMessage)}`;
}
