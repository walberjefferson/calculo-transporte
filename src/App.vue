<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {getNotas} from './services/notas.js'

import {useServiceStore} from "./store/useServiceStore.js";
import {storeToRefs} from "pinia";
import {onBeforeMount} from "vue";

const serviceStore = useServiceStore();
const {notas, valor_transporte, editingRows} = storeToRefs(serviceStore);

onBeforeMount(async () => {
  await getNotas().then((notas) => serviceStore.notas = notas)
})
</script>

<template>
  <div class="bg-gray-800 py-4 px-12">
    <div class="md:flex md:items-center md:justify-center">
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl/7 font-bold text-gray-100 sm:truncate sm:text-3xl sm:tracking-tight text-center">
          Calculo de Transporte
        </h2>
      </div>
    </div>
  </div>

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 mt-4">
      <div class="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div class="ml-4 mt-4">
          <h3 class="text-base font-semibold text-gray-900">Lista de Notas</h3>
          <p class="mt-1 text-sm text-gray-500">Notas referentes a valores total das compras para saber o valor do
            frete.</p>
        </div>
        <div class="ml-4 mt-4 shrink-0">
          <Button @click.prevent="serviceStore.addNota()" label="Adicionar" icon="pi pi-plus" severity="contrast"/>
        </div>
      </div>
    </div>

    <div class="border border-gray-200 rounded mt-8">

      <div class="flex items-center justify-end p-2">
        <div class="space-y-8 sm:pb-0">
          <div class="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
            <label for="frete" class="block text-base/6 font-medium text-gray-500">Valor do Frete</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <InputNumber v-model="valor_transporte" mode="currency" currency="BRL" locale="pt-BR" fluid/>
            </div>
          </div>
        </div>
      </div>


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
        <Column :rowEditor="true" bodyStyle="text-align:center;width: 9%; min-width: 2rem"/>
        <Column bodyStyle="text-align:center;width: 1%; min-width: 2rem;">
          <template #body="{index}">
            <Button @click.prevent="serviceStore.removeNota(index)" icon="pi pi-trash" variant="text" severity="danger" rounded aria-label="Remover" />
          </template>
        </Column>

      </DataTable>
      </template>
      <template v-else>
        <div class="flex items-center justify-center p-8 bg-gray-100">
          <span class="text-lg font-semibold text-gray-500">Sem informações.</span>
        </div>

      </template>
    </div>
  </div>
</template>


