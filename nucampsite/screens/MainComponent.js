import { Platform, StyleSheet, View, Text, Image } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPartners } from '../features/patners/partnersSlice';
import { fetchCampsites } from '../features/campsites/campsitesSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';
import { fetchComments } from '../features/comments/commentsSlice';
import logo from '../asset/images/logo.png';
import HomeScreen from './HomeScreen';
import DirectoryScreen from './DirectoryScreen';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const screenOptions = {
   headerTintColor: '#fff',
   headerStyle: { backgroundColor: '#5637DD' }
};

const CustomDrawerContent = (props) => (
   <DrawerContentScrollView {...props}>
       <View style={styles.drawerHeader}>
           <View style={{ flex: 1 }}>
               <Image source={logo} style={styles.drawerImage} />
           </View>
           <View style={{ flex: 2 }}>
               <Text style={styles.drawerHeaderText}>NuCamp</Text>
           </View>
       </View>
       <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
   </DrawerContentScrollView>
);

const HomeNavigator = () => {
   return (
       <Stack.Navigator screenOptions={screenOptions}>
           <Stack.Screen
               name='Home'
               component={HomeScreen}
               options={({ navigation }) => ({
                   title: 'Home',
                   headerLeft: () => (
                       <Icon
                           name='home'
                           type='font-awesome'
                           iconStyle={styles.stackIcon}
                           onPress={() => navigation.toggleDrawer()}
                       />
                   )
               })}
           />
       </Stack.Navigator>
   );
};

const AboutNavigator = () => {
   return (
       <Stack.Navigator screenOptions={screenOptions}>
           <Stack.Screen
               name='AboutMain'
               component={AboutScreen}
               options={({ navigation }) => ({
                   headerLeft: () => (
                       <Icon
                           name='info-circle'
                           type='font-awesome'
                           iconStyle={styles.stackIcon}
                           onPress={() => navigation.toggleDrawer()}
                       />
                   )
               })}
           />
       </Stack.Navigator>
   );
};

const ContactNavigator = () => {
   return (
       <Stack.Navigator screenOptions={screenOptions}>
           <Stack.Screen
               name='ContactMain'
               component={ContactScreen}
               options={({ navigation }) => ({
                   title: 'Contact Us',
                   headerLeft: () => (
                       <Icon
                           name='address-card'
                           type='font-awesome'
                           iconStyle={styles.stackIcon}
                           onPress={() => navigation.toggleDrawer()}
                       />
                   )
               })}
           />
       </Stack.Navigator>
   );
};

const DirectoryNavigator = () => {
   return (
       <Stack.Navigator initialRouteName='Directory' screenOptions={screenOptions}>
           <Stack.Screen
               name='Directory'
               component={DirectoryScreen}
               options={({ navigation }) => ({
                   title: 'Campsite Directory',
                   headerLeft: () => (
                       <Icon
                           name='list'
                           type='font-awesome'
                           iconStyle={styles.stackIcon}
                           onPress={() => navigation.toggleDrawer()}
                       />
                   )
               })}
           />
           <Stack.Screen
               name='CampsiteInfo'
               component={CampsiteInfoScreen}
               options={({ route }) => ({
                   title: route.params.campsite.name
               })}
           />
       </Stack.Navigator>
   );
};

const Main = () => {
   const dispatch = useDispatch();

   useEffect(() => {
       dispatch(fetchCampsites());
       dispatch(fetchPromotions());
       dispatch(fetchPartners());
       dispatch(fetchComments());
   }, [dispatch]);

   return (
       <View style={{
           flex: 1,
           paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
       }}>
           <Drawer.Navigator
               initialRouteName='HomeNav'
               drawerContent={CustomDrawerContent}
               screenOptions={{
                   drawerStyle: { backgroundColor: '#CEC8FF' }
               }}
           >
               <Drawer.Screen
                   name='HomeNav'
                   component={HomeNavigator}
                   options={{
                       title: 'Home',
                       drawerIcon: ({ color }) => (
                           <Icon
                               name='home'
                               type='font-awesome'
                               size={24}
                               iconStyle={{ width: 24 }}
                               color={color}
                           />
                       )
                   }}
               />
               <Drawer.Screen
                   name='DirectoryNav'
                   component={DirectoryNavigator}
                   options={{
                       title: 'Directory',
                       drawerIcon: ({ color }) => (
                           <Icon
                               name='list'
                               type='font-awesome'
                               size={24}
                               iconStyle={{ width: 24 }}
                               color={color}
                           />
                       )
                   }}
               />
               <Drawer.Screen
                   name='AboutNav'
                   component={AboutNavigator}
                   options={{
                       title: 'About Us',
                       drawerIcon: ({ color }) => (
                           <Icon
                               name='info-circle'
                               type='font-awesome'
                               size={24}
                               iconStyle={{ width: 24 }}
                               color={color}
                           />
                       )
                   }}
               />
               <Drawer.Screen
                   name='ContactNav'
                   component={ContactNavigator}
                   options={{
                       title: 'Contact Us',
                       drawerIcon: ({ color }) => (
                           <Icon
                               name='address-card'
                               type='font-awesome'
                               size={24}
                               iconStyle={{ width: 24 }}
                               color={color}
                           />
                       )
                   }}
               />
           </Drawer.Navigator>
       </View>
   );
};

const styles = StyleSheet.create({
   stackIcon: {
       marginLeft: 10,
       color: '#fff',
       fontSize: 24
   },
   drawerHeader: {
       backgroundColor: '#5637DD',
       height: 140,
       alignItems: 'center',
       justifyContent: 'center',
       flex: 1,
       flexDirection: 'row'
   },
   drawerHeaderText: {
       color: '#fff',
       fontSize: 24,
       fontWeight: 'bold'
   },
   drawerImage: {
       margin: 10,
       height: 60,
       width: 60
   }
});

export default Main;