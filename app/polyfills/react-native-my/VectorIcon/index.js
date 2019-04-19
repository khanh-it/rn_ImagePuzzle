/**
 * 
 */
import React from 'react';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * @class VectorIcon
 */
function VectorIcon(props)
{
    let { name, nameIos, nameAndroid, Icon, ..._props } = props;
    if (!name) {
        name = Platform.select({ ios: nameIos, android: nameAndroid });
    }
    Icon = (Icon || Ionicons);
    return <Icon name={name} {..._props} />
}
export default VectorIcon;

