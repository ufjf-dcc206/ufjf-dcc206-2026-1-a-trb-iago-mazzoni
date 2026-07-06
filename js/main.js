import './components/campoMinadoCelula.js';
import './components/campominadoTabuleiro.js';

const tabuleiro = document.querySelector('campominado-tabuleiro');
const btnBandeira = document.getElementById('btn-bandeira');

btnBandeira.addEventListener('click', () => {
  const ativo = tabuleiro.alternarModoBandeira();
  btnBandeira.classList.toggle('ativo', ativo);
  btnBandeira.textContent = ativo ? ' Modo Bandeira (X): ON' : ' Modo Bandeira (X): OFF';
});

tabuleiro.addEventListener('jogo-derrota', () => {
  setTimeout(() => alert('Você perdeu! Tente novamente.'), 100);
});

tabuleiro.addEventListener('jogo-vitoria', () => {
  setTimeout(() => alert('Você venceu! Parabéns!'), 100);
});

console.log('Campo Minado: projeto inicializado.');