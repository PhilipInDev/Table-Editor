'use strict'

import GridContextMenu from "./GridContextMenu";
import MenusControlers from "./MenusControlers";
import HandleFiles from "./HandleFiles";
import GridOnClick from "./GridOnClick";

export default class GridView{
    constructor(){}

    static tableGrid = document.querySelector('.table-grid');
    static tableWrapper = document.querySelector('.table-grid-wrapper')
    static th = document.createElement('th');
    static td = document.createElement('td');
    static tr = document.createElement('tr');
    static thead = document.createElement('thead');
    static tbody = document.createElement('tbody');

    static unsavedTables = {};


    static drawTable(e){

        if(GridView.tableGrid.getAttribute('data-file-name') !== e.target.parentNode.getAttribute('data-file-name')){
            let currentTableValue = GridView.readGridCellsValues();

            if(GridView.tableGrid.getAttribute('data-file-name')){
                HandleFiles.changeFileValueAtStorage(GridView.tableGrid.getAttribute('data-file-name'), currentTableValue, true)
            }

            GridOnClick.previousTarget = null;
            GridContextMenu.undoArr = [];
            GridContextMenu.redoArr = [];

            GridView.tableGrid.querySelectorAll('*').forEach(n => n.remove());
            GridView.tableGrid.setAttribute('data-file-name', e.target.parentNode.getAttribute('data-file-name'))

            const FILE_STR = sessionStorage.getItem(e.target.parentNode.getAttribute('data-file-name'));
            const FILE = JSON.parse(FILE_STR);
            let fileArr = HandleFiles.csvToArray(FILE.result);
            let TABLE_WIDTH = fileArr[0].length;
            console.log(fileArr)
            let fileRow = [];
            let tr, th, td;
            GridView.tableGrid.append(GridView.thead);
            GridView.tableGrid.append(GridView.tbody);
            for(let i = 0; i < fileArr.length; i++){
                fileRow = fileArr[i];
                tr = document.createElement('tr')
                for(let j = 0; j < fileRow.length; j++){
                    if(i === 0 && fileRow.length){
                        th = document.createElement('th');
                        th.innerHTML = `<h3 contenteditable="false" tabindex="-1">${fileRow[j]}</h3><span class="resize-handle">`
                        tr.append(th)
                        
                    }
                    if(i > 0 && fileRow.length){
                        td = document.createElement('td');
                        td.innerHTML = `<div class="cell-text" contenteditable="false" tabindex="-1">${fileRow[j]}</div>`
                        tr.append(td)
                    }
                }
                if(i === 0){
                    GridView.tableGrid.querySelector('thead').append(tr);
                }
                if(i > 0){
                    GridView.tableGrid.querySelector('tbody').append(tr);
                }
            }
            GridContextMenu.changeNumOfColumns(TABLE_WIDTH, 0)
        }
    }

    static readGridCellsValues(){
        let allCells = GridView.tableGrid.querySelectorAll('h3, .cell-text');
        let tableWidth = GridView.tableGrid.querySelectorAll('h3').length;
        let result = '';
        const VALUES_READER = (el, ind, tableWidth, isComma) =>{
            if((ind + 1) % tableWidth !== 0){
                result += isComma ? '"' + el.textContent + '",' : el.textContent + ',';
            }
            if((ind + 1) % tableWidth === 0 && ind !== allCells.length && ind !== 0){
                result += isComma ? '"' + el.textContent + '"' : el.textContent;
                result += '\n';
            }
        }
        allCells.forEach((el, ind) => {
            if(!el.textContent.includes(',')){
                VALUES_READER(el,ind,tableWidth, false)
            }
            if(el.textContent.includes(',')){
                VALUES_READER(el,ind,tableWidth, true)
            }
        })
        return result.trim();
    }
}
