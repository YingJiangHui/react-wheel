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

const App: React.FC = () => {
  const {onClickSideBar,asideVisible,asideStyleTransform} = useHomeService()
  return (
    <Router>
      <div className="docPage">
        <Layout>
          <Header className="docHeader">
            <div className="docLogo">logo</div>
            {asideVisible?
              <div className="docSideBar" onClick={onClickSideBar}><Icon name={'side-bar-close'}/></div>
              :
              <div className="docSideBar" onClick={onClickSideBar}><Icon name={'side-bar-open'}/></div>
            }
          </Header>
          <Layout className='docMain'>
            <Aside className="docAside" style={{...asideStyleTransform}}>
              <div className="docNavLinks">
                <NavLink to='/icon'>icon</NavLink>
                <NavLink to={'/button'}>button</NavLink>
                <NavLink to={'/dialog'}>dialog</NavLink>
                <NavLink to={'/layout'}>layout</NavLink>
                <NavLink to={'/form'}>form</NavLink>
                <NavLink to={'/scroll'}>scroll</NavLink>
                <NavLink to={'/grid'}>grid</NavLink>
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
          <Footer className="docFooter">&copy; YingJiangHui</Footer>
        </Layout>
      </div>
    </Router>

  );
};

ReactDOM.render(<App/>, document.querySelector("#root"));