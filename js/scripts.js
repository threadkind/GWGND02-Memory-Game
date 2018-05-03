const dom = {
	time : document.querySelector('.time'),
	gameButtons : document.querySelector('#game-buttons'),
	playButton : document.getElementById('play-button'),
	overlay : document.getElementById('overlay'),
	threeStars : document.querySelector('.three-stars'),
	twoStars : document.querySelector('.two-stars'),
	oneStar : document.querySelector('.one-star'),
	reset : document.getElementById('reset'),
	cards : document.querySelectorAll('.card'),
	cardsContainer : document.getElementById('cards-container'),
	playAgain : document.querySelector('#play-again'),
	winner : document.querySelector('.winner'),
	stopClick : document.querySelector('.stop-click'),
	audioButton : document.querySelector('#audio-button'),
	soundEffects : document.querySelector('.sound-effects'),
	noSound : document.querySelector('.no-sound'),
	gameSound : document.querySelector('#game-sound'),
	newRecord : document.querySelector('.new-record')
};

const js = {
	cardDeck : ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8'],
	number : ['1', '1', '1', '1', '1', '1', '1', '1', '2', '2', '2', '2', '2', '2', '2', '2'],
	shuffledDeck : [],
	shuffledNumber : [],
	firstCard : 'blank',
 	secondCard : 'blank',
 	firstCardNumber : 'blank',
 	secondCardNumber : 'blank',
 	firstCardClass : 'blank',
 	secondCardClass : 'blank',
 	moves : 1,
 	timer : 0,
 	currentCalcTime : "0"
 };

const funcs = {
	increaseTime : function (){
			js.timer++;
			funcs.calcTime(js.timer);
			dom.time.innerText = js.currentCalcTime;
		},
	calcTime : function(timeToCalc){
			if(timeToCalc < 60){
				js.currentCalcTime = `${timeToCalc}`;
				}
			else {
				const minutes = Math.floor(timeToCalc/60);
				let seconds = timeToCalc - (minutes * 60);
				if(seconds < 10){
					seconds = `0${seconds}`;
					}
				js.currentCalcTime = `${minutes}:${seconds}`;
				}
		},
	resetGame : function (){
			location.reload();
		},
	clickToPlay : function(){
			js.timer = 0;
			dom.overlay.classList.add('no-display');
			dom.time.innerText = 0;
			setTimeout(function(){
				dom.time.classList.remove('no-display')}, 500);
		},
	starCheck : function(currentStars, newStars){
			document.querySelector(currentStars).classList.remove('display-block');
			document.querySelector(currentStars).classList.add('no-display');
			document.querySelector(newStars).classList.remove('no-display');
			document.querySelector(newStars).classList.add('display-block');
		},
	stopClickNoDisplay : function(){
			dom.stopClick.classList.add('no-display');
		},
	toggleSound : function(){
			dom.soundEffects.classList.toggle('no-display');
			dom.noSound.classList.toggle('no-display');
		},
	playGameSound : function(){
			dom.gameSound.play();
		}
};

//if a user has their device in portrait mode and it is wider than 600px add some margin to the top
if(window.innerHeight > window.innerWidth && window.innerWidth > 600){
    dom.gameButtons.style.marginTop = '5vh';
}

//print result of increaseTime function on page every second to keep track of time game is played
const timerInterval = setInterval(funcs.increaseTime, 1000);

//when playButton is clicked, remove overlay, show gameboard and start game
dom.playButton.addEventListener('click', funcs.clickToPlay);

//when reset button is clicked reset the game
dom.reset.addEventListener('click', funcs.resetGame);

//when sound button is pressed toggle sound
dom.audioButton.addEventListener('click', funcs.toggleSound);

//**********SHUFFLE THE CARDS**********
//for loop to....
for (let i = (js.cardDeck.length - 1); i >= 0; i--){
	//...create a random number less than the length of the cardDeck
	const random = Math.floor(Math.random()*js.cardDeck.length);
	//put that card in the shuffledDeck with its number...
	js.shuffledDeck.push(js.cardDeck[random]);
	js.shuffledNumber.push(js.number[random]);
	//...and remove it from the cardDeck
	js.cardDeck.splice(random, 1);
	js.number.splice(random, 1);
}

//loop to assign a shuffled class and number to each card on page
for (let j = 0; j < dom.cards.length; j++){
	dom.cards[j].children[1].classList.add(js.shuffledDeck[j], js.shuffledNumber[j]);
}

