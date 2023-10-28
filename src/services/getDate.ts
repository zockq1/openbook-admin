function getDate(date: number): string {
  return date
    .toString()
    .split("")
    .reverse()
    .reduce((acc: string[], digit, index) => {
      if (index === 0) {
        acc.push("일");
      }
      if (index === 2) {
        acc.push("월 ");
      }
      if (index === 4) {
        acc.push("년 ");
      }
      acc.push(digit);
      return acc;
    }, [])
    .reverse()
    .join("");
}

export default getDate;
