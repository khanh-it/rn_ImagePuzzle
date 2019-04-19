/**
 * 
 */
import { createStackNavigator } from "react-navigation";

// Component(s)
import ModalComponent from './ModalComponent';

/**
 * @class ModalScreen (ModalStackNavigator)
 */
const ModalScreen = createStackNavigator({
  '/modal/': {
      screen: ModalComponent,
  }
},
{
  initialRouteName: '/modal/',
  // mode: 'modal',
  headerMode : 'none',
});
export default ModalScreen;
