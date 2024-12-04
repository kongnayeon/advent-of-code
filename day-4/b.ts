import { runSolution } from '../utils.ts';

// X자로 꼬인 MAS 찾기

/** provide your solution as the return of this function */
export async function day4b(data: string[]) {
  const arr = data.map((el) => el.split(''));

  return bfs(arr[0].length, arr.length, arr);
}

function bfs(w: number, h: number, arr: string[][]) {
  //우상 우하 좌상 좌하
  const dx = [1, 1, -1, -1];
  const dy = [1, -1, 1, -1];

  let count = 0; // "X-MAS"를 찾은 횟수

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (arr[i][j] === 'A') {
        let valid = 0;

        // 수정 필요...

        // 우상 <-> 좌하
        const nx1 = i + dx[0];
        const ny1 = j + dy[0];
        const nx2 = i + dx[3];
        const ny2 = j + dy[3];

        if (
          nx1 >= 0 &&
          ny1 >= 0 &&
          nx1 < h &&
          ny1 < w &&
          nx2 >= 0 &&
          ny2 >= 0 &&
          nx2 < h &&
          ny2 < w &&
          ((arr[nx1][ny1] === 'M' && arr[nx2][ny2] === 'S') ||
            (arr[nx1][ny1] === 'S' && arr[nx2][ny2] === 'M'))
        )
          valid++;

        // 우하 <-> 좌상
        const nx3 = i + dx[1];
        const ny3 = j + dy[1];
        const nx4 = i + dx[2];
        const ny4 = j + dy[2];

        if (
          nx3 >= 0 &&
          ny3 >= 0 &&
          nx3 < h &&
          ny3 < w &&
          nx4 >= 0 &&
          ny4 >= 0 &&
          nx4 < h &&
          ny4 < w &&
          ((arr[nx3][ny3] === 'M' && arr[nx4][ny4] === 'S') ||
            (arr[nx3][ny3] === 'S' && arr[nx4][ny4] === 'M'))
        )
          valid++;

        if (valid === 2) {
          count++;
        }
      }
    }
  }
  return count;
}

await runSolution(day4b);
