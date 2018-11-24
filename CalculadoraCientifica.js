import React from 'react';
import {StyleSheet, View} from 'react-native';
import { SOMA, SUBTRAI, DIVIDE, MULTIPLICA_EXIBE, MULTIPLICA_OPERADOR,
         SEN, COS, TAN, RAIZ, FATORIAL} from './Operador'
import {ZERO, UM, DOIS, TRES, QUATRO, CINCO, SEIS, SETE, OITO, NOVE, VIRGULA} from './Operando'
import {Botao, ResultadoTela} from './Calculadora'

export default class CalculadoraCientifica extends React.Component {
  
  static navigationOptions = {
    title: 'Calculadora científica',
  };

  constructor() {
    super();
    this.dadosIniciais = {
      resultadoTela: ZERO,
      operador: null,
      operando1: STRING_VAZIA,
      operando2: STRING_VAZIA,
      estaNoSegundoOperando: false
    };
    this.state = this.dadosIniciais;
  }

  adicionaOperando(numero) {
    const {resultadoTela, operador, operando1, operando2, estaNoSegundoOperando} = this.state;
    if (operador !== FATORIAL) {
      this.setState({
        resultadoTela: (resultadoTela === ZERO) ? numero : resultadoTela + numero
      });
      if (!estaNoSegundoOperando) {
        this.setState({
          operando1: operando1 + numero
        })
      } else {
        this.setState({
          operando2: operando2 + numero
        })
      }
    }
  }

  adicionaVirgula() {
    const {resultadoTela, operador, operando1, operando2, estaNoSegundoOperando} = this.state;
    if (operador !== FATORIAL) {
      let virgula = resultadoTela.toString().slice(-1);
      this.setState({
        resultadoTela: virgula !== VIRGULA ? resultadoTela + VIRGULA : resultadoTela
      });
      if (!estaNoSegundoOperando) {
        this.setState({
          operando1: operando1 + VIRGULA
        })
      } else {
        this.setState({
          operando2: operando2 + VIRGULA
        })
      };
    }
  }

  adicionaOperador(operadorTeclado) {
    const {resultadoTela, operador, operando1, operando2} = this.state;
    switch (operadorTeclado) {
      case SEN:
      case COS:
      case TAN:
      case RAIZ:
        if (operando1 == STRING_VAZIA) {
          this.setState({
            operador: operadorTeclado,
            resultadoTela: operadorTeclado + '('
          });
        }
        break;
      case FATORIAL:
        if (operando2 == STRING_VAZIA && operando1 != STRING_VAZIA) {
          this.setState({
            operador: operadorTeclado,
            resultadoTela: (operador !== null ? resultadoTela.substr(0, resultadoTela.length - 1) : resultadoTela) + operadorTeclado
          });
        }
        break;
    
      default:
        if (operando1 != STRING_VAZIA) {
          let tamanhoOperador;
          switch (operador) {
            case SEN:
            case COS:
            case TAN:
              tamanhoOperador = 4
              break;
            case RAIZ:
              tamanhoOperador = 5
              break;          
            default:
              tamanhoOperador = 1
              break;
          }
          this.setState({
            estaNoSegundoOperando: true,
            operador: operadorTeclado,
            resultadoTela: (operador === null ? resultadoTela : resultadoTela.substr(0, resultadoTela.length - tamanhoOperador)) + operadorTeclado
          });
        }
        break;
    }
  }

  resultadoExpressao() {
    const {operador, operando1, operando2} = this.state;
    let resultado;
    switch (operador) {
      case SEN:
        resultado = Math.sin(operando1);
        break;
      case COS:
        resultado = Math.cos(operando1);
        break;
      case TAN:
        resultado = Math.tan(operando1);
        break;
      case RAIZ:
        resultado = Math.sqrt(operando1);
        break;
      case FATORIAL:
        resultado = 1;
        for (let i = 1 ; i <= operando1 ; i++) {
          resultado *= i;
        }
        break;
    
      default:
        resultado = eval(operando1 + operador + operando2);
        break;
    }
    this.setState({
      resultadoTela: resultado % 1 === 0 ? resultado : resultado.toFixed(2),
      operando1: resultado % 1 === 0 ? resultado : resultado.toFixed(2),
      operando2: STRING_VAZIA,
      estaNoSegundoOperando: false,
      operador: null
    });
  }

