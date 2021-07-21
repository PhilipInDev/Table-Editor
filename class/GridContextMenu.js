'use strict'
import GridOnClick from "./GridOnClick";
import GridView from "./GridView";

export default class GridContextMenu{
    constructor(){}

    static POP_UP_BOX = document.querySelector('.popup');
    static columnToRecover = [];
    static rowToRecover;
    static cellInd;
    static rowInd;
    static undoArr = [];
    static redoArr = [];
    static pageX = 0;
    static pageY = 0;

    static undoEl = document.querySelector('#undo');
    static redoEl =  document.querySelector('#redo');

    static contextmenuPopUp(e){
        e.preventDefault()
        GridOnClick.cellOnClick(e);
        GridContextMenu.currentTarget = e.target.parentNode;
        if(e.target.getAttribute('class') === 'cell-text' || e.target.tagName === 'H3'){
      
          GridContextMenu.POP_UP_BOX.style.top = GridContextMenu.pageY+'px';
          GridContextMenu.POP_UP_BOX.style.left = GridContextMenu.pageX+'px';
          GridContextMenu.POP_UP_BOX.style.display = 'block';
          GridContextMenu.undoEl.style.pointerEvents = 'none'
          GridContextMenu.undoEl.classList.add('untarget')
          GridContextMenu.redoEl.style.pointerEvents = 'none'
          GridContextMenu.redoEl.classList.add('untarget')
          if(GridContextMenu.undoArr.length){
            GridContextMenu.undoEl.style.pointerEvents = 'auto';
            GridContextMenu.undoEl.classList.remove('untarget')
            console.log('pointer')
          }
          if(GridContextMenu.redoArr.length){
            GridContextMenu.redoEl.style.pointerEvents = 'auto';
            GridContextMenu.redoEl.classList.remove('untarget')
          }
        }
    }
    static contextMenuClickControler(e){
        if(e.target.getAttribute('id') === 'row-above' && GridContextMenu.currentTarget.parentNode.rowIndex !== 0){
          GridContextMenu.insertRowAbove();
          GridContextMenu.undoArr.push({
            method: 'insertRowAbove', 
            target: GridContextMenu.currentTarget
          })
        }
        if(e.target.getAttribute('id') === 'row-below'){
          GridContextMenu.insertRowBelow();
          GridContextMenu.undoArr.push({
            method: 'insertRowBelow', 
            target: GridContextMenu.currentTarget
          })
        }
        if(e.target.getAttribute('id') === 'col-leftside'){
          GridContextMenu.insertColumnLeftside();
          GridContextMenu.undoArr.push({
            method: 'insertColumnLeftside',
            target: GridContextMenu.currentTarget
          })
        }
        if(e.target.getAttribute('id') === 'col-rightside'){
          GridContextMenu.insertColumnRightside();
          GridContextMenu.undoArr.push({
            method: 'insertColumnRightside',
            target: GridContextMenu.currentTarget
          })
        }
        if(e.target.getAttribute('id') === 'remove-row' && GridContextMenu.currentTarget.tagName === 'TD'){
          GridContextMenu.removeRow();
          GridContextMenu.undoArr.push({
            method: 'removeRow',
            index: GridContextMenu.rowInd,
            row: GridContextMenu.rowToRecover
          })
          
        }
        if(e.target.getAttribute('id') === 'remove-col'){
          GridContextMenu.removeColumn();
          GridContextMenu.undoArr.push({
            method: 'removeColumn',
            index: GridContextMenu.cellInd,
            column: GridContextMenu.columnToRecover
          })
          GridContextMenu.columnToRecover = [];
        }
        if(e.target.getAttribute('id') === 'undo'){
          GridContextMenu.undo(GridContextMenu.undoArr);
        }
        if(e.target.getAttribute('id') === 'redo'){
          GridContextMenu.redo(GridContextMenu.redoArr);
        }
        console.log(GridContextMenu.undoArr)
        console.log(GridContextMenu.redoArr)
    }

