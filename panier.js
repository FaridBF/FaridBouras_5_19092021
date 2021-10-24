// Déclaration de l'URL de l'api
const urlAPI = "http://localhost:3000/api/cameras";

// créer un tableau vide de sous totaux pour le remplir au fur et à mesure de l'ajout des produits
let tableau_sous_totaux = [];
// console.log(tableau_sous_totaux);

// ------------- Fonction pour afficher les données de l'API dans le DOM ------------- //
function createProduct(data) {
  // crée un tableau vide de sous-totaux pour y ajouter chaque sous-totaux
  // récupérer div tableau_contenu
  let tableau_contenu = document.querySelector("tbody");

  //créer shopping_details enfant de table shopping
  let shopping_details = document.createElement("tr");
  shopping_details.classList.add("shopping_details");
  tableau_contenu.appendChild(shopping_details);

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

  // créer une class quantite_panier
  let option_select = document.createElement("p");
  option_select.classList.add("option_select");
  select_reference.appendChild(option_select);
  option_select.innerHTML = data.lenses;
  // getSelectValue("#selection");

  // créer div .quantite_container_panier (enfant de .shopping_details)
  let quantite_container_panier = document.createElement("td");
  quantite_container_panier.classList.add("quantite_container_panier");
  shopping_details.appendChild(quantite_container_panier);

  // créer une class quantite_panier
  let quantite_panier = document.createElement("p");
  quantite_panier.classList.add("quantite_panier");
  quantite_container_panier.appendChild(quantite_panier);
  quantite_panier.innerHTML = data.quantity;

  // créer une class supprimer
  let supprimer = document.createElement("td");
  supprimer.classList.add("supprimer");
  shopping_details.appendChild(supprimer);

  //création du button dans la class supprimer
  let bouton_supprimer = document.createElement("button");
  bouton_supprimer.classList.add("bouton_supprimer");
  supprimer.appendChild(bouton_supprimer);
  bouton_supprimer.innerHTML = "Supprimer";
  // Création d'un évènment click sur bouton_supprimer pour supprimer produit
  bouton_supprimer.addEventListener("click", function () {
    console.log(data);
    let shoppingCart = new ShoppingCart();
    shoppingCart.remove(data);
  });

  // créer prix enfant de shoppings details
  let prix_panier = document.createElement("td");
  prix_panier.classList.add("prix_panier");
  shopping_details.appendChild(prix_panier);
  prix_panier.innerHTML = (data.price / 100).toFixed(2) + " €";

  // créer prix_soustotal_panier enfant de shoppings details
  let prix_soustotal_panier = document.createElement("td");
  prix_soustotal_panier.classList.add("prix_soustotal_panier");
  shopping_details.appendChild(prix_soustotal_panier);
  let resultat_sous_total = data.quantity * (data.price / 100).toFixed(2);
  prix_soustotal_panier.innerHTML = resultat_sous_total + " €"; // multiplication data.quantity par data price afin d'obtenir le montant du sous total de l'élément correspondant
  // remplir le tableau_sous_totaux par chaque sous-total créé
  tableau_sous_totaux.push(resultat_sous_total);

  // créer button pour vider totalement le tableau
  let bouton_vider = document.querySelector("#bouton_vider");
  bouton_vider.addEventListener("click", function () {
    let shoppingCart = new ShoppingCart();
    shoppingCart.emptyShoppingContent();
  });
}
// ------------- Fin fonction pour afficher les données de l'API dans le DOM ------------- //

// -------------  Fonction pour les calculs des sous-totaux ------------- //
// // calcul du total
function get_result_total_final(tableau_sous_totaux) {
  // faire la somme des éléments du tableau en les accumulant
  // curr: élément courant
  const resultat_total_final = tableau_sous_totaux.reduce(
    (acc, curr) => acc + curr
    // valeur précédente + valeur actuelle
  );
  //La méthode reduce() applique une fonction qui est un « accumulateur » et qui traite chaque valeur d'une liste
  return resultat_total_final;
}
// ------------- Fin fonction pour les calculs des sous-totaux ------------- //

// ------------- Fonction qui affiche le total final ------------- //
function display_total_final() {
  // Gestion du <tfoot>
  let tableau_total = document.querySelector("tfoot");

  // créer un shopping_total <tr> de l'ensemble du panier
  let shopping_total = document.createElement("tr");
  shopping_total.classList.add("shopping_total");
  tableau_total.appendChild(shopping_total);

  // créer un total_final <th> de l'ensemble du panier
  let total_final = document.createElement("th");
  total_final.classList.add("total_final");
  shopping_total.appendChild(total_final);
  // stocker le résultat de la fonction get_result_total_final dans une variable
  let resultat_total = get_result_total_final(tableau_sous_totaux);
  // afficher le résultat dans le DOM avec la valeur de la variable
  total_final.innerHTML = "Total: " + resultat_total + " €";
}
// ------------- Fin fonction qui affiche le total final ------------- //

