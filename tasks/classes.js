export class Accordion {
  constructor(heading) {
    this.heading = heading
  }

  showOne(clear) {
    const accordionHeading = document.querySelectorAll(this.heading)

    accordionHeading.forEach((item) => {
      item.addEventListener('click', () => {
        accordionHeading.forEach(element => {
          element.classList.contains('active') ? (
            element.classList.remove('active'),
            element.nextElementSibling.style.display = 'none'
          ) : null
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
        item.classList.contains('active') ? (
          item.classList.remove('active'),
          item.nextElementSibling.style.display = 'none'
        ) : (
          item.classList.add('active'),
          item.nextElementSibling.style.display = 'block'
        )
      })
    })
  }

  closeButton(clear) {
    const accordionHeading = document.querySelectorAll(this.heading)
    const closeButton = document.querySelector(clear)

    closeButton.addEventListener('click', () => {
      accordionHeading.forEach(element => {
        element.classList.contains('active') ? (
          element.classList.remove('active'),
          element.nextElementSibling.style.display = 'none'
        ) : null
      })
    })
  }
}
