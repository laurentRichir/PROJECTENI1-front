// @ts-ignore
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AjouterProduit from "@/views/AddProductView.vue";
import ConfirmationCommande from "@/components/ConfirmationCommande.vue";
import LesCommandes from "@/components/LesCommandes.vue";

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
