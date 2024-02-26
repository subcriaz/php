export interface imageType {
    dateTaken: string,
    imageLink: string,
    issueId: string,
    _isBefore?: boolean,
    _isAfter?: boolean,
}

export interface issueImages {
    issueImages:imageType[]
}
