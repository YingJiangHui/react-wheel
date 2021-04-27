import React,{useEffect,useRef,useState} from 'react';
import Highlight,{defaultProps} from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import styled from 'styled-components';
import useClassName from './hooks/useClassName';
import './demo.scss';
import Icon from './icon/Icon';
import Line from './line/line';


const Pre = styled.pre`
  text-align: left;
  font-family: Consolas, serif;
  overflow: scroll;
`;

const Row = styled.div`
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

interface CodeProps {
  code: string
}

const CodeComponent: React.FC<CodeProps> = ({code}) => {
  return (<Highlight {...defaultProps} theme={theme} code={code} language="jsx">
    {({className,style,tokens,getLineProps,getTokenProps}) => (
      <Pre className={className} style={{overflow: 'auto',padding: '1em 0.5em',...style}}>
        {tokens.map((line,i) => (<Row key={i} {...getLineProps({line,key: i})}>
            <LineNo>{i + 1}</LineNo>
            <LineContent>
              {line.map((token,key) => (<span key={key} {...getTokenProps({token,key})} />))}
            </LineContent>
          </Row>))}
      </Pre>)}
  </Highlight>);
};

interface DemoBoxProps extends CodeProps {
  description: React.ReactNode
}

const DemoBox: React.FC<DemoBoxProps> = ({code,children,description}) => {
  const [visibleCode,setVisibleCode] = useState(false);
  const {classNames} = useClassName({prefix: 'makabaka-demo'});
  const descriptionRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const [codeViewHeight,setCodeViewHeight] = useState(0);
  useEffect(() => {
    setCodeViewHeight((descriptionRef.current?.clientHeight || 0) + (codeRef.current?.clientHeight || 0));
  },[]);
  return (<div className={classNames({classes: ['card']})}>
      <div className={classNames({classes: ['displayComponent-view']})}>
        {children}
      </div>
      <div style={{height: visibleCode ? codeViewHeight : 0}}
           className={classNames({map: {'display-code-view': true}})}>
        <div ref={descriptionRef} className={classNames({classes: ['description']})}>
          {description}
        </div>
        <div ref={codeRef} className={classNames({classes: ['code']})}>
          <CodeComponent code={code}/>
        </div>
      </div>
      <div onClick={() => setVisibleCode(v => !v)} className={classNames({classes: ['visible-code-button']})}>
        {visibleCode ? <Icon name="code-in"/> : <Icon name="code-out"/>}
      </div>
    </div>);
};

interface DemoProps extends DemoBoxProps {
  detail: string,
  title: string,
}

const Demo: React.FC<DemoProps> = (props) => {
  const {code,description,detail,children,title} = props;
  const {classNames} = useClassName({prefix: 'makabaka-demo'});
  return (<div>
      <h2 className={classNames({classes: ['title']})}>
        <a href={`#${title}`}>{title}</a>
      </h2>
      <Line/>
      <p className={classNames({classes: ['detail']})}>{detail}</p>
      <DemoBox code={code} description={description}>
        {children}
      </DemoBox>
    </div>);
};

export default Demo;