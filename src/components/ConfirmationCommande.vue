<template>
  <div class="confirmation-commande">
    <h2>Confirmation de la commande</h2>
    <div v-if="produitsCommandes.length === 0">
      <p>Aucun produit dans la commande.</p>
      <button @click="fermerConfirmation">Fermer</button>
    </div>
    <div v-else>
      <div v-for="produit in produitsCommandes" :key="produit.id">
        <!-- Affichage des détails du produit -->
        <h3>{{ produit.type.libelle }} {{ produit.name }}: {{ produit.quantity }}</h3>
        <!-- ... Autres détails du produit ... -->
      </div>
      <!-- Calculer le prix total de la commande en utilisant les produitsCommandes -->
      <p>Prix total de la commande : {{ calculerPrixTotal() }}€</p>
      <button @click="fermerConfirmation">Fermer</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from '../stores/produit';
import { useCommandeStore, CommandeStore, Commande } from '../stores/commande';
import { defineComponent, onMounted, PropType } from 'vue';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

export default defineComponent({
  props: {
    /*commande: {
      type: Array as () => Commande[],
      required: true,
    },*/
    produitsCommandes: {
      type: Array as () => Product[],
      required: true,
    },
  },
  setup(props, { emit }) {
    const commandeStore: CommandeStore = useCommandeStore();
    //const currentDate = new Date();
    let now = format(new Date(), 'yyyy-MM-dd HH:mm')

    // Mapper les produits recus grace à ChatGPT
    const commandDetails: CommandeDetail[] = props.produitsCommandes.map((product) => ({
      produit : product.id,
      quantite : product.quantity,
    }));
    const newCommande: Commande = {
      heurePreparation: now,
      detailOrder: commandDetails
    };

    onMounted(async () => {
      console.log(now);
      if(props.produitsCommandes.length > 0)
        await commandeStore.saveCommande(newCommande)
    });

    const saveNewCommande = async () => {
      // Vérifier que les champs obligatoires sont remplis avant d'enregistrer le nouveau produit
      //if (newCommande.name && newCommande.prix > 0) {
        try {
          // Appel de l'action saveProduct pour enregistrer le nouveau produit dans la base de données
          await commandeStore.saveCommande(newCommande);

          // Remettre à zéro les valeurs du formulaire après l'enregistrement réussi
          newCommande.detailOrders = [];

          console.log('Nouveau produit enregistré avec succès !');
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement du produit :', error);
        }
      /*} else {
        console.warn('Veuillez remplir les champs obligatoires pour enregistrer le produit.');
      }*/
    };

    function fermerConfirmation() {
      this.$forceUpdate();
      // Émettre un événement pour indiquer à LaCarte.vue de fermer le composant ConfirmationCommande
      emit('fermerConfirmation');
    }

    // Calculer le prix total de la commande en tenant compte de la quantité de chaque produit
    function calculerPrixTotal() {
      const prixTotal = props.produitsCommandes.reduce((total, product) => total + product.prix * product.quantity, 0);
      return prixTotal.toFixed(2); // Arrondir à deux décimales (centimes)
    }

    return {
      // ... Autres variables et fonctions ...
      fermerConfirmation,
      calculerPrixTotal,
      commandeStore,
      newCommande,
      saveNewCommande,
    };
  },
});
</script>
<style>
.confirmation-commande {
  background-color: lightgrey;
  position:fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  padding: 0 auto;
  width: 100%;
}
</style>