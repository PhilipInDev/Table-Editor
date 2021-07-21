'use strict'

import MenusControlers from "./MenusControlers";
import JSZip from "jszip";
import GridView from "./GridView";
/*
    HandleFiles class has methods to read files with FileReader and create there view in html document;
    You shold add there methods for handling files in format 'as/Type/', such as asExcel, asTxt and others;

    **asCsv()**{
        input:{
            file: file from dataTransfer(only 1) :object
        },
        output:{
            false: if file has a copy at sessionStorage
        }

        If file doesn`t have a copy at sessionStorage, it would be added there with the key set to file.name without .type ending;
        If there is/are file/s with the same name, numbers 1-5 would be added in the and of the file.name;
        Stringifyed: fileAtSStorage{
                        name: file.name,
                        type: type,
                        result: FileReader result,
                        size: file.size/1000
                    }
        Calls HandleFiles.createFileViewAtMenus() 
    }

    **createFileViewAtMenus()**{
        input:{
            file: from sessionStorage  :string,
            storageName: key for sessionStorag  :string,
            fileContainer: element where method will create html view  :HTML element,
            iconClass: class for icon(csv, excel..)  :string,
            readiness: load completed of error  :bool
        }
        output: -
        
        Adds html elements with information about files to 'file-panel' and 'file-container';
        Calls MenusControlers methods(listenAndAddChangesToFileName(),onclickControllerFilePanel, addRemoveOnClick()) to add onclick events on buttons and make file-name editable;
    }

    **iconChooser()**{
        input: {
            type: files` type. Ex: 'text/csv' or 'csv  :string
        }
        output: class of icon which corresponds to files` type
    }
*/




export default class HandleFiles{
    constructor(){
    }
    
    static asCsv(file){

        let fileContainer = document.querySelector('.file-container');
        let readers = new FileReader();

        readers.readAsText(file);
        
        readers.onerror = () =>{
            console.log('Error uploading');
            HandleFiles.createFileViewAtMenus(file, file.name, fileContainer, 'fas fa-file-csv csv-icon', false)
        }
        readers.onload = () =>{
            let newName = HandleFiles.addNewFileToStorage(file, readers.result.trim(), true);
            HandleFiles.createFileViewAtMenus(sessionStorage.getItem(newName), newName, fileContainer, 'fas fa-file-csv csv-icon', true)
        }
    }

    static createFileViewAtMenus(file, storageName, fileContainer, iconClass,  readiness){
        file = typeof file === 'string' ? JSON.parse(file) : file;
        let fileBox = document.createElement('div'),
            icon = document.createElement('i'),
            fileName = document.createElement('p'),
            progress = document.createElement('div'),
            trash = document.createElement('i');
            
        fileBox.setAttribute('class', 'file-box');
        fileBox.setAttribute('data-file-name', `${storageName}`);
        icon.setAttribute('class', iconClass);
        fileName.setAttribute('class', 'file-name');
        fileName.setAttribute('title', `${file.name}`)
        fileName.textContent = file.name;
        progress.setAttribute('class', 'progress');
        trash.setAttribute('class', 'fas fa-trash file-trash-icon trash');
        fileBox.append(icon, fileName, progress, trash);
        fileContainer.append(fileBox);

        let filePanel = document.querySelector('.file-panel');
        let openFileBox = filePanel.classList.contains('open-file-panel') ? 'open-file-box': '';
        fileBox = document.createElement('div');
        fileBox.setAttribute('class', `file-panel__file-box ${openFileBox}`);
        fileBox.setAttribute('data-file-name', storageName);

        fileBox.innerHTML = `<i class="${iconClass} file-panel__icon"></i>
        <p class="file-panel__file-name" contenteditable="true">${file.name}</p>
        <p class="file-panel__file-type">${file.type.toLowerCase()}</p>
        <p class="file-panel__file-size">${(+file.size).toFixed(1)+'KB'}</p>
        <i class="far fa-trash-alt trash" ></i>
        <button class="file-panel__save-file-as">Save As</button>
        <button class="file-panel__download-file">Download</button>
        <button class="file-panel__open-file">Open</button>`;
        document.querySelector('.file-panel__empty-caution')?.classList.remove('open-fp-empty-caution')
        filePanel.append(fileBox);
        MenusControlers.listenAndAddChangesToFileName();
        if(typeof filePanel.onclick !== 'function'){
            MenusControlers.onclickControllerFilePanel(file);
        }
        
        for(let el of document.querySelectorAll('.fa-trash-alt')){
            if(typeof el.onclick !== "function"){
                MenusControlers.addRemoveOnClick(storageName, trash, el);
            }
        }
        
        if(readiness){
            let progressDone = document.createElement('i');
            progressDone.setAttribute('class', 'fas fa-check progress-done');
            progress.style.border = '2px solid rgb(70, 180, 55)';
            progress.append(progressDone);
        }
        if(!readiness){
            let progressError = document.createElement('i');
            progressError.setAttribute('class', 'fas fa-times progress-error');
            progress.append(progressError);
        }
    } 

    static showCaution(elem){
        elem.style.animation = 'caution 3s linear';
        setTimeout(()=>elem.style.animation = 'none', 3000)
    }

    static iconChooser(type){
        type = type.toLowerCase();
        if(type === 'text/csv' || type === 'csv'){
            return 'fas fa-file-csv csv-icon';
        }
    }

