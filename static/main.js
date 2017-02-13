'use strict'

const canvas = {
	height: 800,
	width: 800
}

class Square {
	constructor(w, h, p, rp, r) {
		this.width = w
		this.height = h
		this.point = {
			x: p.x,
			y: p.y
		}
		this.rotationPoint = {
			x: rp.x,
			y: rp.y
		} || {
			x: 0,
			y: 0
		}
		this.rotation = r || 0
	}

	draw() {
		push()
		const w = this.width
		const h = this.height
		const p = this.point
		const rp = this.rotationPoint
		translate(this.rotationPoint.x, this.rotationPoint.y)
		rotate(this.rotation)
		fill('black')
		rect(p.x - rp.x, p.y - rp.y, w, h)
		pop()
	}

	rotate(r) {
		this.rotation += r
	}
}

class Grid {
	constructor() {
		this.squares = []
	}

	populate(n, w, d, rp) {
		for(let i = 0; i < n; i++) {
			for(let j = 0; j < n; j++) {
				this.add(new Square(w, w, { x: i * d, y: j * d }, { x: rp.x, y: rp.y}))
			}
		}
	}

	add(input) {
		this.squares.push(input)
	}

	draw() {
		for(let i = 0; i < this.squares.length; i++) {
			this.squares[i].draw()
		}
	}

	rotate(r) {
		for(let i = 0; i < this.squares.length; i++) {
			this.squares[i].rotate(r)
		}
	}
}

const staticGrid = new Grid()
staticGrid.populate(25, 4, 10, { x: 125, y: 125 })
const rotatingGrid = new Grid()
rotatingGrid.populate(25, 4, 10, { x: 125, y: 125 })

function setup() {
	createCanvas(canvas.height, canvas.width)
}

function draw() {
	clear()
	staticGrid.draw()
	rotatingGrid.rotate(0.005)
	rotatingGrid.draw()
}