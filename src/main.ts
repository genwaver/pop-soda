import './style.css'
import * as paper from 'paper'
import * as math from 'mathjs'
import * as Postal from 'paper-postal'
import * as patterns from './patterns'
import { createGrid } from './grid'

interface PopSodaPostal extends Postal.PostalContent {
}

const draw = (point: paper.Point, size: paper.Size): PopSodaPostal => {
  const group = new paper.Group()

  const grid = createGrid(point, size, 5)
  console.log(grid)

  grid.forEach(tile => {
    const patternPoint = math.pickRandom([
      tile.point,
      tile.point.add(tile.size.multiply(0.5)),
      tile.point.add([0.0, tile.size.height * 0.5]),
      tile.point.add([tile.size.width * 0.5, 0.0]),
      tile.point.add([tile.size.width * 0.5, tile.size.height]),
      tile.point.add([tile.size.width, tile.size.height * 0.5]),
      tile.point.add([tile.size.width, tile.size.height])
    ])

    const pattern = patterns.concentric({
      point: patternPoint,
      count: 15,
      minRadius: tile.size.width * 0.05,
      maxRadius: Math.sqrt(Math.pow(tile.width, 2.0) + Math.pow(tile.height, 2.0)),
      strokeWidth: 10.0,
      strokeColor: 'black',
      fillColor: 'white',
    })

    const patternGroup = new paper.Group()
    const frame = new paper.Shape.Rectangle(tile)
    const tileRect = new paper.Shape.Rectangle(tile)
    frame.clipMask = true
    
    tileRect.strokeColor = 'black'
    tileRect.strokeWidth = 10.0


    patternGroup.addChild(frame)
    patternGroup.addChild(pattern)
    patternGroup.addChild(tileRect)

    group.addChild(patternGroup)
  })


  return {
    group,
  }
}

const animate = (content: PopSodaPostal, frame: number) => {
}

const postal = Postal.create<PopSodaPostal>(paper, draw, animate)

