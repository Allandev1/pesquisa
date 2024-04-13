<template>
  <main class="container max-w-2xl p-4">
    <UCard v-if="etapa1">
      <template #header>
        <img
          id="emoticon"
          alt="CSPFA Logo"
          src="/Mouth.png"
          class="mx-auto"
          style="width: 64px; height: 64px"
          :class="{ active: formData.status == 'Apto' }"
        />
        <h2 class="text-center text-2xl font-bold my-2">Pesquisa de opinião</h2>
        <p class="text-lg text-justify">
          Tem a finalidade de aperfeiçoar os trabalhos da
          <span class="font-semibold">Comissão de Seleção</span> e permitir o
          acompanhamento por parte do
          <span class="italic">Comando da 5ª Região Militar</span>. Solicito a
          colaboração para responder a pesquisa de satisfação a respeito das
          instalações, recepção e desenvolvimento dos trabalhos desta Comissão.
          Esta pesquisa terá <span class="font-semibold">caráter anônimo</span>.
        </p>
      </template>
      <UForm
        ref="formSubmit"
        class="space-y-4"
        :schema="formRules1"
        :state="formData"
        @submit="handleSubmit"
      >
        <UFormGroup
          name="status"
          label="Você foi Apto ou Dispensado do Serviço Militar?"
          required
        >
          <URadioGroup v-model="formData.status" :options="statusOptions" />
        </UFormGroup>

        <UFormGroup
          name="voluntario"
          label="Você é ou era voluntário para servir?"
          required
        >
          <URadioGroup
            v-model="formData.voluntario"
            :options="voluntarioOptions"
          />
        </UFormGroup>

        <UButton block size="xl" type="submit" :loading="formSubmitLoading">
          Continuar
        </UButton>
      </UForm>
    </UCard>

    <UCard v-else-if="!enviado">
      <template #header>
        <UButton
          @click="etapa1 = true"
          variant="link"
          icon="i-heroicons-arrow-left"
        >
          Voltar
        </UButton>
      </template>
      <UForm
        class="space-y-4"
        :schema="formRules2"
        :state="formData"
        @submit="handleSubmit"
      >
        <UFormGroup
          name="instalacoes"
          label="Como o Sr considera as instalações da Comissão de Seleção?"
          required
        >
          <URadioGroup
            v-model="formData.instalacoes"
            :options="avaliacaoOptions"
          />
        </UFormGroup>

        <UFormGroup
          name="recepcao"
          label="Como o Sr considera o trabalho da Recepção?"
          required
        >
          <URadioGroup
            v-model="formData.recepcao"
            :options="avaliacaoOptions"
          />
        </UFormGroup>

        <UFormGroup
          name="saude"
          label="Como o Sr considera o trabalho da Inspeção de Saúde?"
          required
        >
          <URadioGroup v-model="formData.saude" :options="avaliacaoOptions" />
        </UFormGroup>

        <UFormGroup
          name="limpeza"
          label="Como o Sr considera a limpeza do ambiente (instalações) onde foi realizada a Seleção?"
          required
        >
          <URadioGroup v-model="formData.limpeza" :options="avaliacaoOptions" />
        </UFormGroup>

        <UFormGroup
          name="fluxo"
          label="Como o Sr avalia o fluxo nos Postos de Seleção que passou hoje?"
          required
        >
          <URadioGroup v-model="formData.fluxo" :options="avaliacaoOptions" />
        </UFormGroup>

        <UFormGroup
          name="tratamento"
          label="Como o Sr avalia o tratamento dispensado durante os trabalhos da Comissão de Seleção?"
          required
        >
          <URadioGroup
            v-model="formData.tratamento"
            :options="avaliacaoOptions"
          />
        </UFormGroup>

        <UFormGroup
          name="comentarios"
          label="Envie-nos uma mensagem"
          help="Expresse a sua opinião sobre quaisquer aspectos julgados pertinentes acerca da Comissão de Seleção da Guarnição de Curitiba."
        >
          <UTextarea v-model="formData.comentarios" size="xlf" />
        </UFormGroup>

        <UButton block size="xl" type="submit" :loading="formSubmitLoading">
          Enviar
        </UButton>
      </UForm>
    </UCard>

    <UCard v-else>
      <template #header>
        <img
          alt="CSPFA Logo"
          src="/logo.png"
          class="mx-auto"
          style="width: 80px; height: 113px"
        />
        <h2 class="text-center font-bold my-2 text-4xl">Obrigado!</h2>
        <p class="text-lg text-center">
          Você contribuiu para a melhoria do atendimento desta Comissão.
        </p>
      </template>
      <UButton @click="resetaForm" block size="xl">
        Enviar outra avaliação
      </UButton>
    </UCard>
  </main>
</template>

<script setup>
import { z } from "zod";

definePageMeta({
  colorMode: "ligth",
});

const config = useRuntimeConfig();

const etapa1 = ref(true);
const enviado = ref(false);
const formSubmitLoading = ref(false);
const formData = reactive({
  status: "",
  voluntario: "",
  instalacoes: "",
  recepcao: "",
  saude: "",
  limpeza: "",
  fluxo: "",
  tratamento: "",
  comentarios: "",
});

const statusOptions = ref([
  { label: "Apto", key: "Apto" },
  { label: "Dispensado", key: "Dispensado" },
]);

const voluntarioOptions = ref([
  { label: "Sim", key: "Sim" },
  { label: "Não", key: "Não" },
]);

const avaliacaoOptions = ref([
  { label: "Excelente", key: "Excelente" },
  { label: "Bom", key: "Bom" },
  { label: "Ruim", key: "Ruim" },
]);

const formRules1 = z.object({
  status: z.string().min(1, { message: "Campo obrigatório" }),
  voluntario: z.string().min(1, { message: "Campo obrigatório" }),
});

const formRules2 = z.object({
  instalacoes: z.string().min(1, { message: "Campo obrigatório" }),
  recepcao: z.string().min(1, { message: "Campo obrigatório" }),
  saude: z.string().min(1, { message: "Campo obrigatório" }),
  limpeza: z.string().min(1, { message: "Campo obrigatório" }),
  fluxo: z.string().min(1, { message: "Campo obrigatório" }),
  tratamento: z.string().min(1, { message: "Campo obrigatório" }),
  comentarios: z.string(),
});

const resetaForm = () => {
  Object.keys(formData).forEach((key) => {
    formData[key] = "";
  });
  etapa1.value = true;
  enviado.value = false;
};

const handleSubmit = async () => {
  if (etapa1.value) {
    etapa1.value = false;
    return;
  }
  formSubmitLoading.value = true;
  try {
    await $fetch(config.public.scriptURL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });
    enviado.value = true;
  } catch (error) {
    console.error(error);
  } finally {
    formSubmitLoading.value = false;
  }
};
</script>

<style scoped>
body {
  background-color: #f5f7f9;
}

#emoticon {
  filter: grayscale(100%);
  transition: filter 0.5s;
}

#emoticon.active {
  filter: none;
  animation: identifier 1s forwards;
}

@keyframes identifier {
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
