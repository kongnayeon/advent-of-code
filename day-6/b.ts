import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day6b(data: string[]) {
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

  const isOutOfBounds = (x: number, y: number) =>
    x < 0 || y < 0 || x >= map[0].length || y >= map.length;

  const checkLoop = (map: string[][], startX: number, startY: number) => {
    let x = startX;
    let y = startY;
    let dir = currentDir;

    const visited = new Set();
    visited.add(`${guardX},${guardY},${dir}`);

    while (true) {
      const nextX = x + dx[dir];
      const nextY = y + dy[dir];

      if (isOutOfBounds(nextX, nextY)) break;

      if (map[nextY][nextX] === '#' || map[nextY][nextX] === 'O') {
        dir = (dir + 1) % 4; // 방향 바꾸기
      } else if (map[nextY][nextX] === '.') {
        x = nextX;
        y = nextY;
        const state = `${x},${y},${dir}`;

        if (visited.has(state)) {
          return true; // 루프 발생
        }
        visited.add(state);
      }
    }

    return false; // 루프 없음
  };

  const emptySpaces: [number, number][] = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === '.') {
        emptySpaces.push([j, i]);
      }
    }
  }

  let loopCount = 0;

  for (const [x, y] of emptySpaces) {
    map[y][x] = 'O';

    if (checkLoop(map, guardX, guardY)) {
      loopCount++;
    }
    // 원상 복구
    map[y][x] = '.';
  }

  return loopCount;
}

await runSolution(day6b);
