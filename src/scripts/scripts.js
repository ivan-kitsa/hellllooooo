const schemes = {
    1: ['#34A997', '#AEE9CD', '#F2EEA7', '#FD8853', '#ACE1FF'],
    2: ['#6B717E', '#EFAAC4', '#FFC4D1', '#FFE8E1', '#D4DCCD'],
    3: ['#C1C1C1', '#2C4251', '#D16666', '#B6C649', '#FFFFFF'],
    4: ['#2274A5', '#E7EB90', '#FADF63', '#E6AF2E', '#632B30'],
    5: ['#A4036F', '#048BA8', '#16DB93', '#EFEA5A', '#F29E4C'],
}
const schemeDefault = schemes[1]

const windowSizes = {
    w: window.innerWidth,
    h: window.innerHeight,
}

function resizeFix(func, delay = 100) {
    let doIt = 0
    window.addEventListener('resize', () => {
        clearTimeout(doIt)
        doIt = setTimeout(func, delay)
        windowSizes.w = window.innerWidth
        windowSizes.h = window.innerHeight
    }, false)
}

function getRandomInt(min, max) {
    const rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand);
}

function getDeviceType() {
    const ua = navigator.userAgent
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet'
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile'
    }
    return 'desktop'
}

class CursorController {
    constructor() {
        this.cursorPos = {x: 0, y: 0}
        this.node = document.getElementById('cursor')
        this.nodeH = this.node.offsetHeight
        this.nodeW = this.node.offsetWidth
        this.tl = gsap.timeline()
    }

    #touch = (e) => {
        this.cursorPos.x = e.changedTouches[0].pageX
        this.cursorPos.y = e.changedTouches[0].pageY
        this.node.style.cssText = `
            visibility: hidden;
            top: calc(${this.cursorPos.y}px - ${this.nodeH / 2}px);
            left: calc(${this.cursorPos.x}px - ${this.nodeW / 2}px);`
    }
    #mouseMove = (e) => {
        this.cursorPos.x = e.pageX
        this.cursorPos.y = e.pageY
        this.node.style.cssText = `
            visibility: visible;
            top: calc(${this.cursorPos.y}px - ${this.nodeH / 2}px);
            left: calc(${this.cursorPos.x}px - ${this.nodeW / 2}px);`
    }
    #mouseOut = () => {
        this.node.style.cssText = 'visibility: hidden;'
    }
    #mouseDown = () => {
        this.tl.to(this.node, {
            scale: 1.5,
            duration: .15,
        })
        this.tl.to(this.node.children[0], {
            scale: 1.5,
            duration: .15,
        })
    }
    #mouseUp = () => {
        this.tl.to(this.node, {
            scale: 1,
            duration: .15
        })
        this.tl.to(this.node.children[0], {
            scale: .5,
            duration: .15
        })
    }

    addMouseListeners() {
        window.addEventListener('mousemove', this.#mouseMove, false)
        window.addEventListener('mouseout', this.#mouseOut, false)
        window.addEventListener('mousedown', this.#mouseDown, false)
        window.addEventListener('mouseup', this.#mouseUp, false)
    }
    removeMouseListeners() {
        window.removeEventListener('mousemove', this.#mouseMove, false)
        window.removeEventListener('mouseout', this.#mouseOut, false)
        window.removeEventListener('mousedown', this.#mouseDown, false)
        window.removeEventListener('mouseup', this.#mouseUp, false)
    }

    addTouchListeners() {
        window.addEventListener('touchstart', this.#touch, false)
        window.addEventListener('touchend', this.#touch, false)
    }
    removeTouchListeners() {
        window.removeEventListener('touchstart', this.#touch, false)
        window.removeEventListener('touchend', this.#touch, false)
    }

    #listenersController() {
        if (!this.node || !this.tl) {
            console.warn('Node #cursor not founded')
            return
        }
        this.removeMouseListeners()
        this.removeTouchListeners()

        if (getDeviceType() === 'tablet' || getDeviceType() === 'mobile') {
            this.addTouchListeners()
            return
        }

        this.addMouseListeners()
    }

    init() {
        this.#listenersController()
        resizeFix(() => this.#listenersController())
    }
}

new CursorController().init()

function colorsInit() {
    const section = document.querySelector('.colors__wrapper')
    const spanCollection = document.querySelectorAll('span')

    section?.addEventListener('mousemove', function(event) {
        const x = event.pageX;
        const y = event.pageY;

        for (let i = 0; i < spanCollection.length; i++) {
            spanCollection[i].style.cssText = `background-position: ${x - 100}px ${y - 100}px`
        }
    })
}
colorsInit()
