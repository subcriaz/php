import { IssueStatus } from '~~/types/enums'

export default interface issueRequestBody {
    userName: string,
    address?: string,
    severity: string,
    mapURL: string,
    imageLink?: string,
    issueDescription?: string,
    fixTime?: number,
    issueType: string,
    issueStatus?: IssueStatus,
    location?: {
      coordinates: [number, number]
    }
  }
