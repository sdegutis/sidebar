const button = document.querySelector('a[target=god]')
button.click()


const timeFormatter = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' })
const dateFormatter = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
function updateTime() {
  const now = new Date()
  document.getElementById("time").innerText = timeFormatter.format(now)
  document.getElementById("date").innerText = dateFormatter.format(now)
  document.getElementById("day").innerText = dayFormatter.format(now)
}
updateTime()
setInterval(updateTime, 30_000)


const feastDayEl = document.getElementById('feastday')
const calendar = window.Romcal.Calendar.calendarFor({ country: 'unitedStates' })
function updateFeastDay() {
  const ostensibleDate = new Date()
  const tzOffset = ostensibleDate.getTimezoneOffset() * 60_000
  const localDate = new Date(ostensibleDate.getTime() - tzOffset)
  const yyyymmdd = localDate.toISOString().split('T')[0]
  const feastDay = calendar.find(day => day.moment.split('T')[0] === yyyymmdd)
  feastDayEl.innerText = feastDay.name
}
updateFeastDay()
setInterval(updateFeastDay, 1000 * 60 * 60 * 5)


async function updateWeather() {
  const [latitude, longitude] = [42.31636, -88.44817]
  const points = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`).then(res => res.json())
  const forecastNow = await fetch(points.properties.forecastHourly).then(res => res.json())
  const forecastLater = await fetch(points.properties.forecast).then(res => res.json())
  const now = forecastNow.properties.periods[0]
  const later = forecastLater.properties.periods[0]

  document.getElementById('temperature').innerText = `${now.temperature} ${now.temperatureUnit}°`
  document.getElementById('weather-icon').src = later.icon
  document.getElementById('weather-full').innerText = later.detailedForecast
}
updateWeather()
setInterval(updateWeather, 1000 * 60 * 5)
