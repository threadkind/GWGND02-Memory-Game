//card deck array
let cardDeck = ['card1', 'card1', 'card2', 'card2', 'card3', 'card3', 'card4', 'card4', 'card5', 'card5', 'card6', 'card6', 'card7', 'card7', 'card8', 'card8'];

//shuffle the cards........
//variable to hold the new shuffled deck
let shuffledDeck = [];

//for loop to....
for (let i = (cardDeck.length - 1); i >= 0; i--){
	//create a random number less than the length of the cardDeck
	const random = Math.floor(Math.random()*cardDeck.length);
	//put that card in the shuffledDeck...
	shuffledDeck.push(cardDeck[random]);
	//...and remove it from the cardDeck
	cardDeck.splice(random, 1);
}

//set variable for card container
const cardContain = document.getElementById('cardsContainer');

//add event delegation to the card container rather than each individual card
cardContain.addEventListener('click', function(e){
	//set variable for the card that was clicked
	const card = e.target.parentElement;
	//make sure we are clicking on an actual card and not somewhere else in the card container
	if (card.classList[0] === 'card') {
		//set variables for the front and back of the card
		const front = card.children[0];
		const back = card.children[1];

		//toggle css classes on the front and back of the cards to make them flip
		front.classList.toggle('frontFlipped');
		back.classList.toggle('backFlipped');
};


});