import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should not truncate when under the limit', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform(null as any)).toBeNull();
    expect(pipe.transform('')).toEqual('');
    expect(pipe.transform('less than 20')).toEqual('less than 20');
  });

  it('should use custom ellipsis', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform('stars are falling', false, 5, '*')).toEqual(
      'stars*'
    );
  });

  it('should truncate when above the limit', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform('more than 4', false, 5)).toEqual('more...');
  });

  it('should truncate from start when requested', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform('I want to keep only the end', true, 7)).toEqual(
      '...the end'
    );
  });
});
