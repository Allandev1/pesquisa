<template>
  <main class="container max-w-2xl my-8">
    <!-- <img
    alt="CSPFA Logo"
    src="/logo.png"
    class="mx-auto mt-8"
    style="width: 80px; height: 113px"
  /> -->
    <UCard v-if="etapa1">
      <template #header>
        <h2 class="text-center mb-4 text-2xl font-bold">Pesquisa de opinião</h2>
        <p class="text-lg font-light">
          Tem a finalidade de aperfeiçoar os trabalhos da Comissão de Seleção e
          permitir o acompanhamento por parte do Comando da 5ª Região Militar.
          Solicito a colaboração para responder a pesquisa de satisfação a
          respeito das instalações, recepção e desenvolvimento dos trabalhos
          desta Comissão. Esta pesquisa terá
          <span class="font-bold">caráter anônimo</span>.
        </p>
      </template>

      <UForm
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
          <URadioGroup
            v-model="formData.status"
            :options="statusOptions"
            :uiRadio="{ base: 'text-4xl' }"
          />
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

        <UButton block size="xl" type="submit">Próximo</UButton>
      </UForm>
    </UCard>

    <UCard v-else-if="!enviado">
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
          label="Expresse a sua opinião sobre quaisquer aspectos julgados pertinentes acerca da Comissão de Seleção da Guarnição de Curitiba."
        >
          <UTextarea v-model="formData.comentarios" />
        </UFormGroup>

        <UButton block size="xl" type="submit" :loading="formSubmitLoading"
          >Enviar</UButton
        >
      </UForm>
      <template #footer>
        <UButton @click="etapa1 = true">Voltar</UButton>
      </template>
    </UCard>

    <UCard v-else>
      <template #header>
        <img
          alt="CSPFA Logo"
          src="/logo.png"
          class="mx-auto"
          style="width: 80px; height: 113px"
        />
      </template>
      <h2 class="text-center mb-4 text-4xl">Obrigado!</h2>
      <p class="text-base">
        Você contribuiu para a melhoria do atendimento desta Comissão.
      </p>
      <template #footer>
        <!-- colocar copyright -->
        <p class="text-center text-sm">
          &copy; 2021 Comissão de Seleção da Guarnição de Curitiba
        </p>
      </template>
    </UCard>
  </main>
</template>

<script setup>
import { z } from "zod";

const etapa1 = ref(true);
const enviado = ref(false);
const formSubmitLoading = ref(false);
const url =
  "https://script.google.com/macros/s/AKfycbypNjqO8fhIRgmIp9f0rQJ7DvzON4DHSk71PDTHvUT5qLHIM2uklehxEdRZf_8li9wa/exec";

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

const handleSubmit = async () => {
  if (etapa1.value) {
    etapa1.value = false;
    return;
  }
  formSubmitLoading.value = true;
  try {
    await $fetch(url, {
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
header {
  background: #3498db;
}
</style>
