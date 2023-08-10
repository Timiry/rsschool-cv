let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.main-menu');
menuBtn.addEventListener('click', function(){
	menu.classList.toggle('active');
	menuBtn.classList.toggle('active');
});

menu.addEventListener('click', event => {
	event._isClickWithInMenu = true;
	if(event.target.tagName === "A"){
		menu.classList.remove('active');
		menuBtn.classList.remove('active');	
	}
});
menuBtn.addEventListener('click', event => {
	event._isClickWithInMenu = true;
});

document.body.addEventListener('click', event => {
	if (event._isClickWithInMenu) return;
	menu.classList.remove('active');
	menuBtn.classList.remove('active');
});