import ReactOnRails from 'react-on-rails';
import toast, { Toaster } from 'react-hot-toast';

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

  if (method === "POST" || method === "PATCH" || method === "PUT") {
    fetchOptions.body = body
  }

  const toastId = toast.loading('Hold on...')

  const resp = await fetch(url, fetchOptions);
  if (callback) {
    callback(resp);
  }
  const respJson = await resp.json();

  toast.dismiss(toastId);
  
  return respJson;
}