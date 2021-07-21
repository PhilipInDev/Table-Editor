'use strict'
import GridResp from "./GridResp";

export default class GridOnClick{
    constructor(){}

    static cellTarget = null;
    static resizeHandler = document.createElement('div');

    static previousTarget = null;

    static cellOnClick(e){
        
        if((e.target !== GridOnClick.previousTarget && GridOnClick.cellTarget && GridOnClick.previousTarget) && (e.target.getAttribute('class') === 'cell-text' || e.target.tagName === 'H3' || e.target.getAttribute('class') === 'resize-handle')){
          document.querySelector('.cell-on-click')?.classList.remove('cell-on-click');
          document.querySelector('.cell-resize-handler')?.remove();
          document.querySelector('.th-on-click')?.classList.remove('th-on-click')
      
          GridOnClick.previousTarget?.parentNode?.classList.remove('cell-on-dblclick');
          GridOnClick.previousTarget?.classList.remove('text-on-dblclick');
          GridOnClick.previousTarget?.setAttribute('contenteditable', 'false')
          GridResp.thWidthCheck(e.target)
          if(GridOnClick.previousTarget?.tagName !== 'H3' && GridOnClick.previousTarget){
            GridResp.keepColWidth(GridOnClick.previousTarget?.parentNode, GridResp.thWidth, 'px', 0, '100', '%', 200);
            GridResp.keepCellHeight();
          }
      
          GridOnClick.cellTarget = null;
        }
      
        if(e.target.getAttribute('class') === 'cell-text'){
          GridOnClick.cellTarget = e.target.parentNode;
          GridOnClick.previousTarget = e.target;
          document.querySelector('.cell-on-click')?.classList.remove('cell-on-click');
          GridOnClick.cellTarget.classList.add('cell-on-click');
          document.querySelector('.cell-resize-handler')?.remove();
          GridOnClick.resizeHandler.classList.add('cell-resize-handler');

          GridOnClick.cellTarget.append(GridOnClick.resizeHandler);

          GridResp.thWidthCheck(e.target)
          GridResp.keepColWidth(GridOnClick.cellTarget, GridResp.thWidth, 'px', 0, '100', '%', 200)
          GridResp.keepCellHeight(GridOnClick.cellTarget, GridOnClick.cellTarget.offsetHeight, 'px');
        }
      
        if(e.target.tagName === 'H3'){
          GridOnClick.previousTarget = e.target;
          GridOnClick.cellTarget = e.target.parentNode;
          GridOnClick.cellTarget.classList.add('th-on-click');
        }
    }

    static cellOnDblClick(e){
        if(e.target.tagName === 'H3' || e.target.getAttribute('class') === 'cell-text'){
        e.target.setAttribute('contenteditable', 'true');
        e.target.parentNode.classList.add('cell-on-dblclick');
        e.target.classList.add('text-on-dblclick');
        e.target.focus();
        }
    }

}