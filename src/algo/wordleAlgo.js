import wordFreqData from '../assets/five_letter_possible_words.json'
import maxHeap from '../ds/maxheap';

var wordSpace = [];
const P = 0.00043308791684711995

for (const word in wordFreqData) {
  wordSpace.push(word)
}



// function filterWords(grayLetters, yellowLetters, greenLetters){
//   const filteredWordsList = [];

//   for(let word of wordSpace){
//     var ok=true;

//     for(let l of grayLetters){
//       const idx = word.indexOf(l);

//       if(idx!==-1){
//         ok=false;
//         break;
//       }
//     }

//     for(let gl of greenLetters){
//       if(word[gl[1]]!==gl[0]){
//         ok=false;
//         break;
//       }
//     }

//     for(let l of yellowLetters){
//       const idx = word.indexOf(l);

//       if(idx===-1){
//         ok=false;
//         break;
//       }
//     }

//     if(ok) filteredWordsList.push(word);
//   }

//   return filteredWordsList;
// }





// function calcEntropy(word){

//   var entropy = 0;

//   //0 -> gray ; 1-> yellow ; 2 -> green
//   for(let a=0;a<3;a++){
//     for(let b=0;b<3;b++){
//       for(let c=0;c<3;c++){
//         for(let d=0;d<3;d++){
//           for(let e=0;e<3;e++){

//             const greenLetters = []
//             const yellowLetters =[]
//             const grayLetters = []

//             if(a===0) grayLetters.push(word[0]);
//             if(a===1) yellowLetters.push(word[0]); 
//             if(a===2) greenLetters.push([word[0],0]); 

//             if(b===0) grayLetters.push(word[1]);
//             if(b===1) yellowLetters.push(word[1]); 
//             if(b===2) greenLetters.push([word[1],1]); 

//             if(c===0) grayLetters.push(word[2]);
//             if(c===1) yellowLetters.push(word[2]); 
//             if(c===2) greenLetters.push([word[2],2]); 

//             if(d===0) grayLetters.push(word[3]);
//             if(d===1) yellowLetters.push(word[3]); 
//             if(d===2) greenLetters.push([word[3],3]); 

//             if(e===0) grayLetters.push(word[4]);
//             if(e===1) yellowLetters.push(word[4]); 
//             if(e===2) greenLetters.push([word[4],4]); 


//             const filteredWordsList = filterWords(grayLetters, yellowLetters, greenLetters);
            
//             var p = P('') * filteredWordsList.length;
//             // for(let word of filteredWordsList){
//             //   p += P(word);
//             // }
//             entropy += p * log2(1/p);
//           }
//         }
//       }
//     }
//   }

//   return entropy;
// }

function log2(x){
  return Math.log2(x);
}

function filterWordSpace(wordData){
  const greenLetters = [];
  const grayLetters = [];
  const yellowLetters = [];

  for(let i=0;i<5;i++){
    if(wordData[i][0]==='green'){
      greenLetters.push([wordData[i][1],i]);
    }
    else if(wordData[i][0]==='gray'){
      grayLetters.push(wordData[i][1])
    }
    else{
      yellowLetters.push(wordData[i][1]);
    }
  }


  var updatedWordSpace = []
  for(let word of wordSpace){
    var ok = true;

    for(let gl of greenLetters){
      if(word[gl[1]]!==gl[0]){
        ok=false; break;
      }
    }

    for(let e of grayLetters){
      let j = word.indexOf(e);

      if(j!==-1){
        ok=false; break;
      }
    }

    for(let e of yellowLetters){
      let j = word.indexOf(e);

      if(j===-1){
        ok=false; break;
      }
    }


    if(ok){
      updatedWordSpace.push(word);
    }
  }

  wordSpace = updatedWordSpace;
}

function getPattern(word1, word2) {
  var pattern = ["0", "0", "0", "0", "0"]; // 0 -> gray; 1 -> yellow; 2 -> green

  for (let i = 0; i < 5; i++) {
    if (word1[i] === word2[i]) {
      pattern[i] = '2';
      word1[i] = 'X';
      word2[i] = 'Y';
    }
  }

  for (let i = 0; i < 5; i++) {
    let c = word1[i];

    let j = word2.indexOf(c);
    if (j !== -1) {
      pattern[i] = '1';
      word2[j] = 'Y';
    }
  }

  return pattern.join('');
}



function calcInfo(){
  var wordInfoList = new maxHeap();

  for(let mainWord of wordSpace){
    const patternList = {};

    for(let matchWord of wordSpace){
      const pattern = getPattern(mainWord.split(''), matchWord.split(''));

      if(patternList[pattern]===undefined){
        patternList[pattern] = 1;
      }
      else{
        patternList[pattern] += 1;
      }
    }

    var entropy = 0;
    for(let pattern in patternList){
      let matchingWords = patternList[pattern];
      let p = matchingWords * P;
      entropy += p * log2(1/p);
    }

    const wordEntity = [];
    wordEntity.push(entropy);
    wordEntity.push(mainWord);
    wordEntity.push(wordFreqData[mainWord]);

    wordInfoList.push(wordEntity);
  }
  return wordInfoList;
}



const wordleSolver = (wordData) => {
  if(wordData.length === 0){
    //inital table -> 0th step
    const wordInfoList = calcInfo();

    const top10Words = [];
    for(let i=0;i<10;i++){
      var wordEntity = wordInfoList.pop();

      //swap 0 and 1 pos
      let temp = wordEntity[0];
      wordEntity[0] = wordEntity[1];
      wordEntity[1] = temp;

      top10Words.push(wordEntity);
    }

    return top10Words;
  }
  else{
    filterWordSpace(wordData);

    const wordInfoList = calcInfo();
    wordInfoList.show();

    const top10Words = [];
    for(let i=0;i<9;i++){
      var wordEntity = wordInfoList.pop();

      //swap 0 and 1 pos
      let temp = wordEntity[0];
      wordEntity[0] = wordEntity[1];
      wordEntity[1] = temp;

      top10Words.push(wordEntity);
    }

    return top10Words;
  }
}

export default wordleSolver;