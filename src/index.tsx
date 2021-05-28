import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import { HashRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider} from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById('root')
);

reportWebVitals();
