import * as paper from 'paper'
import { map } from "./utils"

interface ConcentricParams {
  point: paper.Point,
  count: number,
  minRadius: number,
  maxRadius: number,
  strokeWidth: number
  strokeColor: string
  fillColor: string
}

export const concentric = (params: ConcentricParams) => {
  const group = new paper.Group()

  for (let i = params.count; i >= 0 ; i--) {
    const r = map(i, 0, params.count, params.minRadius, params.maxRadius)
    const c = new paper.Path.Circle({
      center: params.point,
      radius: r,
      strokeColor: params.strokeColor,
      fillColor: params.fillColor,
      strokeWidth: params.strokeWidth
    })

    group.addChild(c)
  }

  return group
}