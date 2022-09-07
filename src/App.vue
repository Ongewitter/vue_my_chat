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

    <ErrorDialog
        v-if='error'
        :error='error'
        @submit='clearErrors'
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueSession from 'vue-session';
import { Message } from './models/Message';
import { User } from './models/User';
import MessageBox from './components/MessageBox.vue';
import InputBox from './components/InputBox.vue';
import LoginDialog from './components/LoginDialog.vue';
import ErrorDialog from './components/ErrorDialog.vue';
import { ApiService } from './lib/services/ApiService';
Vue.use(VueSession)

export default Vue.extend({
  name: 'App',
  components: {
    LoginDialog,
    ErrorDialog,
    InputBox,
    MessageBox
  },

  created() {
    if (this.$session.exists() && this.$session.has("user")) {
      this.user = this.$session.get("user");
      this.getChat();
    }
  },
  methods: {
    onRegister(event: Event, name: string) {
      event.preventDefault();
      this.apiService.createUser(name)
          .then((user) => {
            this.user = user;
            this.$session.set("user", user);
            this.getChat()
          })
          .catch((error) => {
            this.error = error.message;
            this.user = null as unknown as User;
          });
    },
    logOut() {
      // TODO: Log user out
      this.user = null as unknown as User;
      this.messages = [];
    },
    getChat() {
      this.apiService.getMessages()
          .then((messages) => {
            this.messages = messages.reverse()
                                  .map((message: Message) => ({
                                    ...message,
                                    isMine: message.author && message.author.id === this.user.id
                                  } as Message));
          })
          .catch((error) => {
            this.error = error.message;
          });
    },
    onSubmit(event: Event, text: string) {
      event.preventDefault();
      if (text.length > 255) { return; }

      this.apiService.createMessage(text, this.user)
        .then((message) => {
          this.messages.push({
            ...message,
            isMine: message.author && message.author.id === this.user.id,
          } as Message);
        })
      .catch((error) => {
         this.error = error.message;
      })
    },
    clearErrors(){
      this.error = '';
    }
  },
  data: () => (
    {
      user: null as unknown as User,
      messages: [] as Message[],
      apiService: new ApiService,
      error: '',
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
