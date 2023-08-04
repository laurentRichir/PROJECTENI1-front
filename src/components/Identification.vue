<template>
  <main>
    <form @submit.prevent="login">
      <label for="username">Utilisateur</label>
      <input v-model="user.userName" type="text" id="username" placeholder="Nom utilisateur" />
      <label for="password">Mot de passe</label>
      <input v-model="user.password" type="password" id="password" placeholder="Mot de passe" />
      <button type="submit">S'identifier!</button>
    </form>


    <!-- Nouveau composant (modal) pour afficher après l'enregistrement réussi -->
    <div v-if="showSuccessModal" class="success-modal">
      <h2>Nouvel utilisateur enregistré avec succès !</h2>
      <button @click="closeModal">Fermer</button>
    </div>


  </main>
</template>

<script lang="ts">
import { useUserStore, UserStore, User } from '../stores/user';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  setup() {
    const userStore: UserStore = useUserStore();
    const user: User = {
      id: 0,
      userName: '',
      password: '',
      verifPassword: '',
      status: '',
    };

    const showSuccessModal = ref(false); // Variable pour contrôler l'affichage du nouveau composant (modal)

    const login = async () => {
      // Vérifier que les champs obligatoires sont remplis avant d'enregistrer le nouveau utilisateur
      //if (user.userName && user.password > 1) {
        try {
          // Appel de l'action saveUser pour enregistrer le nouveau utilisateur dans la base de données
          await userStore.login(user);

          // Remettre à zéro les valeurs du formulaire après l'enregistrement réussi
          user.userName = '';
          user.password = '';

          console.log('Identifier avec succès !');
          // Afficher le nouveau composant (modal) après l'enregistrement réussi
          showSuccessModal.value = true;

        } catch (error) {
          console.error('Erreur lors de l\'authentification de l\'utilisateur :', error);
        }
      //} else {
      //  console.warn('Veuillez remplir les champs obligatoires pour authentifier l\'utilisateur.');
      //}
    };

    const closeModal = () => {
      // Fermer le nouveau composant (modal) en définissant la variable sur false
      showSuccessModal.value = false;
    };

    return {
      userStore,
      login,
      user,
      showSuccessModal,
      closeModal,
    };
  },
});
</script>

<style>
form {
  display: flex;
  flex-flow: column wrap;
  gap: 10px;
}
</style>