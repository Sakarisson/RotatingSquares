'use strict'

// Canvas constants
const canvas = {
	height: 400,
	width: 400
}

/**
 * Square class. Describes how each square looks and behaves
 */
class Square {
	constructor(w, h, p, rp, r) {
		this.width = w
		this.height = h
		this.point = {
			x: p.x,
			y: p.y
		}
		this.rotationPoint = { // The local center of the square
			x: rp.x,
			y: rp.y
		} || { // Default value is 0, 0
			x: 0,
			y: 0
		}
		this.rotation = r || 0 // Rotation of the square in radians (around the local center). Default is 0
	}

	/**
	 * Draw square
	 */
	draw() {
		push()
		const w = this.width
		const h = this.height
		const p = this.point
		const rp = this.rotationPoint
		translate(this.rotationPoint.x, this.rotationPoint.y) // Translate to local center
		rotate(this.rotation) // Rotate
		fill('black')
		rect(p.x - rp.x, p.y - rp.y, w, h) // Draw rectangle relative to absolute center
		pop()
	}

	/**
	 * Change rotation of square
	 */
	rotate(r) {
		this.rotation += r 
	}
}

/**
 * Grid class. 
 * Contains an array of squares and several functions for doing calculations on all contained squares
 */
class Grid {
	constructor() {
		this.squares = [] // Initialize squares to an empty array
	}

	/**
	 * Add squares to grid.
	 * Inputs: n - the number of squares in each direction. w - the width (and height) of each square. 
	 * d - the distance between each square. rp - the rotation point of the squares
	 */
	populate(n, w, d, rp) { 
		for(let i = 0; i < n; i++) {
			for(let j = 0; j < n; j++) {
				this.add(new Square(w, w, { x: i * d, y: j * d }, { x: rp.x, y: rp.y}))
			}
		}
	}

	/**
	 * Add a single square to grid
	 */
	add(input) {
		this.squares.push(input)
	}

	/**
	 * Draw all squares in grid
	 */
	draw() {
		this.squares.forEach((square) => {
			square.draw()
		})
	}

	/**
	 * Rotate all squares in grid
	 */
	rotate(r) {
		this.squares.forEach((square) => {
			square.rotate(r)
		})
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