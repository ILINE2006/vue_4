<template>
  <form class="register" @submit.prevent="register">
    <h1>Register</h1>
    
    <label>ФИО</label>
    <input type="text" required v-model="fio" :class="{ error: errors.fio }" />
    <span v-if="errors.fio" class="error-text">{{ errors.fio[0] }}</span>

    <label>Email</label>
    <input type="email" required v-model="email" :class="{ error: errors.email }" />
    <span v-if="errors.email" class="error-text">{{ errors.email[0] }}</span>

    <label>Password</label>
    <input type="password" required v-model="password" :class="{ error: errors.password }" />
    <span v-if="errors.password" class="error-text">{{ errors.password[0] }}</span>

    <hr/>
    <button type="submit">register</button>
    <button type="button" @click="$router.push('/')">back</button>
  </form>
</template>

<script>
import { registerRequest } from '@/utils/api.js';

export default {
  data() {
    return {
      fio: '',
      email: '',
      password: '',
      errors: {} 
    };
  },
  methods: {
    register() {
      this.errors = {}; 
      
      const userData = {
        fio: this.fio,
        email: this.email,
        password: this.password
      };

      registerRequest(userData)
        .then(() => {
          this.$router.push('/login');
        })
        .catch((err) => {

          if (err && err.error && err.error.errors) {
            this.errors = err.error.errors;
          }
        });
    }
  }
};
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
  margin: 0 auto;
}
.register input, button {
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
}

.register input.error {
  border-color: red;
  background-color: #ffe6e6;
}
.error-text {
  color: red;
  font-size: 12px;
  margin-bottom: 5px;
}
hr {
  margin: 10px 0;
}
</style>