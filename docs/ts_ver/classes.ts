export class Accordion {
  constructor(heading) {
    this.heading = heading
  }

  showOne() {
    const accordionHeading = document.querySelectorAll(this.heading)

    accordionHeading.forEach((item) => {
      item.addEventListener('click', () => {
        accordionHeading.forEach((element) => {
          element.classList.contains('active')
            ? (element.classList.remove('active'),
              (element.nextElementSibling.style.display = 'none'))
            : null
        })

        item.classList.add('active')
        item.nextElementSibling.style.display = 'block'
      })
    })
  }

  showAll() {
    const accordionHeading = document.querySelectorAll(this.heading)

    accordionHeading.forEach((item) => {
      item.addEventListener('click', () => {
        item.classList.contains('active')
          ? (item.classList.remove('active'),
            (item.nextElementSibling.style.display = 'none'))
          : (item.classList.add('active'),
            (item.nextElementSibling.style.display = 'block'))
      })
    })
  }

  closeButton(clear) {
    const accordionHeading = document.querySelectorAll(this.heading)
    const closeButton = document.querySelector(clear)

    closeButton.addEventListener('click', () => {
      accordionHeading.forEach((element) => {
        element.classList.contains('active')
          ? (element.classList.remove('active'),
            (element.nextElementSibling.style.display = 'none'))
          : null
      })
    })
  }
}

export class Tab {
  constructor(tabs, button, content) {
    this.tabs = tabs
    this.button = button
    this.content = content
  }

  show() {
    const domTabs = document.querySelector(this.tabs)
    const domTabsButton = document.querySelectorAll(this.button)
    const domTabsContent = document.querySelectorAll(this.content)

    domTabs.addEventListener('click', (event) => {
      const id = event.target.dataset.id
      if (id) {
        domTabsButton.forEach((btn) => {
          btn.classList.remove('active')
        })
        event.target.classList.add('active')

        domTabsContent.forEach((content) => {
          content.classList.remove('active')
        })
        document.getElementById(id).classList.add('active')
      }
    })
  }
}
