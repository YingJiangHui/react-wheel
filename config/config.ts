import IconExample from '../lib/icon/icon.example';
import LineDemo from '../lib/line/line.demo';
import ButtonDemo from '../lib/button/button.demo';
import DialogExample from '../lib/dialog/dialog.example';
import LayoutDemo from '../lib/layout/layout.demo';
import FormExample from '../lib/form/form.example';
import ScrollExample from '../lib/scroll/scroll.example';
import GridDemo from '../lib/grid/grid.demo';
import ModalDemo from '../lib/modal/modal.demo';
import React from 'react'
interface Config {
  router:{component:React.FC,path:string,title:string}[]
}
const config:Config = {
  router:[
    {component:IconExample,path:'/icon',title:'Icon'},
    {component:LineDemo,path:'/line',title:'Line'},
    {component:ButtonDemo,path:'/button',title:'Button'},
    {component:DialogExample,path:'/dialog',title:'Dialog'},
    {component:LayoutDemo,path:'/layout',title:'Layout'},
    {component:FormExample,path:'/form',title:'Form'},
    {component:ScrollExample,path:'/scroll',title:'Scroll'},
    {component:GridDemo,path:'/grid',title:'Grid'},
    {component:ModalDemo,path:'/modal',title:'Modal'},
  ]
}
export default config