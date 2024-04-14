<template>
  <div
    class="emoticon-button border rounded-sm"
    :class="classObject"
    @click="handleClick"
  >
    <img :alt="`${emoticonFace} emoticon`" :src="`/${emoticonFace}.png`" />
    <label class="text-center">
      {{ emoticonFace }}
    </label>
  </div>
</template>

<script setup>
const emit = defineEmits(["selecionado"]);

const props = defineProps({
  emoticonFace: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

const classObject = computed(() => {
  return {
    active: props.active,
    [props.emoticonFace.toLowerCase()]: true,
  };
});

const handleClick = () => {
  emit("selecionado", props.emoticonFace);
};
</script>

<style scoped lang="scss">
.emoticon-button {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  cursor: pointer;
  border-color: #d9d9d9;
  filter: grayscale(1);

  img {
    margin: 0 auto;
    width: 64px;
    height: 64px;
    pointer-events: none;

    @media (max-width: 768px) {
      width: 48px;
      height: 48px;
    }
  }

  label {
    color: #d0d0d0;
    font-weight: 600;
    text-transform: uppercase;
    pointer-events: none;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }

  &.active {
    filter: grayscale(0);
    transition: filter 0.2s;

    img {
      filter: none;
      animation: selected 1s forwards;
    }

    &.excelente {
      background-color: #86efac;
      border-color: #22c55e;

      label {
        /* color: #22c55e; */
        color: #15803d;
      }
    }

    &.bom {
      background-color: #fcd34d;
      border-color: #f7b528;

      label {
        /* color: #f7b528; */
        color: #f59e0b;
      }
    }

    &.ruim {
      background-color: #fca5a5;
      border-color: #f53e3e;

      label {
        /* color: #f53e3e; */
        color: #dc2626;
      }
    }
  }
}

@keyframes selected {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
