import ReactOnRails from 'react-on-rails';

export const fetchAndCallback = async (url, method, body=null, callback=()=>{}) => {
  const fetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': ReactOnRails.authenticityToken()
    }
  }
  if (method === "POST" || method === "PATCH") {
    fetchOptions.body = body
  }
  const resp = await fetch(url, fetchOptions).then((resp) => { callback(resp) });
  
  const respJson = await resp.json();
  return respJson;
}