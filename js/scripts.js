//*******************shuffle the cards........

//card deck array
const cardDeck = ['card1', 'card1', 'card2', 'card2', 'card3', 'card3', 'card4', 'card4', 'card5', 'card5', 'card6', 'card6', 'card7', 'card7', 'card8', 'card8'];

//variable to hold the new shuffled deck
const shuffledDeck = [];

//for loop to....
for (let i = (cardDeck.length - 1); i >= 0; i--){
	//...create a random number less than the length of the cardDeck
	const random = Math.floor(Math.random()*cardDeck.length);
	//put that card in the shuffledDeck...
	shuffledDeck.push(cardDeck[random]);
	//...and remove it from the cardDeck
	cardDeck.splice(random, 1);
}

//get all cards
const cards = document.querySelectorAll('.card');
//for loop to assign a shuffled class to each card
for (let j = 0; j < cards.length; j++){
	cards[j].children[0].classList.add(shuffledDeck[j]);
}
//cards are now randomly assigned on the screen
// **********************end of shuffle cards

// **********************flip cards if they are clicked......
//set variable for card container
const cardContain = document.getElementById('cardsContainer');
//set variable for first card clicked
let firstCard = "blank";
let secondCard = "blank"
//add event delegation to the card container rather than each individual card
cardContain.addEventListener('click', function(e){
	//set variable for the card that was clicked
	const card = e.target.parentElement;
	//set variables for the front and back of the card
	const front = card.children[0];
	const back = card.children[1];
	console.log(front);
	console.log(back);

	//make sure we are clicking on an actual card and not somewhere else in the card container (and that it has not already been matched)
	if (card.classList[0] === 'card' && card.classList.length === 1) {

		//toggle css classes on the front and back of the cards to make them flip
		front.classList.toggle('frontFlipped');
		back.classList.toggle('backFlipped');
};
	//if firstCard variable is blank, assign the card number to it
	if(firstCard === "blank"){
		firstCard = card.children[0].classList[1];
		console.log(firstCard);
	}
	//otherwise assign the card number to the secondCard
	else{
		secondCard = card.children[0].classList[1];
		console.log(secondCard);
		//check to see if the cards match
		if(firstCard === secondCard){
			//if the cards match, add a 'matched' class to the card
			console.log(`It's a match!!  ${firstCard}`);
			const matched = document.getElementsByClassName(firstCard);
			matched[0].parentElement.classList.add('matched');
			matched[1].parentElement.classList.add('matched');
		}
		else {
			console.log("Doesn't match :(");
		}
		firstCard = "blank"
	}

});