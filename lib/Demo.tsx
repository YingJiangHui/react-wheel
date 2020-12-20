import React, {useState} from 'react'
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";
import styled from "styled-components";
import Button from './button/button';
interface Props{
  code:string
}

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
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
const CodeComponent:React.FC<Props> =({code})=>{
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
const Demo:React.FC<Props> = ({code,children})=>{
  const [visibleCode,setVisibleCode] = useState(false)
  return (
    <div>
      <div>
        {children}
      </div>
      <Button type='primary' full onClick={()=>{setVisibleCode(v=>!v)}}>{visibleCode?'隐藏':'显示'}</Button>
      <div>
        {visibleCode?<CodeComponent code={code}/>:''}
      </div>
    </div>
    )
}

export default Demo