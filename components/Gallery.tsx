"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  _id: string;
  url: string;
  title?: string;
  location?: string;
}

interface GalleryProps {
  showViewAll?: boolean;
}

/* Bento span config — cycles for any number of images */
const BENTO_CONFIG = [
  { colSpan: "md:col-span-2 md:row-span-2", minH: "min-h-[320px]", padding: "p-8", textSize: "text-2xl" },
  { colSpan: "md:col-span-2",               minH: "min-h-[200px]", padding: "p-6", textSize: "text-xl" },
  { colSpan: "md:col-span-1",               minH: "min-h-[200px]", padding: "p-6", textSize: "text-xl" },
  { colSpan: "md:col-span-1",               minH: "min-h-[200px]", padding: "p-6", textSize: "text-xl" },
];

/* Static fallback images shown when no uploads exist yet */
const FALLBACK: GalleryImage[] = [
  { _id: "f1", url: "/heroimage.webp",           title: "Translucent Ceiling",       location: "Gurugram, India" },
  { _id: "f2", url: "/hero-stretch-ceiling.jpg", title: "Printed Stretch Ceiling",   location: "Delhi, India" },
  { _id: "f3", url: "/heroimage.webp",           title: "Glossy Finish",             location: "Noida, India" },
  { _id: "f4", url: "/hero-stretch-ceiling.jpg", title: "3D Design",                 location: "Faridabad, India" },
];

export default function Gallery({ showViewAll = true }: GalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.images?.length > 0) {
          setImages(data.images);
        } else {
          setImages(FALLBACK);
        }
      })
      .catch(() => setImages(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  /* On homepage, only show first 4 images in the classic bento */
  const displayImages = showViewAll ? images.slice(0, 4) : images;

  return (
    <section id="gallery" className="py-section-gap px-5 md:px-16 max-w-container-max mx-auto">
      <div className="flex justify-between items-end mb-12">
        <h2 className="font-headline-lg text-3xl md:text-5xl text-[#202124]">
          Craftsmanship Portfolio
        </h2>
        {showViewAll && (
          <a
            href="/gallery"
            className="hidden md:inline-flex items-center gap-2 font-label-caps text-label-caps text-brand-vibrancy hover:text-brand-vibrancy/80 transition-colors active:scale-95"
          >
            View All
            <ArrowRight size={14} />
          </a>
        )}
      </div>

      {loading ? (
        showViewAll ? (
          /* Skeleton bento (Homepage) */
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px] lg:h-[720px]">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`${BENTO_CONFIG[i].colSpan} ${BENTO_CONFIG[i].minH} rounded-2xl bg-zinc-200 animate-pulse`}
              />
            ))}
          </div>
        ) : (
          /* Skeleton masonry (Gallery Page) */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`w-full rounded-2xl bg-zinc-200 animate-pulse break-inside-avoid ${
                  i % 3 === 0 ? "h-64" : i % 2 === 0 ? "h-96" : "h-72"
                }`}
              />
            ))}
          </div>
        )
      ) : showViewAll ? (
        /* ── Homepage: classic 4-tile bento ── */
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px] lg:h-[720px]">
          {displayImages.map((img, i) => {
            const cfg = BENTO_CONFIG[i % BENTO_CONFIG.length];
            return (
              <a
                key={img._id}
                href="/gallery"
                className={`${cfg.colSpan} ${cfg.minH} relative group overflow-hidden rounded-2xl active:scale-[0.98] transition-all duration-300`}
              >
                <Image
                  src={img.url}
                  alt={img.title || "Gallery image"}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-400" />
                <div className={`absolute bottom-0 left-0 ${cfg.padding} translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400`}>
                  <p className={`font-headline-md ${cfg.textSize} text-luminary-white mb-1 capitalize`}>
                    {img.title}
                  </p>
                  {img.location && (
                    <p className="font-body-md text-luminary-white/70 text-sm capitalize">{img.location}</p>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        /* ── Full gallery page: responsive masonry-style bento ── */
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {displayImages.map((img, i) => (
            <div
              key={img._id}
              className="relative group overflow-hidden rounded-2xl break-inside-avoid"
            >
              <Image
                src={img.url}
                alt={img.title || "Gallery image"}
                width={800}
                height={600}
                className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-400" />
              {img.title && (
                <div className="absolute bottom-0 left-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <p className="font-headline-md text-xl text-luminary-white font-semibold capitalize">
                    {img.title}
                  </p>
                  {img.location && (
                    <p className="font-body-md text-luminary-white/70 text-sm mt-0.5 capitalize">{img.location}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
