import React from 'react';
import {
  StyleSheet,
  Text,
  View, 
  TouchableOpacity
} from 'react-native';

export class ResultadoTela extends React.Component {
    render() {
        const {resultadoTela} = this.props;
        return (
            <View style={styles.resultadoContainer}>
                <Text style={styles.resultadoTexto}>{resultadoTela}</Text>
            </View>
        );
    }
}

export class Botao extends React.Component {
    render() {
        const {valor, funcao} = this.props;
        return (
            <TouchableOpacity style={styles.botao} onPress={() => funcao()}>
                <Text style={styles.textoBotao}>{valor}</Text>
            </TouchableOpacity>
        );
    }
}
  
const styles = StyleSheet.create({
    botao: {
        flex: 1,
        margin: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoBotao: {
        color: 'white',
        fontSize: 26
    },
    resultadoContainer: {
        flex: 2,
        justifyContent: 'center'
    },
    resultadoTexto: {
        fontSize: 50,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'right'
    }
});

