'use strict';

document.addEventListener('DOMContentLoaded', () => {
	// Tabs
	const tabsItems = document.querySelectorAll('.tabheader__item');
	const tabsImg = document.querySelectorAll('.tabcontent');
	// Скрывает все изображения
	tabsImg.forEach((item, i) => {
		if (i > 0){
			item.style.display = 'none';
		}
	});

	function hideImg() {
		tabsImg.forEach((el) =>{
			el.style.display = 'none';;
		});
	};

	function hideTab() {
		tabsItems.forEach((el) =>{
			el.classList.remove('tabheader__item_active');
		});
	};
	// Показывает нужный таб и img
	tabsItems.forEach((item, i) => {
		item.addEventListener('click', () => {
			hideTab();
			hideImg();
			tabsImg[i].style.display = 'block';
			item.classList.add('tabheader__item_active');
		});
	});

	// Timer
	const deadline = '2021-01-17';

	const timer = document.querySelector('.timer'),
		days = timer.querySelector('#days'),
		hours = timer.querySelector('#hours'),
		minutes = timer.querySelector('#minutes'),
		seconds = timer.querySelector('#seconds');

	function getTimeRemaining(endtime){
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)), // Получем скоько дней осталось до окончания
			hours = Math.floor((t / (1000 * 60 * 60) % 24)), // Делим общее кол-во часов на 24 и берем остаток, который
			// как раз и будет кол-вом оставшихся часов
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);
		
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds	
		};
	}
	const getTime = getTimeRemaining(deadline);

	function getZero(i){
		if (i < 10 && i != 0){
			return `0${i}`;
		}
		else {
			return i;
		}
	};

	function updateClock() {
		const t = getTimeRemaining(deadline);
		days.innerHTML = getZero(t.days);
		hours.innerHTML = getZero(t.hours);
		minutes.innerHTML = getZero(t.minutes);
		seconds.innerHTML = getZero(t.seconds);
	};

	if (getTime.total > 0) { // Обновляем таймер, если он не дошел до 0
		updateClock()
		setInterval(updateClock, 1000);
	}

	// Modal
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalClose = document.querySelector('[data-close]');

	function showModal() {
		modal.classList.add('show');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimer); // Отменяем таймер, если уже открыли окно
	}
	// Показываем окно, если кликнули по триггеру
	modalTrigger.forEach((item) =>{
		item.addEventListener('click', showModal)	
	});

	function closeModal() {
		modal.classList.remove('show');
		document.body.style.overflow = '';
	};

	modalClose.addEventListener('click', closeModal)
	// Если нажали на внешнюю область - окно закроется
	modal.addEventListener('click', (e) =>{
		if(e.target === modal){
			closeModal()
		}
	});
	// Если нажали escape - окно закроется
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();	
		}
	});
	// Через 10с окно откроется
	// const modalTimer = setTimeout(showModal, 10000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			showModal();
			window.removeEventListener('scroll', showModalByScroll); // Если один раз появилось, то больше не будет
		}
	}

	// Открывает окно, если пользователь долистал до конца страницы
	window.addEventListener('scroll', showModalByScroll);

	// Menu card
	// Копируем нужную карточку
	const menuItem = document.querySelector('.menu__item').cloneNode(true),
		contain = document.querySelector('[data-contain]');
	// Вставляем код в скопированную карточку
	menuItem.innerHTML=`<div class="menu__item">
	<img src="img/tabs/vegy.jpg" alt="vegy">
	<h3 class="menu__item-subtitle">Меню "Фитнес 2"</h3>
	<div class="menu__item-descr">Меню "Фитнес 2" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!</div>
	<div class="menu__item-divider"></div>
	<div class="menu__item-price">
		<div class="menu__item-cost">Цена:</div>
		<div class="menu__item-total"><span>450</span> руб/день</div>
	</div>
	</div>`;
	// Добавляем карточку на страницу
	contain.appendChild(menuItem);

	// SimpleSlider

	// const slides = document.querySelectorAll('.offer__slide'),
	// 	total = document.querySelector('#total'),
	// 	current = document.querySelector('#current'),
	// 	next = document.querySelector('.offer__slider-next'),
	// 	prev = document.querySelector('.offer__slider-prev');

	// total.innerHTML = `0${slides.length}`;

	// function showSlide(num) {
	// 	slides.forEach((item) => {
	// 			item.style.display = 'none';
	// 	});
	// 	current.innerHTML = `0${num + 1}`;
	// 	slides[num].style.display = 'block'
	// };

	// let curr = 0;
	// showSlide(curr)

	// next.addEventListener('click', () => {
	// 	if (curr < 3) {
	// 		curr++;
	// 		showSlide(curr);
	// 	}
	// 	else{
	// 		curr = 0;
	// 		showSlide(curr);
	// 	}
	// });

	// prev.addEventListener('click', () => {
	// 	if (curr > 0) {
	// 		curr--;
	// 		showSlide(curr);
	// 	}
	// 	else{
	// 		curr = 3;
	// 		showSlide(curr);
	// 	}
	// });

	// SliderCarousel

	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		next = document.querySelector('.offer__slider-next'),
		prev = document.querySelector('.offer__slider-prev'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 0,
		offset = 0;

	current.innerHTML = `0${slideIndex + 1}`;
	total.innerHTML = `0${slides.length}`;

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden'; // Скрываем элементы, которые не попадают в область видимости

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		dots = [];
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);
	// Получаем кол-во точек и добавляем их на страницу
	for(let i = 0; i < slides.length; i++){ 
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	next.addEventListener('click', () => {
		if(offset === +width.replace(/\D/g, '') * (slides.length - 1)) { // Если пролистали до конца, то возвращаем в начало
			offset = 0;
		}
		else {
			offset += +width.replace(/\D/g, '')
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex < 3) {
			slideIndex++;
			current.innerHTML = `0${slideIndex + 1}`;
		}
		else {
			slideIndex = 0;
			current.innerHTML = `0${slideIndex + 1}`;
		}

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex].style.opacity = 1;
	});

	prev.addEventListener('click', () => {
		if(offset == 0) { // Если хотим пролистать в конец
			offset = +width.replace(/\D/g, '') * (slides.length - 1);
		}
		else {
			offset -= +width.replace(/\D/g, '')
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex > 0) {
			slideIndex--;
			current.innerHTML = `0${slideIndex + 1}`;
		}
		else {
			slideIndex = 3;
			current.innerHTML = `0${slideIndex + 1}`;
		}

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex].style.opacity = 1;
	});

	dots.forEach(dot =>{
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to')

			offset = +width.replace(/\D/g, '') * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			dots.forEach(dot => dot.style.opacity = '.5');
			dots[slideTo -1].style.opacity = 1;

			current.innerHTML = `0${+slideTo}`;
		});
	});

});