<template>
  <main>
    <form @submit.prevent="saveNewProduct">
      <label for="nom">Nom</label>
      <input v-model="newProduct.name" type="text" id="nom" placeholder="Nom du produit" />
      <label for="prix">Prix</label>
      <input v-model="newProduct.prix" type="number" id="prix" placeholder="Prix" />
      <label for="type">Type de produit</label>
      <select v-model="newProduct.idType" id="type">
        <option value="1">Entrée</option>
        <option value="2">Pizza</option>
        <option value="3">Dessert</option>
        <option value="4">Boisson</option>
      </select>
      <label for="details">Détails du produit</label>
      <textarea v-model="newProduct.details" placeholder="Détails" id="details"></textarea>
      <button type="submit">Enregistrer le nouveau produit</button>
    </form>


    <!-- Nouveau composant (modal) pour afficher après l'enregistrement réussi -->
    <div v-if="showSuccessModal" class="success-modal">
      <h2>Nouveau produit enregistré avec succès !</h2>
      <button @click="closeModal">Fermer</button>
    </div>


  </main>
</template>

<script lang="ts">
import { useProductStore, ProductStore, Product } from '../stores/produit';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  setup() {
    const productStore: ProductStore = useProductStore();
    const newProduct: Product = {
      name: '',
      prix: 0,
      details: '',
      idType: 0,
    };

    const showSuccessModal = ref(false); // Variable pour contrôler l'affichage du nouveau composant (modal)

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
          // Afficher le nouveau composant (modal) après l'enregistrement réussi
          showSuccessModal.value = true;

        } catch (error) {
          console.error('Erreur lors de l\'enregistrement du produit :', error);
        }
      } else {
        console.warn('Veuillez remplir les champs obligatoires pour enregistrer le produit.');
      }
    };

    const closeModal = () => {
      // Fermer le nouveau composant (modal) en définissant la variable sur false
      showSuccessModal.value = false;
    };

    return {
      productStore,
      newProduct,
      saveNewProduct,
      showSuccessModal,
      closeModal,
    };
  },
});
</script>

<style>
form {
  display: flex;
  flex-flow: column wrap;
  gap: 10px;
}
</style>