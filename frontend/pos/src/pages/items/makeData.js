import namor from "namor";
import Items from "./Items";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    // Name: namor.generate({ words: 1, numbers: 0 }),
    // lastName: namor.generate({ words: 1, numbers: 0 }),
    // age: Math.floor(Math.random() * 30),
    // visits: Math.floor(Math.random() * 100),
    // progress: Math.floor(Math.random() * 100),
    // status:
    //   statusChance > 0.66
    //     ? "relationship"
    //     : statusChance > 0.33
    //     ? "complicated"
    //     : "single",
    Name: "Mathew",
    barcode: "11111111111",
    category: "foodItems",
    costprice: "200",
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
