import Link from "next/link";
import { footerLinks } from "@/lib/navigation";
import { contact } from "@/lib/mock-data";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">ب</div>
            <span className="text-lg font-bold">بدن‌من</span>
          </div>
          <p className="text-sm text-muted-foreground">{contact.address}</p>
          <p className="mt-2 text-sm text-muted-foreground">{contact.phone}</p>
          <p className="mt-1 text-sm text-muted-foreground">{contact.email}</p>
        </div>
        <div>
          <h3 className="mb-3 font-semibold">خدمات</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {footerLinks.services.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-primary">{l.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold">باشگاه</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {footerLinks.company.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-primary">{l.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold">پشتیبانی</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {footerLinks.support.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-primary">{l.title}</Link></li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">{contact.hours}</p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © ۱۴۰۵ بدن‌من — تمامی حقوق محفوظ است
      </div>
    </footer>
  );
}
