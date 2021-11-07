// Lien avec le fichier shoppingCart.js
// (permet d'afficher les éléments dans panier)
let shoppingCart = new ShoppingCart();
shoppingCart.getShoppingContent();

// créer un tableau vide de sous totaux pour le remplir au fur
// et à mesure de l'ajout des produits
let tableau_sous_totaux = [];

// --- Fonction pour afficher les données de l'API dans le DOM --- //
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
    // let shoppingCart = new ShoppingCart();
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
  // multiplication afin d'obtenir le montant du sous total de l'élément
  let resultat_sous_total = data.quantity * (data.price / 100).toFixed(2);
  prix_soustotal_panier.innerHTML = resultat_sous_total + " €";
  // remplir le tableau_sous_totaux par chaque sous-total créé
  tableau_sous_totaux.push(resultat_sous_total);

  // récupération du bouton_vider dans le html pour vider totalement le tableau
  let bouton_vider = document.querySelector("#bouton_vider");
  bouton_vider.addEventListener("click", function () {
    // let shoppingCart = new ShoppingCart();
    shoppingCart.emptyShoppingContent();
  });

  // récupération du bouton_valider dans le html pour valider mon panier
  // dans le but de faire afficher le formulaire
  let bouton_valider = document.querySelector("#bouton_valider");
  bouton_valider.addEventListener("click", function () {
    // let shoppingCart = new ShoppingCart();
    shoppingCart.formButtonValidate();
    submitOrder();
  });
}

// --- Fin fonction pour afficher les données de l'API dans le DOM --- //

// ---  Fonction pour les calculs des sous-totaux --- //
// // calcul du total
function get_result_total_final(tableau_sous_totaux) {
  // faire la somme des éléments du tableau en les accumulant
  // La méthode reduce() applique une fonction qui est un « accumulateur »
  // et qui traite chaque valeur d'une liste
  // curr: élément courant
  const resultat_total_final = tableau_sous_totaux.reduce(
    (acc, curr) => acc + curr
    // valeur précédente + valeur actuelle
  );
  return resultat_total_final;
}
// ------------- Fin fonction pour les calculs des sous-totaux ------------- //

// --- Fonction qui affiche le total final --- //
function display_total_final() {
  // Gestion du <tfoot>
  let tableau_total = document.querySelector("tfoot");

  // créer un shopping_total <tr> de l'ensemble du panier
  let shopping_total = document.createElement("tr");
  shopping_total.classList.add("shopping_total");
  tableau_total.appendChild(shopping_total);

  // l'ensemble des th du tfoot afin d'avoir
  // le total des sous-totaux au bon endroit
  let total_final1 = document.createElement("th");
  total_final1.classList.add("total_final1");
  shopping_total.appendChild(total_final1);
  let total_final2 = document.createElement("th");
  total_final2.classList.add("total_final2");
  shopping_total.appendChild(total_final2);
  let total_final3 = document.createElement("th");
  total_final3.classList.add("total_final3");
  shopping_total.appendChild(total_final3);
  let total_final4 = document.createElement("th");
  total_final4.classList.add("total_final4");
  shopping_total.appendChild(total_final4);
  let total_final5 = document.createElement("th");
  total_final5.classList.add("total_final5");
  shopping_total.appendChild(total_final5);
  let total_final6 = document.createElement("th");
  total_final6.classList.add("total_final6");
  shopping_total.appendChild(total_final6);

  // créer un total_final <th> de l'ensemble du panier
  let total_final = document.createElement("th");
  total_final.classList.add("total_final");
  shopping_total.appendChild(total_final);
  // stocker le résultat de la fonction get_result_total_final dans une variable
  let resultat_total = get_result_total_final(tableau_sous_totaux);
  // let totalInStorage = "total_In_Storage";
  localStorage.setItem("totalInStorage", resultat_total);
  // afficher le résultat dans le DOM avec la valeur de la variable
  total_final.innerHTML = "Total: " + resultat_total + " €";
}
// --- Fin fonction qui affiche le total final --- //

shoppingCart.content.forEach((element) => createProduct(element));
// Si contenu du panier n'est pas vide,
// afficher le résultat final qui appelera la fonction de calcul du total
if (shoppingCart.content.length !== 0) {
  display_total_final();
}
