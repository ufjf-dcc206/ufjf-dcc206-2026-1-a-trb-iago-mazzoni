
export const DIFICULDADES = {
    facil:  { linhas: 9,  colunas: 9,  minas: 10 },
    medio:  { linhas: 16, colunas: 16, minas: 40 },
    dificil:{ linhas: 16, colunas: 30, minas: 99 },
  };
  

  function criarCelula() {
    return {
      temMina: false,   
      vizinhas: 0,      
      aberta: false,    
      bandeira: false,  
    };
  }
  

  export function criarTabuleiro(linhas, colunas) {
    return Array.from({ length: linhas }, () =>
      Array.from({ length: colunas }, () => criarCelula())
    );
  }
  

  export function distribuirMinas(tabuleiro, totalMinas) {
    const linhas = tabuleiro.length;
    const colunas = tabuleiro[0].length;
  

    const novo = tabuleiro.map(linha =>
      linha.map(celula => ({ ...celula }))
    );
  
    let minasColocadas = 0;
  
    while (minasColocadas < totalMinas) {
      const l = Math.floor(Math.random() * linhas);
      const c = Math.floor(Math.random() * colunas);
  

      if (!novo[l][c].temMina) {
        novo[l][c].temMina = true;
        minasColocadas++;
      }
    }
  
    return novo;
  }