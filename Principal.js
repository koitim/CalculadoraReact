import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Principal extends React.Component {

  static navigationOptions = {
    title: 'Calculadora',
  };

  render() {
    return (
      <View style={styles.container}>
      <Text></Text>
        <Button 
          onPress={() => this.props.navigation.navigate('Simples')}
          title="Calculadora simples"/>
          <Text></Text>
        <Button 
          onPress={() => this.props.navigation.navigate('Cientifica')}
          title="Calculadora científica"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
  }
});
