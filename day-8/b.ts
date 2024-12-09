import { runSolution } from '../utils.ts';

// 두 점 사이의 모든 좌표를 Set에 추가하는 함수
function addLineAntinodes(
  r1: number,
  c1: number,
  r2: number,
  c2: number,
  rows: number,
  cols: number,
  antinodes: Set<string>
) {
  const mNumerator = c1 - c2; // 기울기의 분자
  const mDenominator = r1 - r2; // 기울기의 분모

  const bNumerator = c1 * mDenominator - mNumerator * r1; // 절편의 분자
  const bDenominator = mDenominator; // 절편의 분모

  console.log(
    'm:',
    `${mNumerator}/${mDenominator}`,
    'b:',
    `${bNumerator}/${bDenominator}`
  );

  for (let x = 0; x < cols; x++) {
    const yNumerator = mNumerator * x + bNumerator;
    const yDenominator = bDenominator;

    // 점 (x, y)가 방정식을 만족하는지 확인
    // y가 정수가 되는지 확인
    if (yNumerator % yDenominator === 0) {
      const y = yNumerator / yDenominator;
      if (y >= 0 && y < rows) {
        console.log(x, y);
        antinodes.add(`${x},${y}`);
      }
    }
  }
}

/** provide your solution as the return of this function */
export async function day8b(data: string[]) {
  const map = data.map((el) => el.split(''));
  const rows = map.length;
  const cols = map[0].length;
  const antennas: Record<string, [number, number][]> = {};
  const antinodes = new Set<string>();

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

  console.log(antennas);

  // 각 주파수별 안티노드 계산
  for (const frequency in antennas) {
    const positions = antennas[frequency];

    console.log('antenna', frequency, positions);

    // 모든 안테나 자체를 추가
    positions.forEach(([r, c]) => antinodes.add(`${r},${c}`));

    // 모든 안테나 쌍 처리
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [r1, c1] = positions[i];
        const [r2, c2] = positions[j];

        console.log(`(${r1}, ${c1}) <-> (${r2}, ${c2})`);

        // 두 점 사이의 모든 좌표를 추가
        addLineAntinodes(r1, c1, r2, c2, rows, cols, antinodes);
      }
    }
  }

  console.log(antinodes);

  for (const antinode of antinodes) {
    const [x, y] = antinode.split(',').map(Number);

    if (map[x][y] !== '0' && map[x][y] !== 'A') {
      map[x][y] = '#';
    }
  }

  console.log(map);

  return antinodes.size; // 고유한 안티노드 개수 반환
}

await runSolution(day8b);
