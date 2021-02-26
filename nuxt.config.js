import { process } from "autoprefixer";

export default {
  env: {
    strapiBaseUri: "http://localhost:1337"
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "school-portal-template",
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
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/tailwindcss"],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios", "@nuxtjs/auth", "@nuxtjs/markdownit", "@nuxtjs/toast",],

  toast: {
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
},

  axios: {
    baseURL: "http://localhost:1337"
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

  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
