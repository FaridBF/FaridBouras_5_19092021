//  ------------- Fonction asynchrone pour envoyer la commande à l'api  ------------- //
async function postCommand(contact) {
  let shoppingCart = new ShoppingCart(); // instance de la class shoppingcart
  shoppingCart.getShoppingContent();
  let products = []; // renvoyer un tableau vide par defaut (le nom 'products' est attendu par l'api)
  shoppingCart.content.forEach(function (product) {
    products.push(product._id); // l'API demande les ID des products
  });
  let orderDetails = JSON.stringify({ contact, products }); // converti en JSON
  let response = await fetch(urlAPI + "/order", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: orderDetails,
  });
  return response.json();
}

//  ------------- Fonction de gestion du bouton_valider_commander et du formulaire  ------------- //
function submitOrder() {
  let submit_order_form = document.querySelector("#submit_order");
  // s'assurer que le bouton existe (n'est pas undefined ni null)
  // if (typeof submit_order_form != undefined && submit_order_form != null) {
  submit_order_form.addEventListener("click", function (e) {
    e.preventDefault();
    // on récupère l'ensemble des données de manière brut ce qui correspond à notre contactobject en données brut
    let form = document.getElementById("contact-form"); // nom de notre formulaire dans la partie HTML (récupération via ID)
    let formContact = new FormData(form); // Form Data est une classe JS permettant de transformer le formulaire dans une forme utilisable facilement

    let firstName = formContact.get("firstName"); // On récupère via les champs "name" dans le formulaire afin de récupérer la valeur dans le bonne forme (Formdata)
    let lastName = formContact.get("lastName");
    let city = formContact.get("city");
    let address = formContact.get("address");
    let email = formContact.get("email");

    //  Création du contact via les données brut afin de formater l'ensemble pour l'API (il faut respecter exactement ce que demande l'API)
    let contact = {
      // clé: valeur
      firstName: firstName,
      lastName: lastName,
      city: city,
      address: address,
      email: email,
    };
    // console.log(contactDetails);
    postCommand(contact).then(function (response) {
      console.log(response);
      // enregistremen des infos récupérées du serveur pour les mettre dans le localStorage
      localStorage.setItem("contactAddress", response.contact.address);
      localStorage.setItem("contactEmail", response.contact.email);
      localStorage.setItem("orderId", response.orderId);
      // .then() car fonction postCommand est asynchrone
      let shoppingCart = new ShoppingCart();
      // cela fait appel à la fonction reset afin de pouvoir reload le panier une fois la commande passée
      shoppingCart.reset();
      window.location.href = "recap_commande.html";
    });
  });
}
// console.log(contactDetails);
// Récupération des ID, mise en place des écouteurs d'évènements pour les règles de gestion

// document
//   .querySelector("#contact-form")
//   .addEventListener("change", function (e) {
//     let nom = document.querySelector("#lastName");
//     if (!nom.value) {
//       // alert("Merci de renseigner votre nom");
//       e.preventDefault; // pour empêcher la soumission du formulaire
//     }
//   });
// document
//   .querySelector("#contact-form")
//   .addEventListener("submit", function (e) {
//     let nom = document.querySelector("#lastName");
//     if (nom.value.length != 10) {
//       // alert("Merci de renseigner votre nom");
//       e.preventDefault; // pour empêcher la soumission du formulaire
//     }
//   });
// document
//   .querySelector("#contact-form")
//   .addEventListener("submit", function (e) {
//     var prenom = document.querySelector("#firstName");
//     if (prenom.value.length != 10) {
//       // alert("Merci de renseigner votre prénom");
//       e.preventDefault; // pour empêcher la soumission du formulaire
//     }
//   });
// document
//   .querySelector("#contact-form")
//   .addEventListener("submit", function (e) {
//     var adresse = document.querySelector("#address");
//     if (adresse.value.length != 10) {
//       // alert(
//       //   "Veuillez correctement renseigner le formulaire pour valider votre commande"
//       // );
//       e.preventDefault; // pour empêcher la soumission du formulaire
//     }
//   });
// document
//   .querySelector("#contact-form")
//   .addEventListener("submit", function (e) {
//     var ville = document.querySelector("#city");
//     if (ville.value.length > 5) {
//       alert("Merci de renseigner votre ville");
//       e.preventDefault; // pour empêcher la soumission du formulaire
//     }
//   });
// document
//   .querySelector("#contact-form")
//   .addEventListener("submit", function (e) {
//     var mail = document.querySelector("#email");
//     if (mail.value.length != 5) {
//       // alert("Merci de renseigner une adresse mail");
//       e.preventDefault; // pour empêcher la soumission du formulaire
//     }
//   });
