var database = firebase.database();
getState();
var wholeQuestion = document.getElementById("questions");
var names = null;
var index = null;
var answer = null;
var input = document.getElementById("input1");
var submitButton = document.getElementById("submit");
var greeting = document.getElementById("greeting");
var waiting = document.getElementById("waiting");
var contestantCount = 0;
var answerCount = 0;
var allContestants;
var gameState = 0;
var p = document.getElementById("text");
var choose1 = document.getElementById("choose1");
var choose2 = document.getElementById("choose2");
var choose3 = document.getElementById("choose3");
var choose4 = document.getElementById("choose4");
var a = document.getElementById("a");
var b = document.getElementById("b");
var c = document.getElementById("c");
var d = document.getElementById("d");
var optA = document.getElementById("optA");
var optB = document.getElementById("optB");
var optC = document.getElementById("optC");
var optD = document.getElementById("optD");
getCount();

submitButton.onclick = function(){
  input.style.display = "none";
  submitButton.style.display = "none";
  p.style.display = "none";

  names = input.value;

  greeting.innerHTML = `Hello ${names}`;
  waiting.innerHTML = "Waiting for other players...";
  contestantCount += 1;
  index = contestantCount;
  update();
  updateCount(contestantCount);
  console.log(contestantCount);
}

function draw(){
getState();
getCount();
getAnswerCount();
if(contestantCount === 4){
  updateState(1);
}
if(gameState == 1){
  play();
  input.style.display = "none";
  submitButton.style.display = "none";
  p.style.display = "none";
}

}

function update(){
  var index1 = 'Contestants/Contestant' + index;
  database.ref(index1).set({
      'Name': names,
      'Answer': ""
  });
}

function updateCount(count){
  database.ref('/').update({
      'contestantCount': count
  });
}

function getCount(){
  var contestantCountRef = database.ref('contestantCount');
  contestantCountRef.on('value', (data) => {
      contestantCount = data.val();
  })
}

function updateAnswerCount(count){
  database.ref('/').update({
    'answerCount': count
  })
}

function getAnswerCount(){
  var answerCountRef = database.ref('answerCount');
  answerCountRef.on("value", (data)=>{
    answerCount = data.val();
  })
}

function getContestantInfo(){
  var contestantInfo = database.ref('Contestants')
  contestantInfo.on("value",(data)=>{
    allContestants = data.val();
  })
}

function updateAnswer(answer1){
    var stringInfo = "Contestants/Contestant" + index;
    database.ref(stringInfo).update({
        'Answer': answer1
    })
}

function play(){
  getContestantInfo();
  greeting.style.display = "none";
  waiting.style.display = "none";
  wholeQuestion.style.display = "block";
  choose1.onclick = function(){
    answer = "a";
    updateAnswer("a");
    choose1.style.display = "none";
    choose2.style.display = "none";
    choose3.style.display = "none";
    choose4.style.display = "none";
    a.style.display = "none";
    b.style.display = "none";
    c.style.display = "none";
    d.style.display = "none";
    waiting.style.display = "block";
    answerCount = answerCount + 1;
    updateAnswerCount(answerCount);
    optA.style.color = "rgb(0, 200, 0)";
  }
  choose2.onclick = function(){
    answer = "b";
    updateAnswer("b");
    choose1.style.display = "none";
    choose2.style.display = "none";
    choose3.style.display = "none";
    choose4.style.display = "none";
    a.style.display = "none";
    b.style.display = "none";
    c.style.display = "none";
    d.style.display = "none";
    waiting.style.display = "block";
    answerCount = answerCount + 1;
    updateAnswerCount(answerCount);
    choose2.onclick = "none";
    optB.style.color = "red";
    optA.style.color = "rgb(0, 200, 0)";
  }
  choose3.onclick = function(){
    answer = "c";
    updateAnswer("c");
    choose1.style.display = "none";
    choose2.style.display = "none";
    choose3.style.display = "none";
    choose4.style.display = "none";
    a.style.display = "none";
    b.style.display = "none";
    c.style.display = "none";
    d.style.display = "none";
    waiting.style.display = "block";
    answerCount = answerCount + 1;
    updateAnswerCount(answerCount);
    choose3.onclick = "none";
    optA.style.color = "rgb(0, 200, 0)";
    optC.style.color = "red";
  }
  choose4.onclick = function(){
    answer = "d";
    updateAnswer("d");
    choose1.style.display = "none";
    choose2.style.display = "none";
    choose3.style.display = "none";
    choose4.style.display = "none";
    a.style.display = "none";
    b.style.display = "none";
    c.style.display = "none";
    d.style.display = "none";
    waiting.style.display = "block";
    answerCount = answerCount + 1;
    updateAnswerCount(answerCount);
    choose4.onclick = "none";
    optA.style.color = "rgb(0, 200, 0)";
    optD.style.color = "red";
  }
}

function result(){

}

function getState(){
  var gameStateRef = database.ref('gameState');
  gameStateRef.on("value", (data)=>{
    gameState = data.val();
  })
}

function updateState(state){
  database.ref('/').update({
    'gameState': state
  })
}