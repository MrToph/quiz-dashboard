import { invokeApig } from './libs/awsLib'

export function getArtist(name) {
  try {
    return invokeApig({
      path: `/artists/${name}`,
      method: 'GET',
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export function getArtists() {
  try {
    return invokeApig({
      path: '/artists',
      method: 'GET',
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export function createArtists(name, artistUrl) {
  try {
    const body = {
      name,
      url: artistUrl,
    }
    return invokeApig({
      path: '/artists',
      method: 'POST',
      body,
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export function updateArtist(oldName, newUrl) {
  try {
    const body = {
      url: newUrl,
    }
    return invokeApig({
      path: `/artists/${oldName}`,
      method: 'PUT',
      body,
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export function deleteArtist(name) {
  try {
    return invokeApig({
      path: `/artists/${name}`,
      method: 'DELETE',
    })
  } catch (e) {
    return Promise.reject(e)
  }
}
