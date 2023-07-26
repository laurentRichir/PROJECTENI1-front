<script setup lang="ts">
const callSpring = async () => {

  const response = await fetch(import.meta.env.VITE_SPRING_BOOT_URL,{
    headers:{
      method:'get'
    }
  })
 if(response.status == '200'){
   console.log('New User Created')
 }else{
   console.log('Error')
 }
}


</script>

<template>
  <button @click="callSpring" >test</button>
</template>
