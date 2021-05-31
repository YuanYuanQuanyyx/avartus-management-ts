import { Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RegularUser from './pages/users/RegularUser';
import AdminUser from './pages/users/AdminUser';
import {history} from './utils/history'

function App() {

    return (
      <Router history={history}>
        <Switch>
          <Route path='/login' component = {Login} />
          <Route exact path='/user/regular' component = {RegularUser}/>
          <Route exact path='/user/admin' component = {AdminUser} />
          <Redirect to='/login' from='/' />
        </Switch>
      </Router>

    );
}

export default App;

