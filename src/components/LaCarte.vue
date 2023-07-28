<script lang="ts">
import { useProductStore, ProductStore } from '../stores/produit';
import { defineComponent,onMounted } from 'vue';

export default defineComponent({
  setup() {
    const productStore: ProductStore = useProductStore();

    // Vous pouvez également appeler explicitement fetchProducts pour charger les produits lorsque nécessaire
    // productStore.fetchProducts();

    // Charger les produits lorsque le composant est monté
    onMounted(() => {
      productStore.fetchProducts();
    });

    return {
      productStore,
    };
  },
});
</script>

<template>
  <main>
    <h2>Entrées</h2>
    <div>
      <div v-if="productStore.products.length === 0">Chargement en cours...</div>
      <div v-else>
        <ul>
          <li v-for="product in productStore.products" :key="product.id">
            {{ product.name }} - {{ product.prix}}€
          </li>
        </ul>
      </div>
    </div>
    <a class="produit" href="#">
      <img src="https://fakeimg.pl/250x100/">
      <h3>Pizza Orientale</h3>
      <p class="price">10,99€</p>
      <ul>
        <li>Base sauce tomate</li>
        <li>Poivrons</li>
        <li>Merguez</li>
      </ul>
      <p class="quantity">0</p>
    </a>
  </main>
</template>

<style>
main{
  display: flex;
  flex-flow: row wrap;
  background-color: lightgoldenrodyellow;
  margin: 0px;
  padding: 0px;

}
h2{
  background-color: lightblue;
  width: 100%;
  flex-grow: 5;
}
.produit {
  background-color: lightcoral;
  margin: 10px;
  border-radius: 10px;
}
.produit>img {
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

</style>