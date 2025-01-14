import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import DirectoryScreen from './DirectoryScreen';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';

const Drawer = createDrawerNavigator();

const screenOptions = {
   headerTintColor: '#fff',
   headerStyle: { backgroundColor: '#5637DD' }
};

const HomeNavigator = () => {
   const Stack = createStackNavigator();
   return (
       <Stack.Navigator screenOptions={screenOptions}>
           <Stack.Screen
               name='Home'
               component={HomeScreen}
               options={{ title: 'Home' }}
           />
       </Stack.Navigator>
   );
};

const AboutNavigator = () => {
   const Stack = createStackNavigator();
   return (
       <Stack.Navigator screenOptions={screenOptions}>
           <Stack.Screen
               name='AboutMain'
               component={AboutScreen}
           />
       </Stack.Navigator>
   );
};

const ContactNavigator = () => {
   const Stack = createStackNavigator();
   return (
       <Stack.Navigator screenOptions={screenOptions}>
           <Stack.Screen
               name='ContactMain'
               component={ContactScreen}
               options={{ title: 'Contact Us' }}
           />
       </Stack.Navigator>
   );
};

const DirectoryNavigator = () => {
   const Stack = createStackNavigator();
   return (
       <Stack.Navigator
           initialRouteName='Directory'
           screenOptions={screenOptions}
       >
           <Stack.Screen 
               name='Directory'
               component={DirectoryScreen}
               options={{ title: 'Campsite Directory' }}
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
   return (
       <View 
           style={{ 
               flex: 1,
               paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
           }}
       >
           <Drawer.Navigator
               initialRouteName='HomeNav'
               screenOptions={{ 
                   drawerStyle: { backgroundColor: '#CEC8FF' }
               }}
           >
               <Drawer.Screen
                   name='HomeNav'
                   component={HomeNavigator}
                   options={{ title: 'Home' }}
               />
               <Drawer.Screen
                   name='DirectoryNav'
                   component={DirectoryNavigator}
                   options={{ title: 'Directory' }}
               />
               <Drawer.Screen
                   name='AboutNav'
                   component={AboutNavigator}
                   options={{ title: 'About Us', headerShown: false }}
               />
               <Drawer.Screen
                   name='ContactNav'
                   component={ContactNavigator}
                   options={{ title: 'Contact Us', headerShown: false }}
               />
           </Drawer.Navigator>
       </View>
   );
};

export default Main;