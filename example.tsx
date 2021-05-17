import React from 'react';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Layout, Header, Content, Aside, Footer } from './lib/layout/Layout';
import './global.scss'
import {Icon} from './lib';
import useHomeService from './service/useHomeService';
import useClassName from "./lib/hooks/useClassName";
import config from './config/config'
const App: React.FC = () => {
  const {onClickSideBar,asideVisible,windowInnerWidth} = useHomeService()
  const {classNames} = useClassName()
  
  const aside = ()=>{
    return windowInnerWidth<=500&&(asideVisible?
      <div className="docSideBar" onClick={onClickSideBar}><Icon name={'side-bar-close'}/></div>
      :
      <div className="docSideBar" onClick={onClickSideBar}><Icon name={'side-bar-open'}/></div>)
  }
  
  const asideDom = (<Aside className={classNames({map:{"openAside":asideVisible},extra:['docAside']})}>
    {aside()}
    <div className="docNavLinks">
      {config.router.map((route)=>
        <NavLink key={route.path} to={route.path}>{route.title}</NavLink>
      )}
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
                {config.router.map((route)=><Route key={route.path} component={route.component} path={route.path}/>)}
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