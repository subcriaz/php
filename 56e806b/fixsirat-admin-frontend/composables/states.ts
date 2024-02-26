import issue from '~~/types/issue'
import { IssueStatus } from '~~/types/enums'
import temporaryIssue from '~~/types/temporaryIssueData'

const temporaryIssueObj = {
  userName: 'admin1',
  address: '',
  severity: '',
  cameraImage: '',
  beforeImage: '',
  afterImage: '',
  lat: 0,
  lng: 0,
  mapURL: '',
  dateTaken: '',
  issueDescription: '',
  issueType: '',
  fixTime: 0,
  issueStatus: IssueStatus.PENDING
}
export const useTemporaryIssue = () => {
  return useState<temporaryIssue>('temporaryIssue', () => temporaryIssueObj)
}
export const useIssues = () => {
  return useState<issue[]>('issues', () => [])
}
export const useIsEditIssue = () => {
  return useState<boolean>('isEditissue', () => false)
}
