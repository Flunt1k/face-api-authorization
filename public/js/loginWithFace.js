let width = 1280
let height = 0


let streaming = false

let video = null
let canvas = null
let startbutton = null

document.addEventListener('DOMContentLoaded', startup)

function startup() {
  video = document.getElementById('video')
  canvas = document.getElementById('canvas')
  startbutton = document.querySelector('.startbutton')

  navigator.mediaDevices.getUserMedia({
    video: {
      width: {ideal: 1280},
      height: {ideal: 720},
    }, audio: false,
  }).then(stream => {
    video.srcObject = stream
    video.play()
  }).catch(err => {console.log(err)})

  video.addEventListener('canplay', () => {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width)

      video.setAttribute('width', width)
      video.setAttribute('height', height)
      canvas.setAttribute('width', width)
      canvas.setAttribute('height', height)
      streaming = true
    }
  }, false)

  startbutton.addEventListener('click', async function(ev) {
    ev.preventDefault()
    takepicture()
  }, false)
}

function takepicture() {

  const context = canvas.getContext('2d')
  const email = document.querySelector('#email').value
  if (width && height) {
    canvas.width = width
    canvas.height = height
    context.drawImage(video, 0, 0, width, height)
    const faceData = canvas.toDataURL('image/png')
    const body = {
      faceData, email
    }
    console.log(body)
    fetch('/api/auth/face-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json()).then(res => {
      console.log(res)
    if (res.status && res.answer._label !== 'unknown') {
        window.location = '/'
      } else {
      M.toast({html: res.message, classes: 'rounded'})
    }
    })
  }
}


