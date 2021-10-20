// // Déclaration de l'URL de l'api
// const urlAPI = "http://localhost:3000/api/cameras";

// // Lien avec le fichier class.js (permet d'afficher les éléments dans panier)
// let shoppingCart = new ShoppingCart();
// shoppingCart.getShoppingContent();
// console.log(shoppingCart.content);
// shoppingCart.content.forEach((element) => createProduct(element));
// ------------- FIN CLASSE GERANT PANIER DANS LOCALSTORAGE ------------- //

// on récupère l'ensemble des données de manière brut ce qui correspond à notre contactobject en données brut
// let form = document.getElementById("contact-form"); // nom de notre formulaire dans la partie HTML (récupération via ID)
// let formContact = new FormData(document.getElementById("contact-form")); // Form Data est une classe permettant de transformer le formulaire dans une forme utilisable facilement

// let firstname = formContact.get("firstname"); // On récupère via les champs "name" dans le formulaire afin de récupérer la valeur dans le bonne forme (Formdata)
// let lastname = formContact.get("lastname");
// let city = formContact.get("city");
// let address = formContact.get("address");
// let email = formContact.get("email");

// //Création du contact object via les données brut afin de formater l'ensemble pour l'API (il faut respecter exactement ce que demande l'API)
// let contactObject = {
//   firstName: firstname,
//   lastName: lastname,
//   city: city,
//   address: address,
//   email: email,
// };

// Récupération des ID, mise en place des écouteurs d'évènements
document
  .querySelector("#contact-form")
  .addEventListener("submit", function (e) {
    var nom = document.querySelector("#nom");
    if (nom.value.length != 10) {
      // alert("Merci de renseigner votre nom");
      e.preventDefault; // pour empêcher la soumission du formulaire
    }
  });
document
  .querySelector("#contact-form")
  .addEventListener("submit", function (e) {
    var prenom = document.querySelector("#prenom");
    if (prenom.value.length != 10) {
      // alert("Merci de renseigner votre prénom");
      e.preventDefault; // pour empêcher la soumission du formulaire
    }
  });
document
  .querySelector("#contact-form")
  .addEventListener("submit", function (e) {
    var adresse = document.querySelector("#adresse");
    if (adresse.value.length != 10) {
      // alert(
      //   "Veuillez correctement renseigner le formulaire pour valider votre commande"
      // );
      e.preventDefault; // pour empêcher la soumission du formulaire
    }
  });
document
  .querySelector("#contact-form")
  .addEventListener("submit", function (e) {
    var ville = document.querySelector("#ville");
    if (ville.value.length != 5) {
      // alert("Merci de renseigner votre ville");
      e.preventDefault; // pour empêcher la soumission du formulaire
    }
  });
document
  .querySelector("#contact-form")
  .addEventListener("submit", function (e) {
    var mail = document.querySelector("#mail");
    if (mail.value.length != 5) {
      alert("Merci de renseigner une adresse mail");
      e.preventDefault; // pour empêcher la soumission du formulaire
    }
  });
