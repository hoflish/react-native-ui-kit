interface FilterProps {
  width?: number;
  height?: number;
}

function getFilters(options: FilterProps): string {
  const {width, height} = options;
  const filters = ['c_scale', 'q_auto', 'dpr_auto'];

  if (width) filters.push(`w_${width}`);
  if (height) filters.push(`h_${height}`);

  return filters.join(',');
}

function buildImageUrl(options: FilterProps, name: string): string {
  const filters = getFilters(options);
  return [
    'https://res.cloudinary.com/hoflish/image/upload',
    filters,
    `${name}.png`,
  ].join('/');
}

export default {
  avatarImageUrl: buildImageUrl({width: 60}, 'Avatar'),
  avatarImageSize: 60,
  buttonIconSize: 24,
  FABSize: 56,
  FABBorderRadius: 28,
  FABFixedHeight: 64,
  FABExtendedPadding: 24,
};
