import InvalidPickException from './InvalidPickException.js';

export default class SinglePick {

   // define the regex to validate any CSV pick
   //               pcode | qua. |   bay      | shelf
   static regex = '^(\\d+),(\\d+),([A-Z]|A[A-Z])(10|[1-9])';

   constructor(prodCode, quantity, bay, shelf) {
      this.prodCode = prodCode;
      this.quantity = quantity;
      this.bay      = bay;
      this.shelf    = shelf;
   }

   // class factory. Return a new SinglePick if CSV palyoad is valid
   static createSinglePick(line) {
      try {
         line = line.replace(/\s+/g, '');  // we don't want/need any space
         if (line !== "")
         {
            let results = line.match(new RegExp(SinglePick.regex));
            if (results != null) {
               return new SinglePick(results[1],
                                    parseInt(results[2]),
                                    results[3],
                                    results[4]);
            }
            throw new InvalidPickException(`error parsing [${line}]. CSV should match ${SinglePick.regex}`);
         }
      }
      catch (err) { console.log(err.message) }
      return null;
   }
}
