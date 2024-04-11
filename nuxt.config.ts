// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "CSPFA Pesquisa de opinião",
      meta: [
        {
          charset: "utf-8",
        },
      ],
    },
  },
  colorMode: {
    preference: "light",
    fallback: "light",
  },
  modules: ["@nuxt/ui"],
  css: ["~/assets/css/main.css"],
});
