// returns a function, using the parameter given to the sankey setting
export default function constant(x) {
  return function () {
    return x;
  };
}