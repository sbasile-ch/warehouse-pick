import Utils    from './Utils.js';

export default class InvalidPickException extends Error {
    constructor(str) {
      //super(`${Utils.RED}${str}${Utils.END}`);
      super(str);
      this.name = this.constructor.name;
        this.stack = '';
    }
}
