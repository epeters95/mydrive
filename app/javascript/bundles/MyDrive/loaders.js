import ReactOnRails from 'react-on-rails';

export const albumsLoader = async () => {

  const resp = await fetch('http://localhost:3000/albums', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': ReactOnRails.authenticityToken()
    }
  });
  const respJson = await resp.json();
  return respJson;
}

export const editAlbumLoader = async ({ params }) => {
  const resp = await fetch('http://localhost:3000/albums/' + params.albumId + '/edit', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': ReactOnRails.authenticityToken()
    }
  });
  const respJson = await resp.json();
  return respJson;
}