// Lien avec le fichier class.js (permet d'afficher les éléments dans panier)
let shoppingCart = new ShoppingCart();
shoppingCart.getShoppingContent();
// console.log("shoppingCart.content", shoppingCart.content);

shoppingCart.content.forEach((element) => createProduct(element));
// Si contenu du panier n'est pas vide, afficher le résultat final qui appelera la fonction de calcul du total
if (shoppingCart.content.length != 0) {
  display_total_final();
}
