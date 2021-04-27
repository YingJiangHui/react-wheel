import React,{FC} from 'react';
import Line from './line';

interface LineExampleProps {

}

const LineExample: FC<LineExampleProps> = (props) => {
  
  return (<>
    {[1,2,3,4,5,6,7,8,9].map((num) => <><Line grayLevel={num}/> <br/></>)}
  </>);
};

export default LineExample;