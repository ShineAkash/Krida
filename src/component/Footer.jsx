import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FaInstagram, FaXTwitter, FaYoutube, FaDiscord } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Button from "./Button.jsx";

gsap.registerPlugin(ScrollTrigger);

// Inline hover-tilt tile — same idiom as BentoTilt in Features.jsx
const SocialTile = ({ icon: Icon, label, href }) => {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * -6;
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(0.98,0.98,0.98)`;
  };
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="social-tile group flex aspect-square w-full flex-col items-start justify-between rounded-md border-hsla bg-black/40 p-5 transition-colors duration-300 hover:bg-violet-300/20"
    >
      <Icon className="text-3xl text-blue-50 transition-transform duration-300 group-hover:scale-110" />
      <span className="font-general text-xs uppercase text-blue-50">{label}</span>
    </a>
  );
};

const Footer = () => {
  const sectionRef = useRef(null);
  const wordmarkRef = useRef(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      // 1) Section clip-path reveal — same idiom as Hero video frame
      gsap.fromTo(
        ".footer-clip-frame",
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
          },
        }
      );

      // 2) Massive wordmark — letter-by-letter 3D stagger
      gsap.fromTo(
        ".footer-letter",
        { opacity: 0, y: 60, rotateX: -40 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3) Newsletter card — fade + slight scale
      gsap.fromTo(
        ".footer-newsletter",
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-newsletter",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4) Social tiles — stagger in from below
      gsap.fromTo(
        ".social-tile",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".social-tile",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 5) Bottom bar — soft fade
      gsap.fromTo(
        ".footer-bottom",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".footer-bottom",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 2400);
  };

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="footer-clip-frame relative w-screen overflow-hidden bg-black text-blue-50"
    >
      {/* Top divider with eyebrow label */}
      <div className="flex-center w-full pt-16">
        <div className="flex w-full max-w-6xl items-center gap-4 px-6 md:px-12">
          <span className="h-px flex-1 bg-white/20" />
          <span className="rounded-full border-hsla bg-violet-300 px-3 py-1 font-general text-[10px] uppercase tracking-widest text-blue-50">
            krida — gateway
          </span>
          <span className="h-px flex-1 bg-white/20" />
        </div>
      </div>

      {/* Massive wordmark */}
      <div
        ref={wordmarkRef}
        className="footer-wordmark flex-center w-full py-10 md:py-16"
      >
        <h1
          className="special-font font-zentry font-black uppercase leading-none text-blue-50"
          style={{
            fontSize: "clamp(5rem, 22vw, 18rem)",
            perspective: "800px",
          }}
        >
          {"KRIDA".split("").map((ch, i) => (
            <span
              key={i}
              className="footer-letter inline-block"
              style={{ transformOrigin: "50% 100%" }}
            >
              {ch}
            </span>
          ))}
        </h1>
      </div>

      {/* Two-column row: newsletter + socials */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 gap-6 pb-20 md:grid-cols-2 md:gap-8">
          {/* Newsletter card */}
          <div className="footer-newsletter border-hsla flex flex-col justify-between rounded-md bg-black/40 p-6 md:p-10">
            <div>
              <p className="font-general text-[10px] uppercase tracking-widest text-blue-50/70">
                Stay in the loop
              </p>
              <h2 className="mt-3 font-circular-web text-3xl text-blue-50 md:text-4xl">
                Enter the Krida Layer
              </h2>
              <p className="mt-3 max-w-md font-circular-web text-sm text-blue-50/70 md:text-base">
                Drop your email for drops, lore drops, and early access to the next
                chapter.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@krida.gg"
                aria-label="Email address"
                className="w-full flex-1 rounded-full border-hsla bg-transparent px-4 py-3 font-circular-web text-sm text-blue-50 placeholder:text-blue-50/40 focus:border-violet-300 focus:outline-none md:text-base"
              />
              <Button
                id="footer-join"
                title={submitted ? "subscribed ✓" : "join"}
                rightIcon={<TiLocationArrow />}
                containerClass="!bg-yellow-300 flex-center gap-1"
              />
            </form>
            <p
              className={`mt-3 font-circular-web text-xs text-blue-50/60 transition-opacity duration-300 ${
                submitted ? "opacity-100" : "opacity-0"
              }`}
            >
              ✓ Subscribed — see you in the layer.
            </p>
          </div>

          {/* Socials grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <SocialTile icon={FaInstagram} label="Instagram" href="#" />
            <SocialTile icon={FaXTwitter} label="X / Twitter" href="#" />
            <SocialTile icon={FaYoutube} label="YouTube" href="#" />
            <SocialTile icon={FaDiscord} label="Discord" href="#" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-blue-50/60 md:flex-row md:px-12">
          <p className="font-circular-web">
            © {new Date().getFullYear()} Krida. Made by{" "}
            <span className="font-general text-blue-50">Akash Yadav</span>.
          </p>
          <div className="flex items-center gap-2">
            <a href="#" className="nav-hover-btn !text-blue-50/60 after:!bg-blue-50/60">
              Privacy
            </a>
            <span className="text-blue-50/30">·</span>
            <a href="#" className="nav-hover-btn !text-blue-50/60 after:!bg-blue-50/60">
              Terms
            </a>
            <span className="text-blue-50/30">·</span>
            <a href="#" className="nav-hover-btn !text-blue-50/60 after:!bg-blue-50/60">
              Cookies
            </a>
          </div>
          <div className="flex items-center gap-2">
            <img src="/img/logo.png" alt="Krida" className="w-6" />
            <span className="font-general text-xs uppercase tracking-widest text-blue-50/60">
              Krida
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
