function validateDateRange(first, second) {
  return new Date(first).getTime() - new Date(second).getTime() < 1
}
function padDate(str) {
  return String(str).padStart(2, '0')
}

const selectType = document.querySelector('#flight-type')
const startDate = document.querySelector('#flight-start')
const endDate = document.querySelector('#flight-end')
const bookButton = document.querySelector('#flight-book')

const today = new Date()
const defaultDate = `${today.getFullYear()}-${padDate(
  today.getMonth() + 1
)}-${padDate(today.getDate())}`
startDate.value = defaultDate
endDate.value = defaultDate

selectType.addEventListener('change', (e) => {
  if (e.target.value === 'one-way') {
    endDate.setAttribute('disabled', '')
  } else {
    endDate.removeAttribute('disabled')
  }
})

bookButton.addEventListener('click', () => {
  const returnMessage =
    selectType.value === 'return' ? `, returning on ${endDate.value}` : ''
  window.alert(`Your flight is booked for ${startDate.value}${returnMessage}.`)
})

startDate.addEventListener('change', (e) => {
  const value = e.target.value
  if (!value) {
    bookButton.setAttribute('disabled', '')
    return
  }

  if (selectType.value === 'one-way') {
    bookButton.removeAttribute('disabled')
  } else {
    const isRangeValid = validateDateRange(value, endDate.value)
    if (isRangeValid) {
      bookButton.removeAttribute('disabled')
    } else {
      bookButton.setAttribute('disabled', '')
    }
  }
})

endDate.addEventListener('change', (e) => {
  const value = e.target.value
  if (!value) {
    bookButton.setAttribute('disabled', '')
    return
  }
  const isRangeValid = validateDateRange(startDate.value, value)
  if (isRangeValid) {
    bookButton.removeAttribute('disabled')
  } else {
    bookButton.setAttribute('disabled', '')
  }
})
