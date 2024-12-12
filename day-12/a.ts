import { runSolution } from '../utils.ts';

const findRegions = (
  c: number,
  r: number,
  map: string[][],
  visited: Set<string>
) => {
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  const plant = map[r][c];
  let plots = 0;
  let area = 0;

  const queue: [number, number][] = [];
  queue.push([c, r]);
  visited.add(`${c},${r}`);

  while (queue.length > 0) {
    const [x, y] = queue.shift()!;
    area++;

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= map[0].length || ny >= map.length) {
        plots++;
        continue;
      }

      if (map[ny][nx] !== plant) {
        plots++;
      } else if (!visited.has(`${nx},${ny}`)) {
        visited.add(`${nx},${ny}`);
        queue.push([nx, ny]);
      }
    }
  }

  return [plant, plots, area];
};

/** provide your solution as the return of this function */
export async function day12a(data: string[]) {
  const map = data.map((el) => el.split(''));

  const visited = new Set<string>();
  const result = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (!visited.has(`${x},${y}`)) {
        result.push(findRegions(x, y, map, visited));
      }
    }
  }

  let answer = 0;

  result.forEach((el) => {
    const [, plots, area] = el;
    answer += plots * area;
  });

  return answer;
}

await runSolution(day12a);
