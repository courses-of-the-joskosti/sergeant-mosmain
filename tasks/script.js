const domAccordionExample = document.querySelector('.accordionExample')
const domAccordionButtons = document.querySelectorAll('.accBtn')

domAccordionExample.addEventListener('click', (event) => {
	if (event.target.classList.contains('accBtn') && !event.target.classList.contains('active')) {
		
		domAccordionButtons.forEach(element => {
			element.classList.remove('active')
			element.nextElementSibling.style.display = 'none'
		})

		event.target.classList.toggle('active')
		let accContent = event.target.nextElementSibling

		if (accContent.style.display === "block") {
			accContent.style.display = "none"
		} else {
			accContent.style.display = "block"
		}
	} else {
		event.target.classList.remove('active')
		event.target.nextElementSibling.style.display = "none"
	}
})

const domTabs = document.querySelector(".tabsExample")
const tabButton = document.querySelectorAll(".tabLink")
const tabsContents = document.querySelectorAll(".tabContent")

domTabs.addEventListener('click', (event) => {
	const id = event.target.dataset.id
	if (id) {
		tabButton.forEach(btn => {
			btn.classList.remove("active")
		})
		event.target.classList.add("active")

		tabsContents.forEach(content => {
			content.classList.remove("active")
		})
		const element = document.getElementById(id)
		element.classList.add("active")
	}
})

main()

async function getData() {
	const response = await fetch('https://api.github.com/users/mosmain/repos')
	return response.json()
}

async function main() {
	const gitData = await getData()
	let currentPage = 1
	let rows = 2

	displayList(gitData, rows, currentPage)
	displayPagination(gitData, rows)

}

function displayList(arrData, rowPerPage, page) {
	const postsEl = document.querySelector('.posts')
	postsEl.innerHTML = ""
	page--

	const start = rowPerPage * page
	const end = start + rowPerPage
	const paginatedData = arrData.slice(start, end)

	paginatedData.forEach((el) => {
		const postEl = document.createElement("div")
		postEl.classList.add("post")
		postEl.innerText = `${el.name}`
		postsEl.appendChild(postEl)
	})
}

function displayPagination(arrData, rowPerPage) {
	const paginationEl = document.querySelector('.pagination')
	const pagesCount = Math.ceil(arrData.length / rowPerPage)
	const ulEl = document.createElement("ul")
	ulEl.classList.add('pagination');

	for (let i = 0; i < pagesCount; i++) {
		const liEl = displayPaginationBtn(i + 1)
		ulEl.appendChild(liEl)
	}
	paginationEl.appendChild(ulEl)
}

function displayPaginationBtn(page, currentPage) {
	const liEl = document.createElement("li")
	liEl.classList.add('page-link')
	liEl.innerText = page

	if (currentPage === page) liEl.classList.add('active')

	liEl.addEventListener('click', () => {
		currentPage = page
		displayList(gitData, rows, currentPage)

		let currentItemLi = document.querySelector('.active')
		currentItemLi.classList.remove('active')

		liEl.classList.add('active')
	})

	return liEl
}
