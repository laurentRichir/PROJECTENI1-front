<script lang="ts">
import { useCommandeStore, CommandeStore, Commande } from "@/stores/commande";
import { useProductStore, ProductStore, Product } from "@/stores/produit";
import {computed, defineComponent, onMounted} from "vue";

export default defineComponent({
  setup() {
    const commandeStore: CommandeStore = useCommandeStore();
    const produitStore: ProductStore = useProductStore();
    const status = ['EN COURS', 'PRÉPARÉE', 'PAYÉE'];
    const statusClass = ['encours', 'preparee', 'payee'];
    const commandes = computed(() => {
      return sortCommandesByHeurePreparation(commandeStore.commandes)
    })

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

    function sortCommandesByHeurePreparation(commandes: Commande[]): Commande[] {
      return commandes.slice().sort((a, b) => {
        return new Date(b.heurePreparation) - new Date(a.heurePreparation);
      });
    }

    function commandePreparer(commandeId: number) {
      commandeStore.updateStatus(commandeId, "PRÉPARÉE");
    };

    function commandePayer(commandeId: number) {
      commandeStore.updateStatus(commandeId, "PAYÉE");
    }

    function getStatusClass(statusCommande: string) {
      if(statusCommande === status[0]) {
        return 'les-commandes-encours';
      } else if (statusCommande === status[1]) {
        return 'les-commandes-preparee';
      } else {
        return 'les-commandes-payee';
      }
    }

    return {
      commandeStore,
      getCommandes,
      getProductNameById,
      commandes,
      commandePreparer,
      commandePayer,
      getStatusClass,
    };
  },
});
</script>

<template>
  <main>
    <div class="les-commandes" v-bind:class="getStatusClass(commande.status)" v-for="commande in commandes" :key="commande.id">
      <h2>{{ commande.id }}</h2>
      <p class="les-commandes-heure">{{ commande.heurePreparation }}</p>
      <p class="les-commandes-status">{{ commande.status }}</p>
      <div class="les-commandes-produits" v-for="produitCommande in commande.detailOrder">
        {{ getProductNameById(produitCommande.produit) }} : {{ produitCommande.quantite }}
      </div>
      <button v-if="commande.status === 'EN COURS'" @click="commandePreparer(commande.id)">Commande Préparée</button>
      <button v-else-if="commande.status === 'PRÉPARÉE'" @click="commandePayer(commande.id)">Commande Payé</button>

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

.les-commandes-preparee {
  background-color: lightgreen;
}

.les-commandes-encours {
  background-color: lightcoral;
}

</style>