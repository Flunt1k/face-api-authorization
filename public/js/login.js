const formLogin = document.querySelector('#form_login')

formLogin.addEventListener('submit', loginUser)

async function loginUser(ev) {
  ev.preventDefault()
  const {
    email: {
      value: email,
    },
    password: {
      value: password,
    },
    method,
    action,
  } = ev.target
  const body = {
    email, password
  }

  const res = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const result = await res.json()

  if (result.success) {
    window.location = '/'
  } else {
    if (result.status === 'error') {
      M.toast({html: result.message, classes: 'rounded'})
    } else {
      M.toast({html: result.message, classes: 'rounded'})
    }
  }
}
