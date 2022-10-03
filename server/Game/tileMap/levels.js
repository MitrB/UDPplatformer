let map0 = `\
11111\
1SSS1\
1SSS1\
1SSS1\
11111`;

let map1 = `\
11111111111111111111111111111\
10000000000000000000000000001\
1000000000S000000000000000001\
10000000011100000000000000S01\
10000000000000000000000000111\
100000000S0000011000000000001\
10000000011110000000000000111\
100S0000000000000010000S00001\
11111111111111111111111111111\
`;

let map2 = `\
11111111111111111111111111111\
10000000000000000000000000001\
10000000000000000000000000001\
10000000000000000000000000001\
1000S000000000000000000S00001\
10000000000000000000000000001\
10000000000000000000000000001\
10000000000000000000000000001\
11111111111111111111111111111\
`;

let map3 = `\
1111111111111111111111111111111111111111111111111111111111\
1000000000000000000000000000000000000000000000000000000001\
100000000S000000000000000000000100000000000000000000000001\
1000000001110000000000000000000000000011100000000000000001\
1000000000000000000001111000000000000000000000000000000011\
1000000000000000000000000000000100000000000000000000000001\
10000000011100000000000S0000000000000011100000000000000001\
1000000000000000000001111000000000000000000000000000000011\
1000000000S0000110000000000000000000000S000011000000000001\
1000000001111000000000000000S00000000011110000000000001111\
1000000000000000001000000001110000000000000000010000000001\
1111111111111111111111111111111111111111111111111111111111\
`;

let map4 = `\
1111111111111111111111111111111111111111111111111111111111\
1000000000000000000000000000000000000000000000000000000001\
1000000000S00000000000000000000100000000000000000000000001\
1000000001110000000000000000000010000000000000000000000001\
1000000001110000000000000001110000000001000000000011000001\
10000000000000000000011100000000000000000000S0000000000011\
1000000000000000000000001110000000000111111111111110000001\
1000000000000000000001111000000000000000000000000000000011\
10000000000S0001100000000000000000000000000011000000000001\
1000000001111000000000000000000000000000010000000000000011\
1000000000000000001000000001110000000000000000010000S00001\
1111111111111111111111111111111111111111111111111111111111\
`;

let map5 = `\
1111111111111111111111111111111111111111111111111111111111\
1000000000000000000000000000000000000000000000000000000001\
1000000000S00000000000000000000100000000000000000000000001\
1000000001110000000000000000000010000000000000000000000001\
1000000001110000000000000001110000000001000000000011000001\
10000000000000000000011100000000000000000000S0000000000011\
1000000000000000000000001110000000000111111111111110000001\
1000000000000000000001111000000000000000000000000000000011\
1000000000000001100000000000000000000000000011000000000001\
1000000001111000000000000000000000000000010000000000000011\
1000000000000000001000000001110000000000000000010000000001\
1000000000000000000000000000000000000000000000000000000001\
1000000000S00000000000000000000100000000000000000000000001\
1000000001110000000000000000000010000000000000000000000001\
1000000001110000000000000001110000000001000000000011000001\
10000000000000000000011100000000000000000000S0000000000011\
1000000000000000000000001110000000000111111111111110000001\
1000000000000000000001111000000000000000000000000000000011\
1000000000000001100000000000000000000000000011000000000001\
1000000001111000000000000000000000000000010000000000000011\
100000S000000000001000000001110000000000000000010000000001\
1111111111111111111111111111111111111111111111111111111111\
`;

let level0FromMap0 = {
  width: 5,
  height: 6,
  map: map0
};
let level1FromMap1 = {
  width: 29,
  height: 9,
  map: map1
};
let level2FromMap2 = {
  width: 29,
  height: 9,
  map: map2
};
let level3FromMap3 = {
  width: 58,
  height: 12,
  map: map3
};
let level4FromMap4 = {
  width: 58,
  height: 12,
  map: map4
};
let level5FromMap5 = {
  width: 58,
  height: 22,
  map: map5
};

let levels = {
  level0: level0FromMap0,
  level1: level1FromMap1,
  level3: level3FromMap3,
  level4: level4FromMap4,
  level5: level5FromMap5,
};

export function getRandomLevel() {
  let keys = Object.keys(levels);
  let randInt = (keys.length * Math.random()) << 0;
  return levels[keys[(keys.length * Math.random()) << 0]];
}
