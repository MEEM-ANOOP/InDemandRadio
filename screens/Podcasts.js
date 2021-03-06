import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
  ScrollView
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
import Accordion from 'react-native-collapsible/Accordion';


class Podcasts extends Component{

  static navigationOptions = {
    header: null
  };

  actionOnRow(item) {
   console.log('selectedItem', item);
  }

  constructor(){
    super()
    this.state = {
      dataSource:[],
      activeSections: [],
    }
  }

  _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        {this.loadItemImage(section.image)}
        <View style ={styles.ListTextConatinerViewStyle}>
          <Text style={styles.listMainTitleStyle}>{section.name}</Text>
          <Text style={styles.description}>{section.description}</Text>
          <Text style={styles.description}>Episodes:{section.episodes.length}</Text>
        </View>
      </View>
    );
  };

  loadItemImage(imageUrl){
    console.log('ImageUrl',imageUrl);
    if (imageUrl.length) {
      return(
        <Image
        style = {styles.listImageStyle}
        source={{ uri: imageUrl}}
        onError={(e) => { this.props.source = { require: '../assets/placeholder.png'}}}
        />
      );
    }else {
      return(
        <Image
        style = {styles.listImageStyle}
        source={require( '../assets/placeholder.png')}
        />
      );
    }
  }


  renderItem = ({item}) => {

    return(
      <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>
        <View style = {styles.listConatainer}>
          <Image
          style = {styles.listImageStyle}
          source={require( '../assets/placeholder.png')}
          />
          <View style = {styles.listContentStyle}>
            <Text style={styles.listMainTitleStyle}>{item.description}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      </SafeAreaView>
    )

  }

  _renderContent = section => {
    return (
      <FlatList
        data={section.episodes}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  componentDidMount(){
    const url = "https://api.indemandradio.com/metadata"
    fetch(url)
      .then((response) => response.json())
      .then((responseJson)=>{
       this.setState({
         dataSource:responseJson.ListenAgain
       })
       console.log('dataSource:',this.state.dataSource);
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
            <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body><Title>Podcasts</Title></Body>
          <Right />
        </Header>
        <Content contentContainerStyle={styles.container}>
            <ScrollView>
              <Accordion
                sections={this.state.dataSource}
                activeSections={this.state.activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
              />
            </ScrollView>
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
  PlayerViewStyle:{
    backgroundColor:'white',
    height: 150
  },
  header:{
    flexDirection:'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
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
  ListTextConatinerViewStyle:{
    marginRight:20,
  }
};
