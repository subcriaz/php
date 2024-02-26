import issue from '~~/types/issue'
import { IssueStatus, Severity } from '~~/types/enums'
import temporaryIssue from '~~/types/temporaryIssueData'

const temporaryIssueObj: temporaryIssue = {
  userName: '',
  address: '',
  severity: Severity.LOW,
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
  return useState<issue[] | undefined>('issues', () => [] || undefined)
}
export const useIsEditIssue = () => {
  return useState<boolean>('isEditissue', () => false)
}
export const useUser = () => {
  return useState<user>('user', () => ({ name: '', email: '', avatar: '' }))
}
