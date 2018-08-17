function merge(first, second) {
  var len = second.length;
  var j = 0;
  var i = first.length;
  while (j < len) {
    first[i++] = second[j++];
  }
  if (len !== len) {
    while (second[j] !== undefined) {
      first[i++] = second[j++];
    }
  }
  first.length = i;
  return first;
}
console.log(merge([0, 1, 2], [1, 2, 3]));
