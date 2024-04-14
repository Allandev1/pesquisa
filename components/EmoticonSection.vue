<template>
  <main class="flex justify-between w-full gap-2">
    <EmoticonFace
      v-for="emoticon in emoticonOptions"
      :key="emoticon.key"
      :emoticonFace="emoticon.key"
      :active="formCondition == emoticon.key"
      @selecionado="handleSelect($event)"
    />
  </main>
</template>

<script setup>
const props = defineProps({
  formCondition: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:formCondition"]);
const formCondition = ref(props.formCondition);

const emoticonOptions = [{ key: "Ruim" }, { key: "Bom" }, { key: "Excelente" }];

const handleSelect = (value) => {
  emit("update:formCondition", value);
  formCondition.value = value;
};
</script>
