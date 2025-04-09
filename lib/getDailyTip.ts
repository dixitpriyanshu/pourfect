const tips = [
  "Always chill your glass for a better cocktail experience!",
  "Use fresh citrus juice for the best flavor.",
  "Shaking is for cocktails with mixers, stirring is for spirit-only drinks.",
  "Don't over-crush your mint when making a Mojito!",
  "Ice quality can impact your drink—use large, clear cubes when possible.",
];

export const getDailyTip = () => {
  const today = new Date();
  const index = today.getDate() % tips.length;
  return tips[index];
};
