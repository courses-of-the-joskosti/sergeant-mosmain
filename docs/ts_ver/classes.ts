export class Accordion {
  heading: string

  constructor(heading: string) {
    this.heading = heading
  }

  showOne(): void {
    const accordionHeading: NodeListOf<HTMLElement> = document.querySelectorAll(
      this.heading,
    )

    accordionHeading.forEach((item: HTMLElement): void => {
      item.addEventListener('click', (): void => {
        accordionHeading.forEach((element: HTMLElement): void => {
          element.classList.contains('active')
            ? (element.classList.remove('active'),
              ((element.nextElementSibling as HTMLElement).style.display =
                'none'))
            : null
        })

        item.classList.add('active')
        ;(item.nextElementSibling as HTMLElement).style.display = 'block'
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
    const accordionHeading: NodeListOf<HTMLElement> = document.querySelectorAll(
      this.heading,
    )
    const closeButton: HTMLElement = document.querySelector(clear)

    closeButton.addEventListener('click', (): void => {
      accordionHeading.forEach((element: HTMLElement): void => {
        element.classList.contains('active')
          ? (element.classList.remove('active'),
            ((element.nextElementSibling as HTMLElement).style.display =
              'none'))
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
    const domTabsButton: NodeListOf<HTMLElement> = document.querySelectorAll(
      this.button,
    )
    const domTabsContent: NodeListOf<HTMLElement> = document.querySelectorAll(
      this.content,
    )

    domTabs.addEventListener('click', (event: Event): void => {
      const id = (event.target as HTMLElement).dataset.id as string
      if (id) {
        domTabsButton.forEach((btn: Element): void => {
          btn.classList.remove('active')
        })
        ;(event.target as HTMLElement).classList.add('active')

        domTabsContent.forEach((content: Element): void => {
          content.classList.remove('active')
        })
        document.getElementById(id).classList.add('active')
      }
    })
  }
}

export class PasswordGenerator {
  slider: HTMLInputElement
  sliderValue: HTMLElement
  copyBtn: HTMLElement
  resultEl: HTMLElement
  copyInfo: HTMLElement
  copiedInfo: HTMLElement
  generateBtn: HTMLElement
  lengthEl: HTMLElement
  uppercaseEl: HTMLElement
  lowercaseEl: HTMLElement
  numberEl: HTMLElement
  symbolEl: HTMLElement
  checkboxes: HTMLInputElement

  constructor(
    slider: HTMLInputElement,
    sliderValue: HTMLElement,
    copyBtn: HTMLElement,
    resultEl: HTMLElement,
    copyInfo: HTMLElement,
    copiedInfo: HTMLElement,
    generateBtn: HTMLElement,
    lengthEl: HTMLElement,
    uppercaseEl: HTMLElement,
    lowercaseEl: HTMLElement,
    numberEl: HTMLElement,
    symbolEl: HTMLElement,
    checkboxes: HTMLInputElement,
  ) {
    this.slider = slider
    this.sliderValue = sliderValue
    this.copyBtn = copyBtn
    this.resultEl = resultEl
    this.copyInfo = copyInfo
    this.copiedInfo = copiedInfo
    this.generateBtn = generateBtn
    this.lengthEl = lengthEl
    this.uppercaseEl = uppercaseEl
    this.lowercaseEl = lowercaseEl
    this.numberEl = numberEl
    this.symbolEl = symbolEl
    this.checkboxes = checkboxes
  }

  applyFill(): void {
    const sliderProps = {
      fill: '#0B1EDF' as string,
      background: 'rgba(255, 255, 255, 0.214)' as string,
    }
    const value: number = Number(this.slider.value)
    const min: number = Number(this.slider.min)
    const max: number = Number(this.slider.max)
    const percentage: number = (100 * (value - min)) / (max - min)
    const bg: string = `linear-gradient(90deg, ${
      sliderProps.fill
    } ${percentage}%, ${sliderProps.background} ${percentage + 0.1}%)`
    this.slider.style.background = bg
    this.sliderValue.setAttribute('data-length', this.slider.value)
  }

  list(): void {
    this.slider.addEventListener('input', (event: Event): void => {
      const passwordLength: string = (event.target as HTMLInputElement).value
      this.sliderValue.setAttribute('data-length', passwordLength)
      this.applyFill()
    })

    this.copyBtn.addEventListener('click', (): void => {
      const textarea: HTMLTextAreaElement = document.createElement('textarea')
      const password: string = this.resultEl.innerText
      textarea.value = password
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()

      this.copyInfo.style.transform = 'translateY(200%)'
      this.copyInfo.style.opacity = '0'
      this.copiedInfo.style.transform = 'translateY(0%)'
      this.copiedInfo.style.opacity = '0.75'
    })

    this.generateBtn.addEventListener('click', (): void => {
      const length: number = +(this.lengthEl as HTMLInputElement).value
      const hasUpper: boolean = (this.uppercaseEl as HTMLInputElement).checked
      const hasLower: boolean = (this.lowercaseEl as HTMLInputElement).checked
      const hasNumber: boolean = (this.numberEl as HTMLInputElement).checked
      const hasSymbol: boolean = (this.symbolEl as HTMLInputElement).checked

      this.resultEl.innerText = this.generatePassword(
        length,
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
      )
      this.copyInfo.style.transform = 'translateY(0%)'
      this.copyInfo.style.opacity = '0.75'
      this.copiedInfo.style.transform = 'translateY(200%)'
      this.copiedInfo.style.opacity = '0'
    })

    this.checkboxes.addEventListener('click', (): void => {
      let totalChecked: HTMLElement[] = [
        this.uppercaseEl,
        this.lowercaseEl,
        this.numberEl,
        this.symbolEl,
      ].filter((el) => (el as HTMLInputElement).checked)
      totalChecked.forEach((el) => {
        if (totalChecked.length == 1) {
          ;(el as HTMLTextAreaElement).disabled = true
        } else {
          ;(el as HTMLTextAreaElement).disabled = false
        }
      })
    })
  }

  secureMathRandom(): number {
    return (
      window.crypto.getRandomValues(new Uint32Array(1))[0] /
      (Math.pow(2, 32) - 1)
    )
  }

  getRandomLower(): string {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  }

  getRandomUpper(): string {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  }

  getRandomNumber(): string {
    return String.fromCharCode(Math.floor(this.secureMathRandom() * 10) + 48)
  }

  getRandomSymbol(): string {
    const symbols = '~!@#$%^&*()_+{}":?><;.,'
    return symbols[Math.floor(Math.random() * symbols.length)]
  }

  generatePassword(
    length: number,
    lower: boolean,
    upper: boolean,
    number: boolean,
    symbol: boolean,
  ): string {
    const typesCount: boolean = lower || upper || number || symbol

    const typesArr: object[] = [
      { lower },
      { upper },
      { number },
      { symbol },
    ].filter((item) => Object.values(item)[0])
    let generatedPassword: string = ''

    for (let i = 0; i < length; i++) {
      typesArr.forEach((type: object): void => {
        const funcName: string = Object.keys(type)[0]
        if (funcName == 'lower') {
          generatedPassword += this.getRandomLower()
        } else if (funcName == 'upper') {
          generatedPassword += this.getRandomUpper()
        } else if (funcName == 'number') {
          generatedPassword += this.getRandomNumber()
        } else {
          generatedPassword += this.getRandomSymbol()
        }
      })
    }

    if (!typesCount) {
      return (generatedPassword = 'Select one or more checkboxes.')
    } else {
      return generatedPassword
        .slice(0, length)
        .split('')
        .sort((): number => Math.random() - 0.5)
        .join('')
    }
  }
}
