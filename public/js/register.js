const form = document.querySelector('#form_registration')


form.addEventListener('submit', registerUser)

async function registerUser(ev) {
  ev.preventDefault()
  const {
    email: {
      value: email,
    }, username: {
      value: username,
    }, password: {
      value: password,
    }, action, method,
  } = ev.target
    const body = {
    email, username, password,
  }
  const btn = ev.target.registerBtn || ''
  if (btn && btn.dataset.video){
    body.haveVideo = true
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
    if (result.status === 'redirect') {
      M.toast({html: result.message, classes: 'rounded'})
      setTimeout(()=> {
        window.location = '/login'
      }, 1000)
    } else {
      if (btn && btn.dataset.video){
        window.location = '/face-recorder'
      } else {
      window.location = '/'
      }
    }
  } else {
    if (result.message.errors) {
      for (const errorType in result.message.errors) {
        M.toast({html: result.message.errors[errorType].message , classes: 'rounded'})
      }
    } else {
      if (result.message.keyPattern.username) {
        M.toast({html: 'Username is already exist please change it or login', classes:'rounded'})
      }
    }
  }
}


