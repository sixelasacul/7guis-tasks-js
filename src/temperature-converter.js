function isNumber(value) {
  const temp = (value === null || value === undefined) && ''
  if (temp === '') return false
  return !Number.isNaN(Number(value))
}
function celsiusToFarenheit(celsius) {
  return celsius * (9 / 5) + 32
}
function farenheitToCelsius(farenheit) {
  return (farenheit - 32) * (5 / 9)
}

const celsius = document.querySelector('#temperature-celsius')
const farenheit = document.querySelector('#temperature-farenheit')

celsius.addEventListener('change', (e) => {
  const value = e.target.value
  console.log({ value })
  if (isNumber(value)) {
    farenheit.value = celsiusToFarenheit(value).toFixed(2)
  }
})
farenheit.addEventListener('change', (e) => {
  const value = e.target.value
  if (isNumber(value)) {
    celsius.value = farenheitToCelsius(value).toFixed(2)
  }
})
