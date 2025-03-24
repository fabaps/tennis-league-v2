interface GetOGTitleProps {
  rank?: string | number;
}

const getOGTitle = ({ rank }: GetOGTitleProps): string => {
  const rankNum = rank ?? "???";

  const titles = [
    `Top #${rankNum} in the Game. Can you beat that?`,
    `Ranked #${rankNum} – Climbing the leaderboard 🧗‍♂️`,
    `#${rankNum} on the Charts. Dominating the scene.`,
    `Elite Rank #${rankNum} – Only the best survive.`,
    `Holding Rank #${rankNum} – Come for the crown 👑`,
    `Rank #${rankNum} – The Grind Never Stops 💪`,
    `On Fire: Ranked #${rankNum} 🔥🔥🔥`,
    `Rank #${rankNum} – Born to win. Built different.`,
    `Currently #${rankNum} – Not even my final form.`,
    `I’m at Rank #${rankNum}. Where you at?`,
  ];

  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex];
};

export default getOGTitle;
