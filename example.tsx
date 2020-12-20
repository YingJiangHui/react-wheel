import React from 'react';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import ReactDOM from 'react-dom';
import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button/button.example';
import DialogExample from './lib/dialog/dialog.example'
import {Layout, Header, Content, Aside, Footer } from './lib/layout/Layout';
import './global.scss'
import LayoutDemo from "./lib/layout/layout.demo";
const App: React.FC = () => {
  return (
    <Router>
      <div className="docPage">
        <Layout>
          <Header className="docHeader">
            logo
          </Header>
          <Layout>
            <Aside className="docAside">
              <div className="docNavLinks">
                <NavLink to='/icon'>icon</NavLink>
                <NavLink to={'/button'}>button</NavLink>
                <NavLink to={'/dialog'}>dialog</NavLink>
                <NavLink to={'/layout'}>layout</NavLink>
              </div>
            </Aside>
            <Content>
              <Route component={IconExample} path={'/icon'}/>
              <Route component={ButtonExample} path={'/button'}/>
              <Route component={DialogExample} path={'/dialog'}/>
              <Route component={LayoutDemo} path={'/layout'}/>
            </Content>
          </Layout>
          <Footer className="docFooter">&copy;应江辉</Footer>
        </Layout>
      </div>
    </Router>

  );
};

ReactDOM.render(<App/>, document.querySelector("#root"));