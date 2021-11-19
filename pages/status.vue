<template>
  <div>
    <p>{{ status }}</p>
    <nuxt-link to="/dashboard">
    <button>Back to Dashboard</button>
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  middleware: "login-auth",
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  data() {
    return {
      status: ""
    };
  },
  methods: {
    displayStatus() {
      this.status = this.$route.params.msg;
    }
  },
    mounted() {
    this.displayStatus();
  },
};
</script>

<style>
</style>