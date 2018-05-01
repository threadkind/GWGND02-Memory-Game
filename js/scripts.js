const card = document.querySelector('.card');

card.addEventListener('click', function(){
	 document.querySelector('.cardFront').classList.toggle('frontFlipped');
	 document.querySelector('.cardBack').classList.toggle('backFlipped');
});