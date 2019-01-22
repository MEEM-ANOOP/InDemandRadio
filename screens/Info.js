import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
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

  // static navigationOptions = {
  //   header: null,
  //   drawerIcon:(
  //     <Image
  //       source={require("../assets/info.png")}
  //       style = {{height:25,width:25}}
  //       title= "Info"
  //     />
  //   )
  // }

  static navigationOptions = {
    header: null
  };

  actionOnRow() {
   this.props.navigation.push("EpisodeList");
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
        <TouchableWithoutFeedback onPress={() => this.actionOnRow()}>
          <Text>InfoScreen</Text>
        </TouchableWithoutFeedback>
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
