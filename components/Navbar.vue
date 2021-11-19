<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                class="h-8 w-8 rounded-full"
                src="/profile.jpg"
                alt="Workflow"
              />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <nuxt-link to="/dashboard">
                  <a
                    class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >Dashboard</a
                  >
                </nuxt-link>

                <div class="relative inline-block text-left">
                  <div>
                    <button
                      @click="isDropdownOpen = !isDropdownOpen"
                      type="button"
                      class="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none hover:text-white hover:bg-gray-700"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      Student actions
                      <!-- Heroicon name: chevron-down -->
                      <svg
                        class="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <div
                      v-show="isDropdownOpen"
                      class="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                      <div
                        class="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <!-- <nuxt-link to="/newsletters">
                          <a
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            >Newsletters</a
                          >
                        </nuxt-link> -->
                        <!-- <nuxt-link to="/school-calendar">
                          <a
                            href="#"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            >Calender</a
                          >
                        </nuxt-link> -->
                        <nuxt-link to="/assignments">
                          <a
                            href="#"
                            class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            >Assignments</a
                          >
                        </nuxt-link>

                        <nuxt-link to="/results">
                          <a
                            href="#"
                            class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            >Results</a
                          >
                        </nuxt-link>

                        <nuxt-link to="/e-learnings">
                          <a
                            href="#"
                            class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            >E-learning</a
                          >
                        </nuxt-link>

                        <nuxt-link to="/payments">
                          <a
                            href="#"
                            class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            >Payments</a
                          >
                        </nuxt-link>
                        <!-- <form method="POST" action="#">
                          <button
                            type="submit"
                            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                          >
                            Sign out
                          </button>
                        </form> -->
                      </div>
                    </div>
                  </transition>
                </div>

                <!-- <a
                  href="#"
                  class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >Newsletters</a
                >

                <a
                  href="#"
                  class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >Calendar</a
                >

                <a
                  href="#"
                  class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >Assignments</a
                > -->
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button
                class="bg-gray-800 inline-flex items-center justify-center p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span class="sr-only">View notifications</span>
                <!-- Heroicon name: bell -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <div
                  class="-ml-2 grid place-content-center w-5 h-5 rounded-full bg-red-400 text-white font-medium text-xs"
                >
                  2
                </div>
              </button>

              <!-- Profile dropdown -->
              <div class="ml-3 relative">
                <div>
                  <button
                    class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      @click="isOpen = !isOpen"
                      class="h-8 w-8 rounded-full"
                    />
                  </button>
                </div>
                <!--
                Profile dropdown panel, show/hide based on dropdown state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <div
                    v-show="isOpen"
                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <nuxt-link to="/profile">
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        >Your Profile</a
                      >
                    </nuxt-link>

                    <a
                      href="#"
                      @click="logout"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      >Logout</a
                    >
                  </div></transition
                >
              </div>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
           

            <!-- Mobile menu button -->
            <button
              class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <!--
              Heroicon name: menu

              Menu open: "hidden", Menu closed: "block"
            -->
              <svg
                class="block h-6 w-6"
                @click="isNotCollapsed = !isNotCollapsed"
                :class="isNotCollapsed ? 'hidden' : 'block'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <!--
              Heroicon name: x

              Menu open: "block", Menu closed: "hidden"
            -->
              <svg
                class="h-6 w-6"
                @click="isNotCollapsed = !isNotCollapsed"
                :class="isNotCollapsed ? 'block' : 'hidden'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!--
      Mobile menu, toggle classes based on menu state.

      Open: "block", closed: "hidden"
    -->
      <div class="md:hidden" :class="isNotCollapsed ? 'block' : 'hidden'">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <nuxt-link to="/dashboard">
            <a
              href="#"
              class="bg-gray-900 text-white block px-3 py-2 rounded-md text-lg font-medium"
              >Home</a
            >
          </nuxt-link>

          <nuxt-link to="/results">
            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium"
              >About Us</a
            >
          </nuxt-link>

          <nuxt-link to="/assignments">
            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium"
              >Investment Services</a
            >
          </nuxt-link>

          <nuxt-link to="/e-learnings">
            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium"
              >Partnership</a
            >
          </nuxt-link>
          <nuxt-link to="/payments">
            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium"
              >Press</a
            >
          </nuxt-link>
          <nuxt-link to="/payments">
            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium"
              >FAQ</a
            >
          </nuxt-link>
          <nuxt-link to="/payments">
            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium"
              >Contact Us</a
            >
          </nuxt-link>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="mt-3 px-2 space-y-1">
            <nuxt-link to="/profile">
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-lg font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >Your Profile</a
              >
            </nuxt-link>

            <a
              @click="logout"
              class="block px-3 py-2 rounded-md text-lg cursor-pointer font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >Logout</a
            >
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  watch: {
    $route(to, from) {
      this.isNotCollapsed = false
      this.isDropdownOpen = false
      this.isOpen = false
    }
  },
  data() {
    return {
      isNotCollapsed: "",
      isOpen: false,
      isDropdownOpen: false,
    };
  },
  methods: {
    async logout() {
      const accountType = this.$auth.user.accountType;
      await this.$auth.logout();
      if (accountType === "Student") {
        this.$router.push("/");
      }

      if (accountType === "Staff") {
        this.$router.push("/staff-login");
      }

      if (accountType === "Admin") {
        this.$router.push("/admin-login");
      }
    },
  }
};
</script>
