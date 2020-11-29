import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button/button.example';
import DialogExample from './lib/dialog/dialog.example'
import LayoutExample from './lib/layout/Layout.example';
const App: React.FC = () => {
  return (
    <Router>
      <header></header>
      <aside>
        <Link to='/icon'>icon</Link>
        <Link to={'/button'}>button</Link>
        <Link to={'/dialog'}>dialog</Link>
        <Link to={'/layout'}>layout</Link>
      </aside>
      <main>
        <Route component={IconExample} path={'/icon'}/>
        <Route component={ButtonExample} path={'/button'}/>
        <Route component={DialogExample} path={'/dialog'}/>
        <Route component={LayoutExample} path={'/layout'}/>
      </main>
    </Router>

  );
};

ReactDOM.render(<App/>, document.querySelector("#root"));