<template>
  <div class="confirmation-commande">
    <h2>Confirmation de la commande</h2>
    <div v-if="produitsCommandes.length === 0">Aucun produit dans la commande.</div>
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
import { defineComponent, PropType } from 'vue';
import { Product } from '../stores/produit';
//import { Commande } from '../stores/commande';

export default defineComponent({
  props: {
    produitsCommandes: {
      type: Array as () => Product[],
      required: true,
    },
  },
  setup(props, { emit }) {
/*    const newCommande: Commande = {
      heure: '',
      produits: this.produitsCommandes,
    };

    const saveNewProduct = async () => {
      // Vérifier que les champs obligatoires sont remplis avant d'enregistrer le nouveau produit
      if (newProduct.name && newProduct.prix > 0) {
        try {
          // Appel de l'action saveProduct pour enregistrer le nouveau produit dans la base de données
          await productStore.saveProduct(newProduct);

          // Remettre à zéro les valeurs du formulaire après l'enregistrement réussi
          newProduct.name = '';
          newProduct.prix = 0;
          newProduct.details = '';

          console.log('Nouveau produit enregistré avec succès !');
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement du produit :', error);
        }
      } else {
        console.warn('Veuillez remplir les champs obligatoires pour enregistrer le produit.');
      }
    };*/

    function fermerConfirmation() {
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
    };
  },
});
</script>