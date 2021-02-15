const Solve = () => {
  let data = require("./gc-data.json")["gc-data"];

  //only rotate 4 layers since bottom layer can be stationary
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12; j++) {
      for (let k = 0; k < 12; k++) {
        for (let l = 0; l < 12; l++) {
          if (Validate(data)) {
            console.log(data);
            return;
          } else RotateLevel(data, 4);
        }
        RotateLevel(data, 3);
      }
      RotateLevel(data, 2);
    }
    RotateLevel(data, 1);
  }
};

const Validate = (data) => {
  let valid = true;
  //look if columns add up to correct number
  for (let i = 0; i < 12; i++) {
    if (!CheckValidColumn(data, i)) {
      valid = false;
      break;
    }
  }
  return valid;
};

const CheckValidColumn = (data, col) => {
  let sum = 0;
  for (let i = 0; i < 4; i++) {
    sum += CalcColIndexNum(data, col, i);
  }
  return sum === 42;
};

const CalcColIndexNum = (data, col, index) => {
  let layer = 4; //start at topmost layer and work down
  while (data[layer][col][index] == 0 && layer >= 0) {
    layer--;
  }
  return data[layer][col][index];
};

const RotateLevel = (data, level) => {
  data[level].push(data[level].shift());
};

Solve();
