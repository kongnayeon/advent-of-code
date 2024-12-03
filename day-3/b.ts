import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3b(data: string[]) {
  const enableRegex = /do\(\)/g;
  const disableRegex = /don't\(\)/g;
  const mulRegex = /mul\(\d{1,3},\s*\d{1,3}\)/g;

  let enabled = true;
  let result = 0;

  let match: string[];

  const combinedRegex = new RegExp(
    `${enableRegex.source}|${disableRegex.source}|${mulRegex.source}`,
    'g'
  );

  while ((match = combinedRegex.exec(data[0])) !== null) {
    if (match[0].match(enableRegex)) {
      enabled = true;
    } else if (match[0].match(disableRegex)) {
      enabled = false;
    } else if (match[0].match(mulRegex) && enabled) {
      let removeLeft = match[0].replace('mul(', '');
      let str = removeLeft.replace(')', '');
      const [a, b] = str.split(',').map(Number);
      result += a * b;
    }
  }

  return result;
}

await runSolution(day3b);
