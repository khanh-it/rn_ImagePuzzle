/**
 * @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */
import { NavigationActions } from 'react-navigation';

/**
 * @class NavigationService
 */
export class NavigationService
{
    /**
     * @var {object}
     */
    static _navigators = {};

    /**
     * 
     * @param {*} levelName 
     * @param {*} navigator 
     */
    static setNavigatorLevel(levelName = 'top', navigator)
    {
        return (NavServ._navigators[levelName] = new NavServ().setNavigator(navigator));
    }    

    constructor(navigator = null)
    {
        // super(navigator);

        // Define props
        // @var {object}
        this.setNavigator(navigator);
    }

    /**
     * 
     * @param {object} navigator
     * @returns this
     */
    setNavigator(navigator)
    {
        this._navigator = navigator;
        return this;
    }

    /**
     * The navigate action will update the current state with the result of a navigate action.
     * @param routeName - String - Required - A destination routeName that has been registered somewhere in the app's router
     * @param params - Object - Optional - Params to merge into the destination route
     * @param action - Object - Optional - (advanced) The sub-action to run in the child router, if the screen is a navigator. Any one of the actions described in this doc can be set as a sub-action.
     * @param key - String - Optional - The identifier for the route to navigate to. Navigate back to this route if it already exists
     */
    navigate(routeName, params, action, key)
    {
        this._navigator.dispatch(
            NavigationActions.navigate({ routeName, params, action, key })
        );
    }

    /**
     * Go back to previous screen and close current screen. back action creator takes in one optional parameter:
     * @param key - string or null - optional - If set, navigation will go back from the given key. If null, navigation will go back anywhere.
     */
    goBack(key)
    {
        this._navigator.dispatch(
            NavigationActions.back({ key })
        );
    }

    /**
     * Go back to previous screen and close current screen. back action creator takes in one optional parameter:
     * @param params - object - required - New params to be merged into existing route params
     * @param key - string - required - Route key that should get the new params
     */
    setParams(params, key)
    {
        this._navigator.dispatch(
            NavigationActions.setParams({ params, key })
        );
    }
}
// Make alias
const NavServ = NavigationService;
