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
          <!-- <div class="grid grid-cols-profile px-8 py-8 w-full h-full bg-white shadow rounded-2xl">
            <div class="self-center">
              <img class="w-16 h-16 rounded-full" src="/profile.jpg">
            </div>
            <div class="self-center">
              <h3 class="font-bold">Kanu Chukwunonso</h3>
              <p class="text-xs font-medium text-green-500">Active</p>
              <p class="text-xs text-gray-600">Student</p>
              <p class="text-xs text-gray-600">JSS 2</p>
            </div>
          </div> -->
          <div class="px-8 py-8 w-full h-full bg-white shadow rounded-2xl">
            <div
              class="mb-3 w-12 h-12 grid place-content-center rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600"
            >
              <i class="fas text-white block fa-bookmark"></i>
            </div>
            <h2 class="font-extrabold text-xl leading-10 tracking-tight">
              Events.
            </h2>
            <p class="text-sm font-bold mt-4 text-yellow-500 tracking-tight">
              Upcoming events:
            </p>
            <p
              class="px-6 mt-2 mb-4 text-xs py-2 bg-yellow-500 text-white rounded-md w-auto md:w-max"
            >
              {{ upcomingEvent.title }}
            </p>

            <nuxt-link to="/school-calendar">
            <button
              type="button"
              class="inline-flex items-center mt-6 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
            View more
            </button>
            </nuxt-link>
          </div>

          <div class="px-8 py-8 w-full h-full bg-white shadow rounded-2xl">
            <div
              class="mb-3 w-12 h-12 grid place-content-center rounded-md bg-gradient-to-br from-blue-400 to-blue-600"
            >
              <i class="fas text-white block fa-book"></i>
            </div>
            <h2 class="font-extrabold text-xl leading-10 tracking-tight">
              Assignments.
            </h2>
            <p class="text-sm font-bold mt-4 text-blue-500 tracking-tight">
              Most Recent
            </p>
            <p
              class="px-6 mt-2 mb-4 text-xs py-2 bg-blue-500 text-white rounded-md w-auto md:w-max"
            >
              {{ assignments.subject }}({{ assignments.title }}).
            </p>

            <nuxt-link to="/assignments">
            <button
              type="button"
              class="inline-flex items-center mt-6 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View more
            </button>
            </nuxt-link>
          </div>


          <!-- <div class="px-8 py-8 w-full h-full bg-green-400 shadow rounded-2xl">
            <div class="mb-3 w-24 h-24 grid place-content-center rounded-full bg-green-500">
              <i class="fas text-white block fa-dollar-sign fa-3x"></i>
            </div>
            <h2 class="font-bold text-xl text-white leading-10">Upcoming payments.</h2>
            <ul class="list-disc px-6">
              <li class="text-white text-sm">English Assignment(Tense and Language structure)</li>
              <li class="text-white text-sm">3rd term exams</li>
            </ul>
            <button
              type="button"
              class="inline-flex items-center ml-2 mt-6 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            
              View more 
            </button>
          </div> -->
        </div>
        <!-- /End replace -->
      </div>
    </main>
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
    async getUpcomingEvent() {
      try {
        const events =  await this.$axios.$get("/events");
        const timer = new Date().getTime()
        const randIndex = ((events.length - 1) * Math.random()).toFixed()
        const currentlySelectedEvent = events[randIndex]
        // console.log(currentlySelectedEvent);
        // console.log(timer, new Date(currentlySelectedEvent.date).getTime())
        if (timer > new Date(currentlySelectedEvent.date).getTime()) {
          events.splice(randIndex, 1)
          this.upcomingEvent = events[0]
          // console.log(events);
        } else {
          this.upcomingEvent = currentlySelectedEvent
          // console.log(events);
        }

      } catch (error) {
        console.log(error);
      }
    },

    async getAssignments() {
      const studentCategory = this.loggedInUser.level
      const res =  await this.$axios.$get("/assignments");
      if(studentCategory === "Junior") {
        const assignments = res.filter(assignment => assignment.level === "Junior")
        const randIndex = ((assignments.length - 1) * Math.random()).toFixed()
        this.assignments = assignments[randIndex]
      } else if(studentCategory === "Senior") {
        const assignments = res.filter(assignment => assignment.level === "Senior")
        const randIndex = ((assignments.length - 1) * Math.random()).toFixed()
        this.assignments = assignments[randIndex]
      }
    },

    async createProfilePicUrl() {
      const name = `${this.loggedInUser.username.replace(/\s+/g, '').trim().toLowerCase()}.jpg`
     
      const uploads = await this.$axios.$get("/upload/files");
      
      const userUploadObject = uploads.filter(upload => upload.name === name)
      
      const url = `http://localhost:1337${userUploadObject[0].formats.small.url}`
      
      this.profile_url = url
    }
    // sortEventsByDate(events) {
    //   let trxArr = events.map(function(event) {
    //     return new Date(event.date).getTime()
      
    //   })
    //   let smallestDate = Math.min(...trxArr)
    //   console.log(smallestDate);
    // }
  },
  mounted() {
    this.getUpcomingEvent()
    this.getAssignments()
    this.createProfilePicUrl()
  },
  data() {
    return {
      upcomingEvent: '',
      assignments: '',
      profile_url: ''
    };
  },
};
</script>

<style>
</style>