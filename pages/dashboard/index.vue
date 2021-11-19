<template>
  <div>
    <h1>Hello {{ loggedInUser.username }}</h1>
    <div v-if="transactionsList.length">
      <button @click="redirectToDeposit">Start another transaction</button>
      <br /><br />
      <h1>Recent transactions</h1>
      <div
        v-for="transaction in transactionsList"
        :key="transaction.id"
        @click="showTransactionDetails(transaction.id)"
      >
        <p>Amount: {{ transaction.amountInvested.toFixed(3) }}</p>
        <p>Asset: {{ transaction.asset }}</p>
        <p>Maturity Date: {{ transaction.maturityDate }}</p>
        <div>
          <p v-if="transaction.confirmed">Confirmed</p>
          <p v-else>Unconfirmed</p>
        </div>
        <div>
          <p v-if="transaction.payoutCleared">Paid</p>
          <p v-else>Not paid</p>
        </div>
        <p>Plan: {{ transaction.plan }}</p>
        <br />
      </div>
    </div>
    <div v-else>
      <p>No current transactions</p>
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
      transactionsList: [],
    };
  },
  methods: {
    showTransactionDetails(id) {
      this.$router.push(`/dashboard/transaction?txId=${id}`);
    },
    async filterUserTransactions() {
      try {
        const transactions = await this.$axios.$get("/transactions");
        const userTransactions = transactions.filter(
          (transaction) => transaction.userId === this.loggedInUser.id
        );
        const recentTransactions = userTransactions.slice(-3);
        this.transactionsList = recentTransactions;
      } catch (error) {
        console.log(error);
      }
    },
    redirectToDeposit() {
      this.$router.push("/deposit");
    },
  },
  mounted() {
    this.filterUserTransactions();
  },
};
</script>

<style>
</style>