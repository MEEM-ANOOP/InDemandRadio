import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import {
  Icon,
  Button,
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Title
} from 'native-base';
import { DrawerActions } from 'react-navigation';



class Settings extends Component{

  static navigationOptions = {
    title: 'Settings',
    drawerIcon:(
      <Image
        source={require("../assets/settings.png")}
        style = {{height:25,width:25}}
      />
    ),

  }

  render(){

    return(
      <Container>
      <Header>
        <Left>
          <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()}> </Icon>
        </Left>
        <Body><Title>Settings</Title></Body>
        <Right />
      </Header>
        <Content contentContainerStyle={styles.container}>
          <Text>SettingsScreen</Text>
        </Content>
      </Container>
    );

  }
}

export default Settings;

const styles ={
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
