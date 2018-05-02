const dom = {
	time : document.querySelector(".time"),
	gameButtons : document.querySelector("#gameButtons"),
	playButton : document.getElementById("playButton"),
	overlay : document.getElementById("overlay"),
	threeStars : document.querySelector('.threeStars'),
	twoStars : document.querySelector('.twoStars'),
	oneStar : document.querySelector('.oneStar'),
	reset : document.getElementById('reset'),
	cards : document.querySelectorAll('.card'),
	cardsContainer : document.getElementById('cardsContainer'),
	playAgain : document.querySelector("#playAgain"),
	winner : document.querySelector(".winner"),
	stopClick : document.querySelector(".stopClick")
}

const js = {
	cardDeck : ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8'],
	number : ['1', '1', '1', '1', '1', '1', '1', '1', '2', '2', '2', '2', '2', '2', '2', '2'],
	shuffledDeck : [],
	shuffledNumber : [],
	firstCard : "blank",
 	secondCard : "blank",
 	firstCardNumber : "blank",
 	secondCardNumber : "blank",
 	firstCardClass : "blank",
 	secondCardClass : "blank",
 	moves : 1,
 	timer : 0
}

const funcs = {
	increaseTime : function (){
			timer++;
			if(timer < 60){
				dom.time.innerText = timer;
			}
			else {
				const minutes = Math.floor(timer/60);
				let seconds = timer - (minutes * 60);
				if(seconds <10){
					seconds = `0${seconds}`;
				}
			dom.time.innerText = `${minutes}:${seconds}`
			}
		},
	resetGame : function (){
			location.reload();
		},
	clickToPlay : function(){
			timer = 0;
			dom.overlay.classList.add('noDisplay');
			dom.time.innerText = 0;
			setTimeout(function(){
				dom.time.classList.remove("noDisplay")}, 500);
		},
	starCheck : function(currentStars, newStars){
			document.querySelector(currentStars).classList.remove("displayBlock");
			document.querySelector(currentStars).classList.add("noDisplay");
			document.querySelector(newStars).classList.remove("noDisplay");
			document.querySelector(newStars).classList.add("displayBlock");
		},
	stopClickNoDisplay : function(){
			dom.stopClick.classList.add('noDisplay');
		}
}

//if a user has their device in portrait mode and it is wider than 600px add some margin to the top
if(window.innerHeight > window.innerWidth && window.innerWidth > 600){
    dom.gameButtons.style.marginTop = "5vh";
}

//print result of increaseTime function on page every second to keep track of time game is played
const timerInterval = setInterval(funcs.increaseTime, 1000);

//when playButton is clicked, remove overlay, show gameboard and start game
dom.playButton.addEventListener("click", funcs.clickToPlay);

//when reset button is clicked reset the game
dom.reset.addEventListener('click', funcs.resetGame);


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

//for loop to assign a shuffled class and number to each card on page
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
		dom.stopClick.classList.remove('noDisplay');
		setTimeout(funcs.stopClickNoDisplay, 600)
		front.classList.toggle('frontFlipped');
		back.classList.toggle('backFlipped');

	//if firstCard variable is blank, assign the card number to it and add other info about card to their variables
	if(js.firstCardClass === "blank"){
		js.firstCard = card;
		js.firstCardNumber = card.children[1].classList[2]
		js.firstCardClass = card.children[1].classList[1];
		card.classList.add('selected');
	}
	//otherwise assign the card number (and other variables) to the secondCard
	else{
		js.secondCard = card;
		js.secondCardNumber = card.children[1].classList[2]
		js.secondCardClass = card.children[1].classList[1];
		card.classList.add('selected');

		//check to see if the cards match
		if(js.firstCardClass === js.secondCardClass && js.firstCardNumber != js.secondCardNumber ){

			//if the cards match, add a 'matched' class to the cards
			const selected = document.querySelectorAll('.selected');
			selected[0].classList.add('matched');
			selected[1].classList.add('matched');

			}
		//create counter for the number of cards that are not matched
		let notMatched = 0;
		//set up next turn if there are still unmatched cards
		for (let k = 0; k < dom.cards.length; k++){
			//deselect all cards to start next turn
			dom.cards[k].classList.remove('selected');
			//if the card has a call matched
			if(dom.cards[k].classList[1] != "matched"){
				//increase the matched counter
				notMatched++;
				//set a timeout function to flip the cards back around after 1 second if they don't match
				setTimeout(function(){
					dom.cards[k].children[1].classList.remove('frontFlipped');
					dom.cards[k].children[0].classList.remove('backFlipped');
					}, 1000)
				}//end of if stmt
			}
		//if all of the cards are matched
		if(notMatched === 14){
			//display the winner pop up with the game data on it
			setTimeout(function(){
				const finalStars = document.querySelector(".stars").innerHTML;
				console.log(finalStars);
				document.querySelector("#gameTime").innerText =
				`${document.getElementById('timer').innerText}`;
				document.querySelector(".winStars").innerHTML = finalStars;
				dom.playAgain.addEventListener("click", funcs.resetGame);
				dom.winner.classList.remove("noDisplay");
			clearInterval(timerInterval);
			}, 500);

		};

		//show moves on page
		document.querySelector("#moves").innerText = `Moves:
			${js.moves}`;
		//if over 1 move go down to 2 stars
		if(js.moves > 1 && js.moves <= 3){
			funcs.starCheck(".threeStars", ".twoStars");
		}
		//if over 3 moves go down to 1 star
		else if (js.moves > 3 ){
			funcs.starCheck(".twoStars", ".oneStar");
		}
		js.firstCardClass = "blank";
		js.moves++;

	}
	};

});
// document.querySelector(".threeStars").classList.remove("displayBlock");
