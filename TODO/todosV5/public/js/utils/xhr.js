const request = (url, method, successCallback, failureCallback, payload) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json'); // payload 없이도 아무런 문제없음
  xhr.send(JSON.stringify(payload)); // payload 를 stringify 하면 undefined xhr.send() 와 같아 아무런 문제없음

  // prettier-ignore
  xhr.addEventListener('load', () => {
    if (xhr.status === 200 || xhr.status === 201) successCallback(JSON.parse(xhr.response));
    else failureCallback(xhr.status);
  });
};

const xhr = {
  get(url, successCallback, failureCallback) {
    request(url, 'GET', successCallback, failureCallback);
  },
  post(url, payload, successCallback, failureCallback) {
    request(url, 'POST', successCallback, failureCallback, payload);
  },
  patch(url, payload, successCallback, failureCallback) {
    request(url, 'PATCH', successCallback, failureCallback, payload);
  },
  delete(url, successCallback, failureCallback) {
    request(url, 'DELETE', successCallback, failureCallback);
  },
};

export default xhr;
