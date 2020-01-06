import {getFilters, buildImageUrl} from '../components/Config';

describe('getFilters()', () => {
  it('Should returns default filters', () => {
    expect(getFilters()).toBe('c_scale,q_auto,dpr_auto');
  });

  it('Should returns joined default and optional filters', () => {
    expect(getFilters({width: 50, height: 50})).toBe(
      'c_scale,q_auto,dpr_auto,w_50,h_50',
    );
  });
});

describe('buildImageUrl()', () => {
  it('Should returns an image URL', () => {
    expect(buildImageUrl('Avatar')).toBe(
      'https://res.cloudinary.com/hoflish/image/upload/c_scale,q_auto,dpr_auto/Avatar.png',
    );
  });
});
