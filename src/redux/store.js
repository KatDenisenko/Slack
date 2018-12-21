import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './Redusors';

const store = createStore(rootReducer, composeWithDevTools());

export default store;