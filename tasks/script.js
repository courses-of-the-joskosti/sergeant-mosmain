import { Accordion, Tab } from "./classes.js";

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
})

menuLink.addEventListener('click', (event) => {
	if (event.target.matches('li a')) {
		menuBtn.classList.remove('active')
		menu.classList.remove('active')
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
