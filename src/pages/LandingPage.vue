<template>
  <div class="container d-flex flex-column align-items-center justify-content-center vh-100">
    <img src="../assets/landingpage.png" alt="logo.png" class="logo" />
    <h1 class="title">Welcome to Pokédex</h1>
    <p class="subtitle">
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </p>
    <router-link to="/home">
      <button class="btn">Get Started</button>
    </router-link>
  </div>
</template>

<style scoped>
.title {
  font-family: 'Lato', sans-serif;
  color: #353535;
  font-size: 26px;
  font-weight: 700;
  line-height: 31px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 40px;
}

.subtitle {
  font-family: 'Lato', sans-serif;
  color: #5e5e5e;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 28px;
}

.logo {
  width: 325px;
  height: 288px;
  margin-bottom: 90px;
}

.btn {
  font-family: 'Lato', sans-serif;
  width: 131px;
  border-radius: 60px;
  background-color: #f22539;
  color: #ffffff;
  margin-top: 10px;
  font-size: 18px;
}

.btn:hover {
  background-color: #c00e20;
  color: #ffffff;
}
</style>