import Image from "next/image";
import { espaco } from "@/lib/content";

/**
 * Grelha do espaço: a primeira foto ocupa duas colunas e a segunda (retrato)
 * ocupa duas linhas. As restantes são quadrados. O `sizes` acompanha esses
 * tamanhos para não servir imagens maiores do que o necessário.
 */
const tiles = [
  { span: "col-span-2", sizes: "(max-width: 1024px) 100vw, 50vw" },
  { span: "row-span-2", sizes: "(max-width: 1024px) 50vw, 25vw" },
  { span: "", sizes: "(max-width: 1024px) 50vw, 25vw" },
  { span: "", sizes: "(max-width: 1024px) 50vw, 25vw" },
  { span: "", sizes: "(max-width: 1024px) 50vw, 25vw" },
  { span: "", sizes: "(max-width: 1024px) 50vw, 25vw" },
];

export function Espaco() {
  return (
    <section id="espaco" className="section bg-cream">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <span className="eyebrow">{espaco.eyebrow}</span>
            <h2 className="mt-4 max-w-xl text-[clamp(2rem,4.2vw,2.9rem)]">{espaco.title}</h2>
          </div>
          <p className="max-w-md text-muted md:justify-self-end md:text-right">
            {espaco.subtitle}
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:auto-rows-[14rem] lg:grid-cols-4">
          {espaco.photos.map((photo, i) => (
            <figure
              key={photo.src}
              className={`group relative overflow-hidden rounded-3xl bg-ink/5 ${tiles[i]?.span ?? ""}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={tiles[i]?.sizes ?? "50vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
