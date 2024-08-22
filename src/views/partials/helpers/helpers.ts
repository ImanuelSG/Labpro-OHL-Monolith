export function mergeClasses(
  defaultClass: string,
  ...additionalClasses: (string | undefined)[]
): string {
  return [defaultClass, ...additionalClasses.filter(Boolean)].join(' ');
}

export function range(start: number, end: number): number[] {
  const array = [];
  for (let i = start; i < end; i++) {
    array.push(i);
  }
  return array;
}

export function isPartialStar(starNumber: number, rating: number): boolean {
  return rating > starNumber && rating < starNumber + 1;
}

export function getPartialStarOpacity(starNumber, rating) {
  if (isPartialStar(starNumber, rating)) {
    return (rating - Math.floor(rating)).toFixed(2);
  }
  return 0;
}

export function lt(a: number, b: number): boolean {
  return a < b;
}

export function slice(array: any[], start: number, end: number): any[] {
  return array.slice(start, end);
}

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(secs).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function roundToTwoDecimals(num: number) {
  return num.toFixed(2);
}
