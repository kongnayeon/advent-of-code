import { runSolution } from '../utils.ts';

const transform = (stones: number[]) => {
  let newStones = [];

  stones.forEach((el) => {
    if (el === 0) {
      newStones.push(1);
    } else if (String(el).length % 2 === 0) {
      let length = String(el).length / 2;
      let leftStone = String(el).slice(0, length);
      let rightStone = String(el).slice(length);
      newStones.push(Number(leftStone));
      newStones.push(Number(rightStone));
    } else {
      newStones.push(el * 2024);
    }
  });

  return newStones;
};

/** provide your solution as the return of this function */
export async function day11a(data: string[]) {
  let stones = data[0].split(' ').map(Number);

  for (let i = 0; i < 25; i++) {
    stones = transform(stones);
  }
  return stones.length;
}

await runSolution(day11a);
