'use strict'
import HandleFiles from "./HandleFiles";

/*
    Class UploadFromDragNDrop adds functionallity of drag and drop to the 'dropArea';
    You should make instance of class and set 'dropArea' to element you wanted to use as drag and drop zone;
    Than use method 'useAsDropZone' to this instance;


    **useAsDropZone()**{
        input: {
            handleAs: array of strings, ex: ['csv', 'excel'...]
        },
        output: -

        Method adds functionallity of drag and drop and passes uploaded files to the 'HandleFiles' class
        Files validates by static methods 'validateSizeAndNum' and 'validateTypeAndChooseHandler'- which also
        chooses handler corresponding to input object and what 'handleAs' arguments came;
        You should write additional 'if' statement at 'validateTypeAndChooseHandler' method when adding a new 
        file handler;
    }
    **validateSizeAndNum()**{
        input: {
            files: files from dataTransfer
        },
        output:{
            false: if size > 5mb or/and if number of files > 5,
            true: !-//-
        }

        Validates size and number of files;
        Shows warning by using HandleFiles.showCaution() method;
    }
    **validateTypeAndChooseHandler()**{
        input{
            files: files from dataTransfer
            handleAs: array of strings, ex: ['csv', 'excel'...]
        },
        output{
            false: if none of handlers can treat input files
        }

        Sorts files by size;
        Pushes files to the handler of corresponding type; Ex., for CSV files => HandleFiles.asCsv(SortedFiles)
    }
*/
export default class UploadFromDragNDrop{
    constructor(dropArea){
        this.dropArea = document.getElementById(dropArea) ?? document.querySelector(dropArea);
        }

    static preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }
    
    useAsDropZone(handleAs){
        
        let dropArea = this.dropArea;
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, UploadFromDragNDrop.preventDefaults, false)
          });
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false)
        });
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false)
        });
        function highlight(e) {
            dropArea.classList.add('highlight')
        }
        function unhighlight(e) {
            dropArea.classList.remove('highlight')
        }
        dropArea.addEventListener('drop', handleDrop, false);
        function handleDrop(e) {
            let dt = e.dataTransfer
            let files = dt.files 

            if(UploadFromDragNDrop.validateSizeAndNum(files)){
                UploadFromDragNDrop.validateTypeAndChooseHandler(files, handleAs);
            }
        }
    }

    static validateSizeAndNum(files){
        let sizeSum = 0;
        let uploadFilesNum = files.length;
        const MAX_FILES_NUM = 5,
              MAX_SIZE = 5000;

        let key,
            fileObj;
        for(let j = 0; j < sessionStorage.length; j++){
            key = sessionStorage.key(j);
            fileObj = JSON.parse(sessionStorage.getItem(key))

            if(fileObj.size){
                sizeSum += +fileObj.size;
                uploadFilesNum++;
            }
        }
        for(let i = 0; i < files.length; i++){
            sizeSum += +files[i].size / 1000;
        }
        
        if(sizeSum >= MAX_SIZE){
            HandleFiles.showCaution(document.querySelector('.caution-size'))
            console.log('size')
            return false;
        }
        if(uploadFilesNum > MAX_FILES_NUM){
            HandleFiles.showCaution(document.querySelector('.caution-num'))
            console.log('num')
            return false;
        }
        return true;
    }

    static validateTypeAndChooseHandler(files, choosenHandlers){
        let sortedFiles = [...files].sort((a,b) => a.size > b.size ? 1 : -1);
        for(let i = 0; i < sortedFiles.length; i++){
            if(sortedFiles[i].type === 'text/csv' && choosenHandlers.includes('CSV')){
                HandleFiles.asCsv(sortedFiles[i]);
            }else{
                console.log('not csv')
                HandleFiles.showCaution(document.querySelector('.caution-type'))
                return false;
            }
        }
    }
}