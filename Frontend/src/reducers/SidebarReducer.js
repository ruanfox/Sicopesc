const INITIAL_STATE = {
    showSidebar: true
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case 'TOGGLE_SIDEBAR':
            state = { showSidebar: !state.showSidebar };
            return state;
        default:
            return state;
    }
}