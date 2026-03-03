"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// Google Tag Manager
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <>
      {/* GTM Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      {/* GTM noscript */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

// Meta Pixel (Facebook)
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixel() {
  if (!META_PIXEL_ID) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
}

// TikTok Pixel
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

export function TikTokPixel() {
  if (!TIKTOK_PIXEL_ID) return null;

  return (
    <Script
      id="tiktok-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            ttq.load('${TIKTOK_PIXEL_ID}');
            ttq.page();
          }(window, document, 'ttq');
        `,
      }}
    />
  );
}

// Pinterest Tag
const PINTEREST_TAG_ID = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID;

export function PinterestTag() {
  if (!PINTEREST_TAG_ID) return null;

  return (
    <Script
      id="pinterest-tag"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
          pintrk('load', '${PINTEREST_TAG_ID}');
          pintrk('page');
        `,
      }}
    />
  );
}

// Analytics Events Helper
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq: (...args: unknown[]) => void;
    ttq: {
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
    };
    pintrk: (action: string, event?: string, params?: Record<string, unknown>) => void;
  }
}

export const analytics = {
  // Track page view
  pageView: (url: string) => {
    if (typeof window !== "undefined") {
      // GTM
      window.dataLayer?.push({
        event: "page_view",
        page_path: url,
      });

      // Meta Pixel
      if (window.fbq) {
        window.fbq("track", "PageView");
      }

      // TikTok
      if (window.ttq) {
        window.ttq.page();
      }

      // Pinterest
      if (window.pintrk) {
        window.pintrk("page");
      }
    }
  },

  // Track view content (product view)
  viewContent: (product: {
    id: string;
    name: string;
    price: number;
    category?: string;
    currency?: string;
  }) => {
    if (typeof window !== "undefined") {
      const currency = product.currency || "EUR";

      // GTM / GA4
      window.dataLayer?.push({
        event: "view_item",
        ecommerce: {
          currency,
          value: product.price,
          items: [
            {
              item_id: product.id,
              item_name: product.name,
              item_category: product.category,
              price: product.price,
            },
          ],
        },
      });

      // Meta Pixel
      if (window.fbq) {
        window.fbq("track", "ViewContent", {
          content_ids: [product.id],
          content_name: product.name,
          content_type: "product",
          value: product.price,
          currency,
        });
      }

      // TikTok
      if (window.ttq) {
        window.ttq.track("ViewContent", {
          content_id: product.id,
          content_name: product.name,
          content_type: "product",
          value: product.price,
          currency,
        });
      }

      // Pinterest
      if (window.pintrk) {
        window.pintrk("track", "pagevisit", {
          product_id: product.id,
          product_name: product.name,
        });
      }
    }
  },

  // Track add to cart
  addToCart: (product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category?: string;
    currency?: string;
  }) => {
    if (typeof window !== "undefined") {
      const currency = product.currency || "EUR";
      const value = product.price * product.quantity;

      // GTM / GA4
      window.dataLayer?.push({
        event: "add_to_cart",
        ecommerce: {
          currency,
          value,
          items: [
            {
              item_id: product.id,
              item_name: product.name,
              item_category: product.category,
              price: product.price,
              quantity: product.quantity,
            },
          ],
        },
      });

      // Meta Pixel
      if (window.fbq) {
        window.fbq("track", "AddToCart", {
          content_ids: [product.id],
          content_name: product.name,
          content_type: "product",
          value,
          currency,
        });
      }

      // TikTok
      if (window.ttq) {
        window.ttq.track("AddToCart", {
          content_id: product.id,
          content_name: product.name,
          content_type: "product",
          value,
          currency,
          quantity: product.quantity,
        });
      }

      // Pinterest
      if (window.pintrk) {
        window.pintrk("track", "addtocart", {
          product_id: product.id,
          product_name: product.name,
          value,
          order_quantity: product.quantity,
          currency,
        });
      }
    }
  },

  // Track initiate checkout
  initiateCheckout: (cart: {
    value: number;
    items: Array<{ id: string; name: string; price: number; quantity: number }>;
    currency?: string;
  }) => {
    if (typeof window !== "undefined") {
      const currency = cart.currency || "EUR";

      // GTM / GA4
      window.dataLayer?.push({
        event: "begin_checkout",
        ecommerce: {
          currency,
          value: cart.value,
          items: cart.items.map((item) => ({
            item_id: item.id,
            item_name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      });

      // Meta Pixel
      if (window.fbq) {
        window.fbq("track", "InitiateCheckout", {
          content_ids: cart.items.map((i) => i.id),
          value: cart.value,
          currency,
          num_items: cart.items.reduce((sum, i) => sum + i.quantity, 0),
        });
      }

      // TikTok
      if (window.ttq) {
        window.ttq.track("InitiateCheckout", {
          content_ids: cart.items.map((i) => i.id),
          value: cart.value,
          currency,
        });
      }

      // Pinterest
      if (window.pintrk) {
        window.pintrk("track", "checkout", {
          value: cart.value,
          order_quantity: cart.items.reduce((sum, i) => sum + i.quantity, 0),
          currency,
        });
      }
    }
  },

  // Track newsletter signup
  newsletterSignup: (email: string) => {
    if (typeof window !== "undefined") {
      // GTM
      window.dataLayer?.push({
        event: "newsletter_signup",
        email_domain: email.split("@")[1],
      });

      // Meta Pixel
      if (window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Newsletter Signup",
        });
      }

      // TikTok
      if (window.ttq) {
        window.ttq.track("Subscribe");
      }
    }
  },
};

// Route Change Tracker
function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    analytics.pageView(url);
  }, [pathname, searchParams]);

  return null;
}

// Main Analytics Provider Component
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleTagManager />
      <MetaPixel />
      <TikTokPixel />
      <PinterestTag />
      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>
      {children}
    </>
  );
}
