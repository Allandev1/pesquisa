<template>
  <main class="container max-w-2xl p-3">
    <UCard v-if="etapa1">
      <template #header>
        <img
          alt="CSPFA Logo"
          src="/logo.png"
          class="mx-auto"
          style="width: 87px; height: 113px"
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
          label="Instalações da Comissão de Seleção:"
          required
        >
          <URadioGroup
            class="hidden"
            v-model="formData.instalacoes"
            :options="avaliacaoOptions"
          />
          <EmoticonSection
            :formCondition="formData.instalacoes"
            @update:formCondition="formData.instalacoes = $event"
          />
        </UFormGroup>

        <UFormGroup name="recepcao" label="Trabalho da Recepção:" required>
          <URadioGroup
            class="hidden"
            v-model="formData.recepcao"
            :options="avaliacaoOptions"
          />
          <EmoticonSection
            :formCondition="formData.recepcao"
            @update:formCondition="formData.recepcao = $event"
          />
        </UFormGroup>

        <UFormGroup
          name="saude"
          label="Trabalho da Inspeção de Saúde:"
          required
        >
          <URadioGroup
            class="hidden"
            v-model="formData.saude"
            :options="avaliacaoOptions"
          />
          <EmoticonSection
            :formCondition="formData.saude"
            @update:formCondition="formData.saude = $event"
          />
        </UFormGroup>

        <UFormGroup
          name="limpeza"
          label="Limpeza do ambiente (instalações) onde foi realizada a Seleção:"
          required
        >
          <URadioGroup
            class="hidden"
            v-model="formData.limpeza"
            :options="avaliacaoOptions"
          />
          <EmoticonSection
            :formCondition="formData.limpeza"
            @update:formCondition="formData.limpeza = $event"
          />
        </UFormGroup>

        <UFormGroup
          name="fluxo"
          label="Fluxo nos Postos de Seleção que passou hoje:"
          required
        >
          <URadioGroup
            class="hidden"
            v-model="formData.fluxo"
            :options="avaliacaoOptions"
          />
          <EmoticonSection
            :formCondition="formData.fluxo"
            @update:formCondition="formData.fluxo = $event"
          />
        </UFormGroup>

        <UFormGroup
          name="tratamento"
          label="Tratamento dispensado durante os trabalhos da Comissão de Seleção:"
          required
        >
          <URadioGroup
            class="hidden"
            v-model="formData.tratamento"
            :options="avaliacaoOptions"
          />
          <EmoticonSection
            :formCondition="formData.tratamento"
            @update:formCondition="formData.tratamento = $event"
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

// definePageMeta({
//   colorMode: "ligth",
// });

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
</style>
