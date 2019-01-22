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


class EpisodeList extends Component{

  // static navigationOptions = {
  //   drawerIcon:(
  //     <Image
  //       source={require("../assets/info.png")}
  //       style = {{height:25,width:25}}
  //       title= "Episode"
  //     />
  //   )
  // }

  render(){

    return(
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Text>Episode</Text>
        </Content>
      </Container>
    );

  }
}

export default EpisodeList;

const styles ={
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
