<template>
  <div class="container">
    <img src="../assets/landingpage.png" alt="logo.png" class="logo">
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
  font-family: 'Secular One', sans-serif;
  color: #353535;
  font-size: 26px;
  font-weight: 700;
  line-height: 31px;
  letter-spacing: 0em;
  text-align: center;
}

.subtitle {
  font-family: 'Secular One', sans-serif;
  color: #5E5E5E;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: center;
}

.logo {
  width: 325px;
  height: 288px;
  top: 70px;
  left: 25px;
}

.btn {
  width: Hug (131px);
  height: Hug (44px);
  top: 611px;
  left: 122px;
  padding: 11px, 20px, 11px, 20px;
  border-radius: 60px;
  gap: 10px;
  background-color: #F22539;
  color: #FFFFFF;
}

.btn:hover {
  background-color: #C00E20;
  color: #FFFFFF;
}
</style>