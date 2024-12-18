import { runSolution } from '../utils.ts';

// 분산 이용
const getLocations = (
  pX: number,
  pY: number,
  vX: number,
  vY: number,
  width: number,
  height: number,
  seconds: number
): [number, number] => {
  let x = pX;
  let y = pY;

  x += vX * seconds;
  y += vY * seconds;

  return [((x % width) + width) % width, ((y % height) + height) % height];
};

function calculateSpaceVariance(points: [number, number][]) {
  const N = points.length;

  // 평균 계산
  const sum = points.reduce(
    (acc, [x, y]) => {
      acc.x += x;
      acc.y += y;
      return acc;
    },
    { x: 0, y: 0 }
  );

  const meanX = sum.x / N;
  const meanY = sum.y / N;

  // 공간적 분산 계산
  let varianceSpace = 0;

  points.forEach(([x, y]) => {
    const deltaX = x - meanX;
    const deltaY = y - meanY;
    varianceSpace += deltaX * deltaX + deltaY * deltaY;
  });

  varianceSpace /= N;

  return varianceSpace;
}

/** provide your solution as the return of this function */
export async function day14b(data: string[]) {
  const width = 101;
  const height = 103;

  let minVariance = Infinity;
  let minTime = 0;

  const maxTime = 20000;

  type Robot = {
    pX: number;
    pY: number;
    vX: number;
    vY: number;
  };

  const robots: Robot[] = data.map((line) => {
    const [left, right] = line.split(' ');
    const splittedLeft = left.split(',');
    const splittedRight = right.split(',');
    const pX = Number(splittedLeft[0].replace(/p=/g, ''));
    const pY = Number(splittedLeft[1]);
    const vX = Number(splittedRight[0].replace(/v=/g, ''));
    const vY = Number(splittedRight[1]);

    return { pX, pY, vX, vY };
  });

  for (let t = 0; t < maxTime; t++) {
    const positions = robots.map((robot) =>
      getLocations(robot.pX, robot.pY, robot.vX, robot.vY, width, height, t)
    );

    const varianceSpace = calculateSpaceVariance(positions);

    if (varianceSpace < minVariance) {
      minVariance = varianceSpace;
      minTime = t;
    }
  }

  return minTime;
}

await runSolution(day14b);
