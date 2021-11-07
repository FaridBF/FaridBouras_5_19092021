// Déclaration de l'URL de l'api
const urlAPI = "http://localhost:3000/api/cameras";

// --- DEBUT CLASSE GERANT PANIER DANS LOCALSTORAGE --- //
class ShoppingCart {
  constructor() {
    // la clé afin de faire le lien avec mon local storage
    this.nameInStorage = "shopping-cart";
    // il s'agit de ma liste (tableau) -  c'est le contenu de mon panier
    this.content = [];
  }

  // méthode qui récupère le contenu de localStorage et
  // l'affecte à this.content (attribut)
  getShoppingContent() {
    this.content = localStorage.getItem(this.nameInStorage);
    if (this.content === null) {
      this.content = [];
    } else {
      // transform le json récupéré en objet JS
      this.content = JSON.parse(this.content);
    }
  }

  // méthode qui vide l'ensemble du panier
  emptyShoppingContent() {
    this.getShoppingContent(); // récupère contenu
    this.content.splice(0, this.content.length); // vide
    // permet de stocker dans le local storage les informations du tableau
    localStorage.setItem(this.nameInStorage, JSON.stringify(this.content));
    location.reload();
  }

  // méthode qui supprime un élément un à un
  remove(oneProduct) {
    this.getShoppingContent();
    // création d'une variable par defaut en null
    let indexToRemove = null;
    // index est le numéro de placement de l'item
    // et one item contient toutes les infos
    this.content.forEach(function (oneItem, index) {
      // boucler sur l'ensemble du panier pour récupérer l'index de l'objet
      // pour lequel quantité -= 1
      if (oneProduct._id === oneItem._id) {
        // de là s'il trouve, il définit notre variable
        // et ça peu importe le chiffre 0, 1, 2....
        indexToRemove = index;
      }
    });
    // si indexToremove n'est pas rester à null
    if (indexToRemove !== null) {
      // si on trouve l'élément dans notre panier le produit qui correspond
      // index du produit à supprimer dans le tableau
      this.content[indexToRemove].quantity -= 1;
      if (this.content[indexToRemove].quantity === 0) {
        // si la quantité de l'élément ayant indextoremove = 0
        // l'élément que l'on souhaite enlever il est à la place indexToRemove
        this.content.splice(indexToRemove, 1);
        // splice : pour enlever un élément / 1 n'est pas la notion de quantité
        // va enlever la ligne concernée dans le tableau
      }
    }
    // permet de stocker dans le local storage les informations du tableau
    localStorage.setItem(this.nameInStorage, JSON.stringify(this.content));
    location.reload();
  }
  //méthode qui a pour but d'ajouter les produits.
  add(oneProduct, quantite_selectionnee, lenses_selectionnee) {
    this.getShoppingContent();
    // j'ajoute un produit
    let alreadyExists = false;
    // boucler sur chaque élément du panier
    this.content.forEach(function (oneElement) {
      // si sur chq élement sur lequel on itère l'id de l'élément
      // correspond à l'id du produit à ajouter
      if (
        oneElement._id === oneProduct._id &&
        oneElement.lenses === lenses_selectionnee
      ) {
        alreadyExists = true;
        // alors j'incrémente la qté avec celle reçue de produit.html
        oneElement.quantity += quantite_selectionnee;
      }
    });
    if (alreadyExists === false) {
      let productToSave = {
        // Variable qui contient tous les éléments que je souhaite sauvegarder
        _id: oneProduct._id,
        imageUrl: oneProduct.imageUrl,
        lenses: lenses_selectionnee,
        name: oneProduct.name,
        price: oneProduct.price,
        quantity: quantite_selectionnee,
      };
      // j'envoie l'élément à sauvegarder dans mon panier
      this.content.push(productToSave);
    }
    // mettre à jour le local storage ac content en JSON
    localStorage.setItem(this.nameInStorage, JSON.stringify(this.content));
  }
  // Méthode reset: permet de vider le panier après utilisation du formulaire
  reset() {
    this.content = [];
    localStorage.setItem(this.nameInStorage, JSON.stringify(this.content));
  }

  // insérer la template formulaire avec l'ensemble des champs demandés
  formButtonValidate() {
    this.getShoppingContent(); // récupère le contenu
    const formulaire = document.querySelector("#contact-form");
    formulaire.innerHTML = `
    <div class="style_champs">
        <label for="lastName">Nom* :</label>
        <input
            type="text"
            id="lastName"
            name="lastName"
            minlength="2"
            maxlength="30"
            required
        >
    </div>
    <div>
        <label for="firstName">Prénom* :</label>
        <input
            type="text"
            id="firstName"
            name="firstName"
            minlength="2"
            maxlength="30"
            required
       >
    </div>
    <div>
        <label for="address">Adresse* :</label>
        <input
            type="text"
            id="address"
            name="address"
            minlength="5"
            maxlength="150"
            required
       >
    </div>
    <div>
        <label for="city">Ville* :</label>
        <input
            type="text"
            id="city"
            minlength="2"
            maxlength="50"
            name="city"
            required
       >
    </div>
    <div>
        <label for="email">E-mail* :</label>
        <input
            type="email"
            id="email"
            name="email"
            minlength="5"
            maxlength="150"
            required
       >
    </div>
    <div class="bouton_conteneur">
    <button type="submit" class="bouton" id="submit_order">Commander</button>
    </div>`;
  }
}
// ------------- FIN CLASSE GERANT PANIER DANS LOCALSTORAGE ------------- //
