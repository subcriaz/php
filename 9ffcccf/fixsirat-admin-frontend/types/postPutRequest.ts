import issueRequestBody from './issueBody'

export default interface postPutRequestType {
    method: 'PUT' | 'POST',
    headers: {'content-type': 'application/json', Authorization: string},
    body: issueRequestBody
}
