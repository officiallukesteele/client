<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="absolute inset-x-0 top-0 mx-auto">
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="error.state === false"
          class="grid grid-cols-2 place-content-center bg-green-50 border border-1 border-green-100 w-11/12 mx-auto h-12 px-4 py-2 rounded-md absolute inset-x-0 top-3"
        >
          <div class="flex items-center space-x-4">
            <i class="fas fa-spinner fa-pulse text-green-500"></i>
            <p class="text-sm font-medium text-green-800">Logging in...</p>
          </div>
          <div class="justify-self-end"></div>
        </div>
        <div
          v-else-if="
            error.state === true &&
            error.msg === 'Identifier or password invalid.'
          "
          class="grid grid-cols-2 place-content-center bg-red-50 border border-1 border-red-100 w-11/12 mx-auto h-12 px-4 py-2 rounded-md absolute inset-x-0 top-3"
        >
          <div class="flex items-center space-x-4">
            <i class="fas fa-exclamation-triangle text-red-500"></i>
            <p class="text-sm font-medium text-red-800">
              Invalid login details
            </p>
          </div>
          <div
            @click="error.state = ''"
            class="justify-self-end grid place-content-center w-8 h-8 hover:bg-red-100 rounded-sm"
          >
            <i class="fas fa-times text-lg text-red-500"></i>
          </div>
        </div>

        <div
          v-else-if="
            error.state === true &&
            error.msg !== 'Identifier or password invalid.'
          "
          class="grid grid-cols-2 place-content-center bg-red-50 border border-1 border-red-100 w-11/12 mx-auto h-12 px-4 py-2 rounded-md absolute inset-x-0 top-3"
        >
          <div class="flex items-center space-x-4">
            <i class="fas fa-exclamation-triangle text-red-500"></i>
            <p class="text-sm font-medium text-red-800">An error occured...</p>
          </div>
          <div
            @click="error.state = ''"
            class="justify-self-end grid place-content-center w-8 h-8 hover:bg-red-100 rounded-sm"
          >
            <i class="fas fa-times text-lg text-red-500"></i>
          </div>
        </div>
      </transition>
    </div>

    <div class="z-10 max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Create a Bitvest account.
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="registerUser">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Username</label>
            <input
              id="username"
              v-model="details.username"
              name="username"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-sm text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
            />
          </div>
          <div>
            <label for="fullname" class="sr-only">Full name</label>
            <input
              id="fullname"
              v-model="details.fullname"
              name="fullname"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-sm text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="details.email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-sm text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              v-model="details.password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 text-sm rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <label for="retype-password" class="sr-only">Retype password</label>
            <input
              id="retype-password"
              name="retype-password"
              v-model="details.retypePassword"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 text-sm rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Retype password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            @click="registerUser"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: {
        username: "",
        fullname: "",
        email: "",
        password: "",
        retypePassword: ""
      },
      error: {
        state: "",
        msg: "",
      },
    };
  },
  methods: {
    async registerUser() {
      this.error.state = false;
      try {
        this.$axios.setToken(false);
        await this.$axios.post("auth/local/register", {
          username: this.details.username,
          email: this.details.email,
          password: this.details.password,
          fullname: this.details.fullname
        });
        this.$router.push("/login");
        // await this.$auth.loginWith("local", {
        //   data: {
        //     identifier: `${this.login.username
        //       .replace(/\s+/g, "")
        //       .trim()
        //       .toLowerCase()}@gmail.com`,
        //     password: this.login.password,
        //   },
        // });
        console.log('successful')
      } catch (error) {
        this.error.state = true;
        this.autoCloseToast();
        this.error.msg = error.response.data.message[0].messages[0].message;
        console.log(this.error.msg);
      }
    },
    autoCloseToast() {
      setTimeout(() => {
        this.error.state = "";
      }, 3000);
    },
  },
};
</script>

<style scoped>
</style>