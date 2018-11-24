

export function adicionaOperando(resultadoTela, operando1, operando2, estaNoSegundoOperando, numero) {
  if (!estaNoSegundoOperando) {
    return {
      operando1: operando1 + numero,
      resultadoTela: (resultadoTela === ZERO) ? numero : resultadoTela + numero
    }
  } else {
    return {
      operando2: operando2 + numero,
      resultadoTela: (resultadoTela === ZERO) ? numero : resultadoTela + numero
    }
  }
}

export const operando = {
  ZERO: '0',
  UM: '1',
  DOIS: '2',
  TRES: '3',
  QUATRO: '4',
  CINCO: '5',
  SEIS: '6',
  SETE: '7',
  OITO: '8',
  NOVE: '9',
  VIRGULA: ','
}