import "./style.css"

const GATETES_URL = "https://64a0005ced3c41bdd7a6e62b.mockapi.io/gatos/gatos"

document.querySelector("#app").innerHTML = `
<section>
<h1>Añadir Gato 🐾</h1>
  <form id="gato-upload">
    <div class="form-items">
      <label for="form-name">Nombre</label>
      <input type="text" name="name" id="form-name">
      <label for="form-image">Imagen (URL)</label>
      <input type="text" name="image" id="form-image">
      <label for="form-score">Score</label>
      <input type="number" name="score" id="form-score" min=1 max=5>
    </div>
    <div class="form-submit">
      <button type="submit">Enviar</button>
    </div>
  </form>
</section>
<section>
<h2>Vuestros Gatos 🐈</h2>
  <div id="cat-container"></div>
</section>
`
const form = document.querySelector("#gato-upload")
const catContainer = document.querySelector("#cat-container")

// ADD CATS

const postGato = async (event) => {
  try {
    event.preventDefault()
    const nombre = document.querySelector("#form-name").value
    const imagen = document.querySelector("#form-image").value
    const score = document.querySelector("#form-score").value
    const res = await fetch(GATETES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombre,
        imagen: imagen,
        score: score
      })
    })
  } catch (err) {
    console.log("Error:", err)
  }
}

form.addEventListener("submit", postGato)

// SHOW CATS

const getCats = async () => {
  try {
    const res = await fetch(GATETES_URL)
    const response = await res.json()

    for (const cat in response) {
      catContainer.innerHTML += `
  <p id="test"></p>
      <div class="cat" id="${response[cat]._id}">
  <h3>${response[cat].nombre}</h3>
  <img src="${response[cat].imagen}" />
  <p>Score: ${response[cat].score}</p>
  <button class="delete-button" id="button-${response[cat]._id}">Eliminar</button>
  </div>
  `
      console.log("cat is rendered")
    }
  } catch {
    catContainer.innerText = "Aún no hay gatos."
  } finally {
    const res = await fetch(GATETES_URL)
    const response = await res.json()

    for (const cat in response) {
      const catDiv = document.getElementById(String(response[cat]._id))
      catDiv.addEventListener("click", catDiv.remove)
    }
  }
}

getCats()