    static insertRowAbove(trToAddRowBefore = GridContextMenu.currentTarget.parentNode){
        let newRow = document.createElement('tr');
        let newTd;
        let numOfTd = trToAddRowBefore.querySelectorAll('td').length;
        for(let i = 0; i < numOfTd; i++){
          newTd = document.createElement('td');
          newTd.innerHTML = `<div class="cell-text" tabindex="-1"></div>`
          newTd.setAttribute('contenteditable', 'false');
          newRow.append(newTd);
        }
        trToAddRowBefore.parentNode.insertBefore(newRow, trToAddRowBefore)
    }
    static insertRowBelow(trToAddRowBefore = GridContextMenu.currentTarget.parentNode){
        let newRow = document.createElement('tr');
        let newTd;
        let numOfTd = trToAddRowBefore.querySelectorAll('td').length ? trToAddRowBefore.querySelectorAll('td').length : trToAddRowBefore.querySelectorAll('th').length;
        console.log(numOfTd)
        for(let i = 0; i < numOfTd; i++){
          newTd = document.createElement('td');
          newTd.innerHTML = `<div class="cell-text" tabindex="-1"></div>`
          newTd.setAttribute('contenteditable', 'false');
          newRow.append(newTd);
        }
        trToAddRowBefore.after(newRow)
    }
    static insertColumnLeftside(columnToInsert = [], index = GridContextMenu.currentTarget.cellIndex){
        const TABLE_TR = GridView.tableGrid.rows;
        const TABLE_WIDTH = TABLE_TR[0].querySelectorAll('th').length;
        let currentTargetIndex = index;
        let elToInsertLeft;
        let newEl;
        if(!columnToInsert.length){
          for(let k = 0; k < TABLE_TR.length; k++){
            if(k === 0){
              newEl = document.createElement('th');
              newEl.innerHTML = `<h3 tabindex="-1" contenteditable="false"></h3> <span class="resize-handle"></span>`;
              columnToInsert.push(newEl);
            }
            if(k > 0){
              newEl = document.createElement('td');
              newEl.innerHTML = `<div class="cell-text" tabindex="-1"></div>`
              newEl.setAttribute('contenteditable', 'false');
              columnToInsert.push(newEl);
            }
          }
        }
        for(let i = 0; i < TABLE_TR.length; i++){
      
          for(let j = 0; j < TABLE_WIDTH; j++){
            if(j === currentTargetIndex && i === 0){
              elToInsertLeft = TABLE_TR[i].querySelectorAll('th')[currentTargetIndex];
              TABLE_TR[i].insertBefore(columnToInsert[i], elToInsertLeft);
            }
            if(j === currentTargetIndex && i !== 0){
              elToInsertLeft = TABLE_TR[i].querySelectorAll('td')[currentTargetIndex];
              TABLE_TR[i].insertBefore(columnToInsert[i], elToInsertLeft);
            }
          }
        }
        GridContextMenu.changeNumOfColumns(TABLE_WIDTH, 1)
    }

    static insertColumnRightside(columnToInsert = [], index = GridContextMenu.currentTarget.cellIndex){
        const TABLE_TR = GridView.tableGrid.rows;
        const TABLE_WIDTH = TABLE_TR[0].querySelectorAll('th').length;
        let currentTargetIndex = index;
        let elToInsertRight;
        let newEl;
        
        if(!columnToInsert.length){
          for(let k = 0; k < TABLE_TR.length; k++){
            if(k === 0){
              newEl = document.createElement('th');
              newEl.innerHTML = `<h3 tabindex="-1" contenteditable="false"></h3> <span class="resize-handle"></span>`;
              columnToInsert.push(newEl);
            }
            if(k > 0){
              newEl = document.createElement('td');
              newEl.innerHTML = `<div class="cell-text" tabindex="-1"></div>`
              newEl.setAttribute('contenteditable', 'false');
              columnToInsert.push(newEl);
            }
          }
        }
        for(let i = 0; i < TABLE_TR.length; i++){
      
          for(let j = 0; j < TABLE_WIDTH; j++){
            if(j === currentTargetIndex && i === 0){
              elToInsertRight = TABLE_TR[i].querySelectorAll('th')[currentTargetIndex];
              elToInsertRight.after(columnToInsert[i]);
            }
            if(j === currentTargetIndex && i !== 0){
              elToInsertRight = TABLE_TR[i].querySelectorAll('td')[currentTargetIndex];
              elToInsertRight.after(columnToInsert[i]);
            }
          }
        }
       GridContextMenu.changeNumOfColumns(TABLE_WIDTH, 1)
    }

    static removeRow(rowToRemove = GridContextMenu.currentTarget.parentNode){
        GridContextMenu.rowToRecover = GridContextMenu.currentTarget.parentNode;
        GridContextMenu.rowInd = GridContextMenu.rowToRecover.rowIndex - 1;
        rowToRemove.remove()
    }

