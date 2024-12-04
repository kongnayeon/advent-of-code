import { runSolution } from '../utils.ts';

// BFS + 대각선 방향

/** provide your solution as the return of this function */
export async function day4a(data: string[]) {
  const arr = data.map((el) => el.split(''));

  return bfs(arr[0].length, arr.length, arr);
}

function bfs(w: number, h: number, arr: string[][]) {
  // 상 하 좌 우 우상 우하 좌상 좌하
  const dx = [0, 0, 1, -1, 1, 1, -1, -1];
  const dy = [1, -1, 0, 0, 1, -1, 1, -1];

  const target = 'XMAS';
  const targetLength = target.length;
  let count = 0; // "XMAS"를 찾은 횟수

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (arr[i][j] === 'X') {
        for (let d = 0; d < 8; d++) {
          let found = true;
          for (let k = 0; k < targetLength; k++) {
            const nx = i + dx[d] * k;
            const ny = j + dy[d] * k;

            if (
              nx < 0 ||
              ny < 0 ||
              nx >= h ||
              ny >= w ||
              arr[nx][ny] !== target[k]
            ) {
              found = false;
              break;
            }
          }

          if (found) {
            count++;
          }
        }
      }
    }
  }
  return count;
}

await runSolution(day4a);
