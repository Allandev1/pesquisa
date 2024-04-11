export default defineAppConfig({
  ui: {
    strategy: "override",
    primary: "green",
    gray: "neutral",
    button: {
      rounded: "rounded-full",
    },
    card: {
      background: "sm:bg-white sm:dark:bg-gray-900",
      rounded: "rounded-sm",
      ring: "sm:ring-1 ring-gray-200 dark:ring-gray-800",
    },
    formGroup: {
      label: {
        base: "text-lg font-bold",
      },
    },
    radio: {
      label: "text-lg pb-1",
      wrapper: "flex items-center",
    },
  },
});
