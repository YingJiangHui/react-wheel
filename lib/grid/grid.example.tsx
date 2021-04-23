import React,{FC} from 'react'
import Row from "./Row";
import Col from "./Col";

interface ExampleProps {

}

const GridExample:FC<ExampleProps> = (props)=>{
  
  return (<div>
    <Row>
      <Col>1</Col>
    </Row>
  </div>)
}

export default GridExample