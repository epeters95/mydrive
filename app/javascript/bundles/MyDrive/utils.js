import ReactOnRails from 'react-on-rails';

export const fetchAndCallback = async (url, method, body="", callback=()=>{}) => {
  const resp = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': ReactOnRails.authenticityToken()
    },
    body: body
  }).then(callback());
  
  const respJson = await resp.json();
  return respJson;
}