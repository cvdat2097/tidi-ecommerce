import Types from './types';

const INITIAL_STATE = {
    Header: {
        openDropdownMenu: false,
        openMegaMenu: false,
        openMenuMobile: false
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
                    ...state.Header,
                    openDropdownMenu: action.payload !== undefined ? action.payload : !state.Header.openDropdownMenu
                }
            }

        case Types.OPEN_MEGA_MENU:
            return {
                ...state,
                Header: {
                    ...state.Header,
                    openMegaMenu: action.payload !== undefined ? action.payload : !state.Header.openMegaMenu
                }
            }

        case Types.OPEN_MENU_MOBILE:
            return {
                ...state,
                Header: {
                    ...state.Header,
                    openMenuMobile: action.payload !== undefined ? action.payload : !state.Header.openMenuMobile
                }
            }

        default:
            return state;
    }
}

export default layoutReducer;
