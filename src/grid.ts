import * as paper from 'paper'

export const createGrid = (point: paper.Point, size: paper.Size, cols: number) => {
  const colSize = size.width / cols
  const rows = Math.ceil(size.height / colSize)

  const tileSize = new paper.Size(
    colSize,
    colSize
  )

  const tiles = []

  for(let col = 0; col < cols; col++) {
    for(let row = 0; row < rows; row++) {
      const tilePoint = point.add([col * colSize, row * colSize])
      tiles.push(new paper.Rectangle(tilePoint, tileSize))
    }
  }

  return tiles
}