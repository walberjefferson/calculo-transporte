import {defineStore} from "pinia";

export const useServiceStore = defineStore('service_store',{
    state: () => ({
        valor_transporte: 950,
        editingRows: [],
        notas: [],
    }),
    actions: {
        generateID() {
            return Math.random().toString(36).slice(2)
        },
        addNota() {
            this.notas.push({id: this.generateID(), nome: null, valor: null})
        },
        removeNota(index) {
            this.notas.splice(index, 1);
        },
        onRowEditSave(event) {
            let { newData, index } = event;
            this.notas[index] = newData;
        },
        porcentagem(index) {
            let nota = this.notas[index];
            return ((nota.valor / this.total) * 100).toFixed(2) + '%';
        },
        valorPagar(index) {
            if(this.valor_transporte){
                let nota = this.notas[index];
                return  this.valor_transporte * (nota.valor / this.total);
            }

        },
        formatCurrency(value) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
        }
    },
    getters: {
        total: (state) => state.notas.reduce((total, o) => total += o.valor, 0),
    }
})