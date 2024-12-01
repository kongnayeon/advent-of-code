import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  const left = [];
  const right = [];

  data.forEach((el) => {
    const [a, b] = el.split('   ');
    left.push(Number(a));
    right.push(Number(b));
  });

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  return left.reduce((sum, el, index) => sum + Math.abs(el - right[index]), 0);
}

await runSolution(day1a);
