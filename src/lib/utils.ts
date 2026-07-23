export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatPhone(phone: string) {
  return phone.replace(/\s/g, '');
}

export function whatsappUrl(phone: string, message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${formatPhone(phone)}?text=${encoded}`;
}
