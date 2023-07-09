
import Utils    from './Utils.js';
import MapLists from './MapLists.js';

const KEY = 0
const VAL = 1

export default class MultiPick extends MapLists {

   // add nested structure bay -> shelf -> [product, quantity]
   loadPick(pick) {
      this.add(pick.bay).
      add(pick.shelf).
      addItem(pick.prodCode, pick.quantity);
   }

   // define where to dump
   print(str) { console.log(str) }

   // dump the whole nested structure
   out(headerOn = true) {
      let colH = Utils.PURPLE, colCSV = Utils.GREEN, colEND = Utils.END;
      if (headerOn) { this.print(`${colH}${Utils.HEADER}${colEND}`) }
      this.keysValues(Utils.sortCustomLexical).forEach(bay => {
         bay[VAL].keysValues(Utils.sortArrayNumeric).forEach(shelf => {
            shelf[VAL].keysValues(Utils.sortArrayNumeric).forEach(product => {
               this.print(`${colCSV}${product[KEY]},${product[VAL]},${bay[KEY]} ${shelf[KEY]}${colEND}`);
            });
         });
      });
   }
}
