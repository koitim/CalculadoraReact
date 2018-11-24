import React from 'react';
import { StyleSheet} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation"
import Principal from './Principal';
import CalculadoraSimples from './CalculadoraSimples';
import CalculadoraCientifica from './CalculadoraCientifica';
export default class App extends React.Component {

  render() {
    return (
     <AppContainer/>
    );
  }

}

const AppNavigator = createStackNavigator({
  Inicio: Principal,
  Simples: CalculadoraSimples,
  Cientifica: CalculadoraCientifica
}, {
  initialRouteName: "Inicio"
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 50
  },
  son30: { 
    flex: 30,
    flexDirection: "column"
  }, 
  son70: {
    flex: 70,
    flexDirection: "column"
  }
});
