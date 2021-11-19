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
          v-if="error.state === true"
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
              Please select an asset and a plan
            </p>
          </div>
          <div
            @click="error.state = ''"
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
    <h1>Select crypto asset</h1>
    <fieldset>
      <div class="mt-4 space-y-4">
        <div class="flex items-center">
          <input
            name="asset"
            id="bitcoin"
            @change="onChange($event)"
            value="Bitcoin"
            type="radio"
            class="
              focus:ring-indigo-500
              h-4
              w-4
              text-indigo-600
              border-gray-300
            "
          />
          <label
            for="bitcoin"
            class="ml-3 block text-sm font-medium text-gray-700"
          >
            Bitcoin
          </label>
        </div>
        <div class="flex items-center">
          <input
            name="asset"
            id="ethereum"
            @change="onChange($event)"
            type="radio"
            value="Ethereum"
            class="
              focus:ring-indigo-500
              h-4
              w-4
              text-indigo-600
              border-gray-300
            "
          />
          <label
            for="ethereum"
            class="ml-3 block text-sm font-medium text-gray-700"
          >
            Ethereum
          </label>
        </div>
        <div class="flex items-center">
          <input
            name="asset"
            id="litecoin"
            @change="onChange($event)"
            type="radio"
            value="Litecoin"
            class="
              focus:ring-indigo-500
              h-4
              w-4
              text-indigo-600
              border-gray-300
            "
          />
          <label
            for="litecoin"
            class="ml-3 block text-sm font-medium text-gray-700"
          >
            Litecoin
          </label>
        </div>
      </div>
    </fieldset>
    <h1>Select plan</h1>
    <form>
      <div class="mt-4 space-y-4">
        <div class="flex items-center">
          <input
            name="plan"
            id="silver"
            @change="onSelectPlan($event)"
            value="Silver"
            type="radio"
            class="
              focus:ring-indigo-500
              h-4
              w-4
              text-indigo-600
              border-gray-300
            "
          />
          <label
            for="silver"
            class="ml-3 block text-sm font-medium text-gray-700"
          >
            Silver Plan
          </label>
        </div>
        <div class="flex items-center">
          <input
            name="plan"
            id="gold"
            @change="onSelectPlan($event)"
            type="radio"
            value="Gold"
            class="
              focus:ring-indigo-500
              h-4
              w-4
              text-indigo-600
              border-gray-300
            "
          />
          <label
            for="gold"
            class="ml-3 block text-sm font-medium text-gray-700"
          >
            Gold Plan
          </label>
        </div>
        <div class="flex items-center">
          <input
            name="plan"
            id="diamond"
            @change="onSelectPlan($event)"
            type="radio"
            value="Diamond"
            class="
              focus:ring-indigo-500
              h-4
              w-4
              text-indigo-600
              border-gray-300
            "
          />
          <label
            for="diamond"
            class="ml-3 block text-sm font-medium text-gray-700"
          >
            Diamond Plan
          </label>
        </div>
      </div>
    </form>
    <div>
      <button
        @click="generatePaymentAddress"
        class="
          w-full
          text-white
          bg-indigo-500
          border-0
          py-2
          px-6
          focus:outline-none
          hover:bg-indigo-600
          rounded
          text-lg
        "
      >
        Next
      </button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "login-auth",
  data() {
    return {
      selectedAsset: "",
      selectedPlan: "",
      error: {
        state: null
      }
    };
  },
  methods: {
    autoCloseToast() {
      setTimeout(() => {
        this.error.state = "";
      }, 3000);
    },
    onChange(event) {
      let data = event.target.value;
      this.selectedAsset = data;
    },
    onSelectPlan(event) {
      let data = event.target.value;
      this.selectedPlan = data;
    },
    generatePaymentAddress() {
      if (this.selectedAsset && this.selectedPlan) {
        this.$router.push(
          `/generate-address?asset=${this.selectedAsset}&plan=${this.selectedPlan}`
        );
      } else {
        this.error.state = true
        this.autoCloseToast()
      }
    },
  },
};
</script>

<style>
</style>