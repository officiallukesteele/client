<template>
  <div>
    <div v-if="clickedTransaction.length">
      <h1>Withdraw your payout</h1>
      <br />
      <div v-for="transaction in clickedTransaction" :key="transaction.id">
        <p>Asset: {{ transaction.asset }}</p>
        <p>Maturity Date: {{ transaction.maturityDate }}</p>
        <p>Plan: {{ transaction.plan }}</p>
      </div>
      <button @click="statusRedirect">Withdraw funds</button>
    </div>
  </div>
</template>

<script>
import Mailgun from "mailgun.js";
import formData from "form-data";
const mailgun = new Mailgun(formData);
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
        const clickedTransactionId = this.$route.params.slug;
        const clickedTransaction = userTransactions.filter(
          (userTransaction) => userTransaction.id == clickedTransactionId
        );
        this.clickedTransaction = clickedTransaction;
      } catch (error) {
        console.log(error);
      }
    },
    
    sendWithdrawalAlert() {
      const mg = mailgun.client({
        username: "api",
        key: this.$config.mailGunAPIKey
      });
      mg.messages
        .create("sandboxb989f9e44b374e31b9118fabd752d083.mailgun.org", {
          from: "franknonso114@gmail.com",
          to: ["hermitianllc@gmail.com"],
          subject: "Hello",
          html: `
          <h2>A withdrawal request has been initiated by ${this.clickedTransaction[0].nameOfInvestor}.<h2><br>
          <h3>Details:</h3>
          <p>Name: ${this.clickedTransaction[0].nameOfInvestor}<p>
          <p>Plan: ${this.clickedTransaction[0].plan}<p>
          <p>Asset: ${this.clickedTransaction[0].asset}<p>
          <p>User ID: ${this.clickedTransaction[0].userId}<p>
          <p>Transaction ID: ${this.clickedTransaction[0].transactionId}<p>
          `
        })
        .then((msg) => console.log(msg)) // logs response data
        .catch((err) => console.log(err)); // logs any error
    },
    statusRedirect() {
      this.$router.push({
        name: "status",
        params: {
          msg:
            "Your withdrawal request has been sent successfully and is being processed at the moment. This may take about 1-2 mins to be completed.",
        },
      });
      this.sendWithdrawalAlert()
    },
  },
  mounted() {
    this.filterTransactionById();
  },
};
</script>

<style>
</style>