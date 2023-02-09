import { Repository } from 'typeorm';
import { MockType } from './common.mock';

/**
 * The mock for repository
 */
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    save: jest.fn(),
    findOne: jest.fn((entity) => entity),
    update: jest.fn(),
  }),
);
