import {useEffect, useMemo, useState} from 'react';

const useHomeService = ()=>{
  const [asideVisible,setAsideVisible] = useState<null|boolean>(null)
  const onClickSideBar = ()=>{
    setAsideVisible(visible=>!visible)
  }
  return {onClickSideBar,asideVisible}
}

export default useHomeService