<template>
  <div>
    <div class="bg-gray-100 min-h-screen">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1
            class="text-lg font-extrabold leading-tight tracking-tight text-gray-900"
          >
            {{ subject }}
          </h1>
        </div>
      </header>

      <main>
        <div class="max-w-4xl mx-auto py-2 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-4 px-4 py-6 sm:px-0">
            <div
              class="grid px-8 py-8 w-full h-full bg-white shadow rounded-2xl"
            >
              <h4>
                <u><b>Title</b></u
                >: {{ title }}.
              </h4>
              <br>
              <div class="content" v-if="content" v-html="content"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  async asyncData({ params, $md, $axios, query }) {
    const classId = params.slug;
    const assignmentId = query.assignmentId
    const res = await $axios.$get(`/classes/${classId}`)
    // console.log(assignmentId)
    const assignmentData = res.assignments.filter(assignment => assignment.id === assignmentId)
    // console.log(assignmentData);
    const content = $md.render(assignmentData[0].questions)
    const subject = assignmentData[0].subject
    const title = assignmentData[0].title
    return {
       content,
       subject,
       title
    };
  },
  middleware: "login-auth",
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  //   methods: {
  //     async getAssignment() {
  //         const res = await this.$axios.$get("/assignments");
  //         const assignment = res.filter(
  //           (assignment) => assignment._id === this.assignmentId
  //         );
  //         this.assignment = assignment[0]
  //     },
  //   },
  //   mounted() {
  //     this.getAssignment();
  //   },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
