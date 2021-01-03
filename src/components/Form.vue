<template>
  <form>
    <md-field
      v-for="(field, index) in fields"
      :key="index"
      :class="{ 'md-invalid': !!errors[field.name] }"
    >
      <label>{{field.label}}</label>
      <md-input
        v-model="form[field.name]"
        :type="field.type"
        :required="field.required"
        v-on:keyup="clearErrors(field.name)"
        v-on:blur="validateField(field.name, form[field.name])"
      >
      </md-input>
      <span class="md-helper-text">{{field.hint}}</span>
      <span class="md-error">{{errors[field.name]}}</span>
    </md-field>
    <md-button
      class="md-raised md-primary"
      v-on:click="submitForm"
    >Log in
    </md-button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import validate from '@/helpers/validation';
import ERROR_TEXTS from '@/helpers/constants'; // @ is an alias to /src

type FormData = {
  form: Record<string, string>;
  errors: Record<string, string|null>;
}
export default Vue.extend({
  name: 'Form',
  props: {
    fields: Array,
  },
  data(): FormData {
    return {
      form: {},
      errors: {},
    };
  },
  methods: {
    submitForm(): void {
      this.fields.forEach((field) => {
        this.validateField(field.name, this.form[field.name]);
      });
      const isInvalid = !!Object.keys(this.errors).filter((item) => !!this.errors[item]).length;
      if (!isInvalid) {
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form),
        });
      }
    },
    clearErrors(name: string): void {
      this.$set(this.errors, name, null);
    },
    validateField(name: string, value: string) {
      const validationResult = validate(name, value);
      if (validationResult) {
        this.$set(this.errors, name, ERROR_TEXTS[name][validationResult]);
      }
    },
  },
});
</script>
