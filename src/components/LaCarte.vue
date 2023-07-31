<script lang="ts">
import { useProductStore, ProductStore, Product } from '../stores/produit';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const productStore: ProductStore = useProductStore();

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

    function maCommande() {
      productStore.products.forEach((product) => {
        if (product.quantity > 0) console.log(product);
      });
    }

    // Liste des types de produits
    const types = ['Entree', 'Pizza', 'Dessert', 'Boisson']; // Tu peux ajouter d'autres types si nécessaire

    // Renvoie un tableau avec les produits du type spécifié
    const getProductsByType = (type: string) => {
      return productStore.products.filter((product) => product.type.libelle === type);
    };

    return {
      productStore,
      types,
      incrementQuantity,
      decrementQuantity,
      maCommande,
      getProductsByType,
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
            <button @click="incrementQuantity(product)">+</button>
            <button @click="decrementQuantity(product)">-</button>
            {{  }}
            {{ product.quantity }}
        </a>
        <div v-if="getProductsByType(type).length === 0">Aucun produit</div>
      </div>
    </div>
    <button @click="maCommande()">Valider la commande</button>
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