function destroyMe() {
    const gridParams = {
        rows: '15',
        columns: '20'
    }

    const grid = document.getElementById('grid-wrapper')
    const settingsPopup =  document.querySelector('.destroy__popup')
    const rowsInput = document.getElementById('rows')
    const columnsInput = document.getElementById('columns')
    const reloadButton = document.getElementById('reload')

    if (!grid || !settingsPopup || !rowsInput || !columnsInput || !reloadButton)  {
        return
    }

    let isPressed = false
    let colors = schemes[getRandomInt(1, 5)]

    function destroyInit() {
        rowsInput.value = gridParams.rows
        rowsInput.oninput = onInput
        rowsInput.onblur = onBlur
        rowsInput.onclick = () => {
            rowsInput.focus()
            rowsInput.select()
        }

        columnsInput.value = gridParams.columns
        columnsInput.oninput = onInput
        columnsInput.onblur = onBlur
        columnsInput.onclick = () => {
            columnsInput.focus()
            columnsInput.select()
        }

        reloadButton.onclick = () => {
            gridGenerator(grid, gridParams)
            reloadButton.classList.add('hidden')
        }

        gridGenerator(grid, gridParams)
    }

    document.addEventListener('mousedown', (event) => {
        if (!isPressed && event.target.className === 'destroy__grid--box' || event.target.className === 'destroy__grid') {
            settingsPopup.classList.add('hidden')
            isPressed = true
        }
    })
    document.addEventListener('mouseup', (event) => {
        if (isPressed) {
            settingsPopup.classList.remove('hidden')
            isPressed = false
        }
    })


    function gridGenerator(wrapper, gridParams) {
        const rows = gridParams.rows
        const columns = gridParams.columns

        if (!wrapper) {
            return
        }

        let rowsStyle = 'grid-template-rows:'
        let columnsStyle = 'grid-template-columns:'

        for (let i = 0; i < rows; i++) {
            rowsStyle += ' 1fr'
        }

        for (let i = 0; i < columns; i++) {
            columnsStyle += ' 1fr'
        }

        wrapper.style.cssText = `${rowsStyle}; ${columnsStyle};`
        wrapper.innerHTML = null

        /* Commented code include logic of generating grid

        const frameWidth = document.body.clientWidth
        const frameHeight = document.body.clientHeight

        const widthBox =  frameWidth / gridParams.columns
        const heightBox = frameHeight / gridParams.rows */

        for (let i = 0, tik = 0; i < (columns * rows); i++) {
            /* if (tik > gridParams.columns - 1) {
                  tik = 0
                }

                tik++

            const numberOfRow = Math.ceil((i+1) / +gridParams.columns)
                const numberOfColumn = tik   */

            const div = document.createElement('div')
            div.className = 'destroy__grid--box'
            div.onmousedown = (columns * rows > 0) ? destroyBox : null
            /* div.style.cssText = `
              position: absolute;
              left: calc(${widthBox * (numberOfColumn - 1)}px);
              top: calc(${heightBox * (numberOfRow - 1)}px);
              width: ${frameWidth / gridParams.columns}px;
              height: ${frameHeight / gridParams.rows}px;` */
            wrapper.append(div)
        }

        document.addEventListener('mouseover', (event) => {
            if (event.target.className === 'destroy__grid--box' && isPressed) {
                destroyBox(event)
            }
        })

        colors = schemes[getRandomInt(1, 5)]
    }

    function destroyBox(e) { // TODO rewrite to GSAP
        if (reloadButton.classList.contains('hidden')){
            reloadButton.classList.remove('hidden')
        }

        e.target.style.cssText += `
		background-color: ${colors[getRandomInt(0, 4)]};
        box-shadow: 0px 0px 200px 10px ${colors[getRandomInt(0, 4)]};
		pointer-events: none;`

        setTimeout(() => {
            e.target.style.cssText += `
          transform:
          translateY(calc(100vh + 100%))
          translateX(${getRandomInt(-25, 0) + getRandomInt(0 ,25)}vw);
          transition: 1s ease-in 0s;
          pointer-events: none;`
        }, 100)

        /* garbageCleaner(e.target) */
    }

    /* function garbageCleaner(node) {
      setTimeout(() => {
        node.remove()
      }, 1100)
    } */

    function onBlur(e) {
        const input = e.target

        if (isNaN(parseInt(e.target.value))) {
            gridParams[input.id] = '1'
            input.value = '1'
            gridGenerator(grid, gridParams)
        }
    }

    function onInput(e) {
        const input = e.target
        const count = input.value
        let prevCount = gridParams[input.id]

        if (+count < 1 || isNaN(count)) {
            gridParams[input.id] = '1'
            input.value = '1'
            gridGenerator(grid, gridParams)
            return
        }

        if (+count > 50) {
            gridParams[input.id] = prevCount
            input.value = prevCount
            gridGenerator(grid, gridParams)
            return
        }

        input.value = count
        gridParams[input.id] = count
        gridGenerator(grid, gridParams)
    }

    destroyInit()
}

destroyMe()








