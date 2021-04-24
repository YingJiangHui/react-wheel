import React from 'react';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import ReactDOM from 'react-dom';
import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button/button.example';
import DialogExample from './lib/dialog/dialog.example'
import {Layout, Header, Content, Aside, Footer } from './lib/layout/Layout';
import './global.scss'
import LayoutDemo from "./lib/layout/layout.demo";
import FormExample from "./lib/form/form.example";
import ScrollExample from './lib/scroll/scroll.example';
import GridDemo from './lib/grid/grid.demo';
import {Icon} from './lib';
import useHomeService from './service/useHomeService';
import useClassName from "./lib/hooks/useClassName";

const App: React.FC = () => {
  const {onClickSideBar,asideVisible} = useHomeService()
  const {classNames} = useClassName()
  return (
    <Router>
      <div className="docPage">
        <Layout>
          <Header className="docHeader">
            <div className="docContainer">
              <div className="docLogo">Logo</div>
              {asideVisible?
                <div className="docSideBar" onClick={onClickSideBar}><Icon name={'side-bar-close'}/></div>
                :
                <div className="docSideBar" onClick={onClickSideBar}><Icon name={'side-bar-open'}/></div>
              }
            </div>
          </Header>
          <Layout className='docMain docContainer'>
            <Aside className="docAside">
              <div className="docNavLinks">
                <NavLink to='/icon'>Icon</NavLink>
                <NavLink to={'/button'}>Button</NavLink>
                <NavLink to={'/dialog'}>Dialog</NavLink>
                <NavLink to={'/layout'}>Layout</NavLink>
                <NavLink to={'/form'}>Form</NavLink>
                <NavLink to={'/scroll'}>Scroll</NavLink>
                <NavLink to={'/grid'}>Grid</NavLink>
              </div>
            </Aside>
            <Content className="docContent">
              <div>
                <Route component={IconExample} path={'/icon'}/>
                <Route component={ButtonExample} path={'/button'}/>
                <Route component={DialogExample} path={'/dialog'}/>
                <Route component={LayoutDemo} path={'/layout'}/>
                <Route component={FormExample} path={'/form'}/>
                <Route component={ScrollExample} path={'/scroll'}/>
                <Route component={GridDemo} path={'/grid'}/>
              </div>
            </Content>
          </Layout>
          <Footer className="docFooter">
            <div className="docContainer">
              &copy; YingJiangHui
            </div>
          </Footer>
        </Layout>
      </div>
    </Router>

  );
};

ReactDOM.render(<App/>, document.querySelector("#root"));