function display_recap_commande() {
  // récupération montant total de la commande
  let resultat_total = localStorage.getItem("totalInStorage");
  // récupération infos du serveur (order_id, email, city et address du contact)
  let orderId = localStorage.getItem("orderId");
  let contactAddress = localStorage.getItem("contactAddress");
  let contactEmail = localStorage.getItem("contactEmail");
  let contactCity = localStorage.getItem("contactCity");

  const recap_commande = document.querySelector("#details_commande");
  recap_commande.innerHTML = `
  <p class="texte_details_commande">Merci , votre commande n° <b>${orderId}</b>
      est validée ! </p>
  <p class="texte_details_commande">Votre facture pour un montant total de <b>${resultat_total} euros</b>  va vous
      être transmise par mail à : <b>${contactEmail}</b></p>
  <p class="texte_details_commande">On vous préviendra quand elle partira chez vous à l'adresse suivante :<b>
  <p class="texte_details_commande">
  ${contactAddress}</b> à <b> ${contactCity}</b></p>
  </p>`;
  // vider les éléments du localStorage
  localStorage.setItem("orderId", "");
  localStorage.setItem("contactAddress", "");
  localStorage.setItem("contactEmail", "");
  localStorage.setItem("contactCity", "");
  localStorage.setItem("totalInStorage", "");
}

display_recap_commande();
