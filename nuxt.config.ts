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
  modules: ["@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      scriptURL: process.env.GS_SCRIPT_URL,
    },
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },
});
