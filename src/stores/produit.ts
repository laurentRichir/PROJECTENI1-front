// productStore.ts
import { defineStore } from 'pinia';

// Définir le type pour les données des produits
interface Product {
    id: number;
    name: string;
    prix: number;
    quantite: number;
    // Ajoutez d'autres propriétés si nécessaire
}

// Définir le type pour le store des produits
export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [] as Product[], // Utiliser le type Product[] pour la liste des produits
    }),
    actions: {
        async fetchProducts() {
            try {
                console.log('Fetching products...'); // Débogage pour vérifier si l'action est appelée
                const response = await fetch('http://localhost:8080/Produits');
                const data = await response.json();
                console.log('Data:', data); // Débogage pour vérifier les données récupérées
                this.products = data as Product[]; // Mettre à jour la liste des produits dans le store
                console.log('Products:', this.products); // Débogage pour vérifier les produits dans le store
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        },
    },
});

// Ajouter des types pour utiliserProductStore
export type ProductStore = ReturnType<typeof useProductStore>;