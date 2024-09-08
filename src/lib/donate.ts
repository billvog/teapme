export const DonationEmojiLevels: Array<{ emoji: string; max: number }> = [
  { emoji: "☕️", max: 2 },
  { emoji: "🍵", max: 3 },
  { emoji: "🫖", max: 4 },
  { emoji: "🫣", max: 5 },
  { emoji: "🫨", max: 100 },
  { emoji: "⭐️", max: Infinity },
];

export function getEmojiForDonation(cupsAmount: number) {
  if (cupsAmount === 0) {
    return String();
  }

  const level = DonationEmojiLevels.find((level) => cupsAmount < level.max);
  return level?.emoji ?? "☕️";
}
