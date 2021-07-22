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
                // Clear previous selection
                GridSelection.selection.clearSelection();
                GridSelection.selectedCells = [];
            }

            // Use this event to decide whether a selection should take place or not.
            // For example if the user should be able to normally interact with input-elements you 
            // may want to prevent a selection if the user clicks such a element:
        }).on('start', ({store, event}) => {

            // Unselect all elements
            for (const el of store.stored) {
                el.classList.remove('cell-selected');
            }
            // Clear previous selection
            GridSelection.selection.clearSelection();

            // A selection got initiated, you could now clear the previous selection or
            // keep it if in case of multi-selection.
            // console.log('start', evt);
        }).on('move', ({store: {changed: {added, removed}}, event}) => {

            for(let el of added){
                if(!el.classList.contains('cell-on-dblclick')){
                    el.classList.add('cell-selected');
                    el.focus();
                }
            }
            console.log(removed)
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
            container: '.table-grid-wrapper',
          
            // document object - if you want to use it within an embed document (or iframe).
          
            // Query selectors for elements which can be selected.
            selectables: ['td', 'th'],
          
            // Query selectors for elements from where a selection can be started from.
            startareas: ['h3', '.cell-text'],
          

            // Configuration in case a selectable gets just clicked.
            singleTap: {
    
                // Enable single-click selection (Also disables range-selection via shift + ctrl).
                allow: false,
                intersect: 'native'
            },
            // Specifies what should be done if already selected elements get selected again.
            //   invert: Invert selection for elements which were already selected
            //   keep: Keep selected elements (use clearSelection() to remove those)
            //   drop: Remove stored elements after they have been touched
            overlap: 'invert',
            // On which point an element should be selected.
            // Available modes are cover (cover the entire element), center (touch the center) or
            // the default mode is touch (just touching it).
            intersect: 'touch',
    
            // px, how many pixels the point should move before starting the selection (combined distance).
            // Or specifiy the threshold for each axis by passing an object like {x: <number>, y: <number>}.
            startThreshold: 10,
    
            // Scroll configuration.
            scrolling: {
    
                // On scrollable areas the number on px per frame is devided by this amount.
                // Default is 10 to provide a enjoyable scroll experience.
                speedDivider: 10,
    
                // Browsers handle mouse-wheel events differently, this number will be used as 
                // numerator to calculate the mount of px while scrolling manually: manualScrollSpeed / scrollSpeedDivider.
                manualSpeed: 750
            },
            // Query selectors for elements which will be used as boundaries for the selection.
            boundaries: ['.table-grid-wrapper']
        })
    }
}