export class Accordion {
  heading: string

  constructor(heading: string) {
    this.heading = heading
  }

  showOne(): void {
    const accordionHeading: NodeListOf<HTMLElement> = document.querySelectorAll(this.heading)

    accordionHeading.forEach((item: HTMLElement): void => {
      item.addEventListener('click', (): void => {
        accordionHeading.forEach((element: HTMLElement): void => {
          element.classList.contains('active')
            ? (element.classList.remove('active'),
              ((element.nextElementSibling as HTMLElement).style.display = 'none'))
            : null
        })

        item.classList.add('active');
        (item.nextElementSibling as HTMLElement).style.display = 'block'
      })
    })
  }

  showAll(): void {
    const accordionHeading = document.querySelectorAll(this.heading)

    accordionHeading.forEach((item: Element): void => {
      item.addEventListener('click', (): void => {
        item.classList.contains('active')
          ? (item.classList.remove('active'),
            ((item.nextElementSibling as HTMLElement).style.display = 'none'))
          : (item.classList.add('active'),
            ((item.nextElementSibling as HTMLElement).style.display = 'block'))
      })
    })
  }

  closeButton(clear: string): void {
    const accordionHeading: NodeListOf<HTMLElement> = document.querySelectorAll(this.heading)
    const closeButton: HTMLElement = document.querySelector(clear)

    closeButton.addEventListener('click', (): void => {
      accordionHeading.forEach((element: HTMLElement): void => {
        element.classList.contains('active')
          ? (element.classList.remove('active'),
            ((element.nextElementSibling as HTMLElement).style.display = 'none'))
          : null
      })
    })
  }
}

export class Tab {
  tabs: string
  button: string
  content: string

  constructor(tabs: string, button: string, content: string) {
    this.tabs = tabs
    this.button = button
    this.content = content
  }

  show(): void {
    const domTabs: HTMLElement = document.querySelector(this.tabs)
    const domTabsButton: NodeListOf<HTMLElement> = document.querySelectorAll(this.button)
    const domTabsContent: NodeListOf<HTMLElement> = document.querySelectorAll(this.content)

    domTabs.addEventListener('click', (event: Event): void => {
      const id = (event.target as HTMLElement).dataset.id as string
      if (id) {
        domTabsButton.forEach((btn: Element): void => {
          btn.classList.remove('active')
        });
        (event.target as HTMLElement).classList.add('active')

        domTabsContent.forEach((content: Element): void => {
          content.classList.remove('active')
        })
        document.getElementById(id).classList.add('active')
      }
    })
  }
}
