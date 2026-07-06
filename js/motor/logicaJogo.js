
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


export function calcularVizinhas(tabuleiro) {
  const linhas = tabuleiro.length;
  const colunas = tabuleiro[0].length;


  const novo = tabuleiro.map(linha =>
    linha.map(celula => ({ ...celula }))// tal do spread operator que copia(espalha) todas as propriedades do objeto celula dentro do novo objeto
  );
 // não da para fazer const copia = [...tabuleiro]; porque as linhas dentro seriam as mesmas do original, então a alteração em um se propagaria para o outra tbm
 // nesse caso o map percorre cada linha e dentro de cada linha ele percorre cada celula fazendo um spread, ou seja copiando tudo. Isso garante que estou trabalhando em uma copia fiel e não a mesma linha na memoria


  const direcoes = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1],
  ];

  for (let l = 0; l < linhas; l++) {
    for (let c = 0; c < colunas; c++) {

      if (novo[l][c].temMina) continue;

      let count = 0;

      for (const [dl, dc] of direcoes) {//esse carinha aqui vai, para cada combinação de l c variada dentro do duplo for anterior, verificar cada posição do vetor direcoes
      // então a para é que [dl,dc] recebe então [-1,-1] que é a primeira posição do vetor direcoes e para cada instancia do for ele vai para a seguinte  
        const nl = l + dl; 
        const nc = c + dc; 


        const dentroDoLimite = nl >= 0 && nl < linhas && nc >= 0 && nc < colunas;

        if (dentroDoLimite && novo[nl][nc].temMina) {
          count++;
        }
      }

      novo[l][c].vizinhas = count;
    }
  }

  return novo;
}


export function abrirCelula(tabuleiro, linha, coluna) {

  const novo = tabuleiro.map(l => l.map(c => ({ ...c })));

  const celula = novo[linha][coluna];


  if (celula.aberta || celula.bandeira) return novo;

  celula.aberta = true;

  return novo;
}


export function alternarBandeira(tabuleiro, linha, coluna) {
  const novo = tabuleiro.map(l => l.map(c => ({ ...c })));

  const celula = novo[linha][coluna];

  if (celula.aberta) return novo;

  celula.bandeira = !celula.bandeira;

  return novo;
}

export function verificarDerrota(tabuleiro, linha, coluna) {
  return tabuleiro[linha][coluna].temMina;
}

export function verificarVitoria(tabuleiro) {

  const todasCelulas = tabuleiro.flat();

  const celulasSemMina = todasCelulas.filter(celula => !celula.temMina);

  const todasAbertas = celulasSemMina.every(celula => celula.aberta);

  return todasAbertas;
}


