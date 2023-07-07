import Utils               from './lib/Utils.js';
import SinglePickupRequest from './lib/SinglePickupRequest.js';
import MapLists               from './lib/MapLists.js';

import * as readline     from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import util from 'util';

const GREEN = "\x1b[32m";
const END   = "\x1b[0m";
const rl    = readline.createInterface({ input, output, terminal: false });

const KEY = 0
const VAL = 1
//_____________________________
async function run (col=GREEN){

  let order = new MapLists();
  rl.on('line', l => {
    try {
      let singleReq = SinglePickupRequest.createSingleRequest(l);
      if (singleReq !== null) {
         console.log(`${col}Prod:${singleReq.prodCode},Q:${singleReq.quantity},Bay:${singleReq.bay},Shelf:${singleReq.shelf}${END}`);
         order.add(singleReq.bay).add(singleReq.shelf).addItem(singleReq.prodCode,singleReq.quantity);
      }
    }
    catch(err) {console.log(`err:${err.message}`);}
  });
  rl.once('close', () => {
    rl.close();
        order.keysValues().forEach(bay => {
          bay[VAL].keysValues(Utils.sortNumeric).forEach(shelf => {
              shelf[VAL].keysValues(Utils.sortNumeric).forEach(product => {
                  console.log(`${product[KEY]},${product[VAL]},${bay[KEY]} ${shelf[KEY]}`);
              }); 
          }); 
        }); 
    });         
}

run();

/*
product_code,quantity,pick_location
15248,10,AB 10
25636,1,C 8
26982,1,AF 7
36389,4,AC 5
25214,10,A 1  
15248,5,AB 10
23689,10,X 10
11224,8,AZ 4,
15178,9,D 4
30124,5,A 1
88958,4,AZ 10
14789,3,AM 9
33331,6,AC 4
52568,7,AB 10
23568,8,AH 8
26897,9,AL 2
12456,10,AB 9
12345,15,L 3
12879,12,AL 7
*/