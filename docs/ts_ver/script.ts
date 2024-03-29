import { Accordion, Tab, PasswordGenerator } from './classes.js'

const root: HTMLElement = document.getElementsByTagName('html')[0]

// accordions
const accordionTop: Accordion = new Accordion('.accBtn')
const accordionBottom: Accordion = new Accordion('.accBtn-bottom')

accordionTop.showOne()
accordionTop.closeButton('.closeTopAccordions')

accordionBottom.showAll()
accordionBottom.closeButton('.closeBottomAccordions')

// tabs
const tabsTop: Tab = new Tab('.tabsExample', '.tabLink', '.tabContent')
const tabsBottom: Tab = new Tab(
  '.tabsExample-bottom',
  '.tabLink-bottom',
  '.tabContent-bottom',
)

tabsTop.show()

tabsBottom.show()

// burger button and menu
const menuBtn: HTMLElement = document.querySelector('.menu-btn')
const menu: HTMLElement = document.querySelector('.menu')
const menuLink: HTMLElement = document.querySelector('.menu-links')

menuBtn.addEventListener('click', (): void => {
  menuBtn.classList.toggle('active')
  menu.classList.toggle('active')
  root.classList.toggle('overflow-hidden')
})

menuLink.addEventListener('click', (event: Event): void => {
  if ((event.target as HTMLElement).matches('li a')) {
    menuBtn.classList.remove('active')
    menu.classList.remove('active')
    root.classList.remove('overflow-hidden')
  }
})

// slider
const productContainers: NodeListOf<HTMLElement> =
  document.querySelectorAll('.product-container')
const nxtBtn: NodeListOf<HTMLElement> = document.querySelectorAll('.nxt-btn')
const preBtn: NodeListOf<HTMLElement> = document.querySelectorAll('.pre-btn')

productContainers.forEach((item: Element, i: number): void => {
  let containerDimensions: DOMRect =
    item.firstElementChild.getBoundingClientRect()
  let containerWidth: number = containerDimensions.width

  nxtBtn[i].addEventListener('click', (): void => {
    item.scrollLeft += containerWidth
  })

  preBtn[i].addEventListener('click', (): void => {
    item.scrollLeft -= containerWidth
  })
})

// inf carousel
let slider: HTMLElement = document.getElementById('slider'),
  sliderItems: HTMLElement = document.getElementById('slides'),
  prev: HTMLElement = document.getElementById('prev'),
  next: HTMLElement = document.getElementById('next')

function slide(
  wrapper: HTMLElement,
  items: HTMLElement,
  prev: HTMLElement,
  next: HTMLElement,
): void {
  let posX1: number = 0,
    posX2: number = 0,
    posInitial: number,
    posFinal: number,
    threshold: number = 100,
    slides: HTMLCollectionOf<Element> = items.getElementsByClassName('slide'),
    slidesLength: number = slides.length,
    slideSize: number =
      items.querySelectorAll<HTMLElement>('.slide')[0].offsetWidth,
    firstSlide: Element = slides[0],
    lastSlide: Element = slides[slidesLength - 1],
    cloneFirst: Node = firstSlide.cloneNode(true),
    cloneLast: Node = lastSlide.cloneNode(true),
    index: number = 0,
    allowShift: boolean = true

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
  prev.addEventListener('click', (): void => shiftSlide(-1, null))
  next.addEventListener('click', (): void => shiftSlide(1, null))

  // Transition events
  items.addEventListener('transitionend', checkIndex)

  function dragStart(e: MouseEvent | TouchEvent | Event): void {
    e = e || window.event
    e.preventDefault()
    posInitial = items.offsetLeft

    if (
      window.TouchEvent &&
      e instanceof TouchEvent &&
      e.type == 'touchstart'
    ) {
      posX1 = e.touches[0].clientX
    } else if (
      window.MouseEvent &&
      e instanceof MouseEvent &&
      e.type == 'mousedown'
    ) {
      posX1 = e.clientX
      document.onmouseup = dragEnd
      document.onmousemove = dragAction
    }
  }

  function dragAction(e: MouseEvent | TouchEvent | Event): void {
    e = e || window.event

    if (window.TouchEvent && e instanceof TouchEvent && e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX
      posX1 = e.touches[0].clientX
    } else if (
      window.MouseEvent &&
      e instanceof MouseEvent &&
      e.type == 'mousemove'
    ) {
      posX2 = posX1 - e.clientX
      posX1 = e.clientX
    }

    items.style.left = items.offsetLeft - posX2 + 'px'
  }

  function dragEnd(): void {
    posFinal = items.offsetLeft

    posFinal - posInitial < -threshold
      ? shiftSlide(1, 'drag')
      : posFinal - posInitial > threshold
      ? shiftSlide(-1, 'drag')
      : (items.style.left = posInitial + 'px')

    document.onmouseup = null
    document.onmousemove = null
  }

  function shiftSlide(dir: number, action: string): void {
    items.classList.add('shifting')

    if (allowShift) {
      !action ? (posInitial = items.offsetLeft) : null

      dir == 1
        ? ((items.style.left = posInitial - slideSize + 'px'), index++)
        : dir == -1
        ? ((items.style.left = posInitial + slideSize + 'px'), index--)
        : null
    }

    allowShift = false
  }

  function checkIndex(): void {
    items.classList.remove('shifting')

    index == -1
      ? ((items.style.left = -(slidesLength * slideSize) + 'px'),
        (index = slidesLength - 1))
      : index == slidesLength
      ? ((items.style.left = -(1 * slideSize) + 'px'), (index = 0))
      : null

    allowShift = true
  }
}

