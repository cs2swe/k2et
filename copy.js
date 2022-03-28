class Copier {

  constructor(arg) { // If no argument is given, `arg` will default to "undefined"
    this.arg = arg;
  }

  /**
   * Return a promise that resolves original variable after a sec
   * @return {Promise}
   */
  async get() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.arg;
  }

  /**
   * Return a promise that throws an error after 2 secs
   * @return {Promise}
   */
  async delete() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    throw new Error("Cannot delete!");
  }

  /**
   * Copy an object recursively
   * @private
   * @param {Object} src 
   * @returns {Object}
   */
  #deepCopy = src => {
    if (src === null) return null;
    let dest = Object.assign({}, src);

    Object.keys(dest).forEach(key => {
      dest[key] = typeof src[key] === "object" ? this.#deepCopy(src[key]) : src[key];
    });

    if (Array.isArray(src)) {
      dest.length = src.length;
      return Array.from(dest);
    }

    return dest;
  };

  /**
   * Copy the original value
   * @returns {*}
   */
  copy() {
    if (typeof this.arg === "object") return this.#deepCopy(this.arg);
    return this.arg;
  }

}

/**
 * Run tests
 */
const runTests = () => {
  // test cases
  const src1 = "Hello";
  const src2 = 100;
  let src3 = {
    key1: 1,
    key2: {
      subKey1: 1,
      subKey2: 2
    },
    key3: [1, 2, 3, 4, null]
  };

  let copier;

  // Test `copy` method
  copier = new Copier();
  console.log(copier.copy()); // => undefined

  copier = new Copier(src1);
  dest = copier.copy();
  console.log(src1 === dest); // => true

  copier = new Copier(src2);
  dest = copier.copy();
  console.log(src2 === dest); // => true

  copier = new Copier(src3);
  dest = copier.copy();
  dest.key2.subKey1 = 100;
  dest.key3.push(6);
  console.log(src3, dest); // changes to `dest` by two lines above should not affect `src3`

  // Test `get` method
  copier = new Copier();
  copier.get().then(res => console.log(res)); // => undefined (after 1 sec)

  copier = new Copier(src1);
  copier.get().then(res => console.log(res)); // => "string" (after 1 sec)

  // Test `delete` method
  copier = new Copier(src1);
  copier.delete(); // => throw an error with a "Cannot delete!" message (after 2 secs)
}

runTests();