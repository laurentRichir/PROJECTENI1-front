import { defineStore } from 'pinia';
import type {Product} from "@/stores/produit";

export interface Commande {
    heurePreparation: string,
    detailOrder: [
        {
            "produit": number,
            "quantite": number
        }
    ],
    status: string,
}

export const useCommandeStore = defineStore('commandeStore', {
    state: () => ({ commandes: [] as Commande[] }),
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
        async getCommandes() {
            try{
                console.log('Fetching products...'); // Débogage pour vérifier si l'action est appelée
                const response = await fetch('http://localhost:8080/allOrders');
                const data = await response.json();
                console.log('Data:', data); // Débogage pour vérifier les données récupérées
                this.commandes = data as Commande[]; // Mettre à jour la liste des produits dans le store
                console.log('Products:', this.commandes); // Débogage pour vérifier les produits dans le store
            }
            catch{}

        },

        async saveCommande(newCommande: Commande) {
            console.log(newCommande, "SAVE ORDER");
            try{
                console.log("Saving order...", newCommande);

                const response = await fetch('http://localhost:8080/saveOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCommande),
                })
                if(response.ok) {
                    console.log("Orer saved successfully!");
                } else {
                    console.error("Failed to save order.");
                }
            } catch(error) {
                console.error("Error while saving order", error);
            }
        }
    },
});

export type CommandeStore = ReturnType<typeof useCommandeStore>;