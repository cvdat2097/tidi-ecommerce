import Types from './types';

const openDropdownMenu = (payload) => ({
    type: Types.OPEN_DROPDOWN_MENU,
    payload
});

const openMegaMenu = (payload) => ({
    type: Types.OPEN_MEGA_MENU,
    payload
});

const openMenuMobile = (payload) => ({
    type: Types.OPEN_MENU_MOBILE,
    payload
});

export default {
    openDropdownMenu,
    openMegaMenu,
    openMenuMobile
};
