import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  let safe = 0;

  for (const el of data) {
    const arr = el.split(' ').map(Number);
    let curSort: 'asc' | 'desc' | null = null;
    let isSafe = true;

    for (let i = 1; i < arr.length; i++) {
      const difference = arr[i] - arr[i - 1];

      // 방향 설정
      if (curSort === null) {
        curSort = difference > 0 ? 'asc' : 'desc';
      }

      // 방향 일관성 및 차이 값 확인
      if (
        (curSort === 'asc' && difference <= 0) ||
        (curSort === 'desc' && difference >= 0) ||
        Math.abs(difference) > 3
      ) {
        isSafe = false;
        break;
      }
    }

    if (isSafe) {
      safe++;
    }
  }

  return safe;
}

await runSolution(day2a);
