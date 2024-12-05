<script setup>
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';


import {useServiceStore} from "./store/useServiceStore.js";
import {storeToRefs} from "pinia";
import Tabela from "./components/Tabela.vue";


const serviceStore = useServiceStore();
const {total, valor_transporte} = storeToRefs(serviceStore);

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-800 py-4 px-12">
      <div class="md:flex md:items-center md:justify-center">
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl/7 font-bold text-gray-100 sm:truncate sm:text-3xl sm:tracking-tight text-center">
            Calculo de Transporte
          </h2>
        </div>
      </div>
    </header>

    <div class="flex-auto container mx-auto">

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

        <Tabela />

      </div>
    </div>


    <footer class="bg-gray-800 py-4 px-12">
      <div class="md:flex md:items-center md:justify-center">
        <div class="min-w-0 flex-1">
          <p class="text-base/7 font-semibold text-gray-100 sm:tracking-tight text-center">
            <span class="font-light">Total Geral:</span> {{serviceStore.formatCurrency(total)}}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>


