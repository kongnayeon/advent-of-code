import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day9b(data: string[]) {
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

  const files = [];

  let i = 0;

  while (i < blocks.length) {
    if (typeof blocks[i] === 'number') {
      const fileID = blocks[i];
      let size = 0;
      let startIndex = i;

      while (i < blocks.length && blocks[i] === fileID) {
        size++;
        i++;
      }

      files.push({ fileID, size, startIndex });
    } else {
      i++;
    }
  }

  files.sort((a, b) => b.fileID - a.fileID);

  for (const file of files) {
    const { fileID, size, startIndex } = file;

    let freeStart = -1;
    let freeSize = 0;

    for (let j = 0; j < startIndex; j++) {
      if (blocks[j] === '.') {
        if (freeSize === 0) freeStart = j; // 빈 공간 시작 위치
        freeSize++;
        if (freeSize === size) break;
      } else {
        freeStart = -1;
        freeSize = 0;
      }
    }

    if (freeSize === size) {
      for (let k = 0; k < size; k++) {
        blocks[freeStart + k] = fileID;
        blocks[startIndex + k] = '.';
      }
    }
  }

  let checksum = 0;
  let index = 0;
  while (index < blocks.length) {
    if (blocks[index] !== '.') checksum += index * blocks[index];
    index++;
  }

  return checksum;
}

await runSolution(day9b);
