'use strict'

import GridSelection from "./GridSelection";

export default class GridKeyboardSnippets{
    constructor(){}

    static textForClipBoard;
    static textForTable;
    static clipBoard = navigator.clipboard;
    static SELECTION_OBJ = window.getSelection();
    static keysPressed = {};

    static copyTextFromSelectedCells(){
        if(GridSelection.selectedCells.length){
          GridKeyboardSnippets.textForClipBoard = '';
          GridKeyboardSnippets.textForTable = '';
          for(let i = 0; i < GridSelection.selectedCells.length; i++){
            GridKeyboardSnippets.textForClipBoard += GridSelection.selectedCells[i].querySelectorAll('h3, div.cell-text')[0].textContent + ' ';
            GridKeyboardSnippets.textForTable += GridSelection.selectedCells[i].querySelectorAll('h3, div.cell-text')[0].textContent + '/&!/';
          }
          GridKeyboardSnippets.textForTable = GridKeyboardSnippets.textForTable.slice(0, GridKeyboardSnippets.textForTable.length - 4);
        }
    }

    static copyTextFromSelection(){
        if(!GridSelection.selectedCells.length && GridKeyboardSnippets.SELECTION_OBJ.rangeCount){
          GridKeyboardSnippets.textForClipBoard = '';
          GridKeyboardSnippets.textForTable = '';
          
          GridKeyboardSnippets.textForClipBoard = GridKeyboardSnippets.SELECTION_OBJ.toString();
          
          GridKeyboardSnippets.textForTable = GridKeyboardSnippets.SELECTION_OBJ.toString() + '/&!/';
          GridKeyboardSnippets.textForTable = GridKeyboardSnippets.textForTable.slice(0, GridKeyboardSnippets.textForTable.length - 4);
        }
    }

    static copyTextMain(e){
        GridKeyboardSnippets.keysPressed[e.key] = true;
        if(GridKeyboardSnippets.keysPressed['Control'] && e.key === 'c' && 
          (GridKeyboardSnippets.SELECTION_OBJ.rangeCount || GridSelection.selectedCells)){
          GridKeyboardSnippets.copyTextFromSelectedCells();
          GridKeyboardSnippets.copyTextFromSelection();
          console.log(GridKeyboardSnippets.textForClipBoard)
          GridKeyboardSnippets.clipBoard.writeText(GridKeyboardSnippets.textForClipBoard)
        }
      }

    static pasteText(e){
        if(GridSelection.selectedCells.length && GridKeyboardSnippets.keysPressed['Control'] && e.key === 'v'){
          
          GridKeyboardSnippets.keysPressed[e.key] = true;
      
          let textArr = GridKeyboardSnippets.textForTable.split('/&!/').length > 1 ? GridKeyboardSnippets.textForTable.split('/&!/') : [GridKeyboardSnippets.textForTable];
          let textIndex = 0;
          for(let i = 0; i < GridSelection.selectedCells.length; i++){
            GridSelection.selectedCells[i].querySelectorAll('h3, div.cell-text')[0].textContent = textArr[textIndex];
            textIndex++;
            if(textIndex === textArr.length){
              textIndex = 0;
            } 
          }
        }
    }

    static deleteCellTextOnKeyDown(e){
        if((e.key === 'Backspace' || e.key === 'Delete') && GridSelection.selectedCells.length){
          e.preventDefault();
          GridSelection.selectedCells.forEach(el =>{
            el.querySelectorAll('h3, div.cell-text')[0].textContent = '';
          });
        }
    }
    
    static cutFromTable(event){
        GridKeyboardSnippets.keysPressed[event.key] = true;
      
        if(GridKeyboardSnippets.keysPressed['Control'] && event.key == 'x') {
            GridKeyboardSnippets.copyTextFromSelectedCells();
            GridKeyboardSnippets.copyTextFromSelection();
            GridKeyboardSnippets.clipBoard.writeText(GridKeyboardSnippets.textForClipBoard)
            GridSelection.selectedCells.forEach(el =>{
              el.querySelectorAll('h3, div.cell-text')[0].textContent = '';
            });
        }
    }
    static cleanKeysPressed(event){
        delete GridKeyboardSnippets.keysPressed[event.key];
    }
}