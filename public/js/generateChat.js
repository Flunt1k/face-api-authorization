const formCreate = document.querySelector('#form_createParty')

formCreate.addEventListener('submit', createParty)

async function createParty(ev) {
  ev.preventDefault()
  const {
    chat: {
      value: chat
    }, method, action,
  } = ev.target
  const body = {
    chat
  }

  const res = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const result = await res.json()
  if (result.status) {
    window.location = `/chatroom/${result.room_id}`
  } else {
    console.log(result.message)
  }
}
