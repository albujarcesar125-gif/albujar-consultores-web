import { useEffect, useRef, useState } from "react";
import {
  motion, AnimatePresence, useReducedMotion, useScroll, useSpring,
  useInView, useMotionValue, useTransform, animate,
} from "framer-motion";
import {
  CONTACT, MISION, VISION, INTRO, FOUNDER, TEAM, PRACTICE_AREAS, VALUES, PRESENCE, GALLERY,
} from "./data.js";

const EASE = [0.16, 1, 0.3, 1];
const MARQUEE_WORDS = ["Derecho Penal", "Derecho Civil", "Derecho Laboral", "Derecho Corporativo", "Gestión Pública", "Sinceridad", "Transparencia", "Integridad", "Ética Profesional"];

function FadeIn({ children, delay = 0, y = 22, className, amount = 0.3 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.65, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SecHead({ kicker, title, children }) {
  return (
    <FadeIn className="sec-head">
      {kicker && <p className="eyebrow center">{kicker}</p>}
      <h2>{title}</h2>
      {children && <p className="sec-sub">{children}</p>}
    </FadeIn>
  );
}

function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (reduced) { setDisplay(value); return; }
    const unsub = text.on("change", (v) => setDisplay(v));
    const controls = animate(mv, value, { duration: 1.4, ease: EASE });
    return () => { controls.stop(); unsub(); };
  }, [inView, value, mv, text, reduced]);
  return <span ref={ref} className="count">{display}{suffix}</span>;
}

const ICONS = {
  penal: "M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Zm0 4.2 5.5 2.6v3.5c0 3.6-2.3 6.2-5.5 7.4-3.2-1.2-5.5-3.8-5.5-7.4V8.8L12 6.2Z",
  civil: "M12 2 3 6v2h18V6l-9-4ZM4 10v9H2v2h20v-2h-2v-9h-2v9h-3v-9h-2v9h-3v-9H8v9H5v-9H4Z",
  laboral: "M10 2a2 2 0 0 0-2 2v1H4.5A1.5 1.5 0 0 0 3 6.5v3A1.5 1.5 0 0 0 4.5 11H8v1H4a2 2 0 0 0-2 2v6a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-6a2 2 0 0 0-2-2h-4v-1h3.5A1.5 1.5 0 0 0 21 9.5v-3A1.5 1.5 0 0 0 19.5 5H16V4a2 2 0 0 0-2-2h-4Zm0 2h4v1h-4V4Z",
  corp: "M4 21V8l6-4v3l6-3v17H4Zm2-2h2v-2H6v2Zm0-4h2v-2H6v2Zm0-4h2V9H6v2Zm4 8h2v-2h-2v2Zm0-4h2v-2h-2v2Zm6-2h2v10h-2V17Z",
  gestion: "M12 2 2 7l10 5 8-4v6h2V7L12 2ZM6 12.7V17c0 2.2 2.7 4 6 4s6-1.8 6-4v-4.3l-6 3-6-3Z",
};
const iconKeys = ["penal", "civil", "laboral", "corp", "gestion"];

function AreaCard({ a, icon, i, reduced }) {
  return (
    <motion.div
      className="area-card"
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.08 }}
      whileHover={reduced ? {} : { y: -6 }}
    >
      <motion.svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" whileHover={reduced ? {} : { rotate: 8, scale: 1.1 }}>
        <path d={icon} />
      </motion.svg>
      <h4>{a.n}</h4>
      <p>{a.d}</p>
    </motion.div>
  );
}

