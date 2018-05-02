//*******************shuffle the cards........

//card deck array
const cardDeck = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8'];
const number = ['1', '1', '1', '1', '1', '1', '1', '1', '2', '2', '2', '2', '2', '2', '2', '2']

//variable to hold the new shuffled deck
const shuffledDeck = [];
const shuffledNumber = [];
//for loop to....
for (let i = (cardDeck.length - 1); i >= 0; i--){
	//...create a random number less than the length of the cardDeck
	const random = Math.floor(Math.random()*cardDeck.length);
	//put that card in the shuffledDeck with its number...
	shuffledDeck.push(cardDeck[random]);
	shuffledNumber.push(number[random]);
	//...and remove it from the cardDeck
	cardDeck.splice(random, 1);
	number.splice(random, 1);
}

//get all cards
const cards = document.querySelectorAll('.card');
//for loop to assign a shuffled class to each card
for (let j = 0; j < cards.length; j++){
	cards[j].children[1].classList.add(shuffledDeck[j], shuffledNumber[j]);
}
//cards are now randomly assigned on the screen
// **********************end of shuffle cards

// **********************flip cards if they are clicked......
//set variable for card container
const cardContain = document.getElementById('cardsContainer');
//set variable for first card and second cards clicked clicked
let firstCard = "blank";
let secondCard = "blank";
let firstCardNumber = "blank";
let secondCardNumber = "blank";
let firstCardClass = "blank";
let secondCardClass = "blank"
//add event delegation to the card container rather than each individual card
cardContain.addEventListener('click', function(e){
	//set variable for the card that was clicked
	const card = e.target.parentElement;
	//set variables for the front and back of the card
	const front = card.children[1];
	const back = card.children[0];
	console.log(e.target);
	//make sure we are clicking on an actual card and not somewhere else in the card container (and that it has not already been matched)
	if (card.classList[0] === 'card' && card.classList[1] != 'matched') {

		//toggle css classes on the front and back of the cards to make them flip
		front.classList.toggle('frontFlipped');
		back.classList.toggle('backFlipped');
};
	//if firstCard variable is blank, assign the card number to it
	if(firstCardClass === "blank"){
		firstCard = card;
		firstCardNumber = card.children[1].classList[2]
		firstCardClass = card.children[1].classList[1];
		card.classList.add('selected');
	}
	//otherwise assign the card number to the secondCard
	else{
		secondCard = card;
		secondCardNumber = card.children[1].classList[2]

		secondCardClass = card.children[1].classList[1];
		card.classList.add('selected');

		//check to see if the cards match
		if(firstCardClass === secondCardClass && firstCardNumber != secondCardNumber ){

			//if the cards match, add a 'matched' class to the cards
			console.log(`It's a match!!  ${firstCardClass}`);
			const selected = document.querySelectorAll('.selected');
			selected[0].classList.add('matched');
			selected[1].classList.add('matched');

			}
		else {
			console.log("Doesn't match :(");
		}
		for (let k = 0; k < cards.length; k++){
				cards[k].classList.remove('selected');
				if(cards[k].classList[1] != "matched"){
					setTimeout(function(){
						cards[k].children[1].classList.remove('frontFlipped');
						cards[k].children[0].classList.remove('backFlipped');
					}, 1000)
				}
			}

		firstCardClass = "blank"

	}

});