<template>
  <div class="vending-machine">
    <h1>Vending Machine App</h1>
    <div class="input-section">
      <label for="bill">Bill Amount</label>
      <input v-model.number="bill" type="number" min="0" id="bill" placeholder="Enter bill amount" :disabled="countdown > 0">

      <label for="owed">Amount Owed</label>
      <input v-model.number="owed" type="number" min="0" id="owed" placeholder="Enter owed amount" :disabled="countdown > 0">

      <button @click="calculateChange" :disabled="countdown > 0">Get Change</button>
    </div>

    <div class="result-section" v-if="change.length">
      <h2>Change:</h2>
      <ul>
        <li v-for="(item, index) in change" :key="index">{{ item }}</li>
      </ul>
    </div>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="countdown > 0" class="countdown">
      <h3>Transaction Countdown: {{ countdown }} seconds</h3>
    </div>
  </div>
</template>

<script>
import { getChange } from '@/utils/currencyexchange.js';

export default {
  data() {
    return {
      bill: 0,
      owed: 0,
      change: [],
      error: '',
      countdown: 0,
      countdownInterval: null
    };
  },
  methods: {
    calculateChange() {
      this.error = ''; // Reset any previous error message
      this.change = []; // Clear the change array at the start
      this.countdown = 0; // Reset countdown

      if (this.bill === 0 && this.owed === 0) {
        this.error = 'No transaction no change needed.'; // Set error message (0 bill and 0 owed)
        this.startCountdown(); // Start the countdown to clear message after a few seconds
      } 

      else if (this.bill < this.owed) {
        this.error = 'Bill is less than the amount owed.';
        this.startCountdown();  // Set error message (bill is less than owed)
      } 

      else {
        // Call the getChange function to calculate the change
        this.change = getChange(this.bill, this.owed);
        this.startCountdown(); // Start countdown to clear change and error after a few seconds
      }
      this.resetInputs(); // Reset inputs after processing
    },

    resetInputs() {
      this.bill = 0; // Reset bill input
      this.owed = 0; // Reset owed input
      // `change` and `error` are managed by the reset
    },

    startCountdown() {
      this.countdown = 10; // Set countdown duration in 10 seconds
      clearInterval(this.countdownInterval); // Clear any existing intervals

      this.countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.countdownInterval); // Stop countdown when it reaches 0
          this.change = []; // Clear change after countdown completes
          this.error = ''; // Clear any error messages after countdown completes
        }
      }, 1000); // Update every second
    },

  },
  beforeDestroy() {
    clearInterval(this.countdownInterval); // Clear interval when component is destroyed
  }
};
</script>

<style scoped>
.vending-machine {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
  background-color: var(--soft-blue);
  border-radius: 12px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.5);
}

h1 {
  color: var(--light-blue);
  padding-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  color: var(--light-blue);
  font-weight: 700;
}

input {
  padding: 10px;
  font-size: 16px;
  border: 10px solid var(--light-blue);
  border-radius: 8px;
  transition: background-color 0.3s;
}

input:disabled {
  background-color: #e0e0e0;
}

button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #ffbb7f;
}

.result-section h2 {
  color: var(--light-blue);
  margin-top: 15px;
}

.result-section ul {
  list-style-type: none;
  padding: 0;
  color: #333;
  font-weight: bold;
}

.countdown h3 {
  color: var(--warm-yellow);
  font-weight: bold;
}
</style>
