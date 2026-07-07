import './components/campoMinadoCelula.js';
import './components/campominadoTabuleiro.js';
import './components/campMinadoBarraFerramentas.js';

const tabuleiro = document.querySelector('campominado-tabuleiro');
const barraFerramentas = document.querySelector('campominado-barra');

barraFerramentas.addEventListener('barra-bandeira', (e) => {
  tabuleiro.alternarModoBandeira();
});

barraFerramentas.addEventListener('barra-reiniciar', (e) => {
  const dificuldade = e.detail?.dificuldade || 'facil';//?. Antes de acessar a propriedade, ele verifica se o lado esquerdo existe. 
  //Se for null ou undefined, para ali e retorna undefined em vez de lançar erro
  tabuleiro.reiniciar(dificuldade);
  barraFerramentas.atualizarContador(tabuleiro.totalMinas, tabuleiro.bandeirasMarcadas);
});

tabuleiro.addEventListener('tabuleiro-atualizado', () => {
  barraFerramentas.atualizarContador(tabuleiro.totalMinas, tabuleiro.bandeirasMarcadas);
});

tabuleiro.addEventListener('jogo-derrota', () => {
  setTimeout(() => alert('Você perdeu! Tente novamente.'), 100);
});

tabuleiro.addEventListener('jogo-vitoria', () => {
  setTimeout(() => alert('Você venceu! Parabéns!'), 100);
});

setTimeout(() => {
  barraFerramentas.atualizarContador(tabuleiro.totalMinas, tabuleiro.bandeirasMarcadas);
}, 0);

console.log('Campo Minado: projeto inicializado.');