//cards are now randomly assigned on the screen
//********** END OF CARD SHUFFLE**********


//**********FLIP CARDS IF THEY ARE CLICKED...**********
//add event delegation to the card container rather than each individual card
dom.cardsContainer.addEventListener('click', function(e){
	//set variables for the card that was clicked
	const card = e.target.parentElement;
	const front = card.children[1];
	const back = card.children[0];

	//make sure we are clicking on an actual card and not somewhere else in the card container (and that if it is a card that it has not already been matched)
	if (card.classList[0] === 'card' && card.classList[1] != 'matched') {

		//toggle css classes on the front and back of the cards to make them flip so we can see the front of the card and add overlay to page so player doesn't click on next card too soon
		dom.stopClick.classList.remove('no-display');
		setTimeout(funcs.stopClickNoDisplay, 500)
		front.classList.toggle('frontFlipped');
		back.classList.toggle('backFlipped');

		//if firstCard variable is blank, assign the card number to it and add other info about card to their variables
		if(js.firstCardClass === 'blank'){
			js.firstCard = card;
			js.firstCardNumber = card.children[1].classList[2];
			js.firstCardClass = card.children[1].classList[1];
			card.classList.add('selected');
		}
		//otherwise assign the card number (and other variables) to the secondCard
		else{
			js.secondCard = card;
			js.secondCardNumber = card.children[1].classList[2];
			js.secondCardClass = card.children[1].classList[1];
			card.classList.add('selected');

			//check to see if the cards match and if they do add a 'matched' class
			const selected = document.querySelectorAll('.selected');

			if(js.firstCardClass === js.secondCardClass && js.firstCardNumber != js.secondCardNumber ){

				//add correct sound if audio is on
				if(dom.soundEffects.classList.item(1) === null){
					funcs.playGameSound();
				}

				//add matched class
				selected[0].classList.add('matched');
				selected[1].classList.add('matched');
			}

			//create counter for the number of cards that are not matched
			let notMatched = 0;

			//set up next turn if there are still unmatched cards
			for (let k = 0; k < dom.cards.length; k++){
				//deselect all cards to start next turn
				dom.cards[k].classList.remove('selected');
				//if the card does not have the matched class...
				if(dom.cards[k].classList[1] != 'matched'){
					//...increase the matched counter
					notMatched++;

					//set a timeout function to flip the cards back around after 0.8 seconds if they don't match
					setTimeout(function(){
						dom.cards[k].children[1].classList.remove('frontFlipped');
						dom.cards[k].children[0].classList.remove('backFlipped');
						}, 800)
				}//end of if stmt
			}//end of for

				//if all of the cards are matched
				if(notMatched === 14){
					//display the winner pop up with the game data on it
					setTimeout(function(){
						clearInterval(timerInterval); //stop timer
						const finalTime = document.querySelector('.time').innerText;
						const finalStars = document.querySelector('.stars').innerHTML; //add final stars

						//check for best time with local storage
						const localTime = localStorage.getItem('bestTime');
						funcs.calcTime(localTime);

						document.querySelector('.win-stars').innerHTML = finalStars;
						dom.playAgain.addEventListener('click', funcs.resetGame); //add play again button

						//check current time against what is stored in local storage
						if(localTime === null || js.timer < localTime){
							document.querySelector('#game-time').innerText = `Your Time: ${finalTime}
								Best Time: ${finalTime}`; //display final and best times
							localStorage.setItem('bestTime', js.timer); // set local storage to new record
							dom.newRecord.classList.remove('no-display'); //show new record banner
						}
						else {
							document.querySelector('#game-time').innerText = `Your time: ${finalTime}
							Best Time: ${js.currentCalcTime}`; //show current and best scores on winner popup
						}

						dom.winner.classList.remove('no-display'); //show winner popup

					}, 300);

		};

		//whether cards are matched or not...
		//show moves on page
		document.querySelector('#moves').innerText = `Moves:
			${js.moves}`;

		//check for the correct number of stars
		//if over 1 move go down to 2 stars
		if(js.moves > 15 && js.moves <= 22){
			funcs.starCheck('.three-stars', '.two-stars');
		}
		//if over 3 moves go down to 1 star
		else if (js.moves > 22 ){
			funcs.starCheck('.two-stars', '.one-star');
		}

		//reset firstCardClass
		js.firstCardClass = 'blank';

		js.moves++;
	}
  	};

});
