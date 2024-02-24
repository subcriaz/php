import { IssueStatus } from '~~/types/enums'
export default interface temporaryIssue{
    userName: string,
    cameraImage: string,
    beforeImage: string,
    afterImage: string
    address: string,
    severity: string,
    lat: number,
    lng: number,
    mapURL: string,
    dateTaken: string,
    issueDescription: string,
    issueType: string,
    fixTime: number,
    issueStatus: IssueStatus
}
