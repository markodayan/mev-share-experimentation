function groupBy<T>(arr: T[], fn: (item: T) => any) {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
}

function removeByIndices<T>(array: T[], indices: number[]): T[] {
  let sortedIndices = indices.sort((a, b) => b - a);
  for (let index of sortedIndices) {
    if (index > -1 && index < array.length) {
      array.splice(index, 1);
    }
  }
  return array;
}

export { groupBy, removeByIndices };
