import React, { useEffect, useRef, useState } from "react";
import RaizinhoEngine from "@/components/raizinho/engine";
import SpeechBubble from "@/components/raizinho/SpeechBubble";
import { ART_MODES } from "@/components/raizinho/modes";
import { onRaizinho, registerHost } from "@/lib/raizinhoBus";
import { useApp } from "@/lib/AppContext";
import { getLevel } from "@/data/mockData";

export { productProp, moodToExpression } from "@/components/raizinho/modes";

// Raizinho 3D real (Three.js em canvas WebGL)
export default function RaizinhoMascot({
  size = 180, art = "idle", level, interactive = true, contextMessage = null,
  listen = true, host = true, trigger = null,
}) {
  const { pontos, isAuthenticated } = useApp();
  const mode = ART_MODES[art] || ART_MODES.idle;
  const lvl = mode.level ?? level ?? (isAuthenticated ? getLevel(pontos).idx : 2);
  const boxRef = useRef(null);
  const eng = useRef(null);
  const tap = useRef({ last: 0, single: null, long: null, longFired: false, x: 0, y: 0 });
  const [speech, setSpeech] = useState(null);

  useEffect(() => {
    let timer;
    const e = new RaizinhoEngine(boxRef.current, {
      level: lvl,
      interactive,
      onSay: (text, ms) => {
        clearTimeout(timer);
        setSpeech({ text, id: Date.now() });
        timer = setTimeout(() => setSpeech(null), ms);
      },
    });
    eng.current = e;
    const move = (ev) => e.setPointer(ev.clientX, ev.clientY);
    const act = () => e.activity();
    window.addEventListener("pointermove", move);
    window.addEventListener("keydown", act);
    window.addEventListener("scroll", act, { passive: true });
    return () => {
      clearTimeout(timer);
      clearTimeout(tap.current.single);
      clearTimeout(tap.current.long);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("keydown", act);
      window.removeEventListener("scroll", act);
      e.dispose();
      eng.current = null;
    };
  }, []);

  useEffect(() => { eng.current?.setLevel(lvl); }, [lvl]);
  useEffect(() => { eng.current?.setBase(mode); }, [art]);
  useEffect(() => (listen ? onRaizinho((ev) => eng.current?.handleEvent(ev)) : undefined), [listen]);
  useEffect(() => (host ? registerHost() : undefined), [host]);
  useEffect(() => {
    if (trigger) eng.current?.play(trigger.name, { priority: 2, say: trigger.say });
  }, [trigger?.key]);

  const onDown = (e) => {
    const T = tap.current;
    T.longFired = false;
    T.x = e.clientX;
    T.y = e.clientY;
    clearTimeout(T.long);
    T.long = setTimeout(() => { T.longFired = true; eng.current?.longPress(); }, 550);
  };
  const onMove = (e) => {
    const T = tap.current;
    if (Math.hypot(e.clientX - T.x, e.clientY - T.y) > 10) clearTimeout(T.long);
  };
  const onUp = () => {
    const T = tap.current;
    clearTimeout(T.long);
    if (T.longFired) return;
    const now = performance.now();
    if (now - T.last < 300) {
      clearTimeout(T.single);
      T.last = 0;
      eng.current?.doubleTap();
    } else {
      T.last = now;
      T.single = setTimeout(() => eng.current?.click(), 260);
    }
  };

  const bubble = speech?.text || contextMessage;

  return (
    <div className="relative inline-flex flex-col items-center select-none" style={{ width: size }}>
      {bubble && <SpeechBubble key={speech?.id || bubble} text={bubble} />}
      <div
        ref={boxRef}
        role="img"
        aria-label="Raizinho, mascote 3D do RaizJusta"
        tabIndex={interactive ? 0 : undefined}
        className={interactive ? "cursor-pointer outline-none" : ""}
        style={{ width: size, height: Math.round(size * 1.15), touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
        onPointerDown={interactive ? onDown : undefined}
        onPointerMove={interactive ? onMove : undefined}
        onPointerUp={interactive ? onUp : undefined}
        onPointerEnter={(e) => e.pointerType === "mouse" && eng.current?.setHover(true)}
        onPointerLeave={() => { clearTimeout(tap.current.long); eng.current?.setHover(false); }}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (interactive && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); eng.current?.click(); }
        }}
      />
    </div>
  );
}