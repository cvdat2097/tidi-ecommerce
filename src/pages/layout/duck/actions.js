import Types from './types';

const openDropdownMenu = (payload) => ({
    type: Types.OPEN_DROPDOWN_MENU,
    payload
});

const openMegaMenu = (payload) => ({
    type: Types.OPEN_MEGA_MENU,
    payload
});

export default {
    openDropdownMenu,
    openMegaMenu
};
