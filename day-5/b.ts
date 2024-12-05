import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day5b(data: string[]) {
  const separatorIndex = data.indexOf('');
  const orderingArr = data.slice(0, separatorIndex);
  const updateArr = data.slice(separatorIndex + 1);
  let result = 0;

  const orderMap = {};
  orderingArr.forEach((order) => {
    const [from, to] = order.split('|').map(Number);
    if (!orderMap[from]) orderMap[from] = new Set();
    orderMap[from].add(to);
  });

  updateArr.forEach((el) => {
    const pages = el.split(',').map(Number);

    let isValid = true;

    for (let i = 1; i < pages.length; i++) {
      if (orderMap[pages[i]] && orderMap[pages[i]].has(pages[i - 1])) {
        isValid = false;
        continue;
      }
    }

    if (!isValid) {
      pages.sort((a, b) => {
        if (orderMap[b] && orderMap[b].has(a)) {
          return 1;
        }

        if (orderMap[a] && orderMap[a].has(b)) {
          return -1;
        }

        return 0;
      });

      const middlePage = pages[Math.floor(pages.length / 2)];

      result += middlePage;
    }
  });

  return result;
}

await runSolution(day5b);
