<template>
  <div>
    <div v-if="clickedTransaction.length">
      <div v-for="transaction in clickedTransaction" :key="transaction.id">
        <p>Asset: {{ transaction.asset }}</p>
        <p>Maturity Date: {{ transaction.maturityDate }}</p>
        <p>Plan: {{ transaction.plan }}</p>
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
      clickedTransaction: [],
    };
  },
  methods: {
    async filterTransactionById() {
      try {
        const transactions = await this.$axios.$get("/transactions");
        const userTransactions = transactions.filter(
          (transaction) => transaction.userId === this.loggedInUser.id
        );
        const clickedTransactionId = this.$route.query.txId;
        const clickedTransaction = userTransactions.filter(
          (userTransaction) => userTransaction.id == clickedTransactionId
        );
        this.clickedTransaction = clickedTransaction;
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