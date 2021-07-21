'use strict'
import GridOnClick from './GridOnClick'

export default class GridResp{
    constructor(){}

    static cellBeingResized = null;
    static isResizeBoth = false;
    static handler = null;
    static th = null;
    static thWidth = null;

    static thWidthCheck(target){
        GridResp.th = document.querySelectorAll('th');
        GridResp.th = GridResp.th[target.parentNode.cellIndex];
      
        GridResp.thWidth = GridResp.th.offsetWidth;
      }
    static keepColWidth(cell,thWidth, unit, timeout1, tdWidth, unitTd, timeout2){

        setTimeout(()=> GridResp.th?.style.setProperty('width', thWidth + unit, 'important'), timeout1)
        
        setTimeout((target)=>{
            target.style.setProperty('width', tdWidth + unitTd, 'important')
        }, timeout2, cell)
    }

    static keepCellHeight(cell = GridOnClick.cellTarget, height = '100', unit = '%'){
        cell?.style.setProperty('height', height + unit, 'important');
      }

    static onMouseMove(e){
        requestAnimationFrame(() =>{
            
            GridResp.handler = GridResp.cellBeingResized.getBoundingClientRect();
            GridResp.cellBeingResized.parentNode.style.width = `${GridResp.cellBeingResized.parentNode.offsetWidth + ((e.clientX + document.documentElement.scrollLeft) - (GridResp.handler.left + pageXOffset + GridResp.cellBeingResized.offsetWidth))}px`;
            if(GridResp.isResizeBoth){
              GridResp.cellBeingResized.parentNode.style.height = `${GridResp.cellBeingResized.parentNode.offsetHeight + ((e.clientY + document.documentElement.scrollTop) - (GridResp.handler.top + pageYOffset + GridResp.cellBeingResized.offsetHeight))}px`;
            }
        })
    }

    static onMouseUp(){
        window.removeEventListener('mousemove', GridResp.onMouseMove);
        window.removeEventListener('mouseup', GridResp.onMouseUp);
    }

    static initTableResponsivnes(e){
        if(e.target.getAttribute('class') === 'resize-handle'){
            GridResp.isResizeBoth = false;
            GridResp.cellBeingResized = e.target;
            if(GridOnClick.cellTarget){
              GridResp.keepColWidth(GridOnClick.cellTarget, GridOnClick.cellTarget.offsetWidth, 'px', 0, '100', '%', 200)
              GridResp.keepCellHeight();
            } 
            window.addEventListener('mousemove', GridResp.onMouseMove);
            window.addEventListener('mouseup', GridResp.onMouseUp);
        }
        
        if(e.target.getAttribute('class') === 'cell-resize-handler'){
          GridResp.isResizeBoth = true;
          GridResp.cellBeingResized = e.target;

          GridResp.thWidthCheck(e.target);
          GridResp.keepColWidth(GridOnClick.cellTarget, '100', '%', 200, GridResp.thWidth, 'px', 0);
          GridResp.keepCellHeight(GridOnClick.cellTarget, GridOnClick.cellTarget.offsetHeight, 'px')

          window.addEventListener('mousemove', GridResp.onMouseMove);
          window.addEventListener('mouseup', GridResp.onMouseUp);
        }
    }

}