import React,{useEffect,useRef,useState} from 'react';
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";
import styled from "styled-components";
import Button from './button/button';
import useClassName from './hooks/useClassName';
import './demo.scss'

interface DemoProps {
  code:string,
  description: React.ReactElement
}

const Pre = styled.pre`
  text-align: left;
  font-family: Consolas,serif;
  overflow: scroll;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;
interface CodeProps{
  code:string
}
const CodeComponent:React.FC<CodeProps> =({code})=>{
  return  ( <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => (
          <Line key={i} {...getLineProps({ line, key: i })}>
            <LineNo>{i + 1}</LineNo>
            <LineContent>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </LineContent>
          </Line>
        ))}
      </Pre>
    )}
  </Highlight>)
}

const Demo:React.FC<DemoProps> = ({code,children,description})=>{
  const [visibleCode,setVisibleCode] = useState(false)
  const {classNames} = useClassName({prefix:'makabaka-demo'})
  const descriptionRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const [codeViewHeight,setCodeViewHeight] = useState(0)
  useEffect(()=>{
    setCodeViewHeight((descriptionRef.current?.clientHeight||0)+(codeRef.current?.clientHeight||0))
  },[])
  return (
    <div className={classNames({classes:['card']})}>
      <div className={classNames({classes:['displayComponent-view']})}>
        {children}
      </div>
      <div style={{height:visibleCode?codeViewHeight:0}} className={classNames({map:{'display-code-view':true}})}>
        <div ref={descriptionRef} className={classNames({classes:['description']})}>
          {description}
        </div>
        <div ref={codeRef} className={classNames({classes:['code']})}>
          <CodeComponent code={code}/>
        </div>
      </div>
      <div className={classNames({classes:['visible-code-button']})}>
        <Button type='primary' full onClick={()=>{setVisibleCode(v=>!v)}}>{visibleCode?'隐藏源代码':'查看源代码'}</Button>
      </div>
    </div>
    )
}

export default Demo