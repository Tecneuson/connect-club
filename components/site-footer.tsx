import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { Logo } from "@/components/brand";
import { ButtonLink } from "@/components/ui/button";
import { brand, nav, bookingHref } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer id="contacto" className="bg-ink text-cream">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-5 font-display text-lg text-gold-300">{brand.slogan}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/65">
              Estúdio de treino personalizado no Porto. Personal training, hybrid, aulas de grupo,
              nutrição e massagem — com acompanhamento próximo do primeiro dia à tua melhor versão.
            </p>
            <ButtonLink href={bookingHref} variant="gold" size="sm" className="mt-6">
              Marcar avaliação gratuita
            </ButtonLink>
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

          <div>
            <h3 className="font-display text-sm uppercase tracking-wide text-gold-300">Horário</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              {brand.hours.map((h) => (
                <li key={h.day} className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 flex-none text-gold" />
                  <span>
                    <span className="block text-cream/90">{h.day}</span>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/12 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Connect Club · Porto. Todos os direitos reservados.</p>
          <p>Feito com dedicação pela Thuart</p>
        </div>
      </div>
    </footer>
  );
}
