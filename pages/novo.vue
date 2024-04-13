<template>
  <main class="container max-w-2xl p-4">
    <div class="card border flex flex-col container">
      <header class="text-2xl font-bold">
        Você foi Apto ou Dispensado do Serviço Militar?
      </header>
      <button class="card-item border" @click="status = 'apto'">
        <div>Apto</div>
        <div class="circle" :class="{ active: status == 'apto' }">
          <UIcon name="i-heroicons-check" />
        </div>
      </button>
      <button class="card-item border" @click="status = 'dispensado'">
        <div>Dispensado</div>
        <div class="circle" :class="{ active: status == 'dispensado' }">
          <UIcon name="i-heroicons-check" />
        </div>
      </button>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  colorMode: "dark",
});

const status = ref("");
</script>

<style scoped>
.card-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid rgb(196, 42, 42);
}

.circle.active {
  background-color: rgb(196, 42, 42);
}
</style>