export default function App() {
  const reduced = useReducedMotion();
  const [menu, setMenu] = useState(false);
  const { scrollYProgress } = useScroll();
  const pageScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  const NAV = [
    ["#quienes-somos", "Quiénes somos"],
    ["#fundador", "Fundador"],
    ["#equipo", "Equipo"],
    ["#areas", "Áreas de práctica"],
    ["#contacto", "Contacto"],
  ];

  const waLink = CONTACT.whatsapp
    ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hola, quisiera una consulta legal con Albujar Asesoría y Consultoría.")}`
    : null;
  const mailLink = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Consulta legal — Albujar Asesoría y Consultoría")}`;

  return (
    <>
      <motion.span className="pageline" style={{ scaleX: reduced ? 1 : pageScale }} aria-hidden="true" />

      <motion.header
        className="topbar"
        initial={reduced ? false : { y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <a className="brand" href="#inicio">
          <img src="/brand/logo-icon.png" alt="" />
          <span>Albujar <b>Asesoría y Consultoría</b></span>
        </a>
        <nav className="topnav">
          {NAV.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <button className={`burger${menu ? " on" : ""}`} aria-label="Menú" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <span /><span /><span />
        </button>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.nav
            className="mnav"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
          >
            {NAV.map(([h, l]) => <a key={h} href={h} onClick={() => setMenu(false)}>{l}</a>)}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ---------- HERO ---------- */}
      <header className="hero" id="inicio">
        <div className="hero-glow" aria-hidden="true" />
        <motion.div
          className="mark-wrap"
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.img
            className="hero-mark"
            src="/brand/logo-icon.png"
            alt="Albujar Asesoría y Consultoría — dama de la justicia"
            animate={reduced ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="mark-ring" aria-hidden="true" />
        </motion.div>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          <p className="eyebrow center gold">Estudio de abogados — Sullana · Piura · Perú</p>
          <h1>Sinceridad, transparencia<br />y resultados.</h1>
          <p className="hero-sub">
            Veinte años de experiencia judicial y un equipo de abogados especializados en las distintas ramas del derecho, unidos por un mismo principio en cada caso.
          </p>
          <div className="cta-row">
            <a className="btn btn-gold" href="#contacto">Consulta tu caso</a>
            <a className="btn btn-ghost" href="#areas">Áreas de práctica</a>
          </div>
        </motion.div>
        <FadeIn className="hero-ribbon" delay={0.4}>
          <span><Counter value={20} suffix=" años" /> de trayectoria</span><i /><span>Sullana</span><i /><span>Piura</span><i /><span>Perú</span>
        </FadeIn>
      </header>

      <div className="marquee" aria-hidden="true">
        <motion.div
          style={{ display: "inline-flex" }}
          animate={reduced ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((k) => (
            <div className="marquee-track" key={k}>
              {MARQUEE_WORDS.map((w) => <span key={w}>{w} <b>·</b></span>)}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ---------- QUIÉNES SOMOS ---------- */}
      <section id="quienes-somos">
        <div className="split">
          <FadeIn>
            <p className="eyebrow gold">Quiénes somos</p>
            <h2>Trayectoria que respalda cada caso</h2>
            {INTRO.map((t) => <p className="lede" key={t}>{t}</p>)}
          </FadeIn>
          <motion.div
            className="split-img-wrap"
            initial={reduced ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <img className="split-img kenburns" src="/team/equipo-oficina.jpg" alt="Equipo de Albujar Asesoría y Consultoría en su oficina" loading="lazy" />
          </motion.div>
        </div>

        <div className="clauses">
          <FadeIn className="clause" delay={0.05}>
            <p className="eyebrow gold">Misión</p>
            <p>{MISION}</p>
          </FadeIn>
          <FadeIn className="clause" delay={0.15}>
            <p className="eyebrow gold">Visión</p>
            <p>{VISION}</p>
          </FadeIn>
        </div>
      </section>

      {/* ---------- FUNDADOR ---------- */}
      <section id="fundador" className="dark-sec">
        <SecHead kicker="El fundador">Veinte años al servicio de la justicia</SecHead>
        <div className="founder-wrap">
          <motion.div
            className="founder-photo"
            initial={reduced ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <img className="kenburns" src="/gallery/fundador-despacho.jpg" alt="Dr. César Augusto Albujar Chunga en su despacho" loading="lazy" />
          </motion.div>
          <FadeIn className="founder-card" amount={0.25} delay={0.1}>
            <div className="founder-top">
              <div className="seal">
                <span className="seal-ring" aria-hidden="true" />
                CAAC
              </div>
              <div>
                <h3>{FOUNDER.name}</h3>
                <p className="founder-role"><b>{FOUNDER.role}</b> · {FOUNDER.spec}</p>
              </div>
            </div>
            <ul className="creds">
              {FOUNDER.credentials.map((c, i) => (
                <motion.li
                  key={c}
                  initial={reduced ? false : { opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, delay: reduced ? 0 : i * 0.08 }}
                >
                  {c}
                </motion.li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ---------- EQUIPO ---------- */}
      <section id="equipo">
        <SecHead kicker="El equipo">Especialistas en las distintas ramas del derecho</SecHead>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <motion.div
              className="team-card"
              key={m.name}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: reduced ? 0 : i * 0.12 }}
              whileHover={reduced ? {} : { y: -6 }}
            >
              <div className="tc-photo">
                {m.img ? (
                  <img className="kenburns" src={m.img} alt={`Retrato de ${m.name}`} loading="lazy" />
                ) : (
                  <div className="tc-mono" aria-hidden="true">
                    {m.name.split(" ").filter((_, idx) => idx === 0 || idx === m.name.split(" ").length - 1).map((w) => w[0]).join("")}
                  </div>
                )}
              </div>
              <div className="tc-body">
                <h4>{m.name}</h4>
                <p className="role">{m.role}</p>
                <p className="spec">{m.spec}</p>
                {m.extra && <p className="extra">{m.extra}</p>}
                {m.credentials?.length > 0 && (
                  <ul className="tc-creds">
                    {m.credentials.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- GALERÍA ---------- */}
      <section className="tint-sec">
        <SecHead kicker="El día a día del estudio">Detrás de cada caso, trabajo real</SecHead>
        <div className="gal-grid">
          {GALLERY.map((g, i) => (
            <motion.figure
              className="gal-item"
              key={g.img}
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: reduced ? 0 : (i % 4) * 0.08, ease: EASE }}
            >
              <img className="kenburns" src={g.img} alt={g.t} loading="lazy" />
              <figcaption>{g.t}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* ---------- ÁREAS DE PRÁCTICA ---------- */}
      <section id="areas">
        <SecHead kicker="Áreas de práctica">Defendemos lo que te importa</SecHead>
        <div className="areas-grid">
          {PRACTICE_AREAS.map((a, i) => <AreaCard a={a} icon={ICONS[iconKeys[i]]} i={i} key={a.n} reduced={reduced} />)}
        </div>
      </section>

      {/* ---------- VALORES ---------- */}
      <section className="dark-sec">
        <SecHead kicker="Nuestros valores">Lo que nos distingue no se litiga</SecHead>
        <dl className="values">
          {VALUES.map((v, i) => (
            <motion.div
              className="value"
              key={v.n}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.08 }}
            >
              <dt>{v.n}</dt>
              <dd>{v.d}</dd>
            </motion.div>
          ))}
        </dl>
      </section>

      {/* ---------- PRESENCIA ---------- */}
      <section className="presence-sec">
        <SecHead kicker="Presencia y trayectoria">Cerca de ti, en todo el Perú</SecHead>
        <div className="presence">
          {PRESENCE.map((p, i) => (
            <motion.div
              className="presence-item"
              key={p.place}
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 220, damping: 18, delay: reduced ? 0 : i * 0.1 }}
            >
              <p className="lvl">{p.lvl}</p>
              <p className="place">{p.place}</p>
            </motion.div>
          ))}
        </div>
        <FadeIn delay={0.15}>
          <p className="presence-note">Respaldados por una amplia trayectoria de casos resueltos exitosamente en cada una de nuestras áreas de práctica.</p>
        </FadeIn>
      </section>

      {/* ---------- CONTACTO ---------- */}
      <section id="contacto" className="dark-sec close">
        <FadeIn amount={0.4}>
          <motion.img
            className="close-mark"
            src="/brand/logo-icon.png"
            alt=""
            animate={reduced ? {} : { rotate: [0, -4, 4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <h2>Conversemos sobre tu caso.</h2>
          <p className="sec-sub light">
            Escríbenos directamente y te orientamos con la seriedad y confidencialidad que tu situación requiere.
          </p>
          <div className="cta-row center">
            <motion.a
              className="btn btn-gold"
              href={mailLink}
              whileHover={reduced ? {} : { y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Escríbenos a {CONTACT.email}
            </motion.a>
            {waLink && (
              <motion.a
                className="btn btn-ghost"
                href={waLink}
                target="_blank" rel="noopener noreferrer"
                whileHover={reduced ? {} : { y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                WhatsApp
              </motion.a>
            )}
          </div>
          <div className="contact-grid">
            <div>
              <p className="eyebrow gold">Oficina</p>
              <p>{CONTACT.address}</p>
            </div>
            <div>
              <p className="eyebrow gold">Teléfono</p>
              <p>{CONTACT.phone}</p>
            </div>
          </div>
        </FadeIn>
      </section>

      <footer>
        <div className="brand foot-brand">
          <img src="/brand/logo-icon.png" alt="" />
          <span>Albujar Asesoría y Consultoría</span>
        </div>
        <span>© 2026 Albujar Asesoría y Consultoría — {CONTACT.address}</span>
      </footer>
    </>
  );
}
