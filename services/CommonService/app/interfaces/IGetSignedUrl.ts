export interface IGetSignedUrl {
    for: string,
    files: [{
        extension: string,
        contentType: string,
        fileName: string
    }]
}
