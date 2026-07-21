import { ArrowRight } from "lucide-react";
import { signupHref } from "@/lib/content";

export function FloatingCta() {
  return (
    <a
      href={signupHref}
      aria-label="Começa a treinar agora"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-display text-sm font-medium text-ink shadow-[0_16px_36px_-12px_rgba(25,25,25,0.55)] transition-transform duration-300 hover:-translate-y-0.5"
    >
      Começa agora
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}
