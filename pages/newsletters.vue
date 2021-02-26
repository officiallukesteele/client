<template>
  <div>
    <div class="bg-gray-100 min-h-screen">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1
            class="text-lg font-extrabold leading-tight tracking-tight text-gray-900"
          >
            Newsletters
          </h1>
        </div>
      </header>

      <main>
        <div class="max-w-4xl mx-auto py-2 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-4 px-4 py-6 sm:px-0">
            <div
              class="grid px-8 py-8 w-full h-full bg-white shadow rounded-2xl" v-for="newsletter in newsletters" :key="newsletter.id"
            >
              <h2 class="font-extrabold text-xl leading-8 tracking-tight">
                {{ newsletter.title }}
              </h2>
              <p class="mt-2 mb-4 text-gray-600 text-sm py-2 w-auto">
                {{ newsletter.content.substr(0, 100) }}
              </p>
              <p
                class="text-xs text-purple-600 py-2 px-3 bg-purple-100 rounded-md w-max"
              >
                  {{ new Date(newsletter.date).toLocaleDateString() }}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsletters: []
    }
  },
  methods: {
    async getNewsletters() {
      const res = await this.$axios.$get("/newsletters");
      const newsLtrArr = res
      console.log(newsLtrArr);
      for (let i = newsLtrArr.length - 1; i >= 0; i--) {
        this.newsletters.push(newsLtrArr[i])
        console.log(this.newsletters[0]);
      }
    },
  },
  mounted() {
    this.getNewsletters()
  }
};
</script>

<style>
</style>

      