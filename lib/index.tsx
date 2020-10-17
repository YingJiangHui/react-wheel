import React from 'react';
import ReactDOM from 'react-dom';
import Icon from './Icon';

function App() {
  return (
    <div>
      <Icon name='pay'/>
      <Icon name='wechat'/>
    </div>
  );
}

ReactDOM.render(
  <App/>
  , document.getElementById('root'));
