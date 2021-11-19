export default {
  publicRuntimeConfig: {
    strapiBaseURL: "https://strapi-axy8.onrender.com",
    baseURL: "https://admin-frontend.onrender.com",
  },
  privateRuntimeConfig: {
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "bitcoin-site-template",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/axios'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/tailwindcss"],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],

  axios: {
    baseURL: "https://strapi-axy8.onrender.com"
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "auth/local", method: "post", propertyName: 'jwt' },
          user: { url: "users/me", method: "get", propertyName: false },
          logout: false
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
