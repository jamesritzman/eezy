import { expect, afterEach, afterAll, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});


// Mock response for the initial request for all breeds info
const allBreeds = {
  message: {
    "foo": ["bar", "baz"]
  }
};

const poodleImages = {
  message: []
};

export const restHandlers = [
  rest.get('https://dog.ceo/api/breed/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(allBreeds))
  }),
  rest.get('https://dog.ceo/api/breed/poodle/images', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(poodleImages))
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
