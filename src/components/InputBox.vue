<template>
  <form class='input-box'
        @submit='onSubmit($event)'>
    <input
        v-model='text'
        placeholder='Write a message'
        type='text'
    />
    <button :disabled='text === ""'>Send</button>
  </form>
</template>

<script>
export default {
  name: 'InputBox',
  data: () => ( { text: '' } ),
  methods: {
    onSubmit(event) {
      this.$emit("submit", event, this.text);
      this.text = '';
    }
  }
}
</script>

<style scoped>
.input-box {
  width: 100%;
  display: flex;
}

input {
  width: min(100%, 20rem);
  flex-grow: 1;
}

button:disabled {
  opacity: 0.5;
}
</style>
