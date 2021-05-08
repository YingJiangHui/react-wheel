import {useCallback,useEffect,useState} from 'react';

const useViewportCenterCoordinate = () => {
  const [pos,setPost] = useState({x: window.innerWidth >> 1,y: window.innerHeight >> 1});
  console.log('pos',pos,window)
  const onResize = useCallback((e: Event) => {
    const {currentTarget={}} = e;
    const {innerWidth,innerHeight} = currentTarget as {innerWidth:number,innerHeight:number}
    setPost((pos) => innerWidth ? ({x: innerWidth >> 1,y: innerHeight >> 1}) : pos);
  },[]);
  useEffect(() => {
    window.addEventListener('resize',onResize);
    return () => {
      window.removeEventListener('resize',onResize);
    };
  },[]);
  return [pos];
};

export default useViewportCenterCoordinate;