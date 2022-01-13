// const myRoutes = [{
//     path: '/index',
//     name: 'home'
// }, {
//     path: '/destroy',
//     name: 'destroy'
// }]
//
// barba.use(barbaRouter, {
//     routes: myRoutes
// })

function cursorOver(node) {
    const cursor = document.querySelector('.cursor')
    const tl = gsap.timeline()

    return tl.fromTo(node, {
        left: cursor.style.left,
        top: cursor.style.top,
        scale: 0,
    }, {
        scale: 200,
        duration: .5,
        ease: Cubic.easeIn
    })
}

function cursorNormal(node) {
    const cursor = document.querySelector('.cursor')
    const tl = gsap.timeline()

    return tl.fromTo(node, {
        left: cursor.style.left,
        top: cursor.style.top,
        scale: 200,
    }, {
        scale: 0,
        duration: .5,
        ease: Cubic.easeOut
    })
}

barba.init({
    preventRunning: true,
    transitions: [{
        name: 't',
        async leave(data) {
            await cursorOver(data.current.container.querySelector('.move-circle'))

            switch (data.current.namespace) {
                case 'home':
                    break
                case 'destroy':
                    break
                default:
                    break
            }
        },
        async enter(data) {
            cursorNormal(data.next.container.querySelector('.move-circle'))

            switch (data.next.namespace) {
                case 'home':
                    await generatorNodes()
                    await waterflowNodes()
                    break
                case 'destroy':
                    await destroyMe()
                    break
                default:
                    break
            }
        }
    }]
})


