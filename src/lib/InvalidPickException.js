import Utils    from './Utils.js';

// custom exception for SinglePick validation
export default class InvalidPickException extends Error {
    constructor(str) {
      super(`${Utils.RED}${str}${Utils.END}`);
      this.name = this.constructor.name;
      this.stack = '';
    }
}
