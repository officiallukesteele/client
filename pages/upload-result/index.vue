<template>
  <div class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1
          class="text-lg font-extrabold leading-tight tracking-tight text-gray-900"
        >
          Upload student's results
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
            <div
              class="text-left"
              v-for="data in studentDisplayData"
              :key="data.id"
            >
              <p>{{ data.name }}</p>
              <p>{{ data.class }}</p>
              <p>{{ data.level }}</p>

              <button
              type="button"
              @click="redirectToSubjectResultPage(data.name)"
              class="inline-flex items-center mt-6 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Upload
            </button>
            </div>

            
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ $axios, store }) {
    const res = await $axios.$get("/users");

    const studentsData = res.filter(
      (student) => student.class === store.getters.loggedInUser.classTaught
    );

    const studentDisplayData = studentsData.map((displayData) => ({
      name: displayData.username,
      class: displayData.class,
      level: displayData.level,
    }));

    return {
      studentDisplayData,
    };
  },
  methods: {
    redirectToSubjectResultPage(name) {
      const slug = name.replace(/\s+/g, "").trim().toLowerCase();
      const subjectName = this.loggedInUser.subjectTaught.replace(/\s+/g, "").trim().toLowerCase();
    //   console.log(slug, subjectName);
      this.$router.push(`/upload-result/${slug}?subject=${subjectName}&subjectFullName=${this.loggedInUser.subjectTaught}`);
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
};
</script>