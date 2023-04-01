export const makeHourFormat = (n: number) => {
  const hour = `${Math.floor(n / 60)}시간 `;
  const min = `${n % 60}분`;

  return hour + min;
};
