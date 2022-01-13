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

function resizeFix() {
    let doIt = 0

    window.addEventListener('resize', () => {
        clearTimeout(doIt)
        doIt = setTimeout(() => {
            windowSizes.w = window.innerWidth
            windowSizes.h = window.innerHeight
            cursorController()
        }, 100)
    }, false)
}

function getRandomInt(min, max) {
    const rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand);
}

const getDeviceType = () => {
    const ua = navigator.userAgent
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet'
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile'
    }
    return 'desktop'
}

function cursorController() {
    const node = document.getElementById('cursor')
    const tl = gsap.timeline()

    if (!node || !tl) {
        return
    }

    const isTouch = getDeviceType() === 'tablet' || getDeviceType() === 'mobile'
    const cursorPos = {x: 0, y: 0}
    const nodeH = node.offsetHeight
    const nodeW = node.offsetWidth

    window.addEventListener('mousemove', (e) => {
        cursorPos.x = e.pageX
        cursorPos.y = e.pageY
        node.style.cssText += `
            visibility: ${isTouch ? 'hidden' : 'visible'};
            top: calc(${cursorPos.y}px - ${nodeH / 2}px);
            left: calc(${cursorPos.x}px - ${nodeW / 2}px);`
    }, false)

    function mouseOut() {
        node.style.cssText = 'visibility: hidden;'
    }
    function mouseDown() {
        tl.to(node, {
            scale: 1.5,
            duration: .15,
        })
        tl.to(node.children[0], {
            scale: 1.5,
            duration: .15,
        })
    }
    function mouseUp() {
        tl.to(node, {
            scale: 1,
            duration: .15
        })
        tl.to(node.children[0], {
            scale: .5,
            duration: .15
        })
    }

    if (isTouch) {
        window.removeEventListener('mouseout', mouseOut, false)
        window.removeEventListener('mousedown', mouseDown, false)
        window.removeEventListener('mouseup', mouseUp, false)
        return
    }

    window.addEventListener('mouseout', mouseOut, false)
    window.addEventListener('mousedown', mouseDown, false)
    window.addEventListener('mouseup', mouseUp, false)
}

resizeFix()
cursorController()


