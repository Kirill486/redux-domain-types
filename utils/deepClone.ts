// we'll replace it with more efficient implementation
export const deepClone = <Object extends {}>(object: Object) => {
  return JSON.parse(JSON.stringify(object));
}

