<template>
  <div class="login">
    <h1>This is login form</h1>
    <md-field :class="messageClass">
      <label>Username or email</label>
      <md-input v-model="username" required></md-input>
      <span class="md-helper-text">Type in your username or email</span>
      <span class="md-error">Username cannot be blank</span>
    </md-field>
    <md-field :class="messageClass">
      <label>Password</label>
      <md-input v-model="password" type="password" required></md-input>
      <span class="md-error">Password cannot be blank</span>
    </md-field>
    <md-button class="md-raised md-primary" v-on:click="submitForm">Log in</md-button>
  </div>
</template>

<style scoped lang="scss">
  .login {
    width: 60%;
    margin: 0 auto;
  }
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      username: '',
      password: '',
      hasErrors: false,
    };
  },
  methods: {
    submitForm(): void {
      if (!this.username || !this.password) {
        this.hasErrors = true;
      } else {
        this.hasErrors = false;
        const jsonEssence = JSON.stringify({ username: this.username, password: this.password });
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonEssence,
        });
      }
    },
  },
  computed: {
    messageClass(): Record<string, boolean> {
      return {
        'md-invalid': this.hasErrors,
      };
    },
  },
});
</script>
