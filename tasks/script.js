import { Accordion, Tab } from "./classes.js";

let root = document.getElementsByTagName('html')[0]

// accordions
const accordionTop = new Accordion('.accBtn')
const accordionBottom = new Accordion('.accBtn-bottom')

accordionTop.showOne()
accordionTop.closeButton('.closeTopAccordions')

accordionBottom.showAll()
accordionBottom.closeButton('.closeBottomAccordions')

// tabs
const tabsTop = new Tab('.tabsExample', '.tabLink', '.tabContent')
const tabsBottom = new Tab('.tabsExample-bottom', '.tabLink-bottom', '.tabContent-bottom')

tabsTop.show()

tabsBottom.show()

// burger button and menu
const menuBtn = document.querySelector('.menu-btn')
const menu = document.querySelector('.menu')
const menuLink = document.querySelector('.menu-links')

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active')
  menu.classList.toggle('active')
  root.classList.toggle('overflow-hidden')

})

menuLink.addEventListener('click', (event) => {
  if (event.target.matches('li a')) {
    menuBtn.classList.remove('active')
    menu.classList.remove('active')
    root.classList.remove('overflow-hidden')
  }
})

// main()

// async function getData() {
// 	const response = await fetch('https://api.github.com/users/mosmain/repos')
// 	return response.json()
// }

// async function main() {
// 	const gitData = await getData()
// 	let currentPage = 1
// 	let rows = 2

// 	displayList(gitData, rows, currentPage)
// 	displayPagination(gitData, rows)
// }

// function displayList(arrData, rowPerPage, page) {
// 	const postsEl = document.querySelector('.posts')
// 	postsEl.innerHTML = ""
// 	page--

// 	const start = rowPerPage * page
// 	const end = start + rowPerPage
// 	const paginatedData = arrData.slice(start, end)

// 	paginatedData.forEach((el) => {
// 		const postEl = document.createElement("div")
// 		postEl.classList.add("post")
// 		postEl.innerText = `${el.name}`
// 		postsEl.appendChild(postEl)
// 	})
// }

// function displayPagination(arrData, rowPerPage) {
// 	const paginationEl = document.querySelector('.pagination')
// 	const pagesCount = Math.ceil(arrData.length / rowPerPage)
// 	const ulEl = document.createElement("ul")
// 	ulEl.classList.add('pagination');

// 	for (let i = 0; i < pagesCount; i++) {
// 		const liEl = displayPaginationBtn(i + 1)
// 		ulEl.appendChild(liEl)
// 	}
// 	paginationEl.appendChild(ulEl)
// }

// function displayPaginationBtn(page, currentPage) {
// 	const liEl = document.createElement("li")
// 	liEl.classList.add('page-link')
// 	liEl.innerText = page

// 	if (currentPage === page) liEl.classList.add('active')

// 	liEl.addEventListener('click', () => {
// 		currentPage = page
// 		displayList(gitData, rows, currentPage)

// 		let currentItemLi = document.querySelector('.active')
// 		currentItemLi.classList.remove('active')

// 		liEl.classList.add('active')
// 	})

// 	return liEl
// }


// slider
const productContainers = document.querySelectorAll('.product-container')
const nxtBtn = document.querySelectorAll('.nxt-btn')
const preBtn = document.querySelectorAll('.pre-btn')

productContainers.forEach((item, i) => {
  let containerDimensions = item.firstElementChild.getBoundingClientRect()
  let containerWidth = containerDimensions.width

  nxtBtn[i].addEventListener('click', () => {
    item.scrollLeft += containerWidth
  })

  preBtn[i].addEventListener('click', () => {
    item.scrollLeft -= containerWidth
  })
})

// inf carousel
let slider = document.getElementById('slider'),
  sliderItems = document.getElementById('slides'),
  prev = document.getElementById('prev'),
  next = document.getElementById('next');

function slide(wrapper, items, prev, next) {
  let posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
    slides = items.getElementsByClassName('slide'),
    slidesLength = slides.length,
    slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true

  // Clone first and last slide
  items.appendChild(cloneFirst)
  items.insertBefore(cloneLast, firstSlide)
  wrapper.classList.add('loaded')

  // Mouse events
  items.onmousedown = dragStart

  // Touch events
  items.addEventListener('touchstart', dragStart)
  items.addEventListener('touchend', dragEnd)
  items.addEventListener('touchmove', dragAction)

  // Click events
  prev.addEventListener('click', () => shiftSlide(-1))
  next.addEventListener('click', () => shiftSlide(1))

  // Transition events
  items.addEventListener('transitionend', checkIndex)

  function dragStart(e) {
    e = e || window.event
    e.preventDefault()
    posInitial = items.offsetLeft;

    (e.type == 'touchstart') ?
      posX1 = e.touches[0].clientX :
      (
        posX1 = e.clientX,
        document.onmouseup = dragEnd,
        document.onmousemove = dragAction
      )
  }

  function dragAction(e) {
    e = e || window.event;

    (e.type == 'touchmove') ? (
      posX2 = posX1 - e.touches[0].clientX,
      posX1 = e.touches[0].clientX
    ) : (
      posX2 = posX1 - e.clientX,
      posX1 = e.clientX
    )

    items.style.left = (items.offsetLeft - posX2) + "px"
  }

  function dragEnd() {
    posFinal = items.offsetLeft;

    (posFinal - posInitial < -threshold) ?
      shiftSlide(1, 'drag') :
      (posFinal - posInitial > threshold) ?
        shiftSlide(-1, 'drag') :
        items.style.left = (posInitial) + "px"

    document.onmouseup = null
    document.onmousemove = null
  }

  function shiftSlide(dir, action) {
    items.classList.add('shifting')

    if (allowShift) {
      (!action) ? posInitial = items.offsetLeft : null;

      (dir == 1) ? (
        items.style.left = (posInitial - slideSize) + "px",
        index++
      ) : (dir == -1) ? (
        items.style.left = (posInitial + slideSize) + "px",
        index--
      ) : null
    }

    allowShift = false
  }

  function checkIndex() {
    items.classList.remove('shifting');

    (index == -1) ? (
      items.style.left = -(slidesLength * slideSize) + "px",
      index = slidesLength - 1
    ) : (index == slidesLength) ? (
      items.style.left = -(1 * slideSize) + "px",
      index = 0
    ) : null

    allowShift = true
  }
}

slide(slider, sliderItems, prev, next)