<template>
  <div class="message-box"
       :class="{ dark: isDark }" >
    <h5>{{ author.name }}</h5>
    {{ text }}
  </div>
</template>

<script lang="ts">
export default {
  name: 'MessageBox',
  props: [
    'text',
    'author',
    'isDark'
  ]
}
</script>

<style scoped>
  .message-box {
    background: #e7e7e7;
    border-radius: 10px;
    padding: 1rem;
    width: fit-content;
  }

  .message-box.dark {
    background: #e9eaf6;
  }

  h5 {
    margin: 0 0 .5rem 0;
  }
</style>
