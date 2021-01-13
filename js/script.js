'use strict';

document.addEventListener('DOMContentLoaded', () => {
	// Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
	tabsContent = document.querySelectorAll('.tabcontent'),
	tabsParent = document.querySelector('.tabheader__items');
	
	function hideTabContent() {
		tabsContent.forEach(item => {
			item.style.display = 'none';
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}
	function showTabContent(i = 0) {
		tabsContent[i].style.display = 'block';
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target; // Чтобы каждый раз не прописывать event.target

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	//Timer
	const deadline = '2021-01-10';

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

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		}
		else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock () {
			const t = getTimeRemaining(endtime)

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);

	// Modal
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalClose = document.querySelector('[data-close]');

	function openModal() {
		modal.classList.add('show');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerID); // Отменяем таймер, если уже открыли окно
	}

	function closeModal() {
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}
	// Если нажали на кнопку - показать модельное окно
	modalTrigger.forEach((item, i) => {
		modalTrigger[i].addEventListener('click', openModal)
	});
	// Если нажали закрыть - окно закроета
	modalClose.addEventListener('click', closeModal);
	// Если нажали на внешнюю область - окно закроется
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();	
		}
	});
	// Если нажали ESC - окно закроется
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();	
		}
	});
	// Делаем таймер на появление окна
	// const modalTimerID = setTimeout(openModal, 3000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll); // Если один раз появилось, то больше не будет
		}
	}
	// Открывает окно, если пользователь долистал до конца страницы
	window.addEventListener('scroll', showModalByScroll);

	//Menu card
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 75;
			this.changeToRUB();
		}

		changeToRUB() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			element.innerHTML = `
			<div class="menu__item">
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
			</div>
		</div>
			`;
			this.parent.append(element);
		}
	}

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		100,
		'.menu .container'
	).render();

	// Slider
	const slides = document.querySelectorAll('.offer__slide'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current');
	let slideIndex = 1;
	console.log(prev);

	showSlides(slideIndex);

	if(slideIndex.length < 10) {
		total.textContent = `0${slides.length}`;
	}
	else {
		total.textContent = slides.length;
	}

	function showSlides(n) {
		if(n > slides.length) { // Делает смену позиции слайдов
			slideIndex = 1;
		}
		if(n < 1) {
			slideIndex = slides.length;
		}
		slides.forEach(item => item.style.display = 'none'); // Перебирает все слайды и скрывает их
		slides[slideIndex -1].style.display = 'block'; // Показывает нужный слайд

		if(slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		}
		else {
			current.textContent = slideIndex;
		}
	}

	function plusSlides(n){
		showSlides(slideIndex += n);
	}

	prev.addEventListener('click', () => {
		plusSlides(-1);
	});
	next.addEventListener('click', () => {
		plusSlides(1);
	});
});