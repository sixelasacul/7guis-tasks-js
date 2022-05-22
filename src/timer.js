const elapsedTime = document.querySelector('#timer-elapsed-time')
const elapsedProgress = document.querySelector('#timer-elapsed-progress')
const durationSlider = document.querySelector('#timer-duration')
const resetButton = document.querySelector('#timer-reset')

setInterval(() => {
  const currentProgress = Number(elapsedProgress.value)
  const currentMax = Number(elapsedProgress.max)
  if (currentProgress >= currentMax) {
    return
  }
  const newProgress = currentProgress + 0.1
  elapsedProgress.value = newProgress
  elapsedTime.textContent = newProgress.toFixed(1) + 's'
}, 100)

durationSlider.addEventListener('change', (e) => {
  // Allows for a smoother slider
  elapsedProgress.max = Number(e.target.value) / 5
})

resetButton.addEventListener('click', () => {
  elapsedTime.textContent = '0.0s'
  elapsedProgress.value = '0'
})
