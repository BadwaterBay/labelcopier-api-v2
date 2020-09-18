export default class HttpError extends Error {
  constructor(response = {}) {
    let message = 'HTTP request failed';
    const responseStatus = response.status;

    if (responseStatus) {
      message += ` with status code ${responseStatus}`;
    }

    const responseMessage = response.statusText;

    if (responseMessage) {
      message += ` due to: ${responseMessage}`;
    }

    super(message);
    this.name = 'HttpError';
    this.status = responseStatus || null;
  }
}
