import { runSolution } from '../utils.ts';

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

/** provide your solution as the return of this function */
export async function day14a(data: string[]) {
  let quadrant1 = 0;
  let quadrant2 = 0;
  let quadrant3 = 0;
  let quadrant4 = 0;

  const width = 101;
  const height = 103;

  data.forEach((data) => {
    const [left, right] = data.split(' ');
    const splittedLeft = left.split(',');
    const splittedRight = right.split(',');
    const pX = Number(splittedLeft[0].replace(/p=/g, ''));
    const pY = Number(splittedLeft[1]);
    const vX = Number(splittedRight[0].replace(/v=/g, ''));
    const vY = Number(splittedRight[1]);

    const [x, y] = getLocations(pX, pY, vX, vY, width, height, 100);

    if (!(x === Math.floor(width / 2) || y === Math.floor(height / 2))) {
      if (x < Math.floor(width / 2) && y < Math.floor(height / 2)) {
        quadrant1++;
      } else if (x > Math.floor(width / 2) && y < Math.floor(height / 2)) {
        quadrant2++;
      } else if (x < Math.floor(width / 2) && y > Math.floor(height / 2)) {
        quadrant3++;
      } else if (x > Math.floor(width / 2) && y > Math.floor(height / 2)) {
        quadrant4++;
      }
    }
  });

  return quadrant1 * quadrant2 * quadrant3 * quadrant4;
}

await runSolution(day14a);
