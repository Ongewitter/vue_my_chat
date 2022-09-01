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
import { Message } from './models/Message';
import { User } from './models/User';
import MessageBox from './components/MessageBox.vue';
import InputBox from './components/InputBox.vue';
import LoginDialog from './components/LoginDialog.vue';
import { ApiService } from './lib/services/ApiService';

export default Vue.extend({
  name: 'App',
  components: {
    LoginDialog,
    InputBox,
    MessageBox
  },

  created() {},
  methods: {
    async onRegister(event: Event, name: string) {
      event.preventDefault();

      try {
        const user: User = await this.apiService.createUser(name);

        this.user = user;
        this.getChat()
      } catch (error: any) {
         this.errors = error.messages;
      }
    },
    async getChat() {
      try {
        const messages: Message[] = await this.apiService.getMessages();
        this.messages = messages.reverse()
                              .map((message: Message) => ({
                                ...message,
                                isMine: message.author && message.author.id === this.user.id
                              } as Message));
      } catch (error: any) {
         this.errors = error.messages;
      }
    },
    async onSubmit(event: Event, text: string) {
      event.preventDefault();
      if (text.length > 255) { return; }

      try {
        const message = await this.apiService.createMessage(text, this.user);
        this.messages.push({
          ...message,
          isMine: message.author && message.author.id === this.user.id,
        } as Message);
      } catch (error: any) {
         this.errors = error.messages;
      }
    },
  },
  data: () => (
    {
      user: null as unknown as User,
      messages: [] as Message[],
      apiService: new ApiService,
      errors: [] as string[],
    }
  )
});
</script>

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
