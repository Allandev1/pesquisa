export default defineAppConfig({
  ui: {
    strategy: "override",
    primary: "green",
    gray: "neutral",
    formGroup: {
      label: {
        base: "text-lg font-bold",
      },
    },
    radio: {
      label: "text-lg pb-1",
      wrapper: "flex items-center",
    },
    button: {
      rounded: "rounded-full",
    },
  },
});
