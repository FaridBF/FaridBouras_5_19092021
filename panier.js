// Déclaration de l'URL de l'api
const urlAPI = "http://localhost:3000/api/cameras";

// Fonction pour afficher les données de l'API dans le DOM
function createProduct(data) {
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

  // créer une class selection (enfant de .select_reference)
  let selection = document.createElement("select");
  selection.classList.add("selection");
  select_reference.appendChild(selection);

  // boucler sur le tableau_contenu data.lenses
  // pour chaque élément de data.lenses
  // data.lenses.forEach((element) => {
  //   // --- creer une balise option
  //   selection_option = document.createElement("option");
  //   // assigner à cette balise la valeur de l'élément
  //   selection_option.innerHTML = element;
  //   // ajouter à la balise option un attribut value et lui assigner aussi la valeur de l'élément
  //   selection_option.value = element;
  //   // ajouter cette balise en tant qu'enfant de la balise select
  //   selection.appendChild(selection_option);
  // });

  // créer div .quantite_container_panier (enfant de .shopping_details)
  let quantite_container_panier = document.createElement("td");
  quantite_container_panier.classList.add("quantite_container_panier");
  shopping_details.appendChild(quantite_container_panier);

  // créer une class quantite_panier
  let quantite_panier = document.createElement("p");
  quantite_panier.classList.add("quantite_panier");
  quantite_container_panier.appendChild(quantite_panier);
  quantite_panier.innerHTML = data.quantity;

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
    //récupération du contenu du panier avant qu'il ne puisse pouvoir rentrer dans la fonction
    // j'ajoute un produit
    let alreadyExists = false;
    // boucler sur chaque élément du panier
    this.content.forEach(function (oneElement) {
      // permet de faire le tour de l'ensemble des éléments dans notre panier
      if (oneElement._id === oneProduct._id) {
        // si sur chaque élement sur lequel on itère l'id de l'élément correspond à l'id du produit a ajouté
        alreadyExists = true; // condition permettant d'indiquer qu'elle a trouvé une quantité à incrémenter
        oneElement.quantity += 1; // alors j'incrémente la quantité de 1 si la condition  précèdente est remplie
      }
    });
    if (alreadyExists === false) {
      // s'il n'est pas dans ma condition de ma quantité, elle n'a donc pas trouvé la valeur, de quantité à incrémenter, donc ajout
      let productToSave = {
        // Variable qui contient tous les éléments que je souhaite sauvegarder
        _id: oneProduct._id,
        name: oneProduct.name,
        imageUrl: oneProduct.imageUrl,
        quantity: 1, //quantité que je mets à 1 par default
        price: oneProduct.price,
      };
      this.content.push(productToSave); //j'envoie l'ensemble des éléments sauvegarder dans mon panier en faisant le push du produit en question
    }
    localStorage.setItem(this.nameInStorage, JSON.stringify(this.content)); // transforme JSON en string
  }
}
// Lien avec le fichier class.js (permet d'afficher les éléments dans panier)
let shoppingCart = new ShoppingCart();
shoppingCart.getShoppingContent();
console.log("shoppingCart.content", shoppingCart.content);

shoppingCart.content.forEach((element) => createProduct(element));
// ------------- FIN CLASSE GERANT PANIER DANS LOCALSTORAGE ------------- //