  limpar() {
    this.setState(this.dadosIniciais);
  }

  apagar() {
    const {resultadoTela, operador} = this.state;
    let string = resultadoTela.toString();
    let ultimoCaractere = resultadoTela.toString().slice(-1);
    let tamanhoApagar;
    if (ultimoCaractere == '(') {
      if (operador == RAIZ) {
        tamanhoApagar = 5;
      } else {
        tamanhoApagar = 4;
      }
    } else {
      tamanhoApagar = 1;
    }
    let stringDeletada = string.substr(0, string.length - tamanhoApagar);
    this.setState({
      resultadoTela: stringDeletada.length == 0 ? ZERO : stringDeletada,
      operando1: stringDeletada.length == 0 ? STRING_VAZIA : stringDeletada
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ResultadoTela resultadoTela={this.state.resultadoTela} />
        <View style={styles.teclado}>
          <View style={styles.linha}>
            <Botao valor={SETE} funcao={this.adicionaOperando.bind(this, SETE)} />
            <Botao valor={OITO} funcao={this.adicionaOperando.bind(this, OITO)} />
            <Botao valor={NOVE} funcao={this.adicionaOperando.bind(this, NOVE)} />
            <Botao valor={DIVIDE} funcao={this.adicionaOperador.bind(this, DIVIDE)} />
          </View>
          <View style={styles.linha}>
            <Botao valor={QUATRO} funcao={this.adicionaOperando.bind(this, QUATRO)} />
            <Botao valor={CINCO} funcao={this.adicionaOperando.bind(this, CINCO)} />
            <Botao valor={SEIS} funcao={this.adicionaOperando.bind(this, SEIS)} />
            <Botao valor={MULTIPLICA_EXIBE} funcao={this.adicionaOperador.bind(this, MULTIPLICA_OPERADOR)} />
          </View>
          <View style={styles.linha}>
            <Botao valor={UM} funcao={this.adicionaOperando.bind(this, UM)} />
            <Botao valor={DOIS} funcao={this.adicionaOperando.bind(this, DOIS)} />
            <Botao valor={TRES} funcao={this.adicionaOperando.bind(this, TRES)} />
            <Botao valor={SUBTRAI} funcao={this.adicionaOperador.bind(this, SUBTRAI)} />
          </View>
          <View style={styles.linha}>
            <Botao valor={RESULTADO} funcao={this.resultadoExpressao.bind(this)} />
            <Botao valor={ZERO} funcao={this.adicionaOperando.bind(this, ZERO)} />
            <Botao valor={VIRGULA} funcao={this.adicionaVirgula.bind(this)} />
            <Botao valor={SOMA} funcao={this.adicionaOperador.bind(this, SOMA)} />
          </View>
          <View style={styles.linha}>
            <Botao valor={SEN} funcao={this.adicionaOperador.bind(this, SEN)} />
            <Botao valor={COS} funcao={this.adicionaOperador.bind(this, COS)} />
            <Botao valor={TAN} funcao={this.adicionaOperador.bind(this, TAN)} />
            <Botao valor={RAIZ} funcao={this.adicionaOperador.bind(this, RAIZ)} />
            <Botao valor={FATORIAL} funcao={this.adicionaOperador.bind(this, FATORIAL)} />
          </View>
          <View style={styles.linha}>
            <Botao valor={LIMPAR} funcao={this.limpar.bind(this)} />
            <Botao valor={APAGAR} funcao={this.apagar.bind(this)} />
          </View>
        </View>
      </View>
    );
  }
}

const RESULTADO    = '=';
const LIMPAR       = 'Limpar';
const APAGAR       = 'Apagar';
const STRING_VAZIA = '';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  teclado: {
    flex: 8,
  },
  linha: {
    flex: 1,
    flexDirection: 'row'
  }
});
