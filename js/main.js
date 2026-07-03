import './components/campoMinadoCelula.js';
import { DIFICULDADES, criarTabuleiro, distribuirMinas, calcularVizinhas } from './motor/logicaJogo.js';

const { linhas, colunas, minas } = DIFICULDADES.facil;
const tabuleiro = criarTabuleiro(linhas, colunas);
const comMinas = distribuirMinas(tabuleiro, minas);
const comVizinhas = calcularVizinhas(comMinas);

console.log('Tabuleiro final:', comVizinhas);

// Mostra uma versão simplificada no console pra visualizar melhor:
// '💣' onde tem mina, o número de vizinhas onde não tem
const visual = comVizinhas.map(linha =>
  linha.map(c => c.temMina ? '💣' : c.vizinhas || ' ').join(' ')
).join('\n');

console.log('Mapa:\n' + visual);