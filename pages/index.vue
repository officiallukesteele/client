<template>
  <!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
-->
<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-32 w-32 rounded-full" src="/profile.jpg" alt="Workflow">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Student Login
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Access your school portal account.
      </p>
    </div>
    <form class="mt-8 space-y-6" @submit.prevent="loginUser">
      <!-- <input type="hidden" name="remember" value="true"> -->
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="name" class="sr-only">Full name</label>
          <input id="name" v-model="login.username" name="name" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-sm text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Student's full name">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" v-model="login.password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 text-sm rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Student's portal ID">
        </div>
      </div>

      

      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Login
        </button>
      </div>
    </form>
  </div>
</div>

</template>

<script>
export default {
  layout: 'signin',
  data() {
    return {
      login: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    async loginUser() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            identifier: `${this.login.username.replace(/\s+/g, '').trim().toLowerCase()}@gmail.com`,
            password: this.login.password
          }
        })
        this.$router.push('/dashboard')
      } catch (error) {
        this.error = error.response.data
        console.log(this.error);
      }
    }
  }
}
</script>

<style scoped>

</style>