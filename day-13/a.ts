import { runSolution } from '../utils.ts';

const getTokens = (
  aX: number,
  aY: number,
  bX: number,
  bY: number,
  prizeX: number,
  prizeY: number
) => {
  let minCost = Infinity;

  for (let aCount = 0; aCount <= 100; aCount++) {
    for (let bCount = 0; bCount <= 100; bCount++) {
      const x = aCount * aX + bCount * bX;
      const y = aCount * aY + bCount * bY;
      if (x === prizeX && y === prizeY) {
        const cost = aCount * 3 + bCount;
        if (cost < minCost) {
          minCost = cost;
        }
      }
    }
  }

  return minCost === Infinity ? 0 : minCost;
};

/** provide your solution as the return of this function */
export async function day13a(data: string[]) {
  const groups = [];
  let currentGroup = [];
  let result = 0;
  let results = [];

  for (const line of data) {
    if (line.trim() === '') {
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
        currentGroup = [];
      }
    } else {
      currentGroup.push(line);
    }
  }

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  groups.forEach((group) => {
    const [, , aX, aY] = group[0]
      .split(' ')
      .map((el: string) => Number(el.replace(/\D/g, '')));
    const [, , bX, bY] = group[1]
      .split(' ')
      .map((el: string) => Number(el.replace(/\D/g, '')));
    const [, prizeX, prizeY] = group[2]
      .split(' ')
      .map((el: string) => Number(el.replace(/\D/g, '')));

    results.push(getTokens(aX, aY, bX, bY, prizeX, prizeY));

    result += getTokens(aX, aY, bX, bY, prizeX, prizeY);
  });

  return result;
}

await runSolution(day13a);
