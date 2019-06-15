function greet(message: string): string {
  if (!message) {
    return 'You are anonymous!';
  } else {
    return `Hello, ${message}!!`;
  }
}

interface Test {
  property: boolean;
  count: number;
  name: string;
}

let count = 10;
const str = 'hoge';

if (10 === count) {
  count = 2;
  console.log(str);
}

const name = 'abc';

console.log(greet(name));

export default greet;
