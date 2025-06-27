import ReactOnRails from 'react-on-rails';

export const fetchAndCallback = async (url, method, body=null, callback=null, json=true) => {
  const fetchOptions = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'X-CSRF-Token': ReactOnRails.authenticityToken()
    }
  }
  if (json) {
    fetchOptions.headers['Content-Type'] = 'application/json'
  } else {
    fetchOptions.headers['Content-Type'] = 'multipart/form-data'
  }
  // fetchOptions.headers = ReactOnRails.authenticityHeaders(fetchOptions.headers)
  if (method === "POST" || method === "PATCH" || method === "PUT") {
    fetchOptions.body = body
  }
  const resp = await fetch(url, fetchOptions);
  if (callback) {
    callback(resp);
  }
  const respJson = await resp.json();
  return respJson;
}