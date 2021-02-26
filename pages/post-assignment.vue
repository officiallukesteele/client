<template>
  <div class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1
          class="text-lg font-extrabold leading-tight tracking-tight text-gray-900"
        >
          New assignment
        </h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-6 sm:px-0">
          <div class="px-8 py-8 w-full h-full bg-white shadow rounded-2xl">
            <div class="mb-3">
              <h4>Title of assignment</h4>
            </div>
            <input
              type="text"
              v-model="title"
              class="w-full mb-3 text-sm bg-white border border-gray-300 rounded-md shadow-sm pl-3 mt-4 pr-12 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <div class="mb-3">
              <h4>Subject</h4>
            </div>
            <select
              v-model="subject"
              class="relative w-full text-sm bg-white border border-gray-300 rounded-md shadow-sm pl-3 mt-4 pr-12 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="English">English Language</option>
              <option value="Maths">Mathematics</option>
              <option value="Physics">Physics</option>
            </select>

            <div class="mb-3">
              <h4>Level</h4>
            </div>
            <select
              v-model="level"
              class="relative w-full text-sm bg-white border border-gray-300 rounded-md shadow-sm pl-3 mt-4 pr-12 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>

            <div class="mb-3">
              <h4>Class</h4>
            </div>
            <select
              v-model="studentsClass"
              class="relative w-full text-sm bg-white border border-gray-300 rounded-md shadow-sm pl-3 mt-4 pr-12 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="JSS1">JSS1</option>
              <option value="JSS2">JSS2</option>
            </select>

            <div class="mb-3">
              <h4>Questions</h4>
            </div>
            <textarea
              v-model="questions"
              class="w-full mb-3 text-sm bg-white border border-gray-300 rounded-md shadow-sm pl-3 mt-4 pr-12 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="15"
            ></textarea>

            <button
              @click="postAssignment"
              type="button"
              class="mt-8 w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white text-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { v4 as uuidv4 } from 'uuid';

export default {
  middleware: "staff-login-auth",
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  methods: {
    async postAssignment() {
      try {
        const classTaught = this.loggedInUser.class;
        const res = await this.$axios.$get("/classes");
        const reqClass = res.filter(
          (arrClass) => arrClass.name === classTaught
        );

        const assignmentObj = {
          title: this.title,
          subject: this.subject,
          level: this.level,
          teacher: this.loggedInUser.username,
          questions: this.questions,
          class: this.studentsClass,
          id: uuidv4()
        }

        reqClass[0].assignments.push(assignmentObj);
        

        const reqClassAssignments = reqClass[0].assignments;
        const classId = reqClass[0]._id;
        const putRes = await this.$axios.$put(`/classes/${classId}`, {
          assignments: reqClassAssignments,
        });

        this.$toast.success("Assignment posted successfully");

        this.title = "";
        this.subject = "";
        this.level = "";
        this.questions = "";
        this.studentsClass = "";
      } catch (error) {
        if (error) {
          this.$toast.error("Error occured...");
        }
      }
    },
  },

  data() {
    return {
      title: "",
      subject: "",
      level: "",
      questions: "",
      studentsClass: "",
    };
  },
};
</script>

<style>
</style>