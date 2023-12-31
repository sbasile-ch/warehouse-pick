export default class Utils {

   static HEADER = 'product_code,quantity,pick_location';

   static GREEN  = "\x1b[32m";
   static PURPLE = "\x1b[35m";
   static RED    = "\x1b[31m";
   static END    = "\x1b[0m";
   static NO_COL = '';

   // strip color formatting from a string
   static stripFormat (str) {
      return str.replace(/\x1b\[[0-9;]*[a-zA-Z]/g,'');
   }

   // custom lexical sort (i.e. B comes first than AB) on an input array
   static sortArrayLexical(a, b) {
      let k1 = a[0];
      let k2 = b[0]
      if (k1.length < k2.length) {
         return -1;  // (n)-letter strings come first than (n+)-letter strings
      } else if (k1.length > k2.length) {
         return 1;
      } else {
         return k1.toString().localeCompare(k2); // default Lexical sort
      }
   }

   // default numeric sort on an input array
   static sortArrayNumeric(strA, strB) {
      return parseInt(strA[0]) - parseInt(strB[0]);
   }
}
