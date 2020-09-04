const path = require('path')

function compareFace(id, result) {
  const faceapi = require('face-api.js')
  const canvas = require('canvas')
  require('@tensorflow/tfjs-node')

  const {Canvas, Image, ImageData} = canvas
  faceapi.env.monkeyPatch({Canvas, Image, ImageData})

  return Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromDisk('./models_face_api'),
    faceapi.nets.ssdMobilenetv1.loadFromDisk('./models_face_api'),
    faceapi.nets.faceLandmark68Net.loadFromDisk('./models_face_api'),
  ]).then(async () => {
    const matcher = new faceapi.FaceMatcher(result, 0.4)
    const img = await canvas.loadImage(path.join(__dirname, '..', `login-${id}`, `login-photo${id}.png`))
    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
    return matcher.findBestMatch(detections.descriptor)
  })
}

module.exports = compareFace
