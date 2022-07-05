/** récupère le numéro de commande et supprime le localStorage.
 */
const idCommande = new URL(location.href).searchParams.get("id");
let commandeValider = document.getElementById("orderId");
commandeValider.textContent = idCommande;
localStorage.clear();