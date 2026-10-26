import { useId } from "react";

// Figma painter order: Contessa stays in front while the other cards gather behind it.
const cards = ["Ambassador", "Assassin", "Duke", "Captain", "Contessa"];

export function CardArtwork() {
  const id = useId();
  return (
    <div className="card-artwork" aria-hidden="true">
      <svg className="card-aura" viewBox="591 140 890 650" focusable="false">
        <defs>
          <filter id={id + "-aura"} x="491" y="40" width="1090" height="850" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feMorphology radius="220" operator="dilate" in="SourceAlpha" />
            <feGaussianBlur stdDeviation="50" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.939423 0 0 0 0 0.752377 0 0 0 0 0.335121 0 0 0 0.63 0" result="shadow" />
            <feBlend in="SourceGraphic" in2="shadow" mode="normal" />
          </filter>
        </defs>
        <g className="card-aura-shape" opacity=".35">
          <ellipse cx="1036" cy="465" rx="125" ry="5" fill="#c9a148" fillOpacity=".54" filter={"url(#" + id + "-aura)"} />
        </g>
      </svg>
      <svg className="coup-cards" viewBox="0 0 715 447" fill="none" focusable="false">
        <defs>
          {/* Leave room beyond the card layers' own shadows for the outer blur to fade. */}
          <filter id={id + "-glow"} x="-180" y="-170" width="1075" height="800" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation="20" />
            <feComposite in2="SourceAlpha" operator="out" result="glowMask" />
            <feFlood className="card-glow-color" floodColor="#c99b34" floodOpacity=".8" result="glowColor" />
            <feComposite in="glowColor" in2="glowMask" operator="in" result="shadow" />
            <feBlend in="SourceGraphic" in2="shadow" mode="normal" />
          </filter>
          <filter id={id + "-selected-halo"} x="130" y="-100" width="445" height="575" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feMorphology in="SourceAlpha" operator="dilate" radius="7" result="wideEdge" />
            <feGaussianBlur in="wideEdge" stdDeviation="18" result="nearHalo" />
            <feGaussianBlur in="wideEdge" stdDeviation="32" result="softHalo" />
            <feMerge result="haloMask">
              <feMergeNode in="softHalo" />
              <feMergeNode in="nearHalo" />
            </feMerge>
            <feFlood floodColor="#c99b34" floodOpacity=".9" />
            <feComposite in2="haloMask" operator="in" />
          </filter>
          <filter id={id + "-selected-edge"} x="190" y="-40" width="325" height="455" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodColor="#f6cd6b" />
            <feComposite in2="SourceAlpha" operator="in" result="edge" />
            <feGaussianBlur in="edge" stdDeviation="7" result="bloom" />
            <feGaussianBlur in="edge" stdDeviation="2" result="tightGlow" />
            <feMerge>
              <feMergeNode in="bloom" />
              <feMergeNode in="tightGlow" />
              <feMergeNode in="edge" />
            </feMerge>
          </filter>
        </defs>
        <g filter={"url(#" + id + "-glow)"}>
          {cards.map(card => (
            <g key={card} className={"card-layer card-" + card.toLowerCase()}>
              {card === "Contessa" && (
                <use className="card-selected-halo" href="/assets/coup-cards.svg#contessa-edge" filter={"url(#" + id + "-selected-halo)"} />
              )}
              <use href={"/assets/coup-cards.svg#" + card} />
              {card === "Contessa" && (
                <use className="card-selected-edge" href="/assets/coup-cards.svg#contessa-edge" filter={"url(#" + id + "-selected-edge)"} />
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
