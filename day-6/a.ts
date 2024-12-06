import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day6a(data: string[]) {
  const map: string[][] = data.map((el) => el.split(''));

  // 상 우 하 좌
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  let currentDir = 0;

  // 초기 위치 가져오기
  let guardX: number, guardY: number;

  outer: for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === '^') {
        guardX = j;
        guardY = i;
        map[i][j] = '.';
        break outer;
      }
    }
  }

  const checkLeft = (x: number, y: number) =>
    x < 0 || y < 0 || x >= map[0].length || y >= map.length;

  const visited = new Set();
  visited.add(`${guardX},${guardY}`);

  while (true) {
    const nextX = guardX + dx[currentDir];
    const nextY = guardY + dy[currentDir];

    if (checkLeft(nextX, nextY)) break;

    if (map[nextY][nextX] === '#') {
      currentDir = (currentDir + 1) % 4; // 방향 바꾸기
    } else {
      guardX = nextX;
      guardY = nextY;
      visited.add(`${guardX},${guardY}`);
    }
  }

  return visited.size;
}

await runSolution(day6a);
