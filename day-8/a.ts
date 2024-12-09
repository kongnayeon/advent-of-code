import { runSolution } from '../utils.ts';

// 좌표가 지도 안에 있는지 확인하는 함수
function isWithinGrid([r, c]: number[], rows: number, cols: number) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

/** provide your solution as the return of this function */
export async function day8a(data: string[]) {
  const map = data.map((el) => el.split(''));
  const rows = map.length;
  const cols = map[0].length;
  const antennas = {};

  // 안테나 위치 저장
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = map[r][c];
      if (cell !== '.') {
        if (!antennas[cell]) antennas[cell] = [];
        antennas[cell].push([r, c]);
      }
    }
  }

  const antinodes = new Set();

  for (const frequency in antennas) {
    const positions = antennas[frequency];

    for (let i = 0; i < positions.length; i++) {
      for (let j = 0; j < positions.length; j++) {
        if (i === j) continue; // 같은 안테나는 제외

        const [r1, c1] = positions[i];
        const [r2, c2] = positions[j];

        // 1:2 비율 확인
        const dr = r2 - r1;
        const dc = c2 - c1;

        // 중간 지점 계산 (1:2 비율)
        const mid1 = [r1 - dr, c1 - dc]; // 한쪽 방향
        const mid2 = [r2 + dr, c2 + dc]; // 반대 방향

        // 지도 안에 위치한 경우만 추가
        if (isWithinGrid(mid1, rows, cols)) antinodes.add(mid1.toString());
        if (isWithinGrid(mid2, rows, cols)) antinodes.add(mid2.toString());
      }
    }
  }

  return antinodes.size; // 고유한 안티노드 개수 반환
}

await runSolution(day8a);
