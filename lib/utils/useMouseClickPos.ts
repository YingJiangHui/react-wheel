import {useEffect,useState} from 'react';

const useMouseClickPos = () => {
  const [pos,setPos] = useState({x: 0,y: 0});
  const onClick = (e:MouseEvent) => {
    const {x,y} = e;
    setPos({x,y});
  };
  useEffect(() => {
    document.addEventListener('click',onClick);
    return () => {
      document.removeEventListener('click',onClick);
    };
  },[]);
  return [pos] as const;
};
export default useMouseClickPos;