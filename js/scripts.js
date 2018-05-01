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