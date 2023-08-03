<template>
  <main>
    <form @submit.prevent="saveNewUser">
      <label for="username">Utilisateur</label>
      <input v-model="newUser.userName" type="text" id="username" placeholder="Nom utilisateur" />
      <label for="password">Mot de passe</label>
      <input v-model="newUser.password" type="password" id="password" placeholder="Mot de passe" />
      <label for="verifPassword">Retaper le mot de passe</label>
      <input v-model="newUser.verifPassword" type="password" id="verifPassword" placeholder="Mot de passe" />
      <button type="submit">Enregistrer!</button>
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
    const newUser: User = {
      id: 0,
      userName: '',
      password: '',
      verifPassword: '',
      status: '',
    };

    const showSuccessModal = ref(false); // Variable pour contrôler l'affichage du nouveau composant (modal)

    const saveNewUser = async () => {
      // Vérifier que les champs obligatoires sont remplis avant d'enregistrer le nouveau utilisateur
      if ((newUser.userName.length > 1) && (newUser.password === newUser.verifPassword)) {
        try {
          // Appel de l'action saveUser pour enregistrer le nouveau utilisateur dans la base de données
          await userStore.saveUser(newUser);

          // Remettre à zéro les valeurs du formulaire après l'enregistrement réussi
          newUser.userName = '';
          newUser.password = '';
          newUser.verifPassword = '';

          console.log('Nouvel utilisateur enregistré avec succès !');
          // Afficher le nouveau composant (modal) après l'enregistrement réussi
          showSuccessModal.value = true;

        } catch (error) {
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
        }
      } else {
        console.warn('Veuillez remplir les champs obligatoires pour enregistrer l\'utilisateur.');
      }
    };

    const closeModal = () => {
      // Fermer le nouveau composant (modal) en définissant la variable sur false
      showSuccessModal.value = false;
    };

    return {
      userStore,
      newUser,
      saveNewUser,
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