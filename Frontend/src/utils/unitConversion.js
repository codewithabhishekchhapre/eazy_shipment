export const LENGTH_UNITS = [
  { id: 'meter', label: 'Meters (m)', symbol: 'm', toMeters: 1 },
  { id: 'yard', label: 'Yards (yd)', symbol: 'yd', toMeters: 0.9144 },
  { id: 'feet', label: 'Feet (ft)', symbol: 'ft', toMeters: 0.3048 },
  { id: 'inch', label: 'Inches (in)', symbol: 'in', toMeters: 0.0254 },
  { id: 'centimeter', label: 'Centimeters (cm)', symbol: 'cm', toMeters: 0.01 },
  { id: 'millimeter', label: 'Millimeters (mm)', symbol: 'mm', toMeters: 0.001 },
]

export function getUnit(unitId) {
  return LENGTH_UNITS.find((unit) => unit.id === unitId)
}

export function toMeters(value, unitId) {
  return value * getUnit(unitId).toMeters
}

export function calculateAreaSqMeters({ length, lengthUnit, width, widthUnit, quantity }) {
  const lengthM = toMeters(length, lengthUnit)
  const widthM = toMeters(width, widthUnit)
  return lengthM * widthM * quantity
}
