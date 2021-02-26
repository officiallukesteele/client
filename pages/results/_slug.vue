<template>
  <div class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1
          class="text-lg font-extrabold leading-tight tracking-tight text-gray-900"
        >
          Your results
        </h1>
      </div>
    </header>
    <main>
      <div
        class="grid grid-cols-1 gap-4 max-w-4xl mx-auto py-2 sm:px-6 lg:px-8"
      >
        <div class="grid grid-cols-1 px-4 py-6 sm:px-0">
          <div
            class="grid text-center px-8 py-8 w-full h-full bg-white shadow rounded-2xl"
          >
            <div class="text-left" v-for="result in results" :key="result.id">
              <p>{{ result.subject }}</p>
              <p>{{ result.score }}</p>
              <p>{{ result.grade }}</p>
            </div>
            <!-- <button
                type="button"
                class="items-center mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <a :href="url" :download="nameOfFile"
                  ><i class="fas text-white fa-file-pdf mr-2"></i
                  >{{ nameOfFile.substr(0, 20) }}...(Click to download)</a
                >
              </button> -->
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ params, $axios, query, store }) {
    const studentId = params.slug;
    const session = query.session;
    const term = query.term;
    const res = await $axios.$get('/results');
   
    // console.log(assignmentId)
    const resultsData = res.filter(
      (result) => result.nameOfStudent === store.getters.loggedInUser.username && result.class === store.getters.loggedInUser.class
    );
     const resultId = resultsData[0]._id
    
    const results = resultsData[0].results

    return {
      results
    }
    // const content = $md.render(assignmentData[0].questions);
    // const subject = assignmentData[0].subject;
    // const title = assignmentData[0].title;
    // return {
    //   content,
    //   subject,
    //   title,
    // };
  },
  data() {
    return {};
  },
  // methods: {
  // async getResult() {
  //   //   const studentId = this.slug;
  //   const res = await this.$axios.$get("/results");
  //   const reqResult = res.filter(
  //     (result) =>
  //       result.session === this.$route.query.session &&
  //       result.term === this.$route.query.term
  //   );
  //   const resultFileName = reqResult[0].result[0].name;
  //   const resultFileNameUrl = `http://localhost:1337/uploads/${reqResult[0].result[0].hash}.pdf`;
  //   fetch(resultFileNameUrl)
  //     .then((res) => res.blob())
  //     .then((blob) => {
  //       const blobURL = URL.createObjectURL(blob);
  //       this.url = blobURL;
  //     })
  //     .catch((err) => console.log(err));
  //   this.nameOfFile = resultFileName;
  // },
  // },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },

  // mounted() {
  //   this.getResult();
  // },
};
</script>

<style>
</style>