import { createStackNavigator } from "react-navigation";
// Import component(s)
import HomeComponent from './HomeComponent';

/**
 * 
 */
export const StackNavigator = createStackNavigator({
    '/home':  {
        screen: HomeComponent
    },
},
{
    // initialRouteName: '/',
    headerMode : 'none',
    /* The header config from HomeComponent is now here */
    defaultNavigationOptions: {
        title: 'Home, yes our home (`^_^)',
        headerBackTitle: 'BackTitle',
        headerTruncatedBackTitle: 'TruncatedBackTitle',
        // headerLeft: (<Text>Nut back</Text>),
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    },
});
export default StackNavigator;
