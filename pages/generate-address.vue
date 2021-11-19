<template>
  <div class="relative">
    <div class="absolute inset-x-0 top-0 mx-auto">
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="copied === true"
          class="
            grid grid-cols-2
            place-content-center
            bg-green-50
            border border-1 border-green-100
            w-11/12
            mx-auto
            h-12
            px-4
            py-2
            rounded-md
            absolute
            inset-x-0
            top-3
          "
        >
          <div class="flex items-center space-x-4">
            <i class="fas fa-check text-green-500"></i>
            <p class="text-sm font-medium text-green-800">Copied</p>
          </div>
          <div
            @click="copied = ''"
            class="
              justify-self-end
              grid
              place-content-center
              w-8
              h-8
              hover:bg-green-100
              rounded-sm
            "
          >
            <i class="fas fa-times text-lg text-green-500"></i>
          </div>
        </div>
        <div
          v-if="addressFieldError === true"
          class="
            grid grid-cols-2
            place-content-center
            bg-red-50
            border border-1 border-red-100
            w-11/12
            mx-auto
            h-12
            px-4
            py-2
            rounded-md
            absolute
            inset-x-0
            top-3
          "
        >
          <div class="flex items-center space-x-4">
            <i class="fas fa-check text-red-500"></i>
            <p class="text-xs font-medium text-red-800">
              Please enter your Bitcoin address.
            </p>
          </div>
          <div
            @click="addressFieldError = ''"
            class="
              justify-self-end
              grid
              place-content-center
              w-8
              h-8
              hover:bg-red-100
              rounded-sm
            "
          >
            <i class="fas fa-times text-lg text-red-500"></i>
          </div>
        </div>
      </transition>
    </div>
    <p>You are to pay the amount of {{ displayPlanPrice.toFixed(3) }} {{ abbreviation }}</p>

    <h1>Click on the button to copy payment address</h1>
    <p ref="address">{{ displayAddress }}</p>

    <button @click="copyToClipboard">Copy</button>
    <h1>Next Step</h1>
    <p>
      Input the {{ $route.query.asset }} address used to make the payment. This
      is where your payout will be sent at the end of your investment lifecycle.
    </p>
    <input type="text" v-model="usersAddress" />
    <h1>Enter your transaction ID for confirmation(optional)</h1>
    <input type="text" v-model="transactionId" />
    <button @click="createTransaction">Confirm payment</button>
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
      displayAddress: "",
      displayPlanPrice: 0,
      abbreviation: "",
      usersAddress: "",
      transactionId: "",
      copied: false,
      addressFieldError: false,
      dateString: "",
      selectedPlanDurationInDays: "",
      amountToBeAddedDaily: ''
    };
  },
  methods: {
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.$refs.address.innerText);
        this.copied = true;
        this.autoCloseToast();
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    },
    async generateAddress() {
      try {
        const asset = this.$route.query.asset;
        const addresses = await this.$axios.$get("/addresses");
        const requiredAddress = addresses.filter(
          (address) => address.asset === asset
        );
        this.displayAddress = requiredAddress[0].address;
      } catch (error) {
        console.log(error);
      }
    },
    async generatePlanPriceAndDailyAddedAmount() {
      try {
        const planName = this.$route.query.plan;
        const asset = this.$route.query.asset;
        const plans = await this.$axios.$get("/plans");
        const requiredPlan = plans.filter(
          (plan) => plan.asset === asset && plan.name === planName
        );
        const amountAddedDaily = requiredPlan[0].amountToBeAddedDaily
        this.displayPlanPrice = requiredPlan[0].price;
        this.amountToBeAddedDaily = amountAddedDaily
        this.abbreviation = requiredPlan[0].abbreviation
        // console.log(plans);
      } catch (error) {
        console.log(error);
      }
    },
    async getPlanDurationInDays() {
      try {
        const plans = await this.$axios.$get("/plans");
        const selectedPlan = plans.filter(
          (plan) =>
            plan.name === this.$route.query.plan &&
            plan.asset === this.$route.query.asset
        );
        this.selectedPlanDurationInDays = selectedPlan[0].durationInDays;
      } catch (error) {
        console.log(error);
      }
    },
    getMaturityDate(noOfDays) {
      const todaysDate =
        new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000;
      const transactionDurationInMS = noOfDays * 24 * 60 * 60 * 1000;
      const maturityDate = todaysDate + transactionDurationInMS;
      // const dateStringMaturityDate = new Date(maturityDate).toDateString();
      // this.dateString = dateStringMaturityDate;
      const isoStringMaturityDate = new Date(maturityDate)
        .toISOString()
        .split("T")[0];
      return isoStringMaturityDate;
    },
    // async getMaturityDate(noOfDays) {
    //   const transaction = await this.$axios.$post("/plans");
    //   const todaysDate =
    //     new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000;
    //   const transactionDurationInMS = noOfDays * 24 * 60 * 60 * 1000;
    //   const maturityDate = todaysDate + transactionDurationInMS;
    //   const formatedMaturityDate = new Date(maturityDate).toDateString();
    //   return formatedMaturityDate;
    // },
    async createTransaction() {
      try {
        if (this.usersAddress !== "") {
          const planName = this.$route.query.plan;
          const asset = this.$route.query.asset;
          const transaction = await this.$axios.$post("/transactions", {
            asset: asset,
            confirmed: null,
            nameOfInvestor: this.loggedInUser.username,
            amountInvested: this.displayPlanPrice,
            plan: planName,
            maturityDate: this.getMaturityDate(this.selectedPlanDurationInDays),
            payoutCleared: null,
            investorsWalletAddress: this.usersAddress,
            transactionId: this.transactionId,
            userId: this.loggedInUser.id,
            dailyEarnings: 0,
            amountToBeAddedDaily: this.amountToBeAddedDaily
          });
          if (transaction.created_at) {
            this.$router.push({
              name: "status",
              params: {
                msg: "Your payment is being confirmed at the moment. Note: This might take a few minutes. You transaction will bear a green 'Confirmed' label on the dashboard when it has been confirmed.",
              },
            });
          }
        } else {
          this.addressFieldError = true
          this.autoCloseToast();
        }
      } catch (error) {
        console.log(error);
      }
    },
    autoCloseToast() {
      setTimeout(() => {
        this.copied = "";
        this.addressFieldError = "";
      }, 3000);
    },
  },
  mounted() {
    this.generateAddress();
    this.generatePlanPriceAndDailyAddedAmount();
    this.getPlanDurationInDays();
  },
};
</script>

<style>
</style>