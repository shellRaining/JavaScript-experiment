function deepClone (obj, hash = new WeakMap()) {
  if (obj instanceof Date){ return new Date(obj); } 
  if (obj instanceof RegExp){ return new RegExp(obj);     }
  if (hash.has(obj)){ return hash.get(obj); }

  let allDesc = Object.getOwnPropertyDescriptors(obj);
  
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
  hash.set(obj, cloneObj)

  for (let key of Reflect.ownKeys(obj)) { 
    if(typeof obj[key] === 'object' && obj[key] !== null){
     cloneObj[key] = deepClone(obj[key], hash);
    } else {
     cloneObj[key] = obj[key];
    }
  }
  return cloneObj
}

const obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
};

const obj2 = deepClone(obj);
obj2.b.c = 4;
console.log(obj, obj2);
