import './components/campoMinadoCelula.js';
import './components/campominadoTabuleiro.js';

const tabuleiro = document.querySelector('campominado-tabuleiro');
const btnBandeira = document.getElementById('btn-bandeira');

btnBandeira.addEventListener('click', () => {
  const ativo = tabuleiro.alternarModoBandeira();
  btnBandeira.classList.toggle('ativo', ativo);
  btnBandeira.textContent = ativo ? '🚩 Modo Bandeira: ON' : '🚩 Modo Bandeira: OFF';
});

console.log('Campo Minado: projeto inicializado.');