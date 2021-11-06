//------- Fonction asynchrone pour envoyer la commande à l'api----- //
async function postCommand(contact) {
  let shoppingCart = new ShoppingCart(); // instance de la class shoppingcart
  shoppingCart.getShoppingContent();
  let products = []; // renvoyer un tableau vide par defaut (le nom 'products' est attendu par l'api)
  shoppingCart.content.forEach(function (product) {
    products.push(product._id); // l'API demande les ID des products
  });
  let orderDetails = JSON.stringify({ contact, products }); // converti en JSON (objet contact + liste products ID)
  let response = await fetch(urlAPI + "/order", {
    // attendre (await) le retour du back avant d'appeler l'URL de l'API
    method: "POST", // on chercher à envoyer les valeurs
    headers: {
      "content-Type": "application/json", //il faut que la requête soit du JSON (l'API)
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
    let formContact = new FormData(form); // Form Data est un constructeur JS permettant de transformer le formulaire dans une forme utilisable facilement

    let firstName = formContact.get("firstName"); // On récupère via les champs "name" dans le formulaire afin de récupérer la valeur dans la bonne forme (Formdata)
    let lastName = formContact.get("lastName");
    let city = formContact.get("city");
    let address = formContact.get("address");
    let email = formContact.get("email");

    let isFormValid = validateForm();

    if (isFormValid === true) {
      //  Création du contact via les données brut afin de formater l'ensemble pour l'API (il faut respecter exactement ce que demande l'API)
      let contact = {
        // clé: valeur
        firstName: firstName,
        lastName: lastName,
        city: city,
        address: address,
        email: email,
      };
      // .then() car fonction postCommand est asynchrone
      postCommand(contact).then(function (response) {
        // enregistrement des infos récupérées du serveur pour les mettre dans le localStorage
        localStorage.setItem("contactAddress", response.contact.address);
        localStorage.setItem("contactEmail", response.contact.email);
        localStorage.setItem("contactCity", response.contact.city);
        localStorage.setItem("orderId", response.orderId);
        let shoppingCart = new ShoppingCart();
        // cela fait appel à la fonction reset afin de pouvoir reload le panier une fois la commande passée
        shoppingCart.reset();
        window.location.href = "recap_commande.html";
      });
    }
  });
}
// fonction de vérification du formulaire
function validateForm() {
  if (lastName.value.length < 2) {
    alert("Veuillez renseigner le champs nom");
    return false;
  }
  if (firstName.value.length < 2) {
    alert("Veuillez renseigner le champs prénom");
    return false;
  }
  if (city.value.length < 2) {
    alert("Veuillez renseigner le champs ville");
    return false;
  }
  if (address.value.length < 5) {
    alert("Veuillez renseigner le champs adresse");
    return false;
  }
  if (
    !email.value.includes("@") ||
    !email.value.includes(".") ||
    email.value.length < 5
  ) {
    alert("Veuillez respecter le format email (exemple: orinoco@gmail.com)");
    return false;
  } else {
    return true;
  }
}
