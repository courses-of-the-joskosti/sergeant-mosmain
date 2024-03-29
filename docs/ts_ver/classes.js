export class Accordion {
    heading;
    constructor(heading) {
        this.heading = heading;
    }
    showOne() {
        const accordionHeading = document.querySelectorAll(this.heading);
        accordionHeading.forEach((item) => {
            item.addEventListener('click', () => {
                accordionHeading.forEach((element) => {
                    element.classList.contains('active')
                        ? (element.classList.remove('active'),
                            (element.nextElementSibling.style.display =
                                'none'))
                        : null;
                });
                item.classList.add('active');
                item.nextElementSibling.style.display = 'block';
            });
        });
    }
    showAll() {
        const accordionHeading = document.querySelectorAll(this.heading);
        accordionHeading.forEach((item) => {
            item.addEventListener('click', () => {
                item.classList.contains('active')
                    ? (item.classList.remove('active'),
                        (item.nextElementSibling.style.display = 'none'))
                    : (item.classList.add('active'),
                        (item.nextElementSibling.style.display = 'block'));
            });
        });
    }
    closeButton(clear) {
        const accordionHeading = document.querySelectorAll(this.heading);
        const closeButton = document.querySelector(clear);
        closeButton.addEventListener('click', () => {
            accordionHeading.forEach((element) => {
                element.classList.contains('active')
                    ? (element.classList.remove('active'),
                        (element.nextElementSibling.style.display =
                            'none'))
                    : null;
            });
        });
    }
}
export class Tab {
    tabs;
    button;
    content;
    constructor(tabs, button, content) {
        this.tabs = tabs;
        this.button = button;
        this.content = content;
    }
    show() {
        const domTabs = document.querySelector(this.tabs);
        const domTabsButton = document.querySelectorAll(this.button);
        const domTabsContent = document.querySelectorAll(this.content);
        domTabs.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            if (id) {
                domTabsButton.forEach((btn) => {
                    btn.classList.remove('active');
                });
                event.target.classList.add('active');
                domTabsContent.forEach((content) => {
                    content.classList.remove('active');
                });
                document.getElementById(id).classList.add('active');
            }
        });
    }
}
export class PasswordGenerator {
    slider;
    sliderValue;
    copyBtn;
    resultEl;
    copyInfo;
    copiedInfo;
    generateBtn;
    lengthEl;
    uppercaseEl;
    lowercaseEl;
    numberEl;
    symbolEl;
    checkboxes;
    constructor(slider, sliderValue, copyBtn, resultEl, copyInfo, copiedInfo, generateBtn, lengthEl, uppercaseEl, lowercaseEl, numberEl, symbolEl, checkboxes) {
        this.slider = slider;
        this.sliderValue = sliderValue;
        this.copyBtn = copyBtn;
        this.resultEl = resultEl;
        this.copyInfo = copyInfo;
        this.copiedInfo = copiedInfo;
        this.generateBtn = generateBtn;
        this.lengthEl = lengthEl;
        this.uppercaseEl = uppercaseEl;
        this.lowercaseEl = lowercaseEl;
        this.numberEl = numberEl;
        this.symbolEl = symbolEl;
        this.checkboxes = checkboxes;
    }
    applyFill() {
        const sliderProps = {
            fill: '#0B1EDF',
            background: 'rgba(255, 255, 255, 0.214)',
        };
        const value = Number(this.slider.value);
        const min = Number(this.slider.min);
        const max = Number(this.slider.max);
        const percentage = (100 * (value - min)) / (max - min);
        const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage + 0.1}%)`;
        this.slider.style.background = bg;
        this.sliderValue.setAttribute('data-length', this.slider.value);
    }
    list() {
        this.slider.addEventListener('input', (event) => {
            const passwordLength = event.target.value;
            this.sliderValue.setAttribute('data-length', passwordLength);
            this.applyFill();
        });
        this.copyBtn.addEventListener('click', () => {
            const textarea = document.createElement('textarea');
            const password = this.resultEl.innerText;
            textarea.value = password;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            this.copyInfo.style.transform = 'translateY(200%)';
            this.copyInfo.style.opacity = '0';
            this.copiedInfo.style.transform = 'translateY(0%)';
            this.copiedInfo.style.opacity = '0.75';
        });
        this.generateBtn.addEventListener('click', () => {
            const length = +this.lengthEl.value;
            const hasUpper = this.uppercaseEl.checked;
            const hasLower = this.lowercaseEl.checked;
            const hasNumber = this.numberEl.checked;
            const hasSymbol = this.symbolEl.checked;
            this.resultEl.innerText = this.generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
            this.copyInfo.style.transform = 'translateY(0%)';
            this.copyInfo.style.opacity = '0.75';
            this.copiedInfo.style.transform = 'translateY(200%)';
            this.copiedInfo.style.opacity = '0';
        });
        this.checkboxes.addEventListener('click', () => {
            let totalChecked = [
                this.uppercaseEl,
                this.lowercaseEl,
                this.numberEl,
                this.symbolEl,
            ].filter((el) => el.checked);
            totalChecked.forEach((el) => {
                if (totalChecked.length == 1) {
                    ;
                    el.disabled = true;
                }
                else {
                    ;
                    el.disabled = false;
                }
            });
        });
    }
    secureMathRandom() {
        return (window.crypto.getRandomValues(new Uint32Array(1))[0] /
            (Math.pow(2, 32) - 1));
    }
    getRandomLower() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    getRandomUpper() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    getRandomNumber() {
        return String.fromCharCode(Math.floor(this.secureMathRandom() * 10) + 48);
    }
    getRandomSymbol() {
        const symbols = '~!@#$%^&*()_+{}":?><;.,';
        return symbols[Math.floor(Math.random() * symbols.length)];
    }
    generatePassword(length, lower, upper, number, symbol) {
        const typesCount = lower || upper || number || symbol;
        const typesArr = [
            { lower },
            { upper },
            { number },
            { symbol },
        ].filter((item) => Object.values(item)[0]);
        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            typesArr.forEach((type) => {
                const funcName = Object.keys(type)[0];
                if (funcName == 'lower') {
                    generatedPassword += this.getRandomLower();
                }
                else if (funcName == 'upper') {
                    generatedPassword += this.getRandomUpper();
                }
                else if (funcName == 'number') {
                    generatedPassword += this.getRandomNumber();
                }
                else {
                    generatedPassword += this.getRandomSymbol();
                }
            });
        }
        if (!typesCount) {
            return (generatedPassword = 'Select one or more checkboxes.');
        }
        else {
            return generatedPassword
                .slice(0, length)
                .split('')
                .sort(() => Math.random() - 0.5)
                .join('');
        }
    }
}
