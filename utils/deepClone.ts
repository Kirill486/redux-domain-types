import * as rfdc from 'rfdc';

const clone = rfdc();

// we'll replace it with more efficient implementation
export const deepClone = <Object extends {}>(object: Object) => {
  return clone(object);
}

