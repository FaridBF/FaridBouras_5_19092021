// --- RECUPERATION ID PRODUIT DEPUIS URL --- //
// Récupération de la chaîne de requête dans l'URL
const queryString = window.location.search;

// // Méthode pour extraire l'ID depuis l'URL - constructor URL searchParams
let searchParams = new URLSearchParams(queryString);
let product_id = searchParams.get("id");

// --- FIN RECUPERATION ID PRODUIT DEPUIS URL --- //

// Déclaration de l'URL de l'api
const urlApiProduct = "http://localhost:3000/api/cameras/";

//  ---  Fonction pour afficher les données de l'API dans le DOM  ---  //
function displayProduct(data) {
  // récupérer div .conteneur_produit
  let conteneur_produit = document.querySelector(".conteneur_produit");
  //créer div .produit
  let produit = document.createElement("div");
  produit.classList.add("produit");
  conteneur_produit.appendChild(produit);

  // Création de la div image_produit
  let image_produit = document.createElement("div");
  image_produit.classList.add("image_produit");
  produit.appendChild(image_produit);

  // Création d'une balise img pour l'image
  let image = document.createElement("img");
  // ajout de l'attribut src avec la valeur récupérée de l'API
  image.src = data.imageUrl;
  // ajout du nom du produit dans alt
  image.alt = data.name;
  // ajout de la balise en tant qu'enfant dans la div parent
  image_produit.appendChild(image);

  //créer div .texte_produit
  let texte_produit = document.createElement("div");
  texte_produit.classList.add("texte_produit");
  produit.appendChild(texte_produit);

  // créer h2 .nom_produit (enfant de .texte_produit)
  let nom_produit = document.createElement("h2");
  nom_produit.classList.add("nom_produit");
  texte_produit.appendChild(nom_produit);
  nom_produit.innerHTML = data.name;

  // créer div .select_reference (enfant de .texte_produit)
  let select_reference = document.createElement("div");
  select_reference.classList.add("select_reference");
  texte_produit.appendChild(select_reference);

  // créer une class selection (enfant de .select_reference)
  let selection = document.createElement("select");
  selection.setAttribute("id", "selection");
  select_reference.appendChild(selection);

  // boucler sur le tableau data.lenses
  // pour chaque élément de data.lenses
  data.lenses.forEach((element) => {
    // --- creer une balise option
    let selection_option = document.createElement("option");
    // assigner à cette balise la valeur de l'élément
    selection_option.innerHTML = element;
    // ajouter à la balise option un attribut value avec valeur de l'élément
    selection_option.value = element;
    // ajouter cette balise en tant qu'enfant de la balise select
    selection.appendChild(selection_option);
  });

  // créer div
  let descriptif_container = document.createElement("div");
  texte_produit.appendChild(descriptif_container);

  // créer p .descriptif_produit (enfant de div .descriptif_container)
  let descriptif_produit = document.createElement("p");
  descriptif_produit.classList.add("descriptif_produit");
  descriptif_container.appendChild(descriptif_produit);
  descriptif_produit.innerHTML = data.description;

  // créer div .quantite_container (enfant de .texte_produit)
  let quantite_container = document.createElement("div");
  quantite_container.classList.add("quantite_container");
  texte_produit.appendChild(quantite_container);

  // créer p .descriptif_quantite (enfant de .quantite_container)
  let descriptif_quantite = document.createElement("p");
  descriptif_quantite.classList.add("descriptif_quantite");
  quantite_container.appendChild(descriptif_quantite);
  descriptif_quantite.innerHTML = "Quantité : ";

  // créer une class quantite (enfant de .quantite_container)
  let quantite = document.createElement("select");
  quantite.classList.add("quantite");
  quantite_container.appendChild(quantite);

  // boucler sur le tableau array afin d'indiquer la quantité
  const array = ["1", "2", "3", "4", "5"];
  array.forEach((element) => {
    // creer une balise quantite_option
    let quantite_option = document.createElement("option");
    // assigner à cette balise la valeur de l'élément
    quantite_option.innerHTML = element;
    // ajouter à la balise option un attribut value avec la valeur de l'élément
    quantite_option.value = element;
    // ajouter cette balise en tant qu'enfant de la balise quantite
    quantite.appendChild(quantite_option);
  });

  // créer div
  let prix_container = document.createElement("div");
  texte_produit.appendChild(prix_container);

  // créer p .prix (enfant de div)
  let prix = document.createElement("p");
  prix.classList.add("prix");
  prix_container.appendChild(prix);
  prix.innerHTML = (data.price / 100).toFixed(2) + " €";

  // créer div .bouton
  let bouton_conteneur = document.createElement("div");
  bouton_conteneur.classList.add("bouton_conteneur");
  texte_produit.appendChild(bouton_conteneur);

  // création du link vers produit.html
  let link = document.createElement("a");
  link.href = "panier.html";
  bouton_conteneur.appendChild(link);

  // récupérer l'option séléctionnée du produit
  selection.addEventListener("change", function () {
    // dans les options du select, récupérer la valeur (value)
    // de l'index sélectionné (quantite.selectedIndex)
    // selectedIndex et value sont des variables natives à JS
    selection.value = selection.options[selection.selectedIndex].value;
  });

  // let quantite_selectionnee = 1;
  // récupérer la quantité sélectionnée
  quantite.addEventListener("change", function () {
    quantite.value = quantite.options[quantite.selectedIndex].value;
  });

  // création du button comme enfant de parent link
  let bouton_commander = document.createElement("button");
  bouton_commander.classList.add("bouton_commander");
  bouton_commander.innerText = "Ajouter au panier";
  link.appendChild(bouton_commander);

  // Création d'un évènement click sur bouton_commander pour ajout produit
  bouton_commander.addEventListener("click", function () {
    let shoppingCart = new ShoppingCart();
    // ajouter un produit au panier avec data (objet produit) et quantite
    shoppingCart.add(data, parseInt(quantite.value), selection.value);
  });
}

//  ---  Fonction pour afficher le produit de l'id demandé  ---  //
function getProduct(product_id) {
  fetch(urlApiProduct + product_id)
    .then(function (res) {
      // Si tout est ok
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(function (data) {
      displayProduct(data);
    })
    .catch(function (err) {
      alert("Une erreur est survenue lors du chargement des données.");
    });
}

//-------------------------------------------------------------- //

// Appel à la fonction pour récupérer
// les données du produit demandé depuis l'API
getProduct(product_id);
