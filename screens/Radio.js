import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity
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
import { ReactNativeAudioStreaming } from 'react-native-audio-stream';
import { Player } from 'react-native-audio-stream';


//const audioLiveStreamURL = "https://indemandradio.com/in_demand_radio"
//const url = "https://www.androidbegin.com/tutorial/jsonparsetutorial.txt"
//const apiUrl = "https://api.indemandradio.com/metadata"




class Radio extends Component{

  static navigationOptions = {
    header: null
  };


  constructor(){
    super()
    this.state = {

      dataSource:[],
      playButtonTitle: "Play",
      nowArtist:"",
      NowTitle:"",
      NowArtistImage:"",
      NowShowName:"",
      NowShowDescription:"",
      NowShowImage:""

    }
  }

  onPlayButtonPress = () => {

      if(this.state.playButtonTitle === "Play"){
        this.setState({playButtonTitle: 'Pause'})
        ReactNativeAudioStreaming.play("https://indemandradio.com/in_demand_radio", {showIniOSMediaCenter: true});
      }else {
        this.setState({playButtonTitle: 'Play'})
        ReactNativeAudioStreaming.pause();
      }
  }

  renderItem = ({item}) => {

    return(
      <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>
        <View style = {styles.listConatainer}>
          <Image
          style = {styles.listImageStyle}
          source = {{uri: item.Image}}
          />
          <View style = {styles.listContentStyle}>
            <Text style={styles.listMainTitleStyle}>{item.Title}</Text>
            <Text style={styles.listSubTitleStyle}>{item.Artist}</Text>
            <Text style={styles.listSubTitleStyle}>{item.AirTime}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      </SafeAreaView>
    )

  }

  actionOnRow(item) {
   console.log('Selected Item :',item);

  }

  componentDidMount(){
    const url = "https://api.indemandradio.com/metadata"
    fetch(url)
      .then((response) => response.json())
      .then((responseJson)=>{
       this.setState({
         dataSource:responseJson.PlayHistory
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
        <Body><Title>Radio</Title></Body>
        <Right />
      </Header>
        <View style={styles.PlayerViewStyle}>
          <Player url={"https://indemandradio.com/in_demand_radio"} />
        </View>
        <View>
          <Text>Recently played</Text>
        </View>

        <Content contentContainerStyle={styles.container}>
        <FlatList
          data={this.state.dataSource.reverse()}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        </Content>
      </Container>
    );

  }
}

export default Radio;

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
  PlayerViewStyle:{
    backgroundColor:'white',
    height: 150
  }
};
