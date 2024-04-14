export default defineAppConfig({
  ui: {
    strategy: "override",
    primary: "exercito",
    gray: "neutral",
    button: {
      rounded: "rounded-full",
    },
    card: {
      background: "bg-white dark:bg-gray-900",
      ring: "ring-1 ring-gray-200 dark:ring-gray-800",
      shadow: "shadow-sm",
      divide: "divide-y divide-gray-200 dark:divide-gray-800",
    },
    formGroup: {
      label: {
        base: "text-base font-semibold",
      },
    },
    radio: {
      label: "text-lg pb-1",
      wrapper: "flex items-center",
    },
  },
});
