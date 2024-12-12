import { runSolution } from '../utils.ts';

const countSetsInGroups = (groups: Record<string, number[]>): number => {
  let totalSets = 0;

  for (const key in groups) {
    if (Object.hasOwn(groups, key)) {
      const sortedValues = groups[key].sort((a, b) => a - b);

      let setsInGroup = 1; // 최소 한 세트는 존재

      for (let i = 1; i < sortedValues.length; i++) {
        if (sortedValues[i] !== sortedValues[i - 1] + 1) {
          setsInGroup++;
        }
      }

      totalSets += setsInGroup;
    }
  }

  return totalSets;
};

const findRegions = (
  c: number,
  r: number,
  map: string[][],
  visited: Set<string>
) => {
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  const plant = map[r][c];
  const horizontalFences = [];
  const verticalFences = [];
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

      let fence = {};
      fence = { y: y, x: x, dir: i }; // 0, 2이면  ^ v

      if (nx < 0 || ny < 0 || nx >= map[0].length || ny >= map.length) {
        if (i === 0 || i === 2) horizontalFences.push(fence);
        else verticalFences.push(fence);
        continue;
      }

      if (map[ny][nx] !== plant) {
        if (i === 0 || i === 2) horizontalFences.push(fence);
        else verticalFences.push(fence);
      } else if (!visited.has(`${nx},${ny}`)) {
        visited.add(`${nx},${ny}`);
        queue.push([nx, ny]);
      }
    }
  }

  const hGroups = horizontalFences.reduce((acc, { y, x, dir }) => {
    const key = `${y},${dir}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(x);
    return acc;
  }, {} as Record<string, number[]>);

  const vGroups = verticalFences.reduce((acc, { y, x, dir }) => {
    const key = `${x},${dir}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(y);
    return acc;
  }, {} as Record<string, number[]>);

  const totalSets = countSetsInGroups(hGroups) + countSetsInGroups(vGroups);

  return [plant, totalSets, area];
};

/** provide your solution as the return of this function */
export async function day12b(data: string[]) {
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

await runSolution(day12b);
