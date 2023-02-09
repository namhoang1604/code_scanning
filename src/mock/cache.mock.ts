/**
 * The mock for cache
 */
export const cacheMock = {
  get: jest.fn(),
  set: jest.fn(),
  reset: jest.fn(),
  del: jest.fn(),
  wrap: jest.fn(),
};
