import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Olea Technologies — Powering Sustainable Future",
    template: "%s | Olea Technologies",
  },
  description:
    "Olea Technologies builds clean energy infrastructure that drives homes, businesses, and industries into the future — intelligently, sustainably, and at scale.",
  keywords: ["solar energy Nigeria", "clean energy Africa", "solar installation", "inverter", "batteries", "Olea Technologies"],
  authors: [{ name: "Olea Technologies" }],
  creator: "Olea Technologies",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://oleatechnologies.com"),
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Olea Technologies",
    title: "Olea Technologies — Powering Sustainable Future",
    description: "Africa's premium clean-energy infrastructure company.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olea Technologies — Powering Sustainable Future",
    description: "Africa's premium clean-energy infrastructure company.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        {/* Scroll progress bar + 3D card tilt — matches design system motion.js */}
        <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(!reduce){
    var SEL='.card-hoverable,.tilt3d',MAX=5,active=null;
    function reset(el){if(!el)return;el.style.transition='transform 450ms cubic-bezier(0.22,1,0.36,1),box-shadow 250ms ease';el.style.transform='';}
    document.addEventListener('pointermove',function(e){
      if(e.pointerType&&e.pointerType!=='mouse')return;
      var card=e.target.closest?e.target.closest(SEL):null;
      if(!card){if(active){reset(active);active=null;}return;}
      if(card!==active){if(active)reset(active);active=card;card.style.transformStyle='preserve-3d';card.style.transition='transform 90ms ease-out,box-shadow 250ms ease';}
      var r=card.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-0.5,py=(e.clientY-r.top)/r.height-0.5;
      card.style.transform='perspective(950px) rotateX('+(-py*MAX).toFixed(2)+'deg) rotateY('+(px*MAX).toFixed(2)+'deg) translateY(-6px)';
    },{passive:true});
    document.addEventListener('pointerout',function(e){if(active&&(!e.relatedTarget||!(e.relatedTarget.closest&&e.relatedTarget.closest(SEL)))){reset(active);active=null;}},true);
  }
  var bar=document.createElement('div');
  bar.style.cssText='position:fixed;top:0;left:0;height:3px;width:0;z-index:300;background:linear-gradient(90deg,#1a7a4a,#f9a606);box-shadow:0 0 8px rgba(249,166,6,0.5);transition:width 80ms linear;pointer-events:none;';
  function mount(){if(document.body&&!document.getElementById('olea-sp'))document.body.appendChild(bar);}
  bar.id='olea-sp';mount();document.addEventListener('DOMContentLoaded',mount);
  window.addEventListener('scroll',function(){var max=document.documentElement.scrollHeight-window.innerHeight;bar.style.width=(max>0?window.scrollY/max*100:0).toFixed(2)+'%';},{passive:true});
})();
        ` }} />
      </body>
    </html>
  );
}
