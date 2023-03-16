import { findArgOfType } from '@src/app/utils/mixin.utils';

describe('Mixin Utils', () => {
  it('should throw an error', () => {
    expect(() => findArgOfType([], String, true)).toThrowError();
  });
});
