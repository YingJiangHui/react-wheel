import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button/button.example';
import DialogExample from './lib/dialog/dialog.example'
import LayoutExample from "./lib/layout/layout.example";
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
        <Route component={IconExample} path={'/icon'}></Route>
        <Route component={ButtonExample} path={'/button'}></Route>
        <Route component={DialogExample} path={'/dialog'}></Route>
        <Route component={LayoutExample} path={'/layout'}></Route>
      </main>
    </Router>

  );
};

ReactDOM.render(<App/>, document.querySelector("#root"));