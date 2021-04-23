import React,{FC} from 'react';
import Row from './Row';
import Col from './Col';
import './grid.example.scss';

interface ExampleProps {

}

const GridExample: FC<ExampleProps> = (props) => {
  
  return (
      <div className="makabaka-gridExampleWrapper">
        <Row>
          <Col span={10}/>
          <Col span={10}/>
          <Col span={2}/>
          <Col span={2}/>
          <Col span={2}/>
          <Col span={10}/>
        </Row>
      </div>
  );
};

export default GridExample;