const socket = io()
const roomId = document.querySelector('.wrapper').dataset.room
const btn = document.querySelector('.send')
const input = document.querySelector('#msg')
const container = document.querySelector('.conversation-start')
const peopleContainer = document.querySelector('.people')

socket.on('connect', () => {
  socket.emit('userConnected', roomId)
})

socket.on('userConnected', (username) => {
  M.toast({html: `Пользователь ${username} подключился`, classes: "rounded"})
})



btn.addEventListener('click', sendMessage)

async function sendMessage(e){
  e.preventDefault()
  const value = input.value
  input.value = ''
  const msg = document.createElement('div')
  msg.classList.add('bubble', 'you')
  msg.textContent = value
  container.append(msg)
  socket.emit('message', value, roomId)
}

socket.on('message', (message) => {
  const msg = document.createElement('div')
  msg.classList.add('bubble', 'me')
  msg.textContent = message
  container.append(msg)
})

socket.on('addUserToList', (username) => {
  const li = document.createElement('li', username)
  li.classList.add('person')
  li.textContent = username
  peopleContainer.append(li)
})

socket.on('userDisconnect', (username) => {
  const li = document.querySelector(`.${username}`)
  peopleContainer.removeChild(li)
})

window.onbeforeunload = function(){
  socket.emit('userDisconnect', roomId)
};
