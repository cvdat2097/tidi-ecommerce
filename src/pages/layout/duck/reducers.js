import Types from './types';

const INITIAL_STATE = {
    Header: {
        openDropdownMenu: false
    },
    Footer: {
    }
}

const layoutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.OPEN_DROPDOWN_MENU:
            return {
                ...state,
                Header: {
                    openDropdownMenu: action.payload !== undefined ? action.payload : !state.Header.openDropdownMenu
                }
            }

        case Types.OPEN_MEGA_MENU:
            return {
                ...state,
                Header: {
                    openMegaMenu: action.payload !== undefined ? action.payload : !state.Header.openDropdownMenu
                }
            }

        default:
            return state;
    }
}

export default layoutReducer;
