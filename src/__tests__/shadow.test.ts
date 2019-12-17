import shadow from '../styles/shadow';

describe('shadow()', () => {
  const shadowStyle = {
    shadowColor: '#000000',
    shadowOpacity: 0.24,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowRadius: 0,
  };

  it('should has default elevation param', () => {
    expect(shadow()).toEqual(shadowStyle);
  });

  it('should returns shadow style for specified elevation', () => {
    expect(shadow(1)).toEqual({
      ...shadowStyle,
      shadowOffset: {
        width: 0,
        height: 0.5,
      },
      shadowRadius: 0.75,
    });
  });
});