slide(slider, sliderItems, prev, next)

// pop-up
const popup: HTMLElement = document.querySelector('.popup')
const showPopup: HTMLElement = document.querySelector('.show-popup')

showPopup.addEventListener('click', (): void => {
  popup.style.display = 'block'
  root.classList.toggle('overflow-hidden')
})

popup.addEventListener('click', (e: Event): void => {
  ;(e.target as HTMLElement).matches('.popup') ||
  (e.target as HTMLElement).matches('.popup-close') ||
  (e.target as HTMLElement).matches('.popup-btn-close')
    ? ((popup.style.display = 'none'), root.classList.toggle('overflow-hidden'))
    : null
})

// search
const listSearch: HTMLElement = document.querySelector('.list-search')
const listItems: NodeListOf<Element> = document.querySelectorAll('.list li')

listSearch.addEventListener('input', (e: Event): void => {
  let searchValue: string = (e.target as HTMLTextAreaElement).value,
    str

  searchValue
    ? listItems.forEach((item: Element): void => {
        let transformText = (item as HTMLElement).innerText.toLowerCase()

        transformText.search(searchValue) == -1
          ? (((item as HTMLElement).hidden = true),
            (item.innerHTML = (item as HTMLElement).innerText))
          : (((item as HTMLElement).hidden = false),
            (str = (item as HTMLElement).innerText),
            (item.innerHTML = insertMark(
              str,
              transformText.search(searchValue),
              searchValue.length,
            )))
      })
    : listItems.forEach((item: Element): void => {
        ;(item as HTMLElement).hidden = false
        item.innerHTML = (item as HTMLElement).innerText
      })
})

function insertMark(string: string, pos: number, len: number): string {
  return (
    string.slice(0, pos) +
    '<mark>' +
    string.slice(pos, pos + len) +
    '</mark>' +
    string.slice(pos + len)
  )
}

// paginations
const itemsContainer: HTMLElement = document.querySelector('.pagination-list')
const items: NodeListOf<HTMLElement> =
  document.querySelectorAll('.pagination-item')
const nav: HTMLElement = document.querySelector('.pagination-buttons')
const buttons: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  '.pagination-buttons',
)
const nextBtn: HTMLInputElement = document.querySelector('.next-page')
const prevBtn: HTMLInputElement = document.querySelector('.prev-page')

const state = {
  allItems: [...items],
  maximumItems: 10 as number,
  initialPage: 1 as number,
  totalPages(): number {
    return Math.ceil(state.allItems.length / state.maximumItems)
  },
  curPage: 1 as number,
}

const getItems = (page: number): Element[] => {
  state.allItems.forEach((item: HTMLElement): void => item.remove())
  const min: number = (page - 1) * state.maximumItems
  const max: number = page * state.maximumItems

  return state.allItems.slice(min, max)
}

const renderItems = (page: number): void => {
  const items: Element[] = getItems(page)
  items.forEach((item: Element): void => itemsContainer.append(item))
}

renderItems(state.initialPage)

const displayBtns = (page: number): void => {
  //only one page
  state.totalPages() === state.initialPage
    ? buttons.forEach((btn: HTMLInputElement): boolean => (btn.disabled = true))
    : null

  //last page
  page === state.totalPages() && page !== state.initialPage
    ? ((nextBtn.disabled = true), (prevBtn.disabled = false))
    : null

  //1st page
  page === state.initialPage && state.totalPages() > state.initialPage
    ? ((nextBtn.disabled = false), (prevBtn.disabled = true))
    : null

  //not the 1st page and not the last one
  page !== state.initialPage && page < state.totalPages()
    ? ((nextBtn.disabled = false), (prevBtn.disabled = false))
    : null
}

displayBtns(state.initialPage)

const controlBtns = (e: Event): void => {
  const pagesNb: number = state.totalPages()

  ;(e.target as HTMLElement).classList.contains('next-page') &&
  state.initialPage !== pagesNb
    ? (state.curPage++, renderItems(state.curPage))
    : null
  ;(e.target as HTMLElement).classList.contains('prev-page') &&
  state.initialPage !== state.curPage
    ? (state.curPage--, renderItems(state.curPage))
    : null

  displayBtns(state.curPage)
}

nav.addEventListener('click', controlBtns)

const passSlider: HTMLInputElement = document
  .querySelector('.range__slider')
  .querySelector('input')
const sliderValue: HTMLElement = document.querySelector('.length__title')
const copyBtn: HTMLElement = document.getElementById('copy-btn')
const resultEl: HTMLElement = document.getElementById('result')
const copyInfo: HTMLElement = document.querySelector('.result__info.right')
const copiedInfo: HTMLElement = document.querySelector('.result__info.left')
const generateBtn: HTMLElement = document.getElementById('generate')
const lengthEl: HTMLElement = document.getElementById('pass-slider')
const uppercaseEl: HTMLElement = document.getElementById('uppercase')
const lowercaseEl: HTMLElement = document.getElementById('lowercase')
const numberEl: HTMLElement = document.getElementById('number')
const symbolEl: HTMLElement = document.getElementById('symbol')
const checkboxes: HTMLInputElement = document.querySelector('.settings')

const pass: PasswordGenerator = new PasswordGenerator(
  passSlider,
  sliderValue,
  copyBtn,
  resultEl,
  copyInfo,
  copiedInfo,
  generateBtn,
  lengthEl,
  uppercaseEl,
  lowercaseEl,
  numberEl,
  symbolEl,
  checkboxes,
)

pass.applyFill()
pass.list()
