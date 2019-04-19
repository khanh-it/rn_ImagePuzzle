/**
 * 
 */
import { Platform } from 'react-native';

 /**
  * @see https://github.com/oblador/react-native-vector-icons
  * 
  * Helper, get Vector Icon by platform
  * @param {Object} Icon Icon component
  * @param {Object} props Component's props (optional)
  * @return {Object}
  */
export function vectorIcon(Icon, props = {})
{
    let { name, nameIos, nameAndroid, iconRef, ..._props } = props;
    if (!name) {
        if ((Platform.OS === 'ios') && nameIos) {
            name = nameIos;
        }
        if ((Platform.OS === 'android') && nameAndroid) {
            name = nameAndroid;
        }
    }
    return <Icon name={name} ref={iconRef} {..._props} />
}
