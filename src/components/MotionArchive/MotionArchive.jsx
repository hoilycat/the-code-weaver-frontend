import React from "react";
import "./MotionArchive.css";

const motionPieces = [
  {
    title: "Scene Diary",
    tone: "Dark splash",
    src: "/media/scenediary-splash-dark-full-60fps.mp4",
    description: "A quiet opening motion for a diary app, built around paper, glow, and slow breath.",
  },
  {
    title: "Scene Diary",
    tone: "Light splash",
    src: "/media/scenediary-splash-light-full-60fps.mp4",
    description: "A softer daytime version that keeps the same folding-paper gesture.",
  },
];

export default function MotionArchive() {
  return (
    <section id="Motion" className="motion-archive-section">
      <div className="motion-archive-inner">
        <div className="motion-archive-heading">
          <span>Motion Archive</span>
          <h2>Moving pieces I wanted to keep visible.</h2>
        </div>

        <div className="motion-showcase">
          {motionPieces.map((piece) => (
            <article className="motion-card" key={piece.tone}>
              <div className="motion-phone-frame">
                <video
                  src={piece.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={`${piece.title} ${piece.tone} video`}
                />
              </div>

              <div className="motion-card-copy">
                <span>{piece.tone}</span>
                <h3>{piece.title}</h3>
                <p>{piece.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
