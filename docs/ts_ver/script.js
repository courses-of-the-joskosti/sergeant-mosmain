var root = document.getElementsByTagName('html')[0];
// burger button and menu
var menuBtn = document.querySelector('.menu-btn');
var menu = document.querySelector('.menu');
var menuLink = document.querySelector('.menu-links');
menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
    root.classList.toggle('overflow-hidden');
});
menuLink.addEventListener('click', function (event) {
    if (event.target.matches('li a')) {
        menuBtn.classList.remove('active');
        menu.classList.remove('active');
        root.classList.remove('overflow-hidden');
    }
});
// slider
var productContainers = document.querySelectorAll('.product-container');
var nxtBtn = document.querySelectorAll('.nxt-btn');
var preBtn = document.querySelectorAll('.pre-btn');
productContainers.forEach(function (item, i) {
    var containerDimensions = item.firstElementChild.getBoundingClientRect();
    var containerWidth = containerDimensions.width;
    nxtBtn[i].addEventListener('click', function () {
        item.scrollLeft += containerWidth;
    });
    preBtn[i].addEventListener('click', function () {
        item.scrollLeft -= containerWidth;
    });
});
// inf carousel
var slider = document.getElementById('slider'), sliderItems = document.getElementById('slides'), prev = document.getElementById('prev'), next = document.getElementById('next');
function slide(wrapper, items, prev, next) {
    var posX1 = 0, posX2 = 0, posInitial, posFinal, threshold = 100, slides = items.querySelectorAll('slide'), slidesLength = slides.length, slideSize = items.querySelector('slide').offsetWidth, firstSlide = slides[0], lastSlide = slides[slidesLength - 1], cloneFirst = firstSlide.cloneNode(true), cloneLast = lastSlide.cloneNode(true), index = 0, allowShift = true;
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
    prev.addEventListener('click', function () { return shiftSlide(-1, 'drag'); });
    next.addEventListener('click', function () { return shiftSlide(1, 'drag'); });
    // Transition events
    items.addEventListener('transitionend', checkIndex);
    function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;
        e.type == 'touchstart'
            ? (posX1 = e.touches[0].clientX)
            : ((posX1 = e.clientX),
                (document.onmouseup = dragEnd),
                (document.onmousemove = dragAction));
    }
    function dragAction(e) {
        e = e || window.event;
        e.type == 'touchmove'
            ? ((posX2 = posX1 - e.touches[0].clientX), (posX1 = e.touches[0].clientX))
            : ((posX2 = posX1 - e.clientX), (posX1 = e.clientX));
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