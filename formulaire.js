// // Déclaration de l'URL de l'api
// const urlAPI = "http://localhost:3000/api/cameras";

// // Lien avec le fichier class.js (permet d'afficher les éléments dans panier)
// let shoppingCart = new ShoppingCart();
// shoppingCart.getShoppingContent();
// console.log(shoppingCart.content);

shoppingCart.content.forEach((element) => createProduct(element));
// ------------- FIN CLASSE GERANT PANIER DANS LOCALSTORAGE ------------- //

// on récupère l'ensemble des données de manière brut ce qui correspond à notre contactobject en données brut
let form = document.getElementById("contact-form"); // nom de notre formulaire dans la partie HTML (récupération via ID)
let formContact = new FormData(document.getElementById("contact-form")); // Form Data est une classe permettant de transformer le formulaire dans une forme utilisable facilement

let firstname = formContact.get("firstname"); // On récupère via les champs "name" dans le formulaire afin de récupérer la valeur dans le bonne forme (Formdata)
let lastname = formContact.get("lastname");
let city = formContact.get("city");
let address = formContact.get("address");
let email = formContact.get("email");

//Création du contact object via les données brut afin de formater l'ensemble pour l'API (il faut respecter exactement ce que demande l'API)
let contactObject = {
  firstName: firstname,
  lastName: lastname,
  city: city,
  address: address,
  email: email,
};

// const buttonClear = document.getElementById("clear");
// buttonClear.addEventListener("click", () => {
//   location.reload();
// });
