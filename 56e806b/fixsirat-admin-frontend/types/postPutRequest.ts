import issueRequestBody from './issueBody'

export default interface postPutRequestType {
    method: 'PUT' | 'POST',
    headers: {'content-type': 'application/json'},
    body: issueRequestBody
}
