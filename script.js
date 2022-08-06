const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const width = 800
const height = 800

canvas.width = width 
canvas.height = height


const grid = new Grid(6, 6)
grid.print()

function render(){
  ctx.beginPath()
  ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
  ctx.rect(0, 0, width, height)
  ctx.fill()
  grid.draw(ctx)
  requestAnimationFrame(render)
}

requestAnimationFrame(render)


function Grid(r, c) {
  this.rows = r
  this.cols = c
  this.currentGuess = 1

  this.correctGuesses = 1
  this.totalGuesses = 1
  this.accuracy = this.correctGuesses / this.totalGuesses * 100
  this.totalTime = null
  this.isFirstClick = true
  
  let arr = new Array(this.rows * this.cols).fill(0).map((e, i) => i + 1)
  this.data = new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(0))
    .map((row, i) => row.map((col, j) => {
      const index = Math.floor(Math.random() * arr.length)
      const value = arr[index]
      arr.splice(index, 1)
      return new Cell(value)
    }))
  
  this.print = () => {
    console.table(this.data)
  }

  this.click = (x, y, canvas) => {
    const width = canvas.width 
    const height = canvas.height
    const rW = height / this.rows 
    const cW = width / this.cols 
    const dxi = Math.floor(x / rW)
    const dyi = Math.floor(y / cW)
    const cell = this.data[dxi][dyi]
    
    if(cell.value == this.currentGuess) {
      cell.clicked = true
      this.currentGuess += 1
      if(this.currentGuess > this.rows * this.cols) {
        this.reset()
      }
    }
    else cell.wrongGuess = true
    
    setTimeout(() => {
      cell.clicked = false 
      cell.wrongGuess = false
    }, 500)
  }

  this.reset = () => {
    this.currentGuess = 1
    arr = new Array(this.rows * this.cols).fill(0).map((e, i) => i + 1)
    this.data = new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(0))
    .map((row, i) => row.map((col, j) => {
      const index = Math.floor(Math.random() * arr.length)
      const value = arr[index]
      arr.splice(index, 1)
      return new Cell(value)
    }))
    
    this.correctGuesses = 1
    this.totalGuesses = 1
    this.accuracy = this.correctGuesses / this.totalGuesses * 100
    this.totalTime = null
    this.isFirstClick = true
  }
  
  this.draw = (ctx) => {
    const canvas = ctx.canvas
    const width = canvas.width 
    const height = canvas.height
    const rW = height / this.rows 
    const cW = width / this.cols 

    const fontSize = cW/2
    
    // draw grid 
    for(let i=0; i<this.rows; i++){
      for(let j=0; j<this.cols; j++){
        const cell = this.data[i][j]
        const value = cell.value
        
        ctx.beginPath()
        ctx.strokeStyle = "white"
        ctx.fillStyle = cell.clicked ? "green" : cell.wrongGuess ? "red" : "black"
        ctx.rect(i*rW, j*cW, rW, cW)
        ctx.fill()
        ctx.stroke()
        
        ctx.beginPath()
        ctx.font = `${fontSize}px Arial`;
        const measures = ctx.measureText(value)
        const fW = measures.width
        ctx.fillStyle = "white"
        ctx.fillText(value, rW/2 + (i*rW) - (fW/2), (j*cW) + (cW/2) + (fontSize/2.7));
      }
    }
  }
}

function Cell(value){
  this.value = value 
  this.clicked = false
  this.wrongGuess = false
}



canvas.addEventListener("click", (event) => {
  grid.click(event.offsetX, event.offsetY, canvas)
})