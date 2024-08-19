export function mergeClasses(defaultClass, ...additionalClasses) {
  return [defaultClass, ...additionalClasses.filter(Boolean)].join(' ');
}