    static csvToArray(text) {
        let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
        for (l of text) {
            if ('"' === l) {
                if (s && l === p) row[i] += l;
                s = !s;
            } else if (',' === l && s) l = row[++i] = '';
            else if ('\n' === l && s) {
                if ('\r' === p) row[i] = row[i].slice(0, -1);
                row = ret[++r] = [l = '']; i = 0;
            } else row[i] += l;
            p = l;
        }
        return ret;
    };

    static addNewFileToStorage(fileObj = {}, convertedValue = '', sessionStor = null){
        const STORAGE = sessionStor ? sessionStorage : localStorage;
        const FILE_NAME = (fileObj.name).slice(0, (fileObj.name).indexOf('.'));
        const TYPE = (fileObj.name).slice((fileObj.name).indexOf('.') + 1, fileObj.name.length);
        if(!STORAGE || !FILE_NAME || !TYPE){
            console.log('Adding file to storage missed');
            return false;
        }
        let strToAddInStor = JSON.stringify({
            result: convertedValue,
            name: FILE_NAME,
            size: `${fileObj.size / 1000}`,
            type: TYPE
        });
        let key;
        let storageName = FILE_NAME;
        let number = 0;
        for(let k = 0; k < STORAGE.length; k++){
            key = STORAGE.key(k);
            if(strToAddInStor === STORAGE.getItem(key)){
                console.log('in')
                HandleFiles.showCaution(document.querySelector(`[data-file-name="${FILE_NAME}"]`));
                return false;
            }
            if(FILE_NAME === key){
                number++;
                storageName +=`${number}`;
            }
        }
        
        STORAGE.setItem(`${storageName}`, strToAddInStor);

        return storageName;
    }

    static deleteFileFromStorage(storageName = '', sessionStor = null){
        const STORAGE = sessionStor ? sessionStorage : localStorage;

        if(STORAGE && storageName){
            STORAGE.removeItem(storageName);
            return true;
        }
        console.log('Delete from storage missed')
        return false;
    }

    static changeFileValueAtStorage(storageName = '', newValue = '', sessionStor = null){
        const STORAGE = sessionStor ? sessionStorage : localStorage;
        let file = JSON.parse(STORAGE.getItem(storageName));

        if(storageName && STORAGE){
            file.result = newValue;
            STORAGE.setItem(storageName, JSON.stringify(file));
            return file;
        }
        console.log('Changing storage file value missed')
        return false;
    }

    static byteCount(s) {
        return encodeURI(s).split(/%..|./).length - 1;
    }

    static downloadFile(typeArg, storageName){

        if(GridView.tableGrid.getAttribute('data-file-name')){
            HandleFiles.changeFileValueAtStorage(GridView.tableGrid.getAttribute('data-file-name'), GridView.readGridCellsValues(), true)
        }

        const ELEMENT = document.createElement('a');
        const FILE_STR = sessionStorage.getItem(storageName);
        const FILE = JSON.parse(FILE_STR)
        let type = typeArg ? typeArg : FILE.type;
        let blob = new Blob([FILE.result], {type: 'text/csv'});

        
        ELEMENT.setAttribute('href', URL.createObjectURL(blob));
        ELEMENT.setAttribute('download', `${FILE.name + '.' + type}`);
        ELEMENT.style.display = 'none';
        document.querySelector('body').append(ELEMENT);
        ELEMENT.click();
        document.querySelector('body').removeChild(ELEMENT);
    }

    static zipAndDownloadAllFiles(typeArg){
        let zip = new JSZip();
        let key = '';
        let file = {};
        let type;
        const DOWNLOAD_LINK = document.createElement('a');
        
        if(GridView.tableGrid.getAttribute('data-file-name')){
            HandleFiles.changeFileValueAtStorage(GridView.tableGrid.getAttribute('data-file-name'), GridView.readGridCellsValues(), true)
        }
        for(let i = 0; i < sessionStorage.length; i++){
            key = sessionStorage.key(i);
            file = JSON.parse(sessionStorage.getItem(key))
            type = typeArg ? typeArg : file.type;
            zip.file(`${key + '.' + type}`, file.result);
        }
        zip.generateAsync({type:"blob"}).then(function(content) {
            DOWNLOAD_LINK.href =  URL.createObjectURL(content);
            DOWNLOAD_LINK.download = "tables_pack.zip";
            document.querySelector('body').append(DOWNLOAD_LINK);
            DOWNLOAD_LINK.click();
            DOWNLOAD_LINK.remove();
        });
    }

    static downloadFilesTypeChooser(e){
        let optionClass = e.target.getAttribute('class');
        let saveAsBox = document.querySelector('.save-as');
        console.log(e.target)
        if((optionClass === 'save-as__option' || optionClass === 'save-as__text') && e.target.getAttribute('data-file-type') === 'csv'){
            saveAsBox.downloadMethod('csv', saveAsBox.storageName)
        }
        if((optionClass === 'save-as__option' || optionClass === 'save-as__text') && e.target.getAttribute('data-file-type') === 'xlsx'){
            saveAsBox.downloadMethod('xlsx', saveAsBox.storageName)
        }
        if((optionClass === 'save-as__option' || optionClass === 'save-as__text') && !e.target.getAttribute('data-file-type')){
            saveAsBox.downloadMethod(null, saveAsBox.storageName)
        }
        if((optionClass === 'save-as__option' || optionClass === 'save-as__text') || e.target === document.querySelector('body')){
            window.removeEventListener('click', HandleFiles.downloadFilesTypeChooser)
            document.querySelector('.save-as').classList.remove('open-disp-flex-op-vis');
            document.querySelector('body').classList.remove('lock-budy')
        }

    }
}