import './App.css';
import Navbar from './components/Navbar';
import ShoppingList from './components/shoppinglist/ShoppingList';

import { Provider } from 'react-redux'
import store from './redux/store';
import ItemModal from './components/itemModal/ItemModal';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/authActions';

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <ItemModal />
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
