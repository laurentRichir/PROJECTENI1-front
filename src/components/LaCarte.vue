<script lang="ts">
import { useProductStore, ProductStore, Product } from '../stores/produit';
import {defineComponent, onMounted, Ref, ref} from 'vue';
import ConfirmationCommande from './ConfirmationCommande.vue'; // Vérifier le chemin vers ConfirmationCommande.vue

export default defineComponent({
  components: {
    ConfirmationCommande
  },
  setup() {
    const productStore: ProductStore = useProductStore();
    const afficherConfirmationCommande: Ref<boolean> = ref(false);
    const produitsCommandes = ref<Product[]>([]); // Variable pour stocker les produits commandés

    interface Product {
      enable: boolean;
    }

    // Charger les produits lorsque le composant est monté
    onMounted(async () => {
      await productStore.fetchProducts();
      initializeQuantities(productStore.products);
    });

    const initializeQuantities = (products: Product[]) => {
      products.forEach((product) => {
        product.quantity = 0;
      });
    };

    function incrementQuantity(product: Product) {
      product.quantity++;
    }

    function decrementQuantity(product: Product) {
      if (product.quantity > 0) product.quantity--;
    }

    function validerCommande() {
      // Filtrer les produits avec une quantité supérieure à 0 pour les ajouter à la commande
      produitsCommandes.value = productStore.products.filter((product) => product.quantity > 0);

      // Afficher le composant ConfirmationCommande avec les produits commandés
      afficherConfirmationCommande.value = true;
    }

    function fermerConfirmation() {
      // Fermer le composant ConfirmationCommande
      afficherConfirmationCommande.value = false;
    }

    // Liste des types de produits
    const types = ['Entree', 'Pizza', 'Dessert', 'Boisson']; // Tu peux ajouter d'autres types si nécessaire

    // Renvoie un tableau avec les produits du type spécifié
    const getProductsByType = (type: string) => {
      return productStore.products.filter((product) => product.type.libelle === type);
    };

    function enableProduct(product: Product) {
      const updateProduct: Product = {
        ...product,
        enable: !product.enable, // Toggle the 'enable' property
      };

      productStore.updateProduct(updateProduct);
    }

    return {
      productStore,
      types,
      incrementQuantity,
      decrementQuantity,
      getProductsByType,
      validerCommande,
      fermerConfirmation,
      afficherConfirmationCommande,
      produitsCommandes,
      enableProduct,
    };
  },
});
</script>

<template>
  <main>
    <div v-for="type in types" :key="type">
      <h2>Nos {{ type }}s</h2>
      <div v-if="productStore.products.length === 0">Chargement en cours...</div>
      <div class="produits" v-else>
        <a class="produit" v-for="product in getProductsByType(type)" :key="product.id">
            <img src="https://fakeimg.pl/250x100/">
            <h3>{{ product.name }}</h3>
            <p>{{ product.details }}</p>
            <p class="prix">{{ product.prix}}€</p>
            <input type="checkbox" :checked="product.enable" v-model="product.enable" @click="enableProduct(product)">
            <button @click="incrementQuantity(product)">+</button>
            <button @click="decrementQuantity(product)">-</button>
            {{ product.quantity }}
        </a>
        <div v-if="getProductsByType(type).length === 0">Aucun produit</div>
      </div>
    </div>
    <button @click="validerCommande">Valider la commande</button>
    <!-- Composant pour afficher les produits commandés -->
    <ConfirmationCommande v-if="afficherConfirmationCommande" :produitsCommandes="produitsCommandes" @fermerConfirmation="fermerConfirmation" />
  </main>
</template>

<style>
main{
  width: 100%;
  margin: 0px;
  padding: 0px;

}
h2{
  background-color: lightblue;
  width: 100%;
}
.produits {
  width: 100%;
  display: flex;
  flex-flow: row wrap;

}
.produit {
  background-color: lightcoral;
  margin: 10px;
  border-radius: 10px;
  width: auto;
}
.produit>img {
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

</style>