<template>
  <div>
      <div v-if="userTransactions.length">
      <h1>Transaction History</h1>
      <br />
      <div v-for="transaction in userTransactions" :key="transaction.id">
        <p>Asset: {{ transaction.asset }}</p>
        <p>Maturity Date: {{ transaction.maturityDate }}</p>
        <p>Plan: {{ transaction.plan }}</p>
        <br>
      </div>
    </div>
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
      userTransactions: [],
    };
  },
  methods: {
    async filterTransactionById() {
      try {
        const transactions = await this.$axios.$get("/transactions");
        const userTransactions = transactions.filter(
          (transaction) => transaction.userId === this.loggedInUser.id
        );
        this.userTransactions = userTransactions;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.filterTransactionById();
  },
};
</script>

<style>
</style>