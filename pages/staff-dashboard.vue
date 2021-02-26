<template>
  <div class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1
          class="text-lg font-extrabold leading-tight tracking-tight text-gray-900"
        >
          Welcome back, {{ loggedInUser.firstname }}
        </h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-6 sm:px-0">
          <div
            class="grid text-center px-8 py-8 w-full h-full bg-white shadow rounded-2xl"
          >
            <div class="place-self-center">
              <div class="mb-4">
                <img
                  class="w-16 h-16 mx-auto rounded-full"
                  :src="profile_url"
                />
              </div>
              <div>
                <h3 class="font-extrabold tracking-tight">{{ loggedInUser.username }}</h3>
                <p v-if="loggedInUser.isAccountActive" class="text-xs font-medium text-green-500">Active</p>
                <p v-else class="text-xs font-medium text-red-500">Inactive</p>

                <p class="text-xs text-gray-600">{{ loggedInUser.accountType }}</p>
                <p class="text-xs text-gray-600">{{ loggedInUser.class }}</p>
              </div>
            </div>
          </div>
          <div class="px-8 py-8 w-full h-full bg-white shadow rounded-2xl">
            <div
              class="mb-3 w-12 h-12 grid place-content-center rounded-md bg-gradient-to-br from-blue-400 to-blue-600"
            >
              <i class="fas text-white block fa-bookmark"></i>
            </div>
            <h2 class="font-extrabold text-xl leading-10 tracking-tight">
              Post an assignment.
            </h2>

            <nuxt-link to="/post-assignment">
            <button
              type="button"
              class="inline-flex items-center mt-6 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
            New assignment
            </button>
            </nuxt-link>
          </div>
          
          <div class="px-8 py-8 w-full h-full bg-white shadow rounded-2xl">
            <div
              class="mb-3 w-12 h-12 grid place-content-center rounded-md bg-gradient-to-br from-blue-400 to-blue-600"
            >
              <i class="fas text-white block fa-bookmark"></i>
            </div>
            <h2 class="font-extrabold text-xl leading-10 tracking-tight">
              Upload results.
            </h2>

            <nuxt-link to="/upload-result">
            <button
              type="button"
              class="inline-flex items-center mt-6 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
            Upload results
            </button>
            </nuxt-link>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  middleware: "staff-login-auth",
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>