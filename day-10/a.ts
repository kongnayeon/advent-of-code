import { runSolution } from '../utils.ts';

const findTrailheads = (
  x: number,
  y: number,
  arr: number[][],
  ninePositions: Set<string>
) => {
  // 상 우 하 좌
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  const key = `${x},${y}`;

  if (ninePositions.has(key)) return;

  if (arr[y][x] === 9) {
    ninePositions.add(key);
    if (arr[y][x] === 9) return 1;
  }

  let score = 0;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx >= arr[0].length || ny >= arr.length) continue;

    if (arr[ny][nx] === arr[y][x] + 1) {
      findTrailheads(nx, ny, arr, ninePositions); // 경로가 유효하면 바로 반환
    }
  }

  return score;
};

/** provide your solution as the return of this function */
export async function day10a(data: string[]) {
  const arr = data.map((el) => el.split('').map(Number));

  let totalScore = 0;
  const trailheadScores: number[] = [];

  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[0].length; x++) {
      if (arr[y][x] === 0) {
        const ninePositions = new Set<string>();

        findTrailheads(x, y, arr, ninePositions);

        const score = ninePositions.size;
        trailheadScores.push(score);
        totalScore += score;
      }
    }
  }

  return totalScore;
}

await runSolution(day10a);
