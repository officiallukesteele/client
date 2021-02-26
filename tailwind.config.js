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
         'sans': ['Inter', 'sans-serif']
       },
       extend: {
        gridTemplateColumns: {
          'one-two': '1fr 2fr',
          'one-three': '1fr 3fr',
          'profile': '100px 2fr'
        }
       },
     },
     variants: {
       extend: {},
     },
     plugins: [
     ],
   }