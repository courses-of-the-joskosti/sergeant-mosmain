import { Accordion, Tab } from './classes.js';
const root = document.getElementsByTagName('html')[0];
// accordions
const accordionTop = new Accordion('.accBtn');
const accordionBottom = new Accordion('.accBtn-bottom');
accordionTop.showOne();
accordionTop.closeButton('.closeTopAccordions');
accordionBottom.showAll();
accordionBottom.closeButton('.closeBottomAccordions');
// tabs
const tabsTop = new Tab('.tabsExample', '.tabLink', '.tabContent');
const tabsBottom = new Tab('.tabsExample-bottom', '.tabLink-bottom', '.tabContent-bottom');
tabsTop.show();
tabsBottom.show();
// burger button and menu
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuLink = document.querySelector('.menu-links');
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
    root.classList.toggle('overflow-hidden');
});
menuLink.addEventListener('click', (event) => {
    if (event.target.matches('li a')) {
        menuBtn.classList.remove('active');
        menu.classList.remove('active');
        root.classList.remove('overflow-hidden');
    }
});
// slider
const productContainers = document.querySelectorAll('.product-container');
const nxtBtn = document.querySelectorAll('.nxt-btn');
const preBtn = document.querySelectorAll('.pre-btn');
productContainers.forEach((item, i) => {
    let containerDimensions = item.firstElementChild.getBoundingClientRect();
    let containerWidth = containerDimensions.width;
    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    });
    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    });
});
// inf carousel
let slider = document.getElementById('slider'), sliderItems = document.getElementById('slides'), prev = document.getElementById('prev'), next = document.getElementById('next');
function slide(wrapper, items, prev, next) {
    let posX1 = 0, posX2 = 0, posInitial, posFinal, threshold = 100, slides = items.getElementsByClassName('slide'), slidesLength = slides.length, slideSize = items.querySelectorAll('.slide')[0].offsetWidth, firstSlide = slides[0], lastSlide = slides[slidesLength - 1], cloneFirst = firstSlide.cloneNode(true), cloneLast = lastSlide.cloneNode(true), index = 0, allowShift = true;
    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');
    // Mouse events
    items.onmousedown = dragStart;
    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);
    // Click events
    prev.addEventListener('click', () => shiftSlide(-1, null));
    next.addEventListener('click', () => shiftSlide(1, null));
    // Transition events
    items.addEventListener('transitionend', checkIndex);
    function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;
        if (window.TouchEvent &&
            e instanceof TouchEvent &&
            e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        }
        else if (window.MouseEvent &&
            e instanceof MouseEvent &&
            e.type == 'mousedown') {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }
    function dragAction(e) {
        e = e || window.event;
        if (window.TouchEvent && e instanceof TouchEvent && e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        }
        else if (window.MouseEvent &&
            e instanceof MouseEvent &&
            e.type == 'mousemove') {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = items.offsetLeft - posX2 + 'px';
    }
    function dragEnd() {
        posFinal = items.offsetLeft;
        posFinal - posInitial < -threshold
            ? shiftSlide(1, 'drag')
            : posFinal - posInitial > threshold
                ? shiftSlide(-1, 'drag')
                : (items.style.left = posInitial + 'px');
        document.onmouseup = null;
        document.onmousemove = null;
    }
    function shiftSlide(dir, action) {
        items.classList.add('shifting');
        if (allowShift) {
            !action ? (posInitial = items.offsetLeft) : null;
            dir == 1
                ? ((items.style.left = posInitial - slideSize + 'px'), index++)
                : dir == -1
                    ? ((items.style.left = posInitial + slideSize + 'px'), index--)
                    : null;
        }
        allowShift = false;
    }
    function checkIndex() {
        items.classList.remove('shifting');
        index == -1
            ? ((items.style.left = -(slidesLength * slideSize) + 'px'),
                (index = slidesLength - 1))
            : index == slidesLength
                ? ((items.style.left = -(1 * slideSize) + 'px'), (index = 0))
                : null;
        allowShift = true;
    }
}
slide(slider, sliderItems, prev, next);
// pop-up
const popup = document.querySelector('.popup');
const showPopup = document.querySelector('.show-popup');
showPopup.addEventListener('click', () => {
    popup.style.display = 'block';
    root.classList.toggle('overflow-hidden');
});
popup.addEventListener('click', (e) => {
    ;
    e.target.matches('.popup') ||
        e.target.matches('.popup-close') ||
        e.target.matches('.popup-btn-close')
        ? ((popup.style.display = 'none'), root.classList.toggle('overflow-hidden'))
        : null;
});
// search
const listSearch = document.querySelector('.list-search');
const listItems = document.querySelectorAll('.list li');
listSearch.addEventListener('input', (e) => {
    let searchValue = e.target.value, str;
    searchValue
        ? listItems.forEach((item) => {
            let transformText = item.innerText.toLowerCase();
            transformText.search(searchValue) == -1
                ? ((item.hidden = true),
                    (item.innerHTML = item.innerText))
                : ((item.hidden = false),
                    (str = item.innerText),
                    (item.innerHTML = insertMark(str, transformText.search(searchValue), searchValue.length)));
        })
        : listItems.forEach((item) => {
            ;
            item.hidden = false;
            item.innerHTML = item.innerText;
        });
});
function insertMark(string, pos, len) {
    return (string.slice(0, pos) +
        '<mark>' +
        string.slice(pos, pos + len) +
        '</mark>' +
        string.slice(pos + len));
}
// paginations
const itemsContainer = document.querySelector('.pagination-list');
const items = document.querySelectorAll('.pagination-item');
const nav = document.querySelector('.pagination-buttons');
const buttons = document.querySelectorAll('.pagination-buttons');
const nextBtn = document.querySelector('.next-page');
const prevBtn = document.querySelector('.prev-page');
const state = {
    allItems: [...items],
    maximumItems: 10,
    initialPage: 1,
    totalPages() {
        return Math.ceil(state.allItems.length / state.maximumItems);
    },
    curPage: 1,
};
const getItems = (page) => {
    state.allItems.forEach((item) => item.remove());
    const min = (page - 1) * state.maximumItems;
    const max = page * state.maximumItems;
    return state.allItems.slice(min, max);
};
const renderItems = (page) => {
    const items = getItems(page);
    items.forEach((item) => itemsContainer.append(item));
};
renderItems(state.initialPage);
const displayBtns = (page) => {
    //only one page
    state.totalPages() === state.initialPage
        ? buttons.forEach((btn) => (btn.disabled = true))
        : null;
    //last page
    page === state.totalPages() && page !== state.initialPage
        ? ((nextBtn.disabled = true), (prevBtn.disabled = false))
        : null;
    //1st page
    page === state.initialPage && state.totalPages() > state.initialPage
        ? ((nextBtn.disabled = false), (prevBtn.disabled = true))
        : null;
    //not the 1st page and not the last one
    page !== state.initialPage && page < state.totalPages()
        ? ((nextBtn.disabled = false), (prevBtn.disabled = false))
        : null;
};
displayBtns(state.initialPage);
const controlBtns = (e) => {
    const pagesNb = state.totalPages();
    e.target.classList.contains('next-page') &&
        state.initialPage !== pagesNb
        ? (state.curPage++, renderItems(state.curPage))
        : null;
    e.target.classList.contains('prev-page') &&
        state.initialPage !== state.curPage
        ? (state.curPage--, renderItems(state.curPage))
        : null;
    displayBtns(state.curPage);
};
nav.addEventListener('click', controlBtns);
