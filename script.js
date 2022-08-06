const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const width = 100
const height = 100

canvas.width = width 
canvas.height = height

const grid = new Grid(5, 5)
grid.print()

grid.draw(ctx)


function Grid(r, c) {
  this.rows = r
  this.cols = c
  const arr = new Array(this.rows * this.cols).fill(0).map((e, i) => i + 1)
  this.data = new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(0))
    .map(row => row.map(col => {
      const index = Math.floor(Math.random() * arr.length)
      const value = arr[index]
      arr.splice(index, 1)
      return value
    }))
  this.print = () => {
    console.table(this.data)
  }
  this.draw = (ctx) => {
    const canvas = ctx.canvas
    console.log(canvas)
    const rW = height / this.rows 
    const cW = width / this.cols 
    console.log(rW, cW)
  }
}