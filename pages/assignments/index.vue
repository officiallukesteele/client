<template>
  <div>
    <div class="bg-gray-100 min-h-screen">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1
            class="text-lg font-extrabold leading-tight tracking-tight text-gray-900"
          >
            Assignments
          </h1>
        </div>
      </header>

      <main>
        <div class="max-w-4xl mx-auto py-2 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-4 px-4 py-6 sm:px-0">
            <div
              v-for="assignment in assignments"
              :key="assignment.id"
              class="grid px-8 py-8 w-full h-full bg-white shadow rounded-2xl"
            >
              <h2 class="font-extrabold text-xl leading-8 tracking-tight">
                {{ assignment.subject }}
              </h2>
              <p class="mb-2 text-gray-600 text-sm py-2 w-auto">
                {{ assignment.title }}
              </p>
              <p class="text-blue-600 py-1 text-sm w-auto">From</p>
              <p class="mb-6 font-medium text-sm w-auto">
                {{ assignment.teacher }}
              </p>
              <button
                type="button"
                @click="viewAssignment(assignment.id)"
                class="text-center mt-6 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View more
              </button>
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
  middleware: "login-auth",
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  methods: {
    async getAssignments() {
      const studentsClass = this.loggedInUser.class;
      const res = await this.$axios.$get("/classes");
        const reqClass = res.filter(
          (arrClass) => arrClass.name === studentsClass
        );
      this.assignments = reqClass[0].assignments
      const classId = reqClass[0]._id;
      this.classId = classId
    },

    viewAssignment(id) {
      this.$router.push(
        `/assignments/${this.classId}?assignmentId=${id}`
      );
    },

    // sortEventsByDate(events) {
    //   let trxArr = events.map(function(event) {
    //     return new Date(event.date).getTime()

    //   })
    //   let smallestDate = Math.min(...trxArr)
    //   console.log(smallestDate);
    // }
  },
  mounted() {
    this.getAssignments();
  },
  data() {
    return {
      assignments: "",
      classId: ""
    };
  },
};
</script>

<style>
</style>

      