'use strict'


import GridView from "./GridView";
import HandleFiles from "./HandleFiles";

export default class MenusControlers{
    constructor(){}

    static dropArea = {
        dropAreaEl: document.querySelector('#dropArea'),
        classWhichOpen: 'open-upload'
    }

    static filePanel = {
        filePanelEl: document.querySelector('.file-panel'),
        filePanelOpen:'open-file-panel',
        fileBoxClass:'.file-panel__file-box',
        fileBoxOpen:'open-file-box',
        fileNameClass: 'file-panel__file-name',
        fileEmptyCaution: document.querySelector('.file-panel__empty-caution'),
        fileEmptyCautionOpen: 'open-fp-empty-caution'
    }

    static dropAndDownOpenerInit(upload, buttonBox){
        upload.onclick = function (){
            MenusControlers.dropArea.dropAreaEl.classList.toggle(MenusControlers.dropArea.classWhichOpen)
            MenusControlers.buttonClicked(buttonBox)
            MenusControlers.filePanel.filePanelEl.classList.remove(MenusControlers.filePanel.filePanelOpen);
            if(MenusControlers.filePanel.fileEmptyCaution){
                MenusControlers.filePanel.fileEmptyCaution.classList.remove(MenusControlers.filePanel.fileEmptyCautionOpen)
            }
            document.querySelectorAll(MenusControlers.filePanel.fileBoxClass).forEach((elem)=>{
                elem.classList.remove(MenusControlers.filePanel.fileBoxOpen)
            })
        }
    }

    static filePanelOpenerInit(openButton, buttonBox){
        openButton.onclick = function(){
            MenusControlers.filePanel.filePanelEl.classList.toggle(MenusControlers.filePanel.filePanelOpen)
            let fileBoxes = document.querySelectorAll(MenusControlers.filePanel.fileBoxClass)
            let transitionTime = 0.1;
            const STEP = 0.12;
            MenusControlers.buttonClicked(buttonBox);
            MenusControlers.dropArea.dropAreaEl.classList.remove(MenusControlers.dropArea.classWhichOpen);
            if(MenusControlers.filePanel.fileEmptyCaution){
                MenusControlers.filePanel.fileEmptyCaution.classList.toggle(MenusControlers.filePanel.fileEmptyCautionOpen)
            }
            if(MenusControlers.filePanel.fileEmptyCaution && sessionStorage.length !== 0){
                MenusControlers.filePanel.fileEmptyCaution.classList.remove(MenusControlers.filePanel.fileEmptyCautionOpen)
            }
            fileBoxes.forEach((elem) => {
                   elem.classList.toggle(MenusControlers.filePanel.fileBoxOpen);
                   elem.style.transition = `width ${transitionTime}s ease .2s, height .2s ease 0s`;
                   transitionTime += STEP;
            })

        }
    }

    static buttonClicked(buttonBox){
        let bool = buttonBox.classList.contains('menu-controlers-clicked');
        document.querySelectorAll('.menu-controlers-clicked').forEach((elem)=>{
            elem.classList.remove('menu-controlers-clicked')
        })
        if(!bool){
          buttonBox.classList.add('menu-controlers-clicked')  
        }
    }
    
    static listenAndAddChangesToFileName(){
        MenusControlers.filePanel.filePanelEl.addEventListener('focusout', (e) =>{
            if(e.target.getAttribute('class') === MenusControlers.filePanel.fileNameClass){
                let ssFileObj = JSON.parse(sessionStorage.getItem(e.target.parentNode.getAttribute('data-file-name')));
                ssFileObj.name = e.target.textContent;
                
                sessionStorage.setItem(e.target.parentNode.getAttribute('data-file-name'), JSON.stringify(ssFileObj));
            }
        })
    }

    static addRemoveOnClick(storageName,...removeButtons) {
        removeButtons.forEach((elem)=>{
            elem.onclick = () =>{
               MenusControlers.removeFile(storageName)
            } 
        });
    }
    
    static onclickControllerFilePanel(){

        MenusControlers.filePanel.filePanelEl.onclick = function(e){
            if(e.target.getAttribute('class') === 'file-panel__save-file-as'){
                document.querySelector('.save-as').classList.add('open-disp-flex-op-vis');
                document.querySelector('body').classList.add('lock-budy')
                document.querySelector('.save-as').downloadMethod = HandleFiles.downloadFile;
                document.querySelector('.save-as').storageName = e.target.parentNode.getAttribute('data-file-name');
                window.addEventListener('click', HandleFiles.downloadFilesTypeChooser)
            }
            if(e.target.getAttribute('class') === 'file-panel__download-file'){
               HandleFiles.downloadFile(null, e.target.parentNode.getAttribute('data-file-name'));
            }
            if(e.target.getAttribute('class') === 'file-panel__open-file'){
                GridView.drawTable(e)
            }
            if(e.target.getAttribute('class') === 'file-panel__delete-all'){
                const SS_LENGTH = sessionStorage.length;
                let ssKeys = [];
                for(let i = 0; i < SS_LENGTH; i++){
                    ssKeys.push(sessionStorage.key(i))
                }
                for(let j = 0; j < ssKeys.length; j++){
                    MenusControlers.removeFile(ssKeys[j])
                }
            }
            if(e.target.getAttribute('class') === 'file-panel__download-all' && sessionStorage.length > 0){
                document.querySelector('.save-as').classList.add('open-disp-flex-op-vis');
                document.querySelector('body').classList.add('lock-budy')
                document.querySelector('.save-as').downloadMethod = HandleFiles.zipAndDownloadAllFiles;
                window.addEventListener('click', HandleFiles.downloadFilesTypeChooser)
            }
        }
    }
    static removeFile(storageName){
        sessionStorage.removeItem(`${storageName}`);
        for(let el of document.querySelectorAll(`[data-file-name="${storageName}"]`)){
            if(el !== GridView.tableGrid){
                el.remove();
                continue;
            }
            GridView.tableGrid.querySelectorAll('*').forEach(n => n.remove());
            GridView.tableGrid.setAttribute('data-file-name', '') 
        }
        if(sessionStorage.length === 0){
            MenusControlers.filePanel.fileEmptyCaution.classList.add(MenusControlers.filePanel.fileEmptyCautionOpen)
        }
    }
}