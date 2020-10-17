import React from 'react';
import ReactDOM from 'react-dom';
import Icon from './Icon';

function App() {
  const fn:React.MouseEventHandler= (e)=>{
    console.log((e.target as SVGUseElement).href)
  }
  return (
    <div>
      <Icon name='pay' onClick={fn}/>
    </div>
  );
}

ReactDOM.render(
  <App/>
  , document.getElementById('root'));
