import { issueImages } from './image'
import { IssueStatus } from '~~/types/enums'
export default interface issue extends issueImages{
    userName: string,
    address?: string,
    severity: string,
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
