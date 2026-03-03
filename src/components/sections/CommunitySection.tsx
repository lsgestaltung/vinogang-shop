"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const instagramPosts = [
  { id: 1, image: "/images/vibe/insta-1.jpg", size: "large" },
  { id: 2, image: "/images/vibe/wine-vibe-1.jpg", size: "small" },
  { id: 3, image: "/images/vibe/insta-2.jpg", size: "small" },
  { id: 4, image: "/images/vibe/rose-vibe-1.jpg", size: "large" },
  { id: 5, image: "/images/vibe/insta-3.jpg", size: "small" },
  { id: 6, image: "/images/vibe/wine-vibe-2.jpg", size: "small" },
];

export function CommunitySection() {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-black text-white overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div className={cn(
          "flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
                @vinogang
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black">
              Join the Gang
            </h2>
          </div>

          <p className="text-white/60 max-w-md text-lg">
            Vinogang ist keine Weinmarke.<br />
            <span className="text-gold font-bold">Es ist eine Bewegung.</span>
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {instagramPosts.map((post, index) => (
            <a
              key={post.id}
              href="https://instagram.com/vinogang"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "relative overflow-hidden group transition-all duration-700",
                post.size === "large" ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Image
                src={post.image}
                alt="Vinogang Instagram"
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Instagram icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 border-2 border-white flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </div>
              </div>

              {/* Gold corner accent on hover */}
              <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-gold border-r-[40px] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div className={cn(
          "text-center mt-16 transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <a
            href="https://instagram.com/vinogang"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 px-8 py-4 border-2 border-white/20 hover:border-gold hover:bg-gold transition-all duration-300"
          >
            <svg className="w-5 h-5 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-[0.2em] group-hover:text-black transition-colors">
              Follow @vinogang
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
