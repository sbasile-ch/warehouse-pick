import Utils      from './Utils.js';

export default class MapLists {

  constructor () {
     this.items = new Map();
  }

  add(key) {
    if (!this.items.has(key)) {
        this.items.set(key, new MapLists());
    }
    return this.items.get(key);
  }

  addItem(key, value) {
    if (!this.items.has(key)) {
        this.items.set(key, 0);
    }
    this.items.set(key, this.items.get(key) + value);
  }

  keysValues(sortFunction = Utils.sortLexical) {
    return (this.items.size) ?
    Array.from(this.items).sort(sortFunction).map(([k, v]) => [k, v]) : [];
  }

}
