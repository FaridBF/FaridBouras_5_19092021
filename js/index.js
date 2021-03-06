// Déclaration de l'URL de l'api
const urlAPI = "http://localhost:3000/api/cameras";

// Fonction pour afficher les données de l'API dans le DOM
function createProduct(data) {
  // récupérer div .total_produits
  let total_produits = document.querySelector(".total_produits");
  //créer div .produit
  let produit = document.createElement("div");
  produit.classList.add("produit");
  total_produits.appendChild(produit);

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

  // créer div
  let descriptif_container = document.createElement("div");
  texte_produit.appendChild(descriptif_container);

  // créer p .descriptif_produit (enfant de div)
  let descriptif_produit = document.createElement("p");
  descriptif_produit.classList.add("descriptif_produit");
  descriptif_container.appendChild(descriptif_produit);
  descriptif_produit.innerHTML = data.description;

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
  link.href = "produit.html?id=" + data._id;
  bouton_conteneur.appendChild(link);

  // création du button comme enfant de parent link
  let bouton_commander = document.createElement("button");
  bouton_commander.classList.add("bouton_commander");
  bouton_commander.innerText = "Acheter ce produit";
  link.appendChild(bouton_commander);
}

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
      // Pour chaque élément du tableau de données,
      // créer un produit à afficher en HTML
      // Boucler sur le tableau reçu de l'API et
      // pour chaque element du tableau lancer la fonction createProduct
      // avec en paramètre chaque element du tableau
      data.forEach((element) => createProduct(element));
    })
    .catch(function (err) {
      alert("Une erreur est survenue lors du chargement des données.");
    });
}

getProducts();
