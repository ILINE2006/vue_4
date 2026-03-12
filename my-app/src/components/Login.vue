<template>
  <form class="login" @submit.prevent="login" novalidate>
    <h1>Вход в систему</h1>
    
    <div v-if="generalError" class="error-text" style="text-align: center;">
      {{ generalError }}
    </div>

    <label>Email</label>
    <input type="email" required v-model="email" :class="{ error: errors.email }" />
    <span v-if="errors.email" class="error-text">{{ errors.email[0] }}</span>

    <label>Пароль</label>
    <input type="password" required v-model="password" :class="{ error: errors.password }" />
    <span v-if="errors.password" class="error-text">{{ errors.password[0] }}</span>

    <hr/>
    <button type="submit">Вход</button>
    <button type="button" @click="$router.push('/')">Назад</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      generalError: ""
    };
  },
  methods: {
    login() {
      this.errors = {};
      this.generalError = "";
      let validationErrors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        validationErrors.email = ["Поле email обязательно для заполнения"];
      } else if (!emailRegex.test(this.email)) {
        validationErrors.email = ["Некорректный email (обязательна '@' и домен)"];
      }
      if (!this.password) {
        validationErrors.password = ["Поле пароль обязательно для заполнения"];
      }
      if (Object.keys(validationErrors).length > 0) {
        this.errors = validationErrors;
        return;
      }
      const userData = { email: this.email, password: this.password };

      this.$store
        .dispatch("AUTH_REQUEST", userData)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
        if (err && err.error) {
        if (err.error.errors) this.errors = err.error.errors;
        else if (err.error.message) this.generalError = err.error.message;
        else this.generalError = "Некорректные данные";
        } else {
        this.generalError = "Ошибка соединения с сервером";
       }
     });
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 40px;
  margin: 50px auto;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in-out;
}

.login h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
}

.login label {
  color: #555;
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: 500;
}

.login input {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px 15px;
  margin-bottom: 15px;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;
}

.login input:focus {
  border-color:rgb(185, 66, 151);
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.login input.error {
  border-color: #e74c3c;
  background-color: #ffe6e6;
  animation: shake 0.3s ease-in-out;
}

.login button {
  border: none;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login button[type="submit"] {
  background: linear-gradient(135deg,rgb(185, 66, 123) 0%, #35495e 100%);
  color: white;
}

.login button[type="submit"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(185, 66, 123, 0.4);
}

.login button[type="submit"]:active {
  transform: translateY(0);
}

.login button[type="button"] {
  background: #f5f5f5;
  color: #555;
}

.login button[type="button"]:hover {
  background: #e0e0e0;
}

.error-text {
  color: #e74c3c;
  font-size: 12px;
  margin-bottom: 10px;
  margin-top: -10px;
  animation: slideDown 0.3s ease-in-out;
}

hr {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
}
</style>