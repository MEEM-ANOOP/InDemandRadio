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


class Podcasts extends Component{

  static navigationOptions = {
    drawerIcon:(
      <Image
        source={require("../assets/podcasts.png")}
        style = {{height:25,width:25}}
        title= "Podcasts"
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
        <Body><Title>Podcasts</Title></Body>
        <Right />
      </Header>
        <Content contentContainerStyle={styles.container}>
          <Text>PodcastsScreen</Text>
        </Content>
      </Container>
    );

  }
}

export default Podcasts;

const styles ={
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
