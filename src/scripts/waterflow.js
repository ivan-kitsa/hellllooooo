function generatorNodes() {
    const wrapper = document.querySelector(".waterflow--grid")

    if (!wrapper) {
        return
    }

    for (let i = 0; i < 50; i++) {
        const node = document.createElement('a')
        node.className = 'waterflow--block'
        node.href='./destroy.html'
        wrapper.appendChild(node)
    }
}

function waterflowNodes() {
    const colors =  schemesDefault
    const nodes = document.querySelectorAll('.waterflow--block')
    const freeNodes = []

    let windowW = window.innerWidth
    let windowH = window.innerHeight

    function resizeFix() {
        let doIt = 0
        window.addEventListener('resize', (e) => {
            clearTimeout(doIt)
            doIt = setTimeout(() => {
                windowW = window.innerWidth
                windowH = window.innerHeight
            }, 200)
        })
    }

    function paramsGenerator() {
        const params = {
            left: 0,
            scale: 0,
            duration: 0,
            delay: 0,
            color: 0,
        }
        params.scale = getRandomInt(2, 5) * 0.1 + getRandomInt(1, 5) * .1
        params.duration = getRandomInt(5, 12) * getRandomInt(8, 10) * .1
        params.left = getRandomInt(3, 5) * getRandomInt(1, 7) * .01 * windowW
        params.delay = getRandomInt(10, 150) * .1
        params.color = getRandomInt(0, 4)
        params.radius = getRandomInt(10, 70)

        return params
    }


    function waterflowAnim(node, params = paramsGenerator()) {
        const tl = gsap.timeline()
        this.from = {
            scale: params.scale,
            y: -200,
            left: params.left,
            background: colors[params.color],
            borderRadius: params.radius
        }
        this.to = {
            y: windowH + 200,
            duration: params.duration,
            delay: params.delay,
            ease: 'linear'
        }

        tl.fromTo(node, this.from, this.to).then(() => {
            freeNodes.push(node)
        })
    }

    function initWaterflow() {
        nodes.forEach(n => {
            waterflowAnim(n)
        })
    }

    function loop() {
        setInterval(() => {
            if (freeNodes.length > 10) {
                const i = getRandomInt(0, 10)
                waterflowAnim(freeNodes[i])
                freeNodes.splice(i, 1)
            }
        }, 100)
    }

    resizeFix()
    initWaterflow()
    loop()

}

generatorNodes()
waterflowNodes()

