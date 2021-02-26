<template>
  <div>
    <div class="bg-gray-100 min-h-screen">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1
            class="text-lg font-extrabold leading-tight tracking-tight text-gray-900"
          >
            Results
          </h1>
        </div>
      </header>

      <main>
        <div class="max-w-4xl mx-auto py-2 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-4 px-4 py-6 sm:px-0">
            <div
              class="grid px-8 py-8 w-full h-full bg-white shadow rounded-2xl"
            >
              <h2 class="font-extrabold text-xl leading-8 tracking-tight">
                Select a session:
              </h2>

              <select v-model="session" class="relative w-full text-sm bg-white border border-gray-300 rounded-md shadow-sm pl-3 mt-4 pr-12 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="2016/2017">2016/2017</option>
                  <option value="2017/2018">2017/2018</option>
                  <option value="2018/2019">2018/2019</option>
                  <option value="2019/2020">2019/2020</option>
              </select>

              <h2 class="font-extrabold text-xl mt-4 leading-8 tracking-tight">
                Select a term:
              </h2>

              <select v-model="term" class="relative w-full text-sm bg-white border border-gray-300 rounded-md shadow-sm pl-3 mt-4 pr-12 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="first">1st term</option>
                  <option value="second">2nd term</option>
                  <option value="third">3rd term</option>
              </select>

              <button
              type="button" @click="redirectToResultPage"
              class="mt-8 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white text-center bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              View result
            </button>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      selectState: false,
      session: '',
      term: ''
    };
  },

   computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },

  methods: {
      redirectToResultPage() {
          this.$router.push(`/results/${this.loggedInUser.id}?session=${this.session}&term=${this.term}`)
      }
  },
};
</script>

<style>
</style>


      