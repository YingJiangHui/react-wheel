import React from 'react';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import ReactDOM from 'react-dom';
import IconExample from './lib/icon/icon.example';
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
import ButtonDemo from './lib/button/button.demo';
import LineDemo from './lib/line/line.demo';
import ModalDemo from './lib/modal/modal.demo';

const App: React.FC = () => {
  const {onClickSideBar,asideVisible,windowInnerWidth} = useHomeService()
  const {classNames} = useClassName()
  const asideDom = (<Aside className={classNames({map:{"openAside":asideVisible},extra:['docAside']})}>
    {windowInnerWidth<=500&&(asideVisible?
      <div className="docSideBar" onClick={onClickSideBar}><Icon name={'side-bar-close'}/></div>
      :
      <div className="docSideBar" onClick={onClickSideBar}><Icon name={'side-bar-open'}/></div>)
    }
    <div className="docNavLinks">
      <NavLink to='/icon'>Icon</NavLink>
      <NavLink to={'/line'}>Line</NavLink>
      <NavLink to={'/button'}>Button</NavLink>
      <NavLink to={'/dialog'}>Dialog</NavLink>
      <NavLink to={'/layout'}>Layout</NavLink>
      <NavLink to={'/form'}>Form</NavLink>
      <NavLink to={'/scroll'}>Scroll</NavLink>
      <NavLink to={'/grid'}>Grid</NavLink>
      <NavLink to={'/modal'}>modal</NavLink>
    </div>
  </Aside>)

  return (
    <Router>
      <div className="docPage">
        <Layout>
          <Header className="docHeader">
            <div className="docContainer">
              <div className="docLogo">Logo</div>
            </div>
          </Header>
          <Layout className='docMain docContainer'>
            {windowInnerWidth >500?asideDom:<></>}
            <Content className="docContent">
              <div>
                <Route component={IconExample} path={'/icon'}/>
                <Route component={LineDemo} path={'/line'}/>
                <Route component={ButtonDemo} path={'/button'}/>
                <Route component={DialogExample} path={'/dialog'}/>
                <Route component={LayoutDemo} path={'/layout'}/>
                <Route component={FormExample} path={'/form'}/>
                <Route component={ScrollExample} path={'/scroll'}/>
                <Route component={GridDemo} path={'/grid'}/>
                <Route component={ModalDemo} path={'/modal'}/>
              </div>
            </Content>
          </Layout>
          <Footer className="docFooter">
            <div className="docContainer">
              &copy; YingJiangHui
            </div>
          </Footer>
        </Layout>
        {windowInnerWidth <= 500?asideDom:<></>}
      </div>
    </Router>

  );
};

ReactDOM.render(<App/>, document.querySelector("#root"));