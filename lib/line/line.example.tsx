import React,{FC} from 'react';
import Line from './line';

interface LineExampleProps {

}

const LineExample: FC<LineExampleProps> = (props) => {
  const level = [10,9,8,7,6,5,4,3,2,1,2,3,4,5,6,7,8,9,10]
  return (<>
    {level.map((num) => <><Line grayLevel={num}/> <br/></>)}
  </>);
};

export default LineExample;