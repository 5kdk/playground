const req = (method, url, cb, payload) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(payload));

  xhr.addEventListener('load', () => {
    if (xhr.status === 200 || xhr.status === 201) cb(JSON.parse(xhr.response));
    else console.log(xhr.status);
  });
};

export default {
  get(url, cb) {
    req('GET', url, cb);
  },
  post(url, payload, cb) {
    req('POST', url, cb, payload);
  },
  patch(url, payload, cb) {
    req('PATCH', url, cb, payload);
  },
  delete(url, cb) {
    req('DELETE', url, cb);
  },
};
