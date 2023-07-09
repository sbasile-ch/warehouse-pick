
import Utils      from './Utils.js';
import SinglePick from './SinglePick.js';
import MultiPick  from './MultiPick.js';
import {jest}     from '@jest/globals'

const TEST_CSV_IN    = 0;
const TEST_CSV_OUT   = 1

var   t = 1;

const SunnyDayData = {
   'test 1 line' : 
          ['26897,9,AL 2', 
           '26897,9,AL 2'],
   
   'test 3 lines added into 1' : 
          [`26897,9,AL 2
            26897,9,AL 2
            26897,9,AL 2`, 
          
           `26897,27,AL 2`],   
   
   'test 10 lines added into 1' : 
          [`26897,5,AL 2
            26897,5,AL 2
            26897,5,AL 2
            26897,5,AL 2
            26897,5,AL 2
            26897,5,AL 2
            26897,5,AL 2
            26897,5,AL 2
            26897,5,AL 2
            26897,5,AL 2`, 
           
           `26897,50,AL 2`],

    'test multi lines' : 
          [`15248,10,AB 10
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
            12879,12,AL 7`, 
      
           `25214,10,A 1
            30124,5,A 1
            25636,1,C 8
            15178,9,D 4
            12345,15,L 3
            23689,10,X 10
            12456,10,AB 9
            15248,15,AB 10
            52568,7,AB 10
            33331,6,AC 4
            36389,4,AC 5
            26982,1,AF 7
            23568,8,AH 8
            26897,9,AL 2
            12879,12,AL 7
            14789,3,AM 9
            11224,8,AZ 4
            88958,4,AZ 10`],

   'test multi lines with numeric sort' : 
          [`15248,10,AB 10
            36,1,C 8
            33331,6,AC 4
            12345,15,L 3
            3,1,C 8
            25636,1,C 8
            26982,1,AF 7
            52568,7,AB 10
            23568,8,AH 8
            26897,9,AL 2
            12456,10,AB 9
            36389,4,AC 5
            25214,10,A 1
            15248,5,AB 10
            23689,10,X 10
            11224,8,AZ 4,
            15178,9,D 4
            6,1,C 8
            30124,5,A 1
            88958,4,AZ 10
            14789,3,AM 9
            12879,12,AL 7`, 
         
           `25214,10,A 1
            30124,5,A 1
            3,1,C 8
            6,1,C 8
            36,1,C 8
            25636,1,C 8
            15178,9,D 4
            12345,15,L 3
            23689,10,X 10
            12456,10,AB 9
            15248,15,AB 10
            52568,7,AB 10
            33331,6,AC 4
            36389,4,AC 5
            26982,1,AF 7
            23568,8,AH 8
            26897,9,AL 2
            12879,12,AL 7
            14789,3,AM 9
            11224,8,AZ 4
            88958,4,AZ 10`],

   'test blank lines, spaces and comments' : 
            [`15248,10,AB 10

              36,1,C 8
                   33331,6,AC 4
               12345,15,L 3

              3,1,C 8
              25636,  1,  C   8
              26982,1,AF 7
                   52568  ,  7  ,  AB   10
                 23568,8,AH 8 some other txt here
              26897,9,AL 2  // a comment
              12456,10,AB 9
              36389,4,AC 5   # a comment
              25214,10,A 1
              15248,5,AB 10   /* a comment */
              23689,10,X 10
              11224,8,AZ 4,  <---- another comma
              15178,9,D 4
              6,1,C 8
              30124,5,A 1      q7646^&9£333 <>
              88958,4,AZ 10
              14789,3,AM 9
              12879,12,AL 7`, 
           
             `25214,10,A 1
              30124,5,A 1
              3,1,C 8
              6,1,C 8
              36,1,C 8
              25636,1,C 8
              15178,9,D 4
              12345,15,L 3
              23689,10,X 10
              12456,10,AB 9
              15248,15,AB 10
              52568,7,AB 10
              33331,6,AC 4
              36389,4,AC 5
              26982,1,AF 7
              23568,8,AH 8
              26897,9,AL 2
              12879,12,AL 7
              14789,3,AM 9
              11224,8,AZ 4
              88958,4,AZ 10`]
        };

       

const loggedLines = [];

const exceptionText = (str) => {
   str.replace(/\s+/g, ''); 
   `error parsing [${str}]. CSV should match ${SinglePick.regex}`
};

const initConsoleLogMock = () => {
  jest.spyOn(console, 'log').mockImplementation((...args) => {
    loggedLines.push(args.join(' '));
  });
};

const getLoggedLines = () => {
  let lines = loggedLines.join('\n');
  loggedLines.length = 0;
  return lines;
};

const testTitle = (test_key) => {return `test ${t++} - ${test_key}`}

const checkTest = (multiP, test_data) => {
   multiP.out(false,false);
   let expOut = test_data[TEST_CSV_OUT].replace(/\n\s+/g, '\n');
   let gotOut = getLoggedLines();
   expect(expOut).toBe(gotOut);
}

const runSunnyDay = () => {
   for (const [test_key, test_data] of Object.entries(SunnyDayData)) {
      let multiP = new MultiPick();
      initConsoleLogMock();
      test(testTitle(test_key), () => {
         const lines = test_data[TEST_CSV_IN].split('\n');
         for (const l of lines) {
            let pick = SinglePick.createSinglePick(l);
            if (pick !== null) {
               multiP.loadPick(pick);
            }
         }
         checkTest(multiP, test_data);
      });
   }
};

runSunnyDay();