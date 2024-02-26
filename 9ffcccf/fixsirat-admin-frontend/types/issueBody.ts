import { IssueStatus, Severity } from '~~/types/enums'
export default interface issueRequestBody{
    reporter: string,
    userName: string,
    address?: string,
    severity: Severity,
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
