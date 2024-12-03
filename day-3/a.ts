import { runSolution } from '../utils.ts';

// 정규식 활용 문제

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
  const regex = /mul\(\d{1,3},\s*\d{1,3}\)/g;
  const matches = data[0].match(regex);
  let result = 0;

  matches.forEach((el) => {
    let removeLeft = el.replace('mul(', '');
    let str = removeLeft.replace(')', '');

    const [a, b] = str.split(',').map(Number);
    result += a * b;
  });

  return result;
}

await runSolution(day3a);
