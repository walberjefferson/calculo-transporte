const notasFake = [
    {nome: 'Piliu', valor: 5000},
    {nome: 'Gustavo', valor: 5000},
    {nome: 'Mayra', valor: 3000},
    {nome: 'Preta', valor: 2000},
];

export const generateID = () => {
    return Math.random().toString(36).slice(2)
};

export const getNotas = () => new Promise((resolve) => {
    let n = notasFake.map((nota) => {
        nota.id = generateID();
        return nota;
    })
    resolve(n);
})