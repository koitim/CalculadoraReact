import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SOMA, SUBTRAI, DIVIDE, MULTIPLICA_EXIBE, MULTIPLICA_OPERADOR} from './Operador'
import {Botao, ResultadoTela} from './Calculadora'
import Expressao from './Expressao';

export default class CalculadoraSimples extends React.Component {
  
  static navigationOptions = {
    title: 'Calculadora simples',
  };

  constructor() {
    super();
    this.dadosIniciais = {
      resultadoTela: Expressao.operando.ZERO,
      operador: null,
      operando1: STRING_VAZIA,
      operando2: STRING_VAZIA,
      estaNoSegundoOperando: false
    };
    this.state = this.dadosIniciais;
  }

  adicionaOperando(numero) {
    const {resultadoTela, operando1, operando2, estaNoSegundoOperando} = this.state;
    this.setState(Expressao.adicionaOperando(resultadoTela, operando1, operando2, estaNoSegundoOperando, numero));
  }

  adicionaVirgula() {
    const {resultadoTela, operando1, operando2, estaNoSegundoOperando} = this.state;
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

  adicionaOperador(operadorTeclado) {
    const {resultadoTela, operador} = this.state;
    this.setState({
      estaNoSegundoOperando: true,
      operador: operadorTeclado,
      resultadoTela: (operador !== null ? resultadoTela.substr(0, resultadoTela.length - 1) : resultadoTela) + operadorTeclado
    });
  }

  resultadoExpressao() {
    const {operador, operando1, operando2} = this.state;
    let resultado = eval(operando1 + operador + operando2);
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
    const {resultadoTela} = this.state;
    let string = resultadoTela.toString();
    let stringDeletada = string.substr(0, string.length - 1);
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
  },
  botao: {
    flex: 1,
    margin: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoBotoes: {
      color: 'white',
      fontSize: 26
  }
});
