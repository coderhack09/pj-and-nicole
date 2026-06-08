import fs from "fs/promises"
import path from "path"
import MasonryGallery from "@/components/masonry-gallery"
import { siteConfig } from "@/content/site"
import { CloudinaryImage } from "@/components/ui/cloudinary-image"
import { Cinzel, Cormorant_Garamond } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

// Palette lives in globals.css → @theme inline → --color-motif-*
const GALLERY_DECO_FILTER = ""

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFromFolder(folder: string): Promise<string[]> {
  const abs = path.join(process.cwd(), "public", folder)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${folder}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
  } catch {
    return []
  }
}

async function getGalleryImages() {
  // Try dedicated gallery folder first, fall back to desktop-background
  const galleryImages = await getImagesFromFolder("gallery")
  const sources = galleryImages.length > 0
    ? galleryImages
    : await getImagesFromFolder("desktop-background")

  return sources.sort((a, b) => {
    // Extract numeric part from filename for proper numerical sorting
    const numA = parseInt(a.match(/\((\d+)\)/)?.[1] || "0", 10)
    const numB = parseInt(b.match(/\((\d+)\)/)?.[1] || "0", 10)
    return numA - numB
  })
}

export default async function GalleryPage() {
  const allImages = await getGalleryImages()
  const images = allImages.map((src) => ({
    src,
    category: "gallery" as const,
    width: 1200,
    height: 900,
    orientation: "landscape" as const,
  }))

  return (
    <main className="min-h-screen relative overflow-hidden bg-motif-cream">
      {/* Layered background — matches homepage gallery section */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            background:
              "linear-gradient(165deg, var(--color-motif-cream) 0%, color-mix(in srgb, var(--color-motif-soft) 13%, transparent) 35%, color-mix(in srgb, var(--color-motif-medium) 6%, transparent) 70%, color-mix(in srgb, var(--color-motif-deep) 5%, transparent) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 15%, var(--color-motif-soft) 0%, transparent 55%)",
          }}
        />
      </div>

      {/* Flower decoration - top left corner */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <CloudinaryImage
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] opacity-25 scale-y-[-1]"
          priority={false}
          style={{ filter: GALLERY_DECO_FILTER }}
        />
      </div>

      {/* Flower decoration - top right corner */}
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <CloudinaryImage
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] opacity-25 scale-x-[-1] scale-y-[-1]"
          priority={false}
          style={{ filter: GALLERY_DECO_FILTER }}
        />
      </div>

      {/* Flower decoration - left bottom corner */}
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <CloudinaryImage
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] opacity-25"
          priority={false}
          style={{ filter: GALLERY_DECO_FILTER }}
        />
      </div>

      {/* Flower decoration - right bottom corner */}
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <CloudinaryImage
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] opacity-25 scale-x-[-1]"
          priority={false}
          style={{ filter: GALLERY_DECO_FILTER }}
        />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <span className="h-px w-8 sm:w-12 md:w-16 rounded-full bg-motif-accent/60" />
            <span className="w-1.5 h-1.5 rounded-full opacity-80 bg-motif-accent" />
            <span className="w-1.5 h-1.5 rounded-full opacity-50 bg-motif-accent" />
            <span className="w-1.5 h-1.5 rounded-full opacity-80 bg-motif-accent" />
            <span className="h-px w-8 sm:w-12 md:w-16 rounded-full bg-motif-accent/60" />
          </div>

          <h1
            className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-2 sm:mb-3 md:mb-4 text-motif-deep`}
          >
            Our Love Story Gallery
          </h1>
          <p
            className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg font-light max-w-xl mx-auto leading-relaxed px-2 text-motif-medium`}
          >
            Every photograph tells a story of {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}'s journey to
            forever
          </p>

          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <span className="w-1.5 h-1.5 rounded-full opacity-80 bg-motif-accent" />
            <span className="w-1.5 h-1.5 rounded-full opacity-50 bg-motif-accent" />
            <span className="w-1.5 h-1.5 rounded-full opacity-80 bg-motif-accent" />
          </div>
        </div>

        {images.length === 0 ? (
          <div className={`${cormorant.className} text-center text-motif-medium`}>
            <p className="font-light">
              No images found. Add files to{" "}
              <code className="px-2 py-1 rounded border bg-motif-accent/10 border-motif-accent/40 text-motif-deep">
                public/gallery
              </code>
              {" "}or{" "}
              <code className="px-2 py-1 rounded border bg-motif-accent/10 border-motif-accent/40 text-motif-deep">
                public/desktop-background
              </code>
              .
            </p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}
      </section>
    </main>
  )
}
