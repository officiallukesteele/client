<template>
  <div>
    <div class="bg-gray-100 min-h-screen">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1
            class="text-lg font-extrabold leading-tight tracking-tight text-gray-900"
          >
            Calendar
          </h1>
        </div>
      </header>

      <main>
        <div class="max-w-4xl mx-auto py-2 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-4 px-4 py-6 sm:px-0">
            <div
              class="grid px-8 py-8 w-full h-full bg-white shadow rounded-2xl" v-for="event in events" :key="event.id"
            >
             <p
                :class="['text-xs', 'py-2', 'px-3', 'rounded-md', 'w-max', event.tagColor, event.tagBackground]"
              >
                {{ event.tag.toUpperCase() }}
              </p>
              <h2 class="font-extrabold mt-2 text-xl leading-8 tracking-tight">
                {{ event.title }}
              </h2>
        <p class="font-bold mt-4 py-1 text-sm w-auto">
                Date
              </p>
               <p class="text-sm w-auto">
                {{ new Date(event.date).toLocaleDateString() }}
              </p>

               <button
              type="button"
              :class="['mt-6', 'px-4', 'py-2', 'w-auto', 'border', 'border-transparent', 'rounded-md', 'shadow-sm', 'text-sm', 'font-medium', 'text-white', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-red-500', event.buttonBackground, `hover:${event.buttonHover}`]"
            >
              More info
            </button>
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
      events: ''
    }
  },
  methods: {
    async getEvents() {
      const res = await this.$axios.$get("/events");
      this.events = res
  }
  },

  mounted() {
    this.getEvents()
  },

  computed: {
    tagColor() {
      for(let event of this.events) {
        if(event.tag === 'Academic') {
          return 'text-red-600'
        }else if(event.tag === 'Sports') {
          return 'text-green-600'
        } else if(event.tag === 'Leisure') {
          return 'text-yellow-600'
        }
      }
    }
  },
}
</script>

<style>
</style>

      