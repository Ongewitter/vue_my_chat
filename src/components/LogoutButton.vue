<template>
  <button class='logout-button' @click="$emit('logout')">
    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
  </button>
</template>

<script lang="ts">
export default {
  name: 'LogoutButton',
}
</script>

<style scoped>
.logout-button {
  width: 24px;
  height: 44px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: red;
  padding: 0px;
}

button:disabled {
  opacity: 0.5;
}
</style>
