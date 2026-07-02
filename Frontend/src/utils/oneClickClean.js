import { removeDot } from './removeDot'
import { removeSpaces } from './removeSpaces'
import { removeDash } from './removeDash'
import { trimText } from './trimText'

export function oneClickClean(text) {
  return trimText(removeDash(removeSpaces(removeDot(text))))
}
