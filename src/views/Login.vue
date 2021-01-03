<template>
  <div class="login">
    <h1>This is login form</h1>
    <Form :fields="fields" />
  </div>
</template>

<style scoped lang="scss">
  .login {
    width: 90%;
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    .login {
      width: 60%;
    }
  }
</style>

<script lang="ts">
import Vue from 'vue';
import Form from '@/components/Form.vue';
import { LoginState } from './ILogin';

export default Vue.extend({
  data(): LoginState {
    return {
      fields: [
        {
          name: 'username',
          type: 'text',
          label: 'Username or email',
          required: true,
          hint: 'Type in your username or email',
          value: '',
          error: null,
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
          required: true,
          value: '',
          error: null,
        },
      ],
    };
  },
  components: {
    Form,
  },
});
</script>
