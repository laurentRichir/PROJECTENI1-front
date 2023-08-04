// @ts-ignore
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AjouterProduit from "@/views/AddProductView.vue";
import ConfirmationCommande from "@/components/ConfirmationCommande.vue";
import LesCommandes from "@/components/LesCommandes.vue";
import Logs from "@/components/Logs.vue";
import AjouterUtilisateur from "@/components/AjouterUtilisateur.vue";
import Identification from "@/components/Identification.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Consulter la carte',
      component: HomeView
    },
    {
      path: '/ajouterProduit',
      name: 'Ajouter un nouveau produit à la carte',
      component: AjouterProduit
    },
    {
      path: '/confirmationCommande',
      name: 'ConfirmationCommande', // Utiliser le nom "ConfirmationCommande" pour la route
      component: ConfirmationCommande,
      props: true, // Activer la transmission des props par la route
    },
    {
      path: '/lesCommandes',
      name: 'Les Commandes',
      component: LesCommandes
    },
    {
      path: '/logs',
      name: 'Les Logs',
      component: Logs
    },
    {
      path: '/ajouterUtilisateur',
      name: 'Ajouter un nouvel utilisateur',
      component: AjouterUtilisateur
    },
    {
      path: '/identification',
      name: 'Identification',
      component: Identification
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
