import './components/campoMinadoCelula.js';
import './components/campominadoTabuleiro.js';
import './components/campMinadoBarraFerramentas.js';

const tabuleiro = document.querySelector('campominado-tabuleiro');
const barraFerramentas = document.querySelector('campominado-barra');

barraFerramentas.addEventListener('barra-bandeira', (e) => {
  tabuleiro.alternarModoBandeira();
});

barraFerramentas.addEventListener('barra-reiniciar', () => {
  tabuleiro.reiniciar();
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