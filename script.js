'use strict'
import UploadFromDragNDrop from './class/UploadFromDragNDrop';
import GridOnClick from './class/GridOnClick';
import GridResp from './class/GridResp';
import GridContextMenu from './class/GridContextMenu';
import GridView from './class/GridView';
import GridSelection from './class/GridSelection';
import GridKeyboardSnippets from './class/GridKeyboardSnippets';
import HandleFiles from "./class/HandleFiles";
import contenteditableMaxLength from 'contenteditable-max-length';
import MenusControlers from './class/MenusControlers';

let mainPageDropZone = new UploadFromDragNDrop('dropArea')
let fileInput = document.getElementById('fileInput');
fileInput.onchange = ()=>{
    if(UploadFromDragNDrop.validateSizeAndNum(fileInput.files)){
        UploadFromDragNDrop.validateTypeAndChooseHandler(fileInput.files, ['CSV'])
    }
}
mainPageDropZone.useAsDropZone(['CSV'])

MenusControlers.dropAndDownOpenerInit(
    document.getElementById('upload'),
    document.querySelector('.upload-button-box')
    );
MenusControlers.filePanelOpenerInit(
    document.querySelector('.file-panel-open-button'),
    document.querySelector('.file-panel-open-button-box')
    );

let key;
let fileObj;
let classOfDnDfileIcon;
for(let i = 0; i < sessionStorage.length; i++){
    key = sessionStorage.key(i);
    fileObj = JSON.parse(sessionStorage.getItem(key))
    if(fileObj.name){
        classOfDnDfileIcon = HandleFiles.iconChooser(fileObj.type)
        HandleFiles.createFileViewAtMenus(fileObj, key, document.querySelector('.file-container'), classOfDnDfileIcon, true); 
    }      
}

let unsubscribe;
let fileNameArr = document.querySelectorAll('.file-panel__file-name')
for(let k = 0; k < fileNameArr.length; k++){
unsubscribe = contenteditableMaxLength({
  element: fileNameArr[k],
  maxLength: 50
})
};

const WRAPPER = document.querySelector('.wrapper');

GridView.tableGrid.onmousemove = (e)=>{
  GridContextMenu.pageX = e.pageX;
  GridContextMenu.pageY = e.pageY;
}

GridContextMenu.POP_UP_BOX.addEventListener('click', GridContextMenu.contextMenuClickControler);
GridView.tableGrid.addEventListener('contextmenu', GridContextMenu.contextmenuPopUp)
GridContextMenu.clickImprove();


WRAPPER.addEventListener('click', GridOnClick.cellOnClick)
GridView.tableGrid.addEventListener('dblclick', GridOnClick.cellOnDblClick)


GridView.tableGrid.addEventListener('mousedown', GridResp.initTableResponsivnes)


GridSelection.selectionSettings();
GridSelection.initSelection();


GridView.tableGrid.addEventListener('keydown', GridKeyboardSnippets.copyTextMain);
GridView.tableGrid.addEventListener('keydown', GridKeyboardSnippets.pasteText);
GridView.tableGrid.addEventListener('keydown', GridKeyboardSnippets.deleteCellTextOnKeyDown)
GridView.tableGrid.addEventListener('keydown', GridKeyboardSnippets.cutFromTable)
GridView.tableGrid.addEventListener('keyup', GridKeyboardSnippets.cleanKeysPressed);


// function sortTable(e) {
//     let table, rows, switching, x, y, shouldSwitch, dir, switchcount = 0;
//     table = document.querySelector('.table-grid');
//     switching = true;
//     // Set the sorting direction to ascending:
//     dir = "asc";
//     /* Make a loop that will continue until
//     no switching has been done: */
//     while (switching) {
//       // Start by saying: no switching is done:
//       switching = false;
//       rows = table.rows;
//       /* Loop through all table rows (except the
//       first, which contains table headers): */
//       for (let i = 1; i < (rows.length - 1); i++) {
//         // Start by saying there should be no switching:
//         shouldSwitch = false;
//         /* Get the two elements you want to compare,
//         one from current row and one from the next: */
//         x = rows[i].querySelector(`${e.target.getAttribute('class')}`);
//         y = rows[i + 1].querySelector(`${e.target.getAttribute('class')}`);
//         /* Check if the two rows should switch place,
//         based on the direction, asc or desc: */
//         if (dir == "asc") {
//           if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//             // If so, mark as a switch and break the loop:
//             shouldSwitch = true;
//             break;
//           }
//         } else if (dir == "desc") {
//           if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
//             // If so, mark as a switch and break the loop:
//             shouldSwitch = true;
//             break;
//           }
//         }
//       }
//       if (shouldSwitch) {
//         /* If a switch has been marked, make the switch
//         and mark that a switch has been done: */
//         rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//         switching = true;
//         // Each time a switch is done, increase this count by 1:
//         switchcount ++;
//       } else {
//         /* If no switching has been done AND the direction is "asc",
//         set the direction to "desc" and run the while loop again. */
//         if (switchcount == 0 && dir == "asc") {
//           dir = "desc";
//           switching = true;
//         }
//       }
//     }
//   }

