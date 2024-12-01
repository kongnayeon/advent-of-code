import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
  const left = [];
  const right = [];
  let similarity = 0;
  const frequency = {};

  data.forEach((el) => {
    const [a, b] = el.split('   ');
    left.push(Number(a));
    right.push(Number(b));
  });

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  for (const num of right) {
    frequency[num] = (frequency[num] || 0) + 1;
  }

  left.forEach((el) => {
    if (frequency[el]) {
      similarity += frequency[el] * el;
    }
  });

  return similarity;
}

await runSolution(day1b);
