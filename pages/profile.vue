<template>
  <div class="bg-gray-100 min-h-screen">
    <main>
      <div class="grid grid-cols-1 gap-4 max-w-4xl mx-auto py-2 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 px-4 py-6 sm:px-0">
          <div
            class="grid text-center px-8 py-8 w-full h-full bg-white shadow rounded-2xl"
          >
            <div class="place-self-center">
              <div class="mb-4">
                <img
                  class="w-24 h-24 mx-auto rounded-full"
                  src="/profile.jpg"
                />
              </div>
            </div>
            <hr />
            <div class="grid gap-y-3 grid-cols-one-three text-left mt-6">
              <div class="justify-self-start">
                <p class="text-sm font-bold">Name</p>
              </div>
              <div class="justify-self-end">
                <p class="text-sm">Kanu Chukwunonso</p>
              </div>

              <div class="justify-self-start">
                <p class="text-sm font-bold">Gender</p>
              </div>
              <div class="justify-self-end">
                <p class="text-sm">Male</p>
              </div>

              <div class="justify-self-start">
                <p class="text-sm font-bold">Age</p>
              </div>
              <div class="justify-self-end">
                <p class="text-sm">19</p>
              </div>

              <div class="justify-self-start">
                <p class="text-sm font-bold">Account status</p>
              </div>
              <div class="justify-self-end">
                <p class="text-sm text-green-500">Active</p>
              </div>
            </div>

            <!-- <div>
              <h3 class="font-extrabold tracking-tight">Kanu Chukwunonso</h3>
              <p class="text-xs font-medium text-green-500">Active</p>
              <p class="text-xs text-gray-600">Student</p>
              <p class="text-xs text-gray-600">JSS 2</p>
            </div> -->
          </div>
        </div>

        <div class="px-4 sm:px-0">
          <div
            class="text-center px-8 py-8 w-full h-full bg-white shadow rounded-2xl"
          >
            <h2 class="font-extrabold text-xl text-left leading-10 tracking-tight">
              Subjects offered.
            </h2>

            <div class="text-left px-4 mt-6">
              <ul class="list-decimal text-sm">
                <li>English Language</li>
                <li>Mathematics</li>
                <li>History</li>
                <li>Basic Science</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Profile",
};
</script>

<style>
</style>