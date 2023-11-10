/* eslint-disable no-useless-escape */
import { literal } from 'sequelize'

export function parenthesis (value: string) {
  return ['(', value, ')'].join('')
}

export function queryLikeString (value: string) {
  const query = escape(escapeSpecialChars(value))
  return literal(`'%${query}%' ESCAPE '#'`)
}

export function escape (value: string) {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\0\n\r\b\t\\\'\"\x1a]/g, (s) => {
    switch (s) {
      case '\0': return '\\0'
      case '\n': return '\\n'
      case '\r': return '\\r'
      case '\b': return '\\b'
      case '\t': return '\\t'
      case '\x1a': return '\\Z'
      default: return '\\' + s
    }
  })
}

export function escapeSpecialChars (value: string) {
  return value.replace(/([_%\\])/g, '#$1')
}
