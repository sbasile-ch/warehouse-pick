import Utils from './Utils.js';

export default class MapLists {

   #items;
   constructor() {
      this.items = new Map();
   }

   // add a new key, with an empty Map and return it
   add(key) {
      if (!this.items.has(key)) {
           this.items.set(key, new MapLists());
      }
      return this.items.get(key);
   }

   // sum items
   addItem(key, value) {
      if (!this.items.has(key)) {
           this.items.set(key, 0);
      }
      this.items.set(key, this.items.get(key) + value);
   }

   // return an array of couples key: value
   keysValues(sortFunction = Utils.sortArrayLexical) {
      return (this.items.size) ?
         Array.from(this.items).sort(sortFunction).map(([k, v]) => [k, v]) : [];
   }
}
