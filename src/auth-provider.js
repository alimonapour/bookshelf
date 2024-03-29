const localStorageKey = '__auth_provider_token__'

async function getToken() {
  return window.localStorage.getItem(localStorageKey)
}

function handleUserResponse({user}) {
  window.localStorage.setItem(localStorageKey, user.token)
  return user
}

async function login({username, password}) {
  const result = await client('login', {username, password})
  return handleUserResponse(result)
}

async function register({username, password}) {
  const result_1 = await client('register', {username, password})
  return handleUserResponse(result_1)
}

async function logout() {
  window.localStorage.removeItem(localStorageKey)
}

const authURL = process.env.REACT_APP_AUTH_URL

async function client(endpoint, data) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  }

  return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {getToken, login, register, logout, localStorageKey}
