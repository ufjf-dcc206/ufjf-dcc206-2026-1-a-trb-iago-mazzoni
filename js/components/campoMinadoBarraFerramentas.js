const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      margin-bottom: 12px;
    }

    .barra {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    button {
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      background: transparent;
      color: var(--cor-texto, #eef1f5);
    }

    #btn-bandeira {
      border: 2px solid var(--cor-bandeira, #f5a623);
    }

    #btn-bandeira.ativo {
      background: var(--cor-bandeira, #f5a623);
      color: #000;
    }

    #btn-reiniciar {
      border: 2px solid var(--cor-texto, #eef1f5);
    }

    #contador {
      font-size: 1.2rem;
      font-weight: bold;
      min-width: 60px;
      text-align: center;
    }

    #seletor-dificuldade {
      padding: 8px 12px;
      border-radius: 6px;
      border: 2px solid var(--cor-texto, #eef1f5);
      background: var(--cor-painel, #2b3442);
      color: var(--cor-texto, #eef1f5);
      font-size: 1rem;
      cursor: pointer;
  </style>

  <div class="barra">
    <select id="seletor-dificuldade">
      <option value="facil">Fácil (9x9)</option>
      <option value="medio">Médio (16x16)</option>
      <option value="dificil">Difícil (16x30)</option>
    </select>
    <span id="contador">Bombas 0</span>
    <button id="btn-bandeira" type="button">X Bandeira</button>
    <button id="btn-reiniciar" type="button">Reiniciar</button>
  </div>
`;

export class campMinadoBarraFerramentas extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._contador = this.shadowRoot.querySelector('#contador');
    this._btnBandeira = this.shadowRoot.querySelector('#btn-bandeira');
    this._btnReiniciar = this.shadowRoot.querySelector('#btn-reiniciar');
    this._seletorDificuldade = this.shadowRoot.querySelector('#seletor-dificuldade');
  }

  connectedCallback() {
    this._btnBandeira.addEventListener('click', () => {
      const ativo = this._btnBandeira.classList.toggle('ativo');
      this.dispatchEvent(new CustomEvent('barra-bandeira', {
        bubbles: true,
        composed: true,
        detail: { ativo },  // passa o estado atual junto com o evento
      }));
    });

    this._btnReiniciar.addEventListener('click', () => {
        this._btnBandeira.classList.remove('ativo');
        this.dispatchEvent(new CustomEvent('barra-reiniciar', {
          bubbles: true,
          composed: true,
          detail: { dificuldade: this._seletorDificuldade.value }, 
        }));
    });

    this._seletorDificuldade.addEventListener('change', () => {
        this._btnBandeira.classList.remove('ativo');
        this.dispatchEvent(new CustomEvent('barra-reiniciar', {
            bubbles: true,
            composed: true,
            detail: { dificuldade: this._seletorDificuldade.value },
        }));
    });
  }

  get dificuldade() {
    return this._seletorDificuldade.value;
  }
  
  atualizarContador(minasTotais, bandeirasMarcadas) {
    const restantes = minasTotais - bandeirasMarcadas;
    this._contador.textContent = `Bombas ${restantes}`;
  }
}

customElements.define('campominado-barra', campMinadoBarraFerramentas);