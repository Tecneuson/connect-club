import { Phone, MapPin, Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Logo } from "@/components/brand";
import { InstagramIcon, YoutubeIcon } from "@/components/social-icons";
import { brand, nav } from "@/lib/content";

const socialIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
};

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/65">
              Estúdio de treino assistido. Aqui, cada sessão é conduzida por um personal — do
              primeiro dia à tua melhor versão.
            </p>
            <div className="mt-6 flex gap-3">
              {brand.social.map((s) => {
                const Icon = socialIcons[s.icon] ?? InstagramIcon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Rodapé">
            <h3 className="font-display text-sm uppercase tracking-wide text-gold-300">Navegação</h3>
            <ul className="mt-4 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-cream/70 transition-colors hover:text-cream">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm uppercase tracking-wide text-gold-300">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold" />
                {brand.address}
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-none text-gold" />
                <a href={`mailto:${brand.email}`} className="hover:text-cream">
                  {brand.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-gold" />
                <a href={`tel:${brand.phone}`} className="hover:text-cream">
                  {brand.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/12 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Connect Club. Todos os direitos reservados.</p>
          <p>NIPC 000 000 000 · Feito com dedicação pela Thuart</p>
        </div>
      </div>
    </footer>
  );
}
