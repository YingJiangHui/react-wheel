import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button/button.example';

const App: React.FC = () => {
  return (
    <Router>
      <header></header>
      <aside>
        <Link to='/icon'>icon</Link>
        <Link to={'/button'}>button</Link>
      </aside>
      <main>
        <Route component={IconExample} path={'/icon'}></Route>
        <Route component={ButtonExample} path={'/button'}></Route>
      </main>
    </Router>

  );
};

ReactDOM.render(<App/>, document.querySelector("#root"));