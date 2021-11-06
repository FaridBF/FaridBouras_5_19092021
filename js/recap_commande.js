function display_recap_commande() {
  // récupération montant total de la commande
  let resultat_total = localStorage.getItem("totalInStorage");
  // récup infos du serveur (order_id, email, city et address du contact)
  let orderId = localStorage.getItem("orderId");
  let contactAddress = localStorage.getItem("contactAddress");
  let contactEmail = localStorage.getItem("contactEmail");
  let contactCity = localStorage.getItem("contactCity");

  const recap_commande = document.querySelector("#details_commande");
  recap_commande.innerHTML = `
  <p class="texte_details_commande">Merci, votre commande n° <b>${orderId}</b>
      est validée !
  </p>
  <p class="texte_details_commande">
      Votre facture pour un montant total de
      <b>${resultat_total} euros</b> vous
      sera transmise par mail à : <b>${contactEmail}</b>
  </p>
  <p class="texte_details_commande">
      Nous vous préviendrons lorsque votre commande sera
      expédiée à l'adresse suivante :
  </p>
  <p class="texte_details_commande">
      <b>${contactAddress}</b> à <b>${contactCity}</b>
  </p>`;
  // vider les éléments du localStorage (clé valeur)
  localStorage.setItem("orderId", "");
  localStorage.setItem("contactAddress", "");
  localStorage.setItem("contactEmail", "");
  localStorage.setItem("contactCity", "");
  localStorage.setItem("totalInStorage", "");
}

display_recap_commande();
