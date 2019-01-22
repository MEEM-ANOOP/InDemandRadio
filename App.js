/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image
  } from 'react-native';
import {createDrawerNavigator, DrawerItems,DrawerNavigator,Stacknavigator,createStackNavigator} from 'react-navigation';
import Radio from './screens/Radio';
import Podcasts from './screens/Podcasts';
import Settings from './screens/Settings';
import Info from './screens/Info';
import EpisodeList from './screens/EpisodeList';
import {
  Container,
  Content,
  Header,
  Body,
  Icon
} from 'native-base';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      < MyApp />
    );
  }
}
//For customizing side menu
const CustomDrawerComponent= (props)=>(

  <Container>
    <Header style= {styles.headerStyle}>
      <Body>
        <Image
          style={styles.drawerImage}
          source={require("./assets/drawer-profile-logo.jpeg")}
        />
      </Body>
    </Header>
      <ScrollView>
        <DrawerItems {...props}/>
      </ScrollView>
    <Content>
    </Content>
  </Container>

)
const infoStackNav = createStackNavigator({
  info: Info
})

const radioStackNav = createStackNavigator({
  radio: Radio
})

const podcastStackNav = createStackNavigator({
  podcast: Podcasts,
  EpisodeList:EpisodeList
})

const settingsStackNav = createStackNavigator({
  podcast: Settings
})

const MyApp = DrawerNavigator({
  Radio:{
    screen:radioStackNav
  },
  Podcasts:{
    screen:podcastStackNav
  },
  Settings:{
    screen:settingsStackNav
  },
  Info:{
    screen:infoStackNav
  }
},
{
  initialRouteName:"Radio",
  contentComponent: CustomDrawerComponent,
  drawerOpenRoute:"DrawerOpen",
  drawerCloseRoute:"DrawerClose",
  drawerToggleRoute:"DrawerToggle"
})

const styles = StyleSheet.create({
  customDrawerImageViewStyle: {
    height: 150,
    backgroundColor: 'black'
  },
  drawerImage:{
    height:150,
    width:150,
    borderRadius:75
  },
  headerStyle:{
    height: 200,
    backgroundColor:'orange'
  }
});
