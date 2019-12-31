import {Platform} from 'react-native';

const DEFAULT_STATUSBAR_HEIGHT_EXPO =
  global.__expo && global.__expo.Constants
    ? global.__expo.Constants.statusBarHeight
    : 0;

const DEFAULT_STATUSBAR_HEIGHT = Platform.select({
  android: DEFAULT_STATUSBAR_HEIGHT_EXPO,
  ios: Platform.Version < 11 ? DEFAULT_STATUSBAR_HEIGHT_EXPO : 0,
});

interface FilterProps {
  width?: number;
  height?: number;
}

export function getFilters(options?: FilterProps): string {
  const {width, height} = options || {};
  const filters = ['c_scale', 'q_auto', 'dpr_auto'];

  if (width) filters.push(`w_${width}`);
  if (height) filters.push(`h_${height}`);

  return filters.join(',');
}

export function buildImageUrl(name: string, options?: FilterProps): string {
  const filters = getFilters(options);
  return [
    'https://res.cloudinary.com/hoflish/image/upload',
    filters,
    `${name}.png`,
  ].join('/');
}

export default {
  avatarImageUrl: buildImageUrl('Avatar', {width: 60}),
  avatarImageSize: 60,
  buttonIconSize: 24,
  FABSize: 56,
  FABBorderRadius: 28,
  FABFixedHeight: 64,
  FABExtendedPadding: 24,
  ratingStarSize: 16,
  dividerLeftInset: 72,
  statusBarHeight: DEFAULT_STATUSBAR_HEIGHT,
};
