export const prepareMessageFromTemplate = (templateString, map: { [p: string]: string }) => {
  let generatedMessage = templateString
  for (const key in map) {
    generatedMessage = generatedMessage.replace(`{${key}}`, map[key])
  }
  return generatedMessage
}
