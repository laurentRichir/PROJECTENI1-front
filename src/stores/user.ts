import { defineStore } from 'pinia';
import type {Product} from "@/stores/produit";

export interface User {
    id: number,
    userName: string,
    password: string,
    verifPassword: string,
    status: string,
}

export const useUserStore = defineStore('userStore', {
    state: () => ({ users: [] as User[] }),
    actions: {
        ajouterUser(user: User) {
            this.users.push(user);
        },
        supprimerUser(index: number) {
            this.users.splice(index, 1);
        },
        viderUsers() {
            this.users = [];
        },

        async saveUser(newUser: User) {
            console.log(newUser, 'SAVE USER');
            try{
                console.log('Saving user...', newUser);

                // Envoie la requête POST à l'API pour enregistrer le nouveau produit
                const response = await fetch('http://localhost:8080/saveUser',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser), // Convertit l'objet newProduct en JSON
                });
                if(response.ok) {
                    console.log('User saved successfully!');
                } else {
                    console.error('Failed to save user.');
                }
            } catch(error) {
                console.error('Error while saving user', error);
            }
        },


        async updateUser(userToUpdate: User) {
            try{
                const response = await fetch(`http://localhost:8080/updateOrder/${userToUpdate.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userToUpdate),
                });
                if(response.ok) {
                    const index = this.users.findIndex((cmd) => cmd.id === userToUpdate.id);
                    if(index !== -1) {
                        this.users.splice(index, 1, userToUpdate);
                    }
                    console.log('User mise à jour avec succès!');
                } else {
                    console.error('Échec de la mise à jour de la user.');
                }
            } catch(error) {
                console.error('Erreur lors de la mise à jour de la user', error);
            }
        },

        async getUsers() {
            try{
                console.log('Fetching products...'); // Débogage pour vérifier si l'action est appelée
                const response = await fetch('http://localhost:8080/allOrders');
                const data = await response.json();
                console.log('Data:', data); // Débogage pour vérifier les données récupérées
                this.users = data as User[]; // Mettre à jour la liste des produits dans le store
                console.log('Products:', this.users); // Débogage pour vérifier les produits dans le store
            }
            catch{}

        },

        async createUser(newUser: User) {
            console.log(newUser, "SAVE ORDER");
            try{
                console.log("Saving order...", newUser);

                const response = await fetch('http://localhost:8080/saveOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                });
                const data = await response.json();
                console.log(data);
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

export type UserStore = ReturnType<typeof useUserStore>;