'use strict'

export default class GridSelection{
    constructor(){}

    static selectedCells;
    static selectedTh;
    static selectedTd;
    static selection;

    static initSelection(){
        GridSelection.selection.enable();
        // console.log(selection.getSelection())
        GridSelection.selection.on('beforestart', ({store, event}) => {
            if (!event.ctrlKey && !event.metaKey) {

                // Unselect all elements
                for (const el of store.stored) {
                    el.classList.remove('cell-selected');
                }
            }
                // Clear previous selection
                GridSelection.selection.clearSelection();
                GridSelection.selectedCells = [];
            // Use this event to decide whether a selection should take place or not.
            // For example if the user should be able to normally interact with input-elements you 
            // may want to prevent a selection if the user clicks such a element:
            // selection.on('beforestart', ({event}) => {
            //   return event.target.tagName !== 'INPUT'; // Returning false prevents a selection
            // });
            // console.log(selection.getSelection())
            // console.log('beforestart', evt);
        }).on('start', ({store, event}) => {
            if (!event.ctrlKey && !event.metaKey) {

                // Unselect all elements
                for (const el of store.stored) {
                    el.classList.remove('cell-selected');
                }
            }
                // Clear previous selection
                GridSelection.selection.clearSelection();
            // A selection got initiated, you could now clear the previous selection or
            // keep it if in case of multi-selection.
            // console.log('start', evt);
        }).on('move', ({store: {changed: {added, removed}}}) => {
            // if(evt.event.target.getAttribute('class') === 'cell-text' || evt.event.target.tagName === 'H3'){
                // evt.event.target.classList.add('cell-selected');
            // }

            for(let el of added){
                if(!el.classList.contains('cell-on-dblclick')){
                el.classList.add('cell-selected');
                el.focus();
                }
                // RANGE.selectNodeContents(el)
                // SELECTION_OBJ.addRange(RANGE);
                // console.log(RANGE)
                // console.log(SELECTION_OBJ.rangeCount);
            }
            for(let el of removed){
                el.classList.remove('cell-selected');
            }  
        // Here you can update elements based on their state.
        // console.log('move', evt);
        }).on('stop', ({store: {selected}})=> {
            GridSelection.selection.keepSelection();
            GridSelection.selectedCells = [];
            GridSelection.selectedTd = [];
            GridSelection.selectedTh = [];
            // Do something with the selected elements.
            selected.forEach(el=>{
                if(el.tagName === 'TH' && !el.classList.contains('cell-on-dblclick')){
                GridSelection.selectedTh.push(el)
                }
                if(el.tagName === 'TD' && !el.classList.contains('cell-on-dblclick')){
                GridSelection.selectedTd.push(el)
                }
            })

            if(GridSelection.selectedTh.length && GridSelection.selectedTd.length){
                GridSelection.selectedCells.push(...GridSelection.selectedTh);
                GridSelection.selectedCells.push(...GridSelection.selectedTd);
            }
            if(!GridSelection.selectedTh.length && GridSelection.selectedTd.length){
                GridSelection.selectedCells.push(...GridSelection.selectedTd);
            }
            if(GridSelection.selectedTh.length && !GridSelection.selectedTd.length){
                GridSelection.selectedCells.push(...GridSelection.selectedTh);
            }
        });
    }

    static selectionSettings(){
        GridSelection.selection = new SelectionArea({

            // Class for the selection-area itself (the element).
            selectionAreaClass: 'selection-area',
          
            // Class for the selection-area container.
            selectionContainerClass: 'selection-area-container',
          
            // Query selector or dom-node to set up container for the selection-area element.
            container: 'body',
          
            // document object - if you want to use it within an embed document (or iframe).
          
            // Query selectors for elements which can be selected.
            selectables: ['td', 'th'],
          
            // Query selectors for elements from where a selection can be started from.
            startareas: ['h3', '.cell-text'],
          
            singleTap: {
          
              // Enable single-click selection (Also disables range-selection via shift + ctrl).
              allow: false,
          
              // 'native' (element was mouse-event target) or 'touch' (element visually touched).
              intersect: 'touch'
          },
          
            // Query selectors for elements which will be used as boundaries for the selection.
            boundaries: ['.table-grid'],
          
          });
    }
}