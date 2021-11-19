<template>
  <div>
    <div v-if="maturedTransactions.length">
      <h1>Matured transactions</h1>
      <br />
      <div
        v-for="transaction in maturedTransactions"
        :key="transaction.id"
        @click="showTransactionDetails(transaction.id)"
      >
        <p>Asset: {{ transaction.asset }}</p>
        <p>Maturity Date: {{ transaction.maturityDate }}</p>
        <p>Plan: {{ transaction.plan }}</p>
      </div>
    </div>
    <div v-else>
      <p>No matured transactions</p>
      <button @click="redirectToDeposit">Start investing</button>
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
      maturedTransactions: [],
    };
  },
  methods: {
    showTransactionDetails(id) {
      this.$router.push(`/withdrawal/${id}`);
    },
    redirectToDeposit() {
      this.$router.push("/deposit");
    },
    formatDate(date) {
      return new Date(date).getTime();
    },
    formatDateToUTC(date) {
      const UTCMseconds =
        new Date(date).getTime() +
        new Date(date).getTimezoneOffset() * 60 * 1000;
      const UTCseconds = Math.round(UTCMseconds / 1000);
      return UTCseconds;
    },
    
    async filterMaturedTransactions() {
      try {
        const currentDate = new Date();
        const transactions = await this.$axios.$get("/transactions");
        const userTransactions = transactions.filter(
          (transaction) => transaction.userId === this.loggedInUser.id
        );
        const filteredTransactions = userTransactions.filter(
          (transaction) =>
            this.formatDateToUTC(currentDate) >=
            this.formatDateToUTC(transaction.maturityDate)
        );
        // console.log(filteredTransactions);
        this.maturedTransactions = filteredTransactions;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.filterMaturedTransactions();
  },
};
</script>

<style>
</style>