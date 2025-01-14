import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

// FeaturedItem component handles displaying individual featured items
const FeaturedItem = ({ item }) => {
   if (item) {
       return (
           <Card containerStyle={{ padding: 0 }}>
               {/* Using baseUrl to construct complete image URL */}
               <Card.Image source={{ uri: baseUrl + item.image }}>
                   <View style={{ justifyContent: 'center', flex: 1 }}>
                       <Text 
                           style={{
                               color: 'white', 
                               textAlign: 'center', 
                               fontSize: 20
                           }}
                       >
                           {item.name}
                       </Text>
                   </View>
               </Card.Image>
               <Text style={{ margin: 20 }}>{item.description}</Text>
           </Card>
       );
   }
   return <View />;
};

const HomeScreen = () => {
   // Using useSelector to access data from Redux store
   const campsites = useSelector((state) => state.campsites);
   const promotions = useSelector((state) => state.promotions);
   const partners = useSelector((state) => state.partners);

   // Finding featured items from each category
   const featCampsite = campsites.campsitesArray.find((item) => item.featured);
   const featPromotion = promotions.promotionsArray.find(
       (item) => item.featured
   );
   const featPartner = partners.partnersArray.find((item) => item.featured);

   return (
       <ScrollView>
           <FeaturedItem item={featCampsite} />
           <FeaturedItem item={featPromotion} />
           <FeaturedItem item={featPartner} />
       </ScrollView>
   );
};

export default HomeScreen;