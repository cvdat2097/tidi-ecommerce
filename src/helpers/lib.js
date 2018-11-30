import React from 'react';

export default {
    generateTableHeaders: (cols) => {
        let r = [];

        cols.forEach((header, id) => {
            r.push(
                <th scope="col" key={id}>{header}</th>
            )
        });

        return <tr>{r}</tr>
    },

    generateRandomString: () => {
        let n = 5;
        let s = '';
        while (n-- > 0) {
            s += String.fromCharCode(Math.floor(Math.random() * 10) + 65);
        }
    
        return s;
    }
}
