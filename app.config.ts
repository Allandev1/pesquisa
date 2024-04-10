import { UFormGroup } from "./.nuxt/components.d";
export default defineAppConfig({
  ui: {
    strategy: "override",
    primary: "blue",
    gray: "cool",
    formGroup: {
      label: {
        base: "text-lg",
      },
    },
    radio: {
      base: "text-lg",
    },
  },
});
