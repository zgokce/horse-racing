import { CONDITION_RANGE } from '../constants/horses.js'

export const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5)
}

export const appendText = (number = 1) => {
  let suffix = 'th'
  if (number === 0) suffix = ''
  if (number % 10 === 1 && number % 100 !== 11) suffix = 'st'
  if (number % 10 === 2 && number % 100 !== 12) suffix = 'nd'
  if (number % 10 === 3 && number % 100 !== 13) suffix = 'rd'

  return number + suffix
}

export const getRandomCondition = () =>
  Math.floor(Math.random() * (CONDITION_RANGE.MAX - CONDITION_RANGE.MIN + 1)) + CONDITION_RANGE.MIN
