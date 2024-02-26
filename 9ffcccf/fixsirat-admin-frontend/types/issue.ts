import { issueImages } from './image'
import { IssueStatus, Severity } from '~~/types/enums'
export default interface issue extends issueImages{
    reporter: string,
    userName: string,
    address?: string,
    severity: Severity,
    location: {
        coordinates: [lat:number, lng: number],
        type?: string
    },
    mapURL: string,
    dateTaken?: string,
    issueDescription?: string,
    issueType: string,
    fixTime?: number,
    issueStatus?: IssueStatus
}
