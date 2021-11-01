function display_recap_commande() {
  // récupération montant total de la commande
  let resultat_total = localStorage.getItem("totalInStorage");
  console.log(resultat_total); // TODO: a suppr
  // récupération infos du serveur (order_id, email et address du contact)
  let orderId = localStorage.getItem("orderId");
  let contactAddress = localStorage.getItem("contactAddress");
  let contactEmail = localStorage.getItem("contactEmail");
  console.log(orderId);
  console.log(contactAddress);
  console.log(contactEmail);

  //   let shoppingCart = new ShoppingCart();
  //   shoppingCart.getShoppingContent();
  const recap_commande = document.querySelector("#details_commande");
  recap_commande.innerHTML = `
  <p class="texte_details_commande">Merci , votre commande n° ${orderId}
      est validée ! </p>
  <p class="texte_details_commande">Votre facture pour un montant total de ${resultat_total} va vous
      être transmise par mail à : ${contactEmail}</p>
  <p class="texte_details_commande">On vous préviendra quand elle partira chez vous à l'adresse suivante :
  <p class="texte_details_commande">
  ${contactAddress}</p>
  </p>`;
  // vider les éléments du localStorage
  localStorage.setItem("orderId", "");
  localStorage.setItem("contactAddress", "");
  localStorage.setItem("contactEmail", "");
  localStorage.setItem("totalInStorage", "");
}

display_recap_commande();
