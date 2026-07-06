import { DIFICULDADES, criarTabuleiro, distribuirMinas, calcularVizinhas, abrirCelula, alternarBandeira, verificarDerrota, verificarVitoria } from '../motor/logicaJogo.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { 
      display: block; 
    }

    #grade {
      display: grid;
      grid-template-columns: repeat(var(--colunas), var(--tamanho-celula, 36px)); /*basicamente repete --colunas vezes o tamanho. Esse --colunas é definido la em baixo*/
      gap: 2px;
    }
  </style>

  <div id="grade"></div>
`;

export class CampominadoTabuleiro extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._grade = this.shadowRoot.querySelector('#grade');// isso aqui guarda referencia ao div id="grade", para n ter que fazer querrySlector toda vez que for mexer nele
    this._tabuleiro = []; // estado atual do jogo (matriz de células)
    this._modoBandeira = false; 
    this._jogoAtivo =  true;
  }

  connectedCallback() {
    const dificuldade = this.getAttribute('dificuldade') || 'facil'; // ta lendo a dificuldade do html, se n tiver nada ele vai de facil
    this.iniciarJogo(dificuldade);
  }

  iniciarJogo(dificuldade) {
    const config = DIFICULDADES[dificuldade];
    if (!config) return;// por enquanto isso serve para caso seja passado uma dificuldade que não existe nada quebra, só n faz nada

    const base = criarTabuleiro(config.linhas, config.colunas);
    const comMinas = distribuirMinas(base, config.minas);
    this._tabuleiro = calcularVizinhas(comMinas);
    this._jogoAtivo = true;

    this.style.setProperty('--colunas', config.colunas);// esse trem aqui define o tamanho que varia de acordo com a dificuldade
    // é como se declarasse a variavel --colunas com valor de config.colunas para ser usado no css do template

    this._renderizar();
  }

  _renderizar() {

    this._grade.innerHTML = ''; // vai ser importante limpar quando for criar o botao de reiniciar

    this._tabuleiro.forEach((linha, l) => {
      linha.forEach((celula, c) => {
        const el = document.createElement('campominado-celula');

        el.setAttribute('data-linha', l); // esse "data-agumaCoisa" é um padrão do html para salvar algum atributo extra
        el.setAttribute('data-coluna', c);

        this._grade.appendChild(el);
      });
    });


    this._grade.addEventListener('click-celula', (e) => {//isso aqui volta naquele customEvent que criamos na celula. Aqueles trem de bubbles e composed
      if(!this._jogoAtivo) return;
      
      const linha = parseInt(e.target.getAttribute('data-linha'));
      const coluna = parseInt(e.target.getAttribute('data-coluna'));//target no caso referencia a celula especifica que foi clicada


      if (this._modoBandeira) {
        this._tabuleiro = alternarBandeira(this._tabuleiro, linha, coluna);
        this._atualizarCelula(e.target, this._tabuleiro[linha][coluna]);
        return;
      }
    
      this._tabuleiro = abrirCelula(this._tabuleiro, linha, coluna);
      this._atualizarCelula(e.target, this._tabuleiro[linha][coluna]);
    
      if (verificarDerrota(this._tabuleiro, linha, coluna)) {
        this._jogoAtivo = false;
        this._revelarMinas();
        this._dispararEvento('jogo-derrota');
        return;
      }
    
      if (verificarVitoria(this._tabuleiro)) {
        this._jogoAtivo = false;
        this._dispararEvento('jogo-vitoria');
      }
    });
  }

  _atualizarCelula(elemento, celula) {
    if (celula.bandeira) {
      elemento.setAttribute('bandeira', '');
      return;
    }

    elemento.removeAttribute('bandeira');

    if (celula.aberta) {
      elemento.setAttribute('aberta', '');
      if (celula.vizinhas > 0) {
        elemento.setAttribute('valor', celula.vizinhas);
      }
    }
  }

  alternarModoBandeira() {
    this._modoBandeira = !this._modoBandeira;
    return this._modoBandeira;
  }

  _revelarMinas() {
    this._tabuleiro.forEach((linha, l) => {
      linha.forEach((celula, c) => {
        if (celula.temMina) {
          const seletor = `[data-linha="${l}"][data-coluna="${c}"]`;
          const elemento = this._grade.querySelector(seletor);
          if (elemento) elemento.setAttribute('mina', '');
        }
      });
    });
  }

  _dispararEvento(nome) {
    this.dispatchEvent(new CustomEvent(nome, {
      bubbles: true,
      composed: true,
    }));
  }

}



customElements.define('campominado-tabuleiro', CampominadoTabuleiro);