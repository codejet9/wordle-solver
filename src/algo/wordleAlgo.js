import wordFreqData from '../assets/five_letter_possible_words.json'
import maxHeap from '../ds/maxheap';

var wordSpace = [];
var P = 0.00043308791684711995

for (const word in wordFreqData) {
  wordSpace.push(word)
}

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
      yellowLetters.push([wordData[i][1],i]);
    }
  }


  var updatedWordSpace = []
  for(let word of wordSpace){
    var ok = true;
    var exclusionListForGray = []

    for(let gl of greenLetters){
      if(word[gl[1]]!==gl[0]){
        ok=false; break;
      }
      exclusionListForGray.push(gl[0])
    }

    

    for(let e of yellowLetters){
      let j = word.indexOf(e[0]);

      if(j===-1){
        ok=false; break;
      }

      if(j===e[1]){
        ok=false; break;
      }

      exclusionListForGray.push(e[0])
    }


    for(let e of grayLetters){
      if(exclusionListForGray.includes(e)) continue;
      
      let j = word.indexOf(e);

      if(j!==-1){
        ok=false; break;
      }
    }


    if(ok){
      updatedWordSpace.push(word);
    }
  }

  wordSpace = updatedWordSpace;
  P = 1/wordSpace.length;
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
    const infoListSize = wordInfoList.size();

    const top10Words = [];
    for(let i=0;i<Math.min(10,infoListSize);i++){
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