import { IssueStatus } from '~~/types/enums';

export default function cleanup (): void {
  const temporaryIssue = useTemporaryIssue();
  temporaryIssue.value.userName = 'admin1';
  temporaryIssue.value.cameraImage = '';
  temporaryIssue.value.beforeImage = '';
  temporaryIssue.value.afterImage = '';
  temporaryIssue.value.address = '';
  temporaryIssue.value.severity = '';
  temporaryIssue.value.lat = 0;
  temporaryIssue.value.lng = 0;
  temporaryIssue.value.mapURL = '';
  temporaryIssue.value.dateTaken = '';
  temporaryIssue.value.issueDescription = '';
  temporaryIssue.value.issueType = '';
  temporaryIssue.value.fixTime = 0;
  temporaryIssue.value.issueStatus = IssueStatus.PENDING;
}