// ------------- DEBUT CLASSE GERANT PANIER DANS LOCALSTORAGE ------------- //
class ShoppingCart {
  constructor() {
    this.nameInStorage = "shopping-cart"; // la clé afin de faire le lien avec mon local storage
    this.content = []; // il s'agit de ma liste (tableau) -  c'est le contenu de mon panier
  }

  // méthode qui récupère le contenu de localStorage et l'affecte à this.content (attribut)
  getShoppingContent() {
    this.content = localStorage.getItem(this.nameInStorage);
    if (this.content === null) {
      this.content = [];
    } else {
      this.content = JSON.parse(this.content); // transform le json récupéré en objet JS
    }
  }

  // méthode qui vide l'ensemble du panier
  emptyShoppingContent() {
    this.getShoppingContent(); // récupère contenu
    this.content.splice(0, this.content.length); // vide
    localStorage.setItem(this.nameInStorage, JSON.stringify(this.content)); // permet de stocker dans le local storage les informations du tableau
    location.reload();
  }

  // méthode qui supprime un élément un à un
  remove(oneProduct) {
    this.getShoppingContent(); //récupération du contenu du panier avant qu'il ne puisse pouvoir rentrer dans la fonction
    let indexToRemove = null; // création d'une variable par defaut en null
    // index est le numéro de placement de l'item et one item contient toutes les infos
    this.content.forEach(function (oneItem, index) {
      // boucler sur l'ensemble de notre shoppint cart pour récupérer l'index de l'objet pour lequel quantité -= 1
      if (oneProduct._id === oneItem._id) {
        indexToRemove = index; // de là si il trouve, il définit notre variable et ça peu importe le chiffre 0, 1, 2....
      }
    });
    // si indexToremove n'est pas rester à null
    if (indexToRemove !== null) {
      // si on trouve l'élément dans notre panier le produit qui correspond
      this.content[indexToRemove].quantity -= 1; // index du produit à supprimer dans le tableau
      if (this.content[indexToRemove].quantity === 0) {
        // si la quantité de l'élément ayant indextoremove = 0
        this.content.splice(indexToRemove, 1); // l'élément que l'on souhaite enlever il est à la place indexToRemove
        // splice : pour enlever un élément / 1 n'est pas la notion de quantité, va enlever la ligne concernée dans le tableau
      }
    }
    // une fois que c'est fait, on va demander à faire un save à la condition qu'il est fait une modifs sinon ça sert à rien
    localStorage.setItem(this.nameInStorage, JSON.stringify(this.content)); // permet de stocker dans le local storage les informations du tableau
    location.reload();
  }

  add(oneProduct, quantite_selectionnee, lenses_selectionnee) {
    this.getShoppingContent();
    //récupération du contenu du panier avant qu'il ne puisse pouvoir rentrer dans la fonction
    // j'ajoute un produit
    let alreadyExists = false;
    // boucler sur chaque élément du panier
    this.content.forEach(function (oneElement) {
      // permet de faire le tour de l'ensemble des éléments dans notre panier
      if (oneElement._id === oneProduct._id) {
        // si sur chaque élement sur lequel on itère l'id de l'élément correspond à l'id du produit a ajouté
        alreadyExists = true; // condition permettant d'indiquer qu'elle a trouvé une quantité à incrémenter
        oneElement.quantity += quantite_selectionnee; // alors j'incrémente la quantité avec celle reçue depuis produit.html si la condition  précèdente est remplie
      }
    });
    if (alreadyExists === false) {
      // s'il n'est pas dans ma condition de ma quantité, elle n'a donc pas trouvé la valeur, de quantité à incrémenter, donc ajout
      let productToSave = {
        // Variable qui contient tous les éléments que je souhaite sauvegarder
        _id: oneProduct._id,
        name: oneProduct.name,
        imageUrl: oneProduct.imageUrl,
        lenses: lenses_selectionnee,
        quantity: quantite_selectionnee,
        price: oneProduct.price,
      };
      this.content.push(productToSave); //j'envoie l'ensemble des éléments sauvegarder dans mon panier en faisant le push du produit en question
    }
    localStorage.setItem(this.nameInStorage, JSON.stringify(this.content)); // transforme JSON en string
  }
}
// ------------- FIN CLASSE GERANT PANIER DANS LOCALSTORAGE ------------- //

// Lien avec le fichier class.js (permet d'afficher les éléments dans panier)
let shoppingCart = new ShoppingCart();
shoppingCart.getShoppingContent();
// console.log("shoppingCart.content", shoppingCart.content);

shoppingCart.content.forEach((element) => createProduct(element));
// Si contenu du panier n'est pas vide, afficher le résultat final qui appelera la fonction de calcul du total
if (shoppingCart.content.length != 0) {
  display_total_final();
}
