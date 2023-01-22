const root: HTMLElement = document.getElementsByTagName('html')[0]

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
const productContainers =
  document.querySelectorAll<HTMLElement>('.product-container')
const nxtBtn = document.querySelectorAll<HTMLElement>('.nxt-btn')
const preBtn = document.querySelectorAll<HTMLElement>('.pre-btn')

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
    slides: NodeListOf<Element> = items.querySelectorAll<HTMLElement>('slide'),
    slidesLength: number = slides.length,
    slideSize: number = items.querySelector<HTMLElement>('slide').offsetWidth,
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
  prev.addEventListener('click', (): void => shiftSlide(-1, 'drag'))
  next.addEventListener('click', (): void => shiftSlide(1, 'drag'))

  // Transition events
  items.addEventListener('transitionend', checkIndex)

  function dragStart(e: TouchEvent): void {
    e = e || window.event
    e.preventDefault()
    posInitial = items.offsetLeft

    e.type == 'touchstart'
      ? (posX1 = e.touches[0].clientX)
      : ((posX1 = e.clientX),
        (document.onmouseup = dragEnd),
        (document.onmousemove = dragAction))
  }

  function dragAction(e) {
    e = e || window.event

    e.type == 'touchmove'
      ? ((posX2 = posX1 - e.touches[0].clientX), (posX1 = e.touches[0].clientX))
      : ((posX2 = posX1 - e.clientX), (posX1 = e.clientX))

    items.style.left = items.offsetLeft - posX2 + 'px'
  }

  function dragEnd() {
    posFinal = items.offsetLeft

    posFinal - posInitial < -threshold
      ? shiftSlide(1, 'drag')
      : posFinal - posInitial > threshold
      ? shiftSlide(-1, 'drag')
      : (items.style.left = posInitial + 'px')

    document.onmouseup = null
    document.onmousemove = null
  }

  function shiftSlide(dir, action) {
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

  function checkIndex() {
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
