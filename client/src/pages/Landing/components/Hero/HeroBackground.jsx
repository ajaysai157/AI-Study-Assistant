import DotGrid from "../../../../effects/DotGrid/DotGrid";

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <DotGrid
        dotSize={4}
        gap={22}
        baseColor="#D6D8F5"
        activeColor="#4F46E5"
        proximity={160}
        shockRadius={220}
        shockStrength={3.5}
        resistance={850}
        returnDuration={1.2}
      />
    </div>
  );
}

export default HeroBackground;