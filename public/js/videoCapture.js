let width = 1280
let height = 0
let counter = 0

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
    startbutton.disabled = true
    new Promise((resolve, reject) => {
      const dataArray = []
      const interval = setInterval(() => {
        if (counter === 5) {
          resolve(dataArray)
          clearInterval(interval)
        }
        console.log(counter)
        takepicture(dataArray)
      }, 1000)
    }).then(result => {
      counter = 0
      console.log(result)
      fetch('api/auth/face-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({dataArray: result}),
      }).then(res => res.json()).then(res => {
        console.log(res)
        if (res.status === 'ok') document.location = '/'
      })
    })
  }, false)
}


function takepicture(dataArray) {
  const context = canvas.getContext('2d')
  if (width && height) {
    canvas.width = width
    canvas.height = height
    context.drawImage(video, 0, 0, width, height)
    const data = canvas.toDataURL('image/png')
    dataArray.push(data)
    M.toast({html: counter+1, classes: 'rounded'})
    counter += 1
  }
}


