export const border_color_shadow_$ = (rank: number) => {
  switch (rank) {
    case 1:
      return "border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.6)]";
    case 2:
      return "border-gray-300 shadow-[0_0_20px_rgba(192,192,192,0.6)]";
    case 3:
      return "border-yellow-600 shadow-[0_0_20px_rgba(205,127,50,0.6)]";
    default:
      return "border-[var(--neon-blue)] shadow-[0_0_20px_rgba(0,243,255,0.6)]";
  }
};
