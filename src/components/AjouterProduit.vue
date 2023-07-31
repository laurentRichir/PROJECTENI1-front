<template>
  <main>
    <form @submit.prevent="saveNewProduct">
      <input v-model="newProduct.name" type="text" placeholder="Nom du produit" />
      <input v-model="newProduct.prix" type="number" placeholder="Prix" />
      <input v-model="newProduct.idType" type="number" placeholder="Prix" />
      <textarea v-model="newProduct.details" placeholder="Détails"></textarea>
      <button type="submit">Enregistrer le nouveau produit</button>
    </form>
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
    };

    return {
      productStore,
      newProduct,
      saveNewProduct,
    };
  },
});
</script>