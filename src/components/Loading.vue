<template>
  <div class="container d-flex flex-column align-items-center justify-content-center vh-100">
    <img src="../assets/loading.png" alt="loading" />
  </div>
</template>

<style scoped>
.container {
  background-color: #f9f9f9;
  min-height: 100vh;
  /* Asegura que ocupe todo el alto de la ventana */
}

img {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>