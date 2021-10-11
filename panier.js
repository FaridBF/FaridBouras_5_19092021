// Déclaration de l'URL de l'api
const urlAPI = "http://localhost:3000/api/cameras";

// // Création du tableau avec 6 élements via la class tableau
// var tableau = ["produit", "nom", "option", "quantité", "prix", "sous-total"];
// console.log("tableau", tableau);

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
    .then(function (data) {
      // Pour chaque élément du tableau de données, créer un produit à afficher en HTML
      // Boucler sur le tableau reçu de l'API et pour chaque element du tableau lancer la fonction createProduct
      // avec en paramètre chaque element du tableau
      data.forEach((element) => createProduct(element));
      console.log(data);
    })
    .catch(function (err) {
      // console.log("Une erreur est survenue : ", err);
      // alert("Une erreur est survenue : ", err);
    });
}

getProducts();
