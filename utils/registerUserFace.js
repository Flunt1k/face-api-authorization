function registerUserFace(name, userID) {
  const faceapi = require('face-api.js')
  const canvas = require('canvas')
  require('@tensorflow/tfjs-node')

  const {Canvas, Image, ImageData} = canvas
  faceapi.env.monkeyPatch({Canvas, Image, ImageData})
  let result

  return Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromDisk('./models_face_api'),
    faceapi.nets.ssdMobilenetv1.loadFromDisk('./models_face_api'),
    faceapi.nets.faceLandmark68Net.loadFromDisk('./models_face_api'),
  ]).then(async () => {
    result = await getInfoAboutFace(name, userID)
    return result
  })

  function getInfoAboutFace(name, userID) {
    const list = [name]
    return Promise.all(
        list.map(async name => {
          const arr = []
          try {
            for (let i = 0; i <= 5; i++) {
              const img = await canvas.loadImage(
                  `./${userID}/person-${userID}-${i}.png`)
              const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
              arr.push(detection.descriptor)
            }
          } catch (e) {
            console.log(e)
          }
          return new faceapi.LabeledFaceDescriptors(name, arr)
        }),
    )
  }
}

module.exports = registerUserFace
