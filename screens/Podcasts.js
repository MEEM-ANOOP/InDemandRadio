import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
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
  Body,
  Title,
  ListItem,
  Thumbnail
} from 'native-base';
import { DrawerActions } from 'react-navigation';



class Podcasts extends Component{

  // static navigationOptions = {
  //   title: 'Podcasts',
  //   // drawerIcon:(
  //   //   <Image
  //   //     source={require("../assets/podcasts.png")}
  //   //     style = {{height:25,width:25}}
  //   //   />
  //   // )
  //
  // }

  static navigationOptions = {
    header: null
  };

  constructor(){
    super()
    this.state = {
      dataSource:[]
    }
  }
  renderItem = ({item}) => {

    return(
      <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>
        <View style = {styles.listConatainer}>
          <Image
          style = {styles.listImageStyle}
          source = {{uri: item.image}}
          />
          <View style = {styles.listContentStyle}>
            <Text style={styles.listMainTitleStyle}>{item.name}</Text>
            <Text style={styles.listSubTitleStyle}>{item.description}</Text>
            <Text style={styles.listSubTitleStyle}>Episodes:{item.episodes.length}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      </SafeAreaView>
    )

  }

  actionOnRow(item) {
   console.log('Selected Item :',item);
   this.props.navigation.push("EpisodeList");
  }

  componentDidMount(){
    const url = "https://api.indemandradio.com/metadata"
    //const url = "https://www.androidbegin.com/tutorial/jsonparsetutorial.txt"
    fetch(url)
      .then((response) => response.json())
      .then((responseJson)=>{
       this.setState({
         dataSource:responseJson.ListenAgain
       })
    })
    .catch((error)=>{
      console.log(error)
    })
  }


  render(){
    return(
      <Container>
      <Header>
        <Left>
          <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()}> </Icon>
        </Left>
        <Body><Title>Podcasts</Title></Body>
        <Right />
      </Header>
        <View style = {styles.descriptionView}>
          <Text style ={styles.descriptionTextStyle}>Listen again to your favourite shows - any time you like!</Text>
        </View>

        <Content contentContainerStyle={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        </Content>
      </Container>
    );

  }
}

export default Podcasts;

const styles ={
  container:{
    flex: 1,
  },
  listConatainer:{
    flex:1,
    flexDirection:'row',
    marginBottom:3,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  listContentStyle:{
    flex:1,
    justifyContent:'center'
  },
  listImageStyle:{
    width:100,
    height:100,
    margin:5
  },
  listMainTitleStyle:{
    fontSize: 18,
    color:'black',
  },
  listSubTitleStyle:{
    fontSize:14,
    color:'gray'
  },
  descriptionView:{
    backgroundColor:'black',
    height: 50
  },
  descriptionTextStyle:{
    fontSize: 18,
    color:'white',
    marginLeft:5
  }
};
