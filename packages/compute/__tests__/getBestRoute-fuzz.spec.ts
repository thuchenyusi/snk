import { getBestRoute } from "../getBestRoute";
import { snake3 } from "@snk/types/__fixtures__/snake";
import {
  getHeadX,
  getHeadY,
  Snake,
  snakeWillSelfCollide,
} from "@snk/types/snake";
import { createFromSeed } from "@snk/types/__fixtures__/createFromSeed";

const n = 1000;
const width = 5;
const height = 5;
it(`should find solution for ${n} ${width}x${height} generated grids`, () => {
  const results = Array.from({ length: n }, (_, seed) => {
    const grid = createFromSeed(seed, width, height);

    try {
      const chain = getBestRoute(grid, snake3);

      assertValidPath(chain);

      return { seed };
    } catch (error) {
      return { seed, error };
    }
  });

  expect(results.filter((x) => x.error)).toEqual([]);
});

const assertValidPath = (chain: Snake[]) => {
  for (let i = 0; i < chain.length - 1; i++) {
    const dx = getHeadX(chain[i + 1]) - getHeadX(chain[i]);
    const dy = getHeadY(chain[i + 1]) - getHeadY(chain[i]);

    if (!((Math.abs(dx) === 1 && dy == 0) || (Math.abs(dy) === 1 && dx == 0)))
      throw new Error(`unexpected direction ${dx},${dy}`);

    if (snakeWillSelfCollide(chain[i], dx, dy)) throw new Error(`self collide`);
  }
};
