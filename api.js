// Déclaration de l'URL de l'api
const urlAPI = "http://localhost:3000/api/cameras";

// Récupérer produits depuis l'API

function getProducts() {
  // utiliser fetch pour récupération données API
  fetch(urlAPI)
    .then(function (res) {
      // Si tout est ok
      if (res.status === 200) {
        return res.json();
      }
    })
    // Récupérer la valeur de la réponse du JSON
    .then(function (value) {
      // console.log("MES PRODUITS", value[0]);
      // Récupérer name, description, price, imageUrl
      // et les afficher dans le DOM
      console.log(value);
      document.querySelector(".nom_produit").innerHTML = value[0].name;
      document.querySelector(".descriptif_produit").innerHTML =
        value[0].description;
      document.querySelector(".prix").innerHTML = value[0].price;

      // Création d'une balise img pour l'image
      let image = document.createElement("img");
      image.src = value[0].imageUrl; // ajout de l'attribut src avec la valeur récupérée de l'API
      image.alt = value[0].name; // ajout du nom du produit dans alt
      document.querySelector(".image_produit").appendChild(image); // ajout de la balise en tant qu'enfant dans la div parent
    });
}

getProducts();
