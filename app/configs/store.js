import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// https://github.com/rt2zz/redux-persist
import { persistStore, persistReducer } from 'redux-persist';
// https://github.com/robwalkerco/redux-persist-filesystem-storage
// import storage from 'redux-persist-filesystem-storage';
import { AsyncStorage as storage } from 'react-native';
// import RNFetchBlob from 'react-native-fetch-blob';
// import FilesystemStorage from 'redux-persist-filesystem-storage';
// #end
// project's reducers
import rootReducer from '../reducers';

// https://github.com/jhen0409/react-native-debugger/blob/master/examples/counter-with-redux/src/configureStore.js
const middlewares = [thunk];
const enhancer = composeWithDevTools(
  {
    // Options: https://github.com/jhen0409/react-native-debugger#options
  },
)(applyMiddleware(...middlewares));

// Create storage???
/* const storage = FilesystemStorage.config(
    { storagePath: `${RNFetchBlob.fs.dirs.DocumentDir}/persistStore` }
); */
// console.log('storage: ', storage);

// Create persisted root reducer
const npmPackage = require('../../package.json');
const persistConfig = {
    key: npmPackage.name,
    storage,
    blacklist: ['navigation'] // navigation will not be persisted
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create persisted redux store
const store = createStore(
    persistedReducer, // rootReducer,
    enhancer // applyMiddleware(thunk)
);

// Create store persistor
const persistor = persistStore(store);

// export default
export default store;

// common export
export {
    store, persistor
};
