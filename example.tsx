import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button/button.example';
import DialogExample from './lib/dialog/dialog.example'
const App: React.FC = () => {
  return (
    <Router>
      <header></header>
      <aside>
        <Link to='/icon'>icon</Link>
        <Link to={'/button'}>button</Link>
        <Link to={'/dialog'}>dialog</Link>
      </aside>
      <main>
        <Route component={IconExample} path={'/icon'}></Route>
        <Route component={ButtonExample} path={'/button'}></Route>
        <Route component={DialogExample} path={'/dialog'}></Route>
      </main>
    </Router>

  );
};

ReactDOM.render(<App/>, document.querySelector("#root"));