    static removeColumn(indexCell = GridContextMenu.currentTarget.cellIndex){
        const TABLE_TR = GridView.tableGrid.rows;
        const TABLE_WIDTH = TABLE_TR[0].querySelectorAll('th').length;
        const CURR_TARGET_INDEX = indexCell;
        
        if(indexCell > 0){
            GridContextMenu.cellInd = {
                i: indexCell - 1,
                dir: 'right'
            };
        }
        if(indexCell === 0){
            GridContextMenu.cellInd = {
                i: 0,
                dir: 'left'
            };
        }
        let elToRemove;
        for(let i = 0; i < TABLE_TR.length; i++){
      
          for(let j = 0; j < TABLE_WIDTH; j++){
            if(j === CURR_TARGET_INDEX){
              elToRemove = TABLE_TR[i].children[j];
              GridContextMenu.columnToRecover.push(elToRemove);
              elToRemove.remove();
            }
          }
        }
        GridContextMenu.changeNumOfColumns(TABLE_WIDTH, -1)
    }

    
    static undo(undoArr){
        let actionToUndo = undoArr[undoArr.length-1];
        if(actionToUndo){
            if(actionToUndo.method === 'insertRowAbove'){
                GridView.tableGrid.deleteRow(actionToUndo.target.parentNode.rowIndex - 1)
            }
            if(actionToUndo.method === 'insertRowBelow'){
                GridView.tableGrid.deleteRow(actionToUndo.target.parentNode.rowIndex + 1)
            }
            if(actionToUndo.method === 'insertColumnLeftside'){
                GridContextMenu.removeColumn(actionToUndo.target.cellIndex - 1)
            }
            if(actionToUndo.method === 'insertColumnRightside'){
                GridContextMenu.removeColumn(actionToUndo.target.cellIndex + 1)
            }
            if(actionToUndo.method === 'removeRow'){
                let rowInsertNearTo = GridView.tableGrid.rows[actionToUndo.index];
                rowInsertNearTo.after(actionToUndo.row);
            }
            if(actionToUndo.method === 'removeColumn'){
                if(actionToUndo.index.dir === 'right')GridContextMenu.insertColumnRightside(actionToUndo.column, actionToUndo.index.i)
                if(actionToUndo.index.dir === 'left')GridContextMenu.insertColumnLeftside(actionToUndo.column, actionToUndo.index.i);
            }
            GridContextMenu.redoArr.push(undoArr.pop());
        }
    }
    static redo(redoArr){
        let actionToRedo = redoArr[redoArr.length - 1];
        console.log(actionToRedo)
        if(actionToRedo){
          if(actionToRedo.method === 'insertRowAbove'){
            GridContextMenu.insertRowAbove(actionToRedo.target.parentNode)
          }
          if(actionToRedo.method === 'insertRowBelow'){
            GridContextMenu.insertRowBelow(actionToRedo.target.parentNode)
          }
          if(actionToRedo.method === 'insertColumnLeftside'){
            GridContextMenu.insertColumnLeftside([], actionToRedo.target.cellIndex)
          }
          if(actionToRedo.method === 'insertColumnRightside'){
            GridContextMenu.insertColumnRightside([], actionToRedo.target.cellIndex)
          }
          if(actionToRedo.method === 'removeRow'){
            GridContextMenu.removeRow(actionToRedo.rowToRecover)
          }
          if(actionToRedo.method === 'removeColumn'){
            if(actionToRedo.index.dir === 'left')GridContextMenu.removeColumn(0);
            if(actionToRedo.index.dir === 'right')GridContextMenu.removeColumn(actionToRedo.index.i + 1)
          }
        }
        redoArr.pop();
      }
    
    static changeNumOfColumns(tableWidth, mod){
        GridView.tableGrid.style.gridTemplateColumns = `repeat(${tableWidth + mod}, fit-content(200px))`
    }

    static clickImprove(){
        document.querySelector('.wrapper').addEventListener('mousedown', (e)=>{
            if(e.target !== GridContextMenu.POP_UP_BOX && e.target.tagName !== 'LI'){
                GridContextMenu.POP_UP_BOX.style.display = 'none'
            }
            if(e.target.tagName === 'LI'){
                setTimeout(()=>GridContextMenu.POP_UP_BOX.style.display = 'none', 200)
            }
        })
    }

}