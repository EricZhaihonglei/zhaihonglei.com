(() => {
  var model = undefined;
  const classifierElement = document.getElementById('classifier');
  const loaderElement = document.getElementById('loader');
  const fileSelector = document.getElementById('my-file-selector');
  const imageElement = document.getElementById('predict-img');

  async function initialize() {
      model = await tf.loadLayersModel('plant_vs_pot/model.json');
      classifierElement.style.display = 'block';
      loaderElement.style.display = 'none';

      fileSelector.addEventListener('change', () => {
        const uploadedImage = document.getElementById('my-file-selector').files[0];
        imageElement.src = URL.createObjectURL(uploadedImage);
      })

      imageElement.addEventListener('load', predict);
      setTimeout(predict, 1000);
  }

  async function predict () {
    displayMsg('Predicting ...');
    const tensorImg = tf.browser.fromPixels(imageElement).resizeNearestNeighbor([150, 150]).toFloat().expandDims();
    prediction = await model.predict(tensorImg).data();
    console.log(prediction)
    displayMsg(`You uploaded ${prediction[0] > 0 ? "a plant" : "an empty plant pot" }!`);
  }

  function displayMsg(msg) {
    document.getElementById('predict_msg').innerText = msg
  }
  
  function hideMsg() {
    displayMsg('')
  }

  initialize();
})();
