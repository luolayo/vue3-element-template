import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'

function setVitePostCSS() {
  return {
    plugins: [
      tailwind(),
      autoprefixer({
        overrideBrowserslist: ['last 2 versions', 'iOS >= 8', 'Android >= 4'],
        grid: true,
      }),
    ],
  }
}
export default setVitePostCSS
