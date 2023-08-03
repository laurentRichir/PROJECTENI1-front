<template>
  <div>
    <h2>Logs WebSocket</h2>
    <ul>
      <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logs: [],
    };
  },
  mounted() {
    const socket = new WebSocket('ws://localhost:8080/socket');

    socket.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    socket.onerror = (error) => {
      console.log('Connection Error: ' + error);
    };

    socket.onclose = () => {
      console.log('WebSocket Connection Closed');
    };

    socket.onmessage = (e) => {
      const logMessage = e.data;
      console.log('Received: ' + logMessage);

      this.logs.push(logMessage);
      console.log(this.logs);
    };
  },
};
</script>

<style>
/* Vos styles CSS si nécessaire */
</style>