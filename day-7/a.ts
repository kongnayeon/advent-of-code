import { runSolution } from '../utils.ts';

// 모든 연산자 조합 생성
const generateOperatorCombinations = (length: number) => {
  const operators = ['+', '*'];
  const results = [];

  const backtrack = (path) => {
    if (path.length === length) {
      results.push([...path]);
      return;
    }
    for (const op of operators) {
      path.push(op);
      backtrack(path);
      path.pop();
    }
  };

  backtrack([]);
  return results;
};

const calculate = (numbers: number[], operators: string[]) => {
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '+') {
      result += numbers[i + 1];
    } else if (operators[i] === '*') {
      result *= numbers[i + 1];
    }
  }
  return result;
};

/** provide your solution as the return of this function */
export async function day7a(data: string[]) {
  let answer = 0;

  data.forEach((el) => {
    const [result, numbers] = el.split(':');
    const parsedNumbers = numbers.trim().split(' ').map(Number);

    let isPossible = false;

    const operators = generateOperatorCombinations(parsedNumbers.length - 1);

    operators.forEach((op) => {
      if (calculate(parsedNumbers, op) === Number(result)) {
        isPossible = true;
      }
    });

    if (isPossible) answer += Number(result);
  });

  return answer;
}

await runSolution(day7a);
