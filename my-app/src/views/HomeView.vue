<template>
  <div class="home">
    <div class="home-container">
      <h1>Домашняя страница</h1>
      
      <div v-if="isAuthenticated" class="auth-block success">
        <p>Вы успешно вошли в систему!</p>
        <button @click="logout" class="btn-logout">Выйти из аккаунта</button>
      </div>

      <div v-else class="auth-block guest">
        <p>Вы не авторизованы</p>
        <div class="auth-links">
          <router-link to="/login" class="btn-link btn-login">Вход</router-link>
          <span class="divider">|</span>
          <router-link to="/register" class="btn-link btn-register">Регистрация</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    logout() {
      this.$store.dispatch('AUTH_LOGOUT')
        .then(() => {
          this.$router.push('/');
        });
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ;
  padding: 20px;
}

.home-container {
  background: #ffffff;
  border-radius: 16px;
  padding: 50px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  animation: fadeIn 0.6s ease-in-out;
}

.home h1 {
  color: #333;
  font-size: 32px;
  margin-bottom: 10px;
  font-weight: 700;
}

.subtitle {
  color: #777;
  font-size: 16px;
  margin-bottom: 40px;
}

.auth-block {
  padding: 30px;
  border-radius: 12px;
  animation: slideUp 0.5s ease-in-out;
}

.auth-block.success {
  background:rgb(245, 232, 240);
  border: 2px solid #e74c3c;
}

.auth-block.guest {
  background: #f5f5f5;
  border: 2px solid #e0e0e0;
}

.icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.auth-block p {
  color: #555;
  font-size: 18px;
  margin-bottom: 25px;
}

.btn-logout {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
}

.auth-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.btn-link {
  text-decoration: none;
  padding: 14px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-login {
  background: linear-gradient(135deg,rgb(210, 39, 105) 0%,rgb(135, 21, 57) 100%);
  color: white;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(185, 66, 84, 0.4);
}

.btn-register {
  background: #ffffff;
  color:rgb(185, 66, 66);
  border: 2px solid #e74c3c;
}

.btn-register:hover {
  background:rgb(228, 37, 50);
  color: white;
  transform: translateY(-2px);
}

.divider {
  color: #ccc;
  font-size: 18px;
}
</style>