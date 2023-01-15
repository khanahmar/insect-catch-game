const screens = document.querySelectorAll(".screen")
const startBtn = document.querySelector("#start-btn")
const timeEl = document.querySelector("#time")
const scoreEl = document.getElementById("score")
console.log(scoreEl)
const message = document.querySelector("#message")
const gameContainer = document.querySelector(".game-container")
const choseInsectBtns = document.querySelectorAll(".chose-insect-btn")

// global variables

let seconds = 0
let score = 0
let selected_insect = {}

startBtn.addEventListener("click", (e) => {
  screens[0].classList.add("up")
})

choseInsectBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const img = btn.querySelector("img")
    const src = img.getAttribute("src")
    const alt = img.getAttribute("alt")
    selected_insect = { src, alt }
    screens[1].classList.add("up")
    setTimeout(createInsect, 1000)
    startGame()
  })
})

function startGame() {
  setInterval(increseTime, 1000)
}

function increseTime() {
  let m = Math.floor(seconds / 60)
  let s = seconds % 60
  m = m < 10 ? `0${m}` : m
  s = s < 10 ? `0${s}` : s
  timeEl.innerHTML = `Time: ${m}:${s}`
  seconds++
}

function createInsect() {
  const insect = document.createElement("div")
  insect.classList.add("insect")
  const { x, y } = getRandomLocation()
  insect.style.top = `${y}px`
  insect.style.left = `${x}px`
  insect.innerHTML = `<img src="${
    selected_insect.src
  }" style="transform:rotate(${Math.random() * 360}deg)" />`
  insect.addEventListener("click", catchInsect)

  gameContainer.appendChild(insect)
}

function getRandomLocation() {
  const width = window.innerWidth
  const height = window.innerHeight
  const x = Math.random() * (width - 200) + 100
  const y = Math.random() * (height - 200) + 100
  return { x, y }
}

function catchInsect() {
  increaseScore()
  this.classList.add("caught")
  setTimeout(() => this.remove(), 2000)
  addInsect()
}

function addInsect() {
  setTimeout(createInsect, 1000)
  setTimeout(createInsect, 1500)
}

function increaseScore() {
  score++
  scoreEl.innerHTML = `Score: ${score}`
  if (score > 30) {
    message.classList.add("visible")
  }
}
