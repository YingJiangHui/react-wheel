import React from 'react'
import Demo from "../Demo";

import LayoutExample1 from './Layout.example.1'
import LayoutExample2 from './Layout.example.2';
import LayoutExample3 from './Layout.example.3';
import LayoutExample4 from './Layout.example.4';

const LayoutDemo = () => {
  return (
    <>
      <Demo code={require('!!raw-loader!./Layout.example.1.tsx').default}>
        <LayoutExample1/>
      </Demo>
      <Demo code={require('!!raw-loader!./Layout.example.2.tsx').default}>
        <LayoutExample2/>
      </Demo>
      <Demo code={require('!!raw-loader!./Layout.example.3.tsx').default}>
        <LayoutExample3/>
      </Demo>
      <Demo code={require('!!raw-loader!./Layout.example.4.tsx').default}>
        <LayoutExample4/>
      </Demo>
    </>
  )
}
export default LayoutDemo