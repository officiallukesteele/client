module.exports = {
    purge: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
     darkMode: false, // or 'media' or 'class'
     theme: {
       fontFamily: {
         'sans': ['Roboto', 'sans-serif']
       },
       extend: {
        backgroundImage: theme => ({
          'hero-image': "url('/profile.jpg')"
         })
       },
     },
     variants: {
       extend: {},
     },
     plugins: [
      require('@tailwindcss/forms'), require('@tailwindcss/typography')
     ],
   }