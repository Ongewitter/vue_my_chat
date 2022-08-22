<template>
  <div class='app'>
    <div class='messages'>
      <MessageBox
          v-for='message in messages'
          :key='message.id'
          :class='["message", { right: message.isMine }]'
          :dark='message.isMine'
          :text='message.text'
          :author='message.author'
      />
    </div>

    <InputBox
        class='ChatBox'
        @submit='onSubmit'
    />

    <LoginDialog
        v-if='!user'
        @submit='onRegister'
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MessageBox from './components/MessageBox.vue';
import InputBox from './components/InputBox.vue';
import LoginDialog from './components/LoginDialog.vue';

export default Vue.extend({
  name: 'App',
  components: {
    LoginDialog,
    InputBox,
    MessageBox
  },
  created() {
    this.getChat();
  },
  methods: {
    onRegister(event: Event, name: string) {
      event.preventDefault();
    // Authentication is out of scope for this project so just generate an id
    this.user = { name, id: this.getId() };
    },
    getChat(): string[] {
      // TODO: Get from API
      // listenChat((chat) => {
      //   this.messages = chat.reverse().map(m => ({
      //     ...m,
      //     isMine: m.uid && m.uid === this.user?.id
      //   }));
      // });
      return ["Fun", "plezier"];
    },
    onSubmit(event: Event): void {
      event.preventDefault();

      // TODO: Call to API
      // sendMessage(
      //   {
      //     text,
      //     uid: this.user?.id,
      //     author: this.user?.name
      //   }
      // );
    },
    getId(): Number {
      return new Date().getTime();
    }
  },
  data: () => (
    {
      user: undefined,
      messages: []
    }
  )
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: 'Arial', sans-serif;
}

body {
  margin: 0;
}

button {
  border: 0;
  background: #2a60ff;
  color: white;
  cursor: pointer;
  padding: 1rem;
}

input {
  border: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.1);
}
</style>

<style scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.messages {
  flex-grow: 1;
  overflow: auto;
  padding: 1rem;
}

.message + .message {
  margin-top: 1rem;
}

.message.right {
  margin-left: auto;
}
</style>
