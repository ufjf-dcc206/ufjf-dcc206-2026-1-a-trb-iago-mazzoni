import './components/campoMinadoCelula.js';
import { DIFICULDADES, criarTabuleiro, distribuirMinas } from './motor/logicaJogo.js';

// Teste 
const { linhas, colunas, minas } = DIFICULDADES.facil;
const tabuleiro = criarTabuleiro(linhas, colunas);
const comMinas = distribuirMinas(tabuleiro, minas);

console.log('Tabuleiro gerado:', comMinas);
console.log('Total de minas:', comMinas.flat().filter(c => c.temMina).length);