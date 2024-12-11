import { runSolution } from '../utils.ts';

const transform = (stonesMap: Map<string, number>): Map<string, number> => {
  const newMap = new Map<string, number>();

  for (const [stone, count] of stonesMap) {
    const length = stone.length;
    let transformedStones: string[] = [];

    if (stone === '0') {
      transformedStones.push('1');
    } else if (length % 2 === 0) {
      const half = length / 2;
      const left = String(parseInt(stone.slice(0, half), 10));
      const right = String(parseInt(stone.slice(half), 10));

      transformedStones.push(left, right);
    } else {
      const numBig = BigInt(stone);
      const multiplied = numBig * 2024n;
      transformedStones.push(String(multiplied));
    }

    for (const ts of transformedStones) {
      newMap.set(ts, (newMap.get(ts) || 0) + count);
    }
  }

  return newMap;
};

/** provide your solution as the return of this function */
export async function day11b(data: string[]) {
  let stones = data[0].split(' ').map(Number);

  let stonesMap = new Map();

  for (const num of stones) {
    const s = String(num);
    stonesMap.set(s, (stonesMap.get(s) || 0) + 1);
  }

  let result = 0;

  for (let i = 0; i < 75; i++) {
    stonesMap = transform(stonesMap);
  }

  for (const count of stonesMap.values()) {
    result += count;
  }

  return result;
}

await runSolution(day11b);
