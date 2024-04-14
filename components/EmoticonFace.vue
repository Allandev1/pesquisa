<template>
  <div
    class="emoticon-button rounded-md shadow-sm ring-1"
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

  img {
    margin: 0 auto;
    width: 64px;
    height: 64px;
    pointer-events: none;
    filter: grayscale(1);

    @media (max-width: 768px) {
      width: 48px;
      height: 48px;
    }
  }

  label {
    /* color: #d0d0d0; */
    font-weight: 500;
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

    /* &.excelente {
      label {
        color: #15803d;
      }
    } 

    &.bom {
      label {
        color: #f59e0b;
      }
    }

    &.ruim {
      label {
        color: #dc2626;
      }
    } */
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
