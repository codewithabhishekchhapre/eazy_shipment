import { removeDot } from '../utils/removeDot'
import { removeSpaces } from '../utils/removeSpaces'
import { removeDash } from '../utils/removeDash'
import { toUpperCaseText } from '../utils/toUpperCase'
import { toLowerCaseText } from '../utils/toLowerCase'
import { trimText } from '../utils/trimText'
import { oneClickClean } from '../utils/oneClickClean'

export const CATEGORIES = {
  FORMATTER: 'Text Formatter',
  SHIPMENT: 'Shipment Tools',
}

export const TOOLS = [
  {
    id: 'remove-dot',
    name: 'Dot Remover',
    description: 'Remove all dots from shipment numbers.',
    category: CATEGORIES.FORMATTER,
    icon: 'CircleOff',
    example: { input: '123.456.789', output: '123456789' },
    operations: [{ id: 'remove-dot', label: 'Remove Dot', fn: removeDot }],
  },
  {
    id: 'remove-spaces',
    name: 'Remove Spaces',
    description: 'Strip every space out of the text.',
    category: CATEGORIES.FORMATTER,
    icon: 'RemoveFormatting',
    example: { input: '123 456 789', output: '123456789' },
    operations: [{ id: 'remove-spaces', label: 'Remove Spaces', fn: removeSpaces }],
  },
  {
    id: 'remove-dash',
    name: 'Remove Dash',
    description: 'Strip every dash/hyphen out of the text.',
    category: CATEGORIES.FORMATTER,
    icon: 'Minus',
    example: { input: '123-456-789', output: '123456789' },
    operations: [{ id: 'remove-dash', label: 'Remove Dash', fn: removeDash }],
  },
  {
    id: 'uppercase',
    name: 'Uppercase',
    description: 'Convert text to UPPERCASE.',
    category: CATEGORIES.FORMATTER,
    icon: 'ArrowUpAZ',
    example: { input: 'abcd', output: 'ABCD' },
    operations: [{ id: 'uppercase', label: 'Uppercase', fn: toUpperCaseText }],
  },
  {
    id: 'lowercase',
    name: 'Lowercase',
    description: 'Convert text to lowercase.',
    category: CATEGORIES.FORMATTER,
    icon: 'ArrowDownAZ',
    example: { input: 'ABCD', output: 'abcd' },
    operations: [{ id: 'lowercase', label: 'Lowercase', fn: toLowerCaseText }],
  },
  {
    id: 'trim-text',
    name: 'Trim Text',
    description: 'Remove leading and trailing spaces on every line.',
    category: CATEGORIES.FORMATTER,
    icon: 'AlignJustify',
    example: { input: '  123  ', output: '123' },
    operations: [{ id: 'trim-text', label: 'Trim Text', fn: trimText }],
  },
  {
    id: 'one-click-clean',
    name: 'One Click Clean',
    description: 'Remove dot, space, dash and trim — all in one click.',
    category: CATEGORIES.FORMATTER,
    icon: 'Sparkles',
    example: { input: '123 .456-789 ', output: '123456789' },
    operations: [{ id: 'one-click-clean', label: 'Clean Everything', fn: oneClickClean }],
  },
  {
    id: 'quantity-conversion',
    name: 'Quantity Conversion',
    description: 'Convert length × width × quantity into total area in square meters.',
    category: CATEGORIES.SHIPMENT,
    icon: 'Ruler',
    example: { input: '2 m × 1.5 ft × 3 pcs', output: '2.74 m²' },
    custom: true,
    path: '/tools/quantity-conversion',
  },
]

export function getToolById(id) {
  return TOOLS.find((tool) => tool.id === id)
}
