export const prepareSortCondition = (sortString: string, validColumns: { [p: string]: any }) => {
  const orderBy = sortString.split(',')
  if (orderBy.length === 2 && Object.keys(validColumns).indexOf(orderBy[0]) !== -1 &&
        ['ASC', 'DESC'].indexOf(orderBy[1].toUpperCase()) !== -1) {
    return [validColumns[orderBy[0]].concat(orderBy[1])]
  }
  return [['createdAt', 'DESC']]
}
