export default class SinglePickupRequest {

  constructor (prodCode,quantity,bay,shelf) {
        this.prodCode = prodCode;
        this.quantity = quantity;
        this.bay      = bay;
        this.shelf    = shelf;
  }  
  
  static createSingleRequest (str) {
    let err_msg = '';
    try {
      str = str.replace(/\s+/g, '');  // we don't want/need any space
                            // pcode | qua. |   bay      | shelf          
      let results = str.match(/^(\d+),(\d+),([A-Z]|A[A-Z])(\d+)/);
      if (results != null) {
        return new SinglePickupRequest (results[1],
                                        parseInt(results[2]),
                                        results[3],
                                        parseInt(results[4]));
      }
    }
    catch(err) { err_msg = err.message; }

    console.log(`error parsing [${str}] ${err_msg}`);
    return null;
  }
}