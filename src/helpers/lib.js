import React from 'react';
import swal from 'sweetalert2';

export const withCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const generateRandomString = () => {
    let n = 5;
    let s = '';
    while (n-- > 0) {
        s += String.fromCharCode(Math.floor(Math.random() * 10) + 65);
    }

    return s;
}

export const generateTableHeaders = (cols) => {
    let r = [];

    cols.forEach((header, id) => {
        r.push(
            <th scope="col" key={id}>{header}</th>
        )
    });

    return <tr>{r}</tr>
}

export const showAlert = (message, type = 'success', position = 'top-end') => {
    swal({
        position: position,
        type: type,
        title: message,
        showConfirmButton: false,
        timer: 1500,
        backdrop: false,
        customClass: 'add-to-cart-alert',
        showCloseButton: true,
        toast: true
    });
}

export default {
    generateRandomString,
    generateTableHeaders,
    withCommas
}
