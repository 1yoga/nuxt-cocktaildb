<template>
  <div class="error-container">
    <h1>404 – Page Not Found 😞</h1>
    <p>We couldn't find the drink you're looking for.</p>
    <NuxtLink to="/" class="back-home">Go back to Home</NuxtLink>
  </div>
</template>

<style scoped>
.error-container {
  text-align: center;
  padding: 50px;
}

h1 {
  color: red;
  font-size: 36px;
}

p {
  font-size: 18px;
}

.back-home {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>
