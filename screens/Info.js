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
  Title,
  Body
} from 'native-base'


class Info extends Component{

  static navigationOptions = {
    drawerIcon:(
      <Image
        source={require("../assets/info.png")}
        style = {{height:25,width:25}}
        title= "Info"
      />
    )
  }

  render(){

    return(
      <Container>
      <Header>
        <Left>
          <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />
        </Left>
        <Body><Title>Info</Title></Body>
        <Right />
      </Header>
        <Content contentContainerStyle={styles.container}>
          <Text>InfoScreen</Text>
        </Content>
      </Container>
    );

  }
}

export default Info;

const styles ={
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
