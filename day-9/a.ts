import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day9a(data: string[]) {
  const arr = data[0].split('').map(Number);
  const blocks = [];
  arr.forEach((el, index) => {
    for (let i = 1; i <= el; i++) {
      if (index % 2 === 0) {
        blocks.push(index / 2);
      } else {
        blocks.push('.');
      }
    }
  });

  let leftIndex = 0;
  let rightIndex = blocks.length - 1;

  while (leftIndex < rightIndex) {
    // 왼쪽에서 숫자를 찾음
    while (leftIndex < blocks.length && blocks[leftIndex] !== '.') {
      leftIndex++;
    }

    // 오른쪽에서 점을 찾음
    while (rightIndex >= 0 && typeof blocks[rightIndex] !== 'number') {
      rightIndex--;
    }

    // 조건: 왼쪽이 숫자이고 오른쪽이 점일 때만 교체
    if (leftIndex < rightIndex) {
      blocks[leftIndex] = blocks[rightIndex];
      blocks[rightIndex] = '.';
      leftIndex++;
      rightIndex--;
    } else {
      break;
    }
  }

  let checksum = 0;
  let index = 0;
  while (index < blocks.length && blocks[index] !== '.') {
    checksum += index * blocks[index];
    index++;
  }

  console.log(blocks);

  return checksum;
}

await runSolution(day9a);
