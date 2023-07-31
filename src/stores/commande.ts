// commandeStore.ts
import { defineStore } from 'pinia';
import type {Product} from "@/stores/produit";

// Définir le type pour les données des produits
interface Commande {
    produit: Product;
}

export const useCommandeStore = defineStore('commandeStore', {
    state: () => ({
        commandes: [] as Commande[], // Liste des produits commandés (type Commande)
    }),
    actions: {
        ajouterCommande(commande: Commande) {
            this.commandes.push(commande);
        },
        supprimerCommande(index: number) {
            this.commandes.splice(index, 1);
        },
        viderCommandes() {
            this.commandes = [];
        },
    },
});

export type CommandeStore = ReturnType<typeof useCommandeStore>;