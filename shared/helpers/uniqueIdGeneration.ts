class UniqueIDGenerator {
  private static _instance: UniqueIDGenerator;
  public static get getInstance() {
    return this._instance || (this._instance = new this())
  }

  generateID(subject: string, previousID: string) {
    const subjectName = subject.split(' ')
    let idCode: string = ''
    if (subjectName.length === 1) {
      idCode = `KN${subjectName[0].substring(0, 2)}`.toUpperCase()
    } else if (subjectName.length > 1) {
      idCode = `KN${subjectName[0][0]}${subjectName[1][0]}`.toUpperCase()
    }
    return idCode + this.incrementNumber(previousID.substring(4))
  }

  tournamentGenerateID(subject: string, previousID: string) {
    return subject + this.incrementNumber(previousID.substring(4))
  }


  incrementNumber(previousIDNumber: string) {
    const incrementNumber: number = parseInt(previousIDNumber) + 1
    if (incrementNumber.toString().length === 1) { return `000${incrementNumber}` }
    else if (incrementNumber.toString().length === 2) { return `00${incrementNumber}` }
    else if (incrementNumber.toString().length === 3) { return `0${incrementNumber}` }
    return incrementNumber
  }
}

export { UniqueIDGenerator }
