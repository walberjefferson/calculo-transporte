<script setup>
import Column from "primevue/column";
import InputNumber from "primevue/inputnumber";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

import {getNotas} from '../services/notas.js'

import {useServiceStore} from "../store/useServiceStore.js";
import {storeToRefs} from "pinia";
import {onBeforeMount} from "vue";

const serviceStore = useServiceStore();
const {notas, total, valor_transporte, editingRows} = storeToRefs(serviceStore);

onBeforeMount(async () => {
  await getNotas().then((notas) => serviceStore.notas = notas)
})
</script>

<template>
  <template v-if="notas.length">
    <DataTable v-model:editingRows="editingRows" :value="notas" editMode="row" dataKey="id"
               @row-edit-save="serviceStore.onRowEditSave"
               :pt="{
            table: { style: 'min-width: 50rem' },
            column: {
                bodycell: ({ state }) => ({
                    style:  state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem'
                })
            }
        }"
    >
      <template #empty>
        <h3>Nenhum dado</h3>
      </template>
      <Column field="nome" header="Nome" style="width: 20%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" fluid/>
        </template>
      </Column>
      <Column field="valor" header="Valor" style="width: 20%">
        <template #body="{ data, field }">
          {{ serviceStore.formatCurrency(data[field]) }}
        </template>
        <template #editor="{ data, field }">
          <InputNumber v-model="data[field]" mode="currency" currency="BRL" locale="pt-BR" fluid/>
        </template>
      </Column>
      <Column header="%" style="width: 20%">
        <template #body="{ data, index }">
          {{ serviceStore.porcentagem(index) }}
        </template>
      </Column>
      <Column header="Valor a Pagar" style="width: 20%">
        <template #body="{ data, index }">
          {{ serviceStore.formatCurrency(serviceStore.valorPagar(index)) }}
        </template>
      </Column>
      <Column :rowEditor="true" bodyStyle="text-align:center;width: 7%; min-width: 0.1rem"/>
      <Column bodyStyle="text-align:center;width: 1%; min-width: 0.1rem;">
        <template #body="{index}">
          <Button @click.prevent="serviceStore.removeNota(index)" icon="pi pi-trash" variant="text"
                  severity="danger" rounded aria-label="Remover"/>
        </template>
      </Column>

    </DataTable>
  </template>
  <template v-else>
    <div class="flex items-center justify-center p-8 bg-gray-100">
      <span class="text-lg font-semibold text-gray-500">Sem informações.</span>
    </div>
  </template>
</template>

<style scoped>

</style>