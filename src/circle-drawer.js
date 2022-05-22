function getClickPosition(event) {
  const rect = event.target.getBoundingClientRect()
  const x = event.clientX - rect.x
  const y = event.clientY - rect.y
  return [x, y]
}
// function updateCircle(circles, updatedCircle) {
//   return circles.map((circle) => {
//     if (circle.x === updatedCircle.x && circle.y === updatedCircle.y) {
//       return updatedCircle
//     }
//     return circle
//   })
// }
function drawCircle(ctx, x, y, radius, isHovered) {
  ctx.beginPath()
  ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2)
  if (isHovered) {
    ctx.fill()
  } else {
    ctx.stroke()
  }
}
function redrawCircles(ctx, circles, cnvs, hoveredCircle) {
  ctx.clearRect(0, 0, cnvs.clientWidth, cnvs.clientHeight)
  // circles.forEach(({ x, y, radius }) => {
  //   const isHovered =
  //     hoveredCircle && hoveredCircle.x === x && hoveredCircle.y === y
  //   drawCircle(ctx, x, y, radius, isHovered)
  // })
  const reversed = [...circles].reverse()
  reversed.reduce((drawnCircles, { x, y, radius }) => {
    const key = `${x}:${y}`
    if (!drawnCircles[key]) {
      const isHovered =
        hoveredCircle && hoveredCircle.x === x && hoveredCircle.y === y
      drawCircle(ctx, x, y, radius, isHovered)
      return {
        ...drawnCircles,
        [key]: true
      }
    }
    return drawnCircles
  }, {})
}
function getDistance([firstX, firstY], [secondX, secondY]) {
  const xDistance = Math.abs(firstX - secondX)
  const yDistance = Math.abs(firstY - secondY)
  // AC^2 = AB^2 + BC^2
  const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
  return distance
}
function getClosestCircle(event, circles) {
  const [x, y] = getClickPosition(event)
  return circles.reduce(
    ([closestCircle, closestDistance], current) => {
      const distance = getDistance([x, y], [current.x, current.y])
      if (distance < current.radius && distance < closestDistance) {
        return [current, distance]
      }
      return [closestCircle, closestDistance]
    },
    [null, Number.MAX_SAFE_INTEGER]
  )[0]
}
function logList(circles) {
  return circles.reduce(
    (log, { x, y, radius }) =>
      (log && log + '\n') + `{x: ${x}, y: ${y}, r: ${radius}}`,
    ''
  )
}

const canvas = document.querySelector('#circle-drawer')
const undoButton = document.querySelector('#circle-undo')
const redoButton = document.querySelector('#circle-redo')
const adjusterSection = document.querySelector('#circle-adjuster-section')
const adjusterSlider = document.querySelector('#circle-adjuster-slider')
const adjusterButton = document.querySelector('#circle-adjuster-confirm')
const context = canvas.getContext('2d')
let circlesList = []
let historyPointer = 0
let selectedCircle = null

canvas.addEventListener('click', (e) => {
  circlesList = circlesList.slice(0, historyPointer)
  const clickedCircle = getClosestCircle(e, circlesList)
  if (clickedCircle) {
    selectedCircle = clickedCircle
    adjusterSection.removeAttribute('hidden')
    adjusterSlider.value = clickedCircle.radius
  } else {
    const [x, y] = getClickPosition(e)
    const radius = 20
    circlesList.push({ x, y, radius })
    historyPointer++
    // Could call `redrawCircles`
    drawCircle(context, x, y, radius)
    undoButton.removeAttribute('disabled')
    redoButton.setAttribute('disabled', 'true')
  }
})

canvas.addEventListener('mousemove', (e) => {
  const hoveredCircle = getClosestCircle(e, circlesList)
  const currentCirclesList = circlesList.slice(0, historyPointer)
  redrawCircles(context, currentCirclesList, canvas, hoveredCircle)
})

adjusterButton.addEventListener('click', () => {
  const updatedCircle = {
    ...selectedCircle,
    radius: adjusterSlider.value
  }
  circlesList.push(updatedCircle)
  historyPointer++
  const currentCirclesList = circlesList.slice(0, historyPointer)
  redrawCircles(context, currentCirclesList, canvas)
  adjusterSection.setAttribute('hidden', 'true')
  selectedCircle = null
})

undoButton.addEventListener('click', () => {
  if (historyPointer === 0) {
    return
  }
  if (historyPointer === 1) {
    undoButton.setAttribute('disabled', 'true')
  }
  historyPointer--
  const currentCirclesList = circlesList.slice(0, historyPointer)
  redrawCircles(context, currentCirclesList, canvas)
  redoButton.removeAttribute('disabled')
})

redoButton.addEventListener('click', () => {
  if (historyPointer >= circlesList.length) {
    return
  }
  if (historyPointer === circlesList.length - 1) {
    redoButton.setAttribute('disabled', 'true')
  }
  historyPointer++
  const currentCirclesList = circlesList.slice(0, historyPointer)
  redrawCircles(context, currentCirclesList, canvas)
  undoButton.removeAttribute('disabled')
})

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    redrawCircles(context, [], canvas)
  }
  if (e.key === 'Enter') {
    const currentCirclesList = circlesList.slice(0, historyPointer)
    redrawCircles(context, currentCirclesList, canvas)
  }
})
