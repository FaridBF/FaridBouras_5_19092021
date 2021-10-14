// Déclaration de l'URL de l'api
const urlAPI = "http://localhost:3000/api/cameras";

// Fonction pour afficher les données de l'API dans le DOM
function createProduct(data) {
  // récupérer div tableau
  let tableau = document.querySelector(".tableau");
  //créer table shopping
  let shopping = document.createElement("table");
  shopping.classList.add("shopping");
  tableau.appendChild(shopping);

  //créer shopping_details enfant de table shopping
  let shopping_details = document.createElement("tr");
  shopping_details.classList.add("shopping_details");
  shopping.appendChild(shopping_details);

  // Création de la td produit_image_panier
  let produit_image_panier = document.createElement("td");
  produit_image_panier.classList.add("produit_image_panier");
  shopping_details.appendChild(produit_image_panier);

  // Création d'une balise img pour produit_image_panier
  let image_panier = document.createElement("img");
  image_panier.src = data.imageUrl;
  produit_image_panier.appendChild(image_panier);

  //créer td produit_panier enfant de shopping_details
  let reference_panier = document.createElement("td");
  reference_panier.classList.add("reference_panier");
  shopping_details.appendChild(reference_panier);
  reference_panier.innerHTML = data.name;

  // créer td .select_reference (enfant de .texte_produit)
  let select_reference = document.createElement("td");
  select_reference.classList.add("select_reference");
  shopping_details.appendChild(select_reference);

  // créer une class selection (enfant de .select_reference)
  let selection = document.createElement("select");
  selection.classList.add("selection");
  select_reference.appendChild(selection);

  // boucler sur le tableau data.lenses
  // pour chaque élément de data.lenses
  data.lenses.forEach((element) => {
    // --- creer une balise option
    selection_option = document.createElement("option");
    // assigner à cette balise la valeur de l'élément
    selection_option.innerHTML = element;
    // ajouter à la balise option un attribut value et lui assigner aussi la valeur de l'élément
    selection_option.value = element;
    // ajouter cette balise en tant qu'enfant de la balise select
    selection.appendChild(selection_option);
  });

  // créer div .quantite_container_panier (enfant de .shopping_details)
  let quantite_container_panier = document.createElement("td");
  quantite_container_panier.classList.add("quantite_container_panier");
  shopping_details.appendChild(quantite_container_panier);

  // créer p .descriptif_quantite (enfant de .quantite_container_panier)
  let descriptif_quantite_panier = document.createElement("p");
  descriptif_quantite_panier.classList.add("descriptif_quantite_panier");
  quantite_container_panier.appendChild(descriptif_quantite_panier);
  descriptif_quantite_panier.innerHTML = "Quantité : ";

  // créer une class quantite_panier (enfant de .quantite_container_panier)
  let quantite_panier = document.createElement("select");
  quantite_panier.classList.add("quantite_panier");
  quantite_container_panier.appendChild(quantite_panier);

  // boucler sur le tableau array afin d'indiquer la quantité
  const array = ["1", "2", "3", "4", "5"];
  array.forEach((element) => {
    // creer une balise quantite_option
    quantite_option_panier = document.createElement("option");
    // assigner à cette balise la valeur de l'élément
    quantite_option_panier.innerHTML = element;
    // ajouter à la balise option un attribut value et lui assigner aussi la valeur de l'élément
    quantite_option_panier.value = element;
    // ajouter cette balise en tant qu'enfant de la balise quantite
    quantite_panier.appendChild(quantite_option_panier);
  });

  // créer prix enfant de shoppings details
  let prix_panier = document.createElement("td");
  prix_panier.classList.add("prix_panier");
  shopping_details.appendChild(prix_panier);
  prix_panier.innerHTML = (data.price / 100).toFixed(2) + " €";
}

// ------------- CLASSE GERANT PANIER DANS LOCALSTORAGE ------------- //
class ShoppingCart {
  constructor() {
    this.nameInStorage = "shopping-cart";
    this.content = [];
  }

  getShoppingContent() {
    this.content = localStorage.getItem(this.nameInStorage);
    if (this.content === null) {
      this.content = [];
    } else {
      this.content = JSON.parse(this.content); // transform ce qui est récup en string en json
    }
  }

  add(oneProduct) {
    this.getShoppingContent();
    this.content.push(oneProduct);
    // transforme JSON en string
    localStorage.setItem(this.nameInStorage, JSON.stringify(this.content));
  }
}

// Lien avec le fichier class.js (permet d'afficher les éléments dans panier)
let shoppingCart = new ShoppingCart();
shoppingCart.getShoppingContent();
console.log(shoppingCart.content);

shoppingCart.content.forEach((element) => createProduct(element));
// ------------- FIN CLASSE GERANT PANIER DANS LOCALSTORAGE ------------- //
