<script lang="ts">
import { useCommandeStore, CommandeStore, Commande } from "@/stores/commande";
import { useProductStore, ProductStore, Product } from "@/stores/produit";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  setup() {
    const commandeStore: CommandeStore = useCommandeStore();
    const produitStore: ProductStore = useProductStore();

    const status = ['En cours', 'Préparée', 'Payée'];

    onMounted(() => {
      commandeStore.getCommandes();
      produitStore.fetchProducts();
    })

    function getCommandes() {
      return commandeStore.commandes;
    }

    //Méthode ChatGPT pour récupérer le nom du produit à partir de l'ID
    function getProductNameById(productId: number): string {
      const product = produitStore.getProductById(productId);
      return product ? product.name : "Produit introuvable"
    }

    return {
      commandeStore,
      getCommandes,
      getProductNameById,
    };
  },
});
</script>

<template>
  <main>
    <div class="les-commandes" v-for="commande in getCommandes()" :key="commande.id">
      <h2>{{ commande.id }}</h2>
      <p class="les-commandes-heure">{{ commande.heurePreparation }}</p>
      <p class="les-commandes-status">{{ commande.status }}</p>
      <div class="les-commandes-produits" v-for="produitCommande in commande.detailOrder">
        {{ getProductNameById(produitCommande.produit) }} : {{ produitCommande.quantite }}
      </div>
      <button v-if="commande.status === 'En cours'">Préparé</button>
      <button v-else-if="commande.status === 'Préparé'">Payé</button>

    </div>
  </main>

</template>

<style scoped>

.les-commandes {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
h2 {
  width: 50%;
}
.les-commandes-heure {
  width: 50%;
  text-align: right;
  background-color: lightblue;
}

.les-commandes-produits {
  width: 100%;
}

</style>