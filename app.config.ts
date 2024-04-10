export default defineAppConfig({
  ui: {
    strategy: "override",
    primary: "blue",
    gray: "neutral",
    formGroup: {
      label: {
        base: "text-lg font-semibold",
      },
    },
    radio: {
      label: "text-lg pb-1",
      wrapper: "flex items-center",
    },
  },
});
