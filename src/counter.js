const input = document.querySelector('#counter-input')
const button = document.querySelector('#counter-button')

button.addEventListener('click', () => {
  const localValue = input.value
  input.value = Number(localValue) + 1
})
