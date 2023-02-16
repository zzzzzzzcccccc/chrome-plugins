import hello from '../index';

describe('test hello', () => {
  it('work', () => {
    expect(hello(123213)).toEqual(123213);
  });
});
