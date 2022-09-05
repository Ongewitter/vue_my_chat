<template>
  <div class='error'>
    <div class='dialog'>
      {{ error }}

      <form @submit='$emit("submit")'>
        <button>Ok</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ErrorDialog',
  props: {
    error: String
  },
  data: () => ({})
}
</script>

<style scoped>
.error {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.1);
  display: grid;
  place-items: center;
}
.dialog {
  border-radius: 10px;
  background: white;
  padding: 2rem;
}
form {
  display: flex;
  flex-direction: column;
}
input {
  margin-top: 1rem;
}
button {
  padding: .7rem;
  margin-top: 1rem;
}
button:disabled {
  opacity: 0.5;
}
h5 {
  margin: 0 0 .5rem 0;
}
</style>
