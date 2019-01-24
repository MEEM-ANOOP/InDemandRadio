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
import playImage from '../assets/play.png';
import pauseImage from '../assets/pause.png';


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
      NowArtist:"",
      NowTitle:"",
      NowArtistImage:"",
      NowShowName:"",
      NowShowDescription:"",
      NowShowImage:"",
      isPlaying: false

    }
  }

  onPlayButtonPress = () => {

      if(this.state.isPlaying){
        this.setState({isPlaying: false})
        ReactNativeAudioStreaming.pause();
      }else {
        this.setState({isPlaying: true})
        ReactNativeAudioStreaming.play("https://indemandradio.com/in_demand_radio", {showIniOSMediaCenter: true});
      }

  }

  getAirTime(){
    return "11:30";
  }

  renderItem = ({item}) => {

    return(
      <SafeAreaView>
        <View style = {styles.listConatainer}>
          <Image
          style = {styles.listImageStyle}
          source={{ uri: item.Image}}
          onError={(e) => { this.props.source = { reqire: '../assets/placeholder.png'}}}
          />
          <View style = {styles.listContentStyle}>
            <Text style={styles.listMainTitleStyle}>{item.Artist}</Text>
            <Text style={styles.listSubTitleStyle}>{item.Title}</Text>
            <Text style={styles.listSubTitleStyle}>{item.AirTime}</Text>
          </View>
        </View>
      </SafeAreaView>
    )

  }



  componentDidMount(){
    const url = "https://api.indemandradio.com/metadata"
    fetch(url)
      .then((response) => response.json())
      .then((responseJson)=>{
       this.setState({
         dataSource:responseJson.PlayHistory,
         NowArtist:responseJson.NowArtist,
         NowTitle:responseJson.NowTitle,
         NowArtistImage:responseJson.NowArtistImage,
         NowShowName:responseJson.NowShowName,
         NowShowDescription:responseJson.NowShowDescription,
         NowShowImage:responseJson.NowShowImage
       }),
       this.setState({
         NowArtist:responseJson.NowArtist
       }),
       this.setState({
         NowTitle:responseJson.NowTitle
       }),
       this.setState({
         NowArtistImage:responseJson.NowArtistImage
       })
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  //<Player url={"https://indemandradio.com/in_demand_radio"} />

  render(){
    return(
      <Container>

        <Header>
          <Left>
          <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()}> </Icon>
          </Left>
          <Body><Title>Now playing</Title></Body>
          <Right />
        </Header>

        <View style={styles.PlayerViewStyle}>
            <Image
            style = {styles.NowPlayingImageStyle}
            source = {{uri: this.state.NowArtistImage}}
            />
            <View style = {styles.listContentStyle}>
              <Text style={styles.NowPlayingTitleStyle}>{this.state.NowArtist}</Text>
              <Text style={styles.listSubTitleStyle}>{this.state.NowTitle}</Text>
            </View>
            <TouchableOpacity onPress={() => this.onPlayButtonPress()}>
              <Image
              style = {styles.NowPlayingImageStyle}
              source={this.state.isPlaying === true ?require('../assets/pause.png'):require('../assets/play.png')}
              />
            </TouchableOpacity>
        </View>

        <View style= {styles.RecentlyPlayedViewStyle}>
          <Text style= {styles.RecentlyPlayedTitleStyle}>Recently played</Text>
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
  RecentlyPlayedTitleStyle:{
    fontSize:20,
    color:'white',
    marginLeft: 5,
    fontWeight:'bold'
  },
  NowPlayingTitleStyle:{
    fontSize:25,
    color:'#ca4587',
    fontWeight:'bold'
  },
  NowPlayingArtistTextStyle:{

  },
  RecentlyPlayedViewStyle:{
    backgroundColor:'#313030',
    height:25
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
    justifyContent:'flex-start',
    marginLeft:5
  },
  listImageStyle:{
    width:100,
    height:100,
    margin:5
  },
  NowPlayingImageStyle:{
    width:100,
    height:100,
    margin:5

  },
  listMainTitleStyle:{
    fontSize: 18,
    color:'#ca4587',
    fontWeight:'bold'
  },
  listSubTitleStyle:{
    fontSize:14,
    color:'gray'
  },
  PlayerViewStyle:{
    backgroundColor:'#313030',
    height: 110,
    flexDirection:'row',
    alignItem: 'center'
  },
  NowPlayingViewStyle:{
    backgroundColor: 'black',
    height:180
  }
};
