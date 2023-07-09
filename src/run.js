#!/usr/bin/env node

import Utils      from './lib/Utils.js';
import SinglePick from './lib/SinglePick.js';
import MultiPick  from './lib/MultiPick.js';

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });
//_____________________________
async function run() {

   let multiP = new MultiPick();
   rl.on('line', l => {
      try {
         if (l !== Utils.HEADER) {
            let pick = SinglePick.createSinglePick(l);
            if (pick !== null) {
                multiP.loadPick(pick)
            }
         }
      }
      catch (err) { console.log(`err:${err.message}`) }
   });
   rl.once('close', () => {
      rl.close();
      multiP.out();
   });
}

run();
