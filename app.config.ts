export default defineAppConfig({
  ui: {
    strategy: "override",
    primary: "blue",
    gray: "neutral",
    formGroup: {
      label: {
        base: "text-lg",
      },
    },
    radio: {
      label: "text-lg",
      wrapper: "flex items-center",
    },
  },
});
