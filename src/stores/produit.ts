// productStore.ts
import { defineStore } from 'pinia';

// Définir le type pour les données des produits
export interface Product {
    [x: string]: any;
    id: number;
    name: string;
    prix: number;
    //quantite: number;
    //quantity: number;
    details: string;
    type: object;
    idType: number;
    enable: boolean;
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

        async saveProduct(newProduct: Product) {
            console.log(newProduct, 'SAVE PRODUIT');
            try{
                console.log('Saving product...', newProduct);

                // Envoie la requête POST à l'API pour enregistrer le nouveau produit
                const response = await fetch('http://localhost:8080/SaveProduit',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newProduct), // Convertit l'objet newProduct en JSON
                });
                if(response.ok) {
                    console.log('Product saved successfully!');
                    // Tu peux également mettre à jour les produits localement dans le store après l'enregistrement réussi
                    // Par exemple, en ajoutant le nouveau produit à la liste des produits
                    // this.products.push(newProduct);
                    // Merci ChatGPT
                } else {
                    console.error('Failed to save product.');
                }
            } catch(error) {
                console.error('Error while saving product', error);
            }
        },

        async updateProduct(updateProduct: Product) {
            console.log('Update Product');
            try{
                console.log('Update product...', updateProduct);

                // Envoie la requête POST à l'API pour enregistrer le nouveau produit
                const response = await fetch('http://localhost:8080/UpdateProduit/' + updateProduct.id,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateProduct), // Convertit l'objet newProduct en JSON
                });
                if(response.ok) {
                    console.log('Product update successfully!');
                } else {
                    console.error('Failed to update product.');
                }
            } catch(error) {
                console.error('Error while updating product', error);
            }
        },
    },
    getters: {
        //Méthode ChatGPT pour récupérer un produit par son ID
        getProductById: (state) => (productId: number): Product | undefined => {
            return state.products.find((product) => product.id === productId);
        }
    }
});

// Ajouter des types pour utiliserProductStore
export type ProductStore = ReturnType<typeof useProductStore>;