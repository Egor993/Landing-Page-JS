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
	const modalTimerID = setTimeout(openModal, 3000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll); // Если один раз появилось, то больше не будет
		}
	}
	// Открывает окно, если пользователь долистал до конца страницы
	window.addEventListener('scroll', showModalByScroll);
});