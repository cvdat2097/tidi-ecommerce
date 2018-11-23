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
    }
}
