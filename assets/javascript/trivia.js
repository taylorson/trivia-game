$(document).ready(function(){
var triviaGame = {

//Q&As
	qAndA:[{
		question: "What is the name of the 'cunning house where people who 'will do anything to achieve their ends' are sorted?",
			ans1: "Ravenclaw",
			ans2: "Gryffindor",
			ans3: "Slytherin",
			ans4: "Hufflepuff",
			imgUrl: "./assets/images/slytherin.png"},
	   {
	   	question: "What is the name of the vicious tree that Harry and Ron drove into in 'Harry Potter and the Chamber of Secrets'?",
			ans1: "Rufus the Birch",
			ans2: "The Whomping Willow",
			ans3: "Astounding Appleseed",
			ans4: "The Dark Mark",
			imgUrl: "./assets/images/willow.jpeg"},
		{
	   	question: "What is Dumbledore's full name?",
			ans1: "Dick Tracey",
			ans2: "Albus Percival Wulfric Brian Dumbledore",
			ans3: "Albus Percy Wolfgang Brock Dumbledore",
			ans4: "Albus Brandon Alexander Dumbledore",
			imgUrl: "./assets/images/albus.jpeg"},
	   {
	   	question: "What is the symbol for Ravenclaw house?",
			ans1: "Badger",
			ans2: "Eagle",
			ans3: "Snake",
			ans4: "Lion",
			imgUrl: "./assets/images/eagle.png"},
		{
		question: "What is the name of the wizards prison?",
		    ans1: "Camelot",
		    ans2: "Hogwarts",
		    ans3: "Azkaban",
		    ans4: "Alcatraz",
			imgUrl: "./assets/images/azkaban.jpeg"}],

	correctAnswers: ['Slytherin', 'The Whomping Willow', 'Albus Percival Wulfric Brian Dumbledore', 'Eagle', 'Azkaban'],//array to hold correct answers
	userAnswers: [],

	questionCount: 0,
	beginInt: 0,

	timer: 30,
	btnClicked: false,
	numberCorrect: 0,
	numberIncorrect: 0,
	numberUnAnswered: 0,
	playMusic: new Audio("./assets/sounds/quizsound.mp3"),

	beginGame: function(){
		triviaGame.playMusic.play();	
		if(triviaGame.questionCount == triviaGame.qAndA.length){

			triviaGame.gameFinished();
			triviaGame.timer = 30;

		} else {

			if(triviaGame.questionCount >= 1){
				clearInterval(triviaGame.displayNextInt);
				$('#gameStart').show();
				$('#divAnswers').hide();
				triviaGame.timer = 30;
				$('#time').html(triviaGame.timer); //??
			}

			$('p.questions').html(triviaGame.qAndA[triviaGame.questionCount].question);
			$('button.answer1').html(triviaGame.qAndA[triviaGame.questionCount].ans1);
			$('button.answer2').html(triviaGame.qAndA[triviaGame.questionCount].ans2);
			$('button.answer3').html(triviaGame.qAndA[triviaGame.questionCount].ans3);
			$('button.answer4').html(triviaGame.qAndA[triviaGame.questionCount].ans4);

			triviaGame.beginInt = setInterval(triviaGame.countDown, 1000);

		}

	},
//Count down timer 
	countDown: function(){

		triviaGame.timer--;
		$('#time').html(triviaGame.timer);

		if(triviaGame.timer == 0){

			triviaGame.oufOfTime();
			triviaGame.playMusic.pause();

		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] == triviaGame.userAnswers[triviaGame.questionCount]){
		
			triviaGame.answersCorrect();
			triviaGame.playMusic.play();

		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] != triviaGame.userAnswers[triviaGame.questionCount]){

			triviaGame.answersWrong();
			triviaGame.playMusic.pause();
		}

	},
//If option by player is correct
	answersCorrect: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').hide();	
		$('#correctMsg').show();
		$('#pCorrectAnswer').hide();	
		$('#answers').css('display', 'block');
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);

		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '130px','height', '130px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);		
		triviaGame.btnClicked = false;

		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 3000);
		triviaGame.numberCorrect++;
		triviaGame.questionCount++;
	},
//if options by user is incorrect
	answersWrong: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').show();
		$('#correctMsg').hide();
		$('#pCorrectAnswer').show();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);
		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		triviaGame.btnClicked = false;
		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);
		triviaGame.numberIncorrect++;
		triviaGame.questionCount++;
	},
//If the player is out of time 
	oufOfTime: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		triviaGame.userAnswers.push(""); 
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#pCorrectAnswer').show();
		$('#correctMsg').hide();
		$('#wrongMsg').hide();		
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);	
		clearInterval(triviaGame.beginInt);
		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		triviaGame.numberUnAnswered++;

		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);

		triviaGame.questionCount++;	

	},
//Restart function
	restart: function(){

		triviaGame.questionCount = 0;
		triviaGame.userAnswers.length = 0;
		$('#time').html("30");

		triviaGame.beginGame();
		$('#gameStart').show();
		$('#gameComplete').hide();
		$('#restartPlaceholder').css('display', 'none');
		clearInterval(triviaGame.displayNextInt);
		$('#elapsedTime').empty();
		triviaGame.numberCorrect = 0;
		triviaGame.numberIncorrect = 0;
		triviaGame.numberUnAnswered = 0;
	},
//Game Ends - Resets the DOM
	gameFinished: function(){

		$('#restartPlaceholder').css('display', 'block');
		$('#divAnswers').hide();
		$('#gameStart').hide();

		$('#gameComplete').css('display', 'block');

		$('#gameOverCorrect span').html(triviaGame.numberCorrect);
		$('#gameOverIncorrect span').html(triviaGame.numberIncorrect);
		$('#unanswered span').html(triviaGame.numberUnAnswered);
		triviaGame.timer = 30;
	}
};



//Game begins
	$('#begin').on('click', function(){

		$('div#gameStart').css('display', 'block');
		$('#btnWrapper').css('display', 'none');
		$('.questions').html(triviaGame.beginGame);

	});
//once the player hits options
	$('.answers').on('click', function(){

		triviaGame.userAnswers.push($(this).text());
		triviaGame.btnClicked = true;

	});
//restarts
	$('#restartPlaceholder').on('click', function(){

		triviaGame.restart();
		
	});


});//End 