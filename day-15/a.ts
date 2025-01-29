import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day15a(data: string[]) {
  console.log(data);
  const walls = new Set();
  let boxes = new Set();
  let robot = { x: 0, y: 0 };
  const map: string[][] = [];
  const moves: string[][] = [];

  data.forEach((line, index) => {
    const row = line.split('');

    row.forEach((el, rowIndex) => {
      if (el === '@') {
        robot.x = rowIndex;
        robot.y = index;
      } else if (el === '#') {
        walls.add(`${rowIndex},${index}`);
      } else if (el === 'O') {
        boxes.add(`${rowIndex},${index}`);
      }
    });
  });

  console.log(map, moves, robot);

  moves.forEach((move) =>
    move.forEach((el) => {
      if (el === '<') {
        const x = robot.x - 1;
        const y = robot.y;

        if (walls.has(`${x},${y}`) || boxes.has(`${x},${y}`)) {
        }
        // x - 1 , y 그대로가 .이면 그대로 이동
        // # 이면 현재 좌표 유지
        // O 이면 O의 왼쪽 다 확인해서 .이나 # 찾기
        // .이면 거기 .까지 있는 O 다 밀고
        // #이면 멈추거나 거기까지 다 밀고
      }
    })
  );

  return 0;
}

await runSolution(day15a);
