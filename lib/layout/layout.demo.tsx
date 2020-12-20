import React, { useState} from 'react'
import Demo from "../Demo";

import LayoutExample1 from './Layout.example.1'
import LayoutExample2 from './Layout.example.2';
import LayoutExample3 from './Layout.example.3';
import LayoutExample4 from './Layout.example.4';

const LayoutDemo = () => {
  const [components] = useState([<LayoutExample1/>,<LayoutExample2/>,<LayoutExample3/>,<LayoutExample4/>])
  return (
    <>
      {
        components.map((item,index)=>
          <Demo code={require(`!!raw-loader!./Layout.example.${index+1}.tsx`).default}>
            {item}
          </Demo>
        )
      }
    </>
  )
}
export default LayoutDemo