import { runSolution } from '../utils.ts';

// 연립방정식 풀이로 수정
// 해가 무한히 많은 경우는 고려되지 않음

const getTokens = (
  aX: number,
  aY: number,
  bX: number,
  bY: number,
  prizeX: number,
  prizeY: number
) => {
  const D = aX * bY - aY * bX;

  if (D === 0) return 0;

  const A = (prizeX * bY - prizeY * bX) / D;
  const B = (aX * prizeY - aY * prizeX) / D;

  if (!(Number.isInteger(A) && Number.isInteger(B))) return 0;

  return 3 * A + B;
};

/** provide your solution as the return of this function */
export async function day13b(data: string[]) {
  const groups = [];
  let currentGroup = [];
  let result = 0;

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

    result += getTokens(
      aX,
      aY,
      bX,
      bY,
      prizeX + 10000000000000,
      prizeY + 10000000000000
    );
  });

  return result;
}

await runSolution(day13b);
