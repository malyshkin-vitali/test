
let index = 0;
let isTrue = true;
let data = [];


function inputChange(event) {
    let arr = [];
    const regex = new RegExp(`${event.target.value}`, 'gmi');

    if(event.target.value !== '') {
        for (let a = 0; a < data.length; a++) {
            if(regex.test(data[a].firstName) || regex.test(data[a].lastName)) {
                arr.push(a);
            }
            else {
                document.querySelectorAll('.rows').forEach(row => {
                    if(arr.includes(+row.id.slice(2))) {
                        row.classList.remove('invalidSearch')
                    }
                    else row.classList.add('invalidSearch')
                })

            }
        }
    }

    else {
        document.querySelectorAll('tr').forEach(row => {
            row.classList.remove('invalidSearch')
        })
    }


}
const root = document.querySelector('.root');

const requestURL = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&adress=%7BaddressObject%7D&description=%7Blorem%7C32';

const getData = async () => (await fetch(requestURL)).json();

getData().then(requestData => {
    data = requestData;
    const table = new Table();
    table.create();
    document.querySelector('table').addEventListener('click', eventStatistics);

} );

class Table {

    create() {
        const inputWrapper = document.createElement('div');
        inputWrapper.classList.add('inputWrapper');
        root.prepend(inputWrapper);
        const mainInput = document.createElement('input');
        const labelInput = document.createElement('label');
        labelInput.for = 'search';
        labelInput.innerHTML = 'Search by name';
        inputWrapper.append(labelInput);
        mainInput.type = 'text';
        mainInput.id = 'search';
        inputWrapper.append(mainInput)
        mainInput.oninput = inputChange;

        const table = document.createElement('table');
        const tableHead = document.createElement('thead');
        const tableBody = document.createElement('tbody');
        const tableHead__tr = document.createElement('tr');
        const tableHead__th1 = document.createElement('th');
        const tableHead__th2 = document.createElement('th');
        const tableHead__th3 = document.createElement('th');
        const tableHead__th4 = document.createElement('th');
        const tableHead__th5 = document.createElement('th');
        const tableHead__th6 = document.createElement('th');
        root.append(table);
        table.append(tableHead);
        table.append(tableBody)
        tableHead.append(tableHead__tr);
        tableHead__tr.append(tableHead__th1);
        tableHead__tr.append(tableHead__th2);
        tableHead__tr.append(tableHead__th3);
        tableHead__tr.append(tableHead__th4);
        tableHead__tr.append(tableHead__th5);
        tableHead__tr.append(tableHead__th6);
        tableHead__th1.textContent = 'id';
        tableHead__th2.textContent = 'First name';
        tableHead__th3.textContent = 'Last name';
        tableHead__th4.textContent = 'Email';
        tableHead__th5.textContent = 'Phone';
        tableHead__th6.textContent = 'State';
        tableHead__th1.classList.add('tableHeader')
        tableHead__th2.classList.add('tableHeader')
        tableHead__th3.classList.add('tableHeader')
        tableHead__th4.classList.add('tableHeader')
        tableHead__th5.classList.add('tableHeader')
        tableHead__th6.classList.add('tableHeader')
        tableHead__th1.id = 'numbers1';
        tableHead__th2.id = 'letters1';
        tableHead__th3.id = 'letters2';
        tableHead__th4.id = 'letters3';
        tableHead__th5.id = 'letters4';
        tableHead__th6.id = 'letters5';

        const creatDataRow = (data) => {
            const tr = document.createElement('tr');
            tr.id = `id${index++}`;
            tr.classList.add('rows')
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const td5 = document.createElement('td');
            const td6 = document.createElement('td');
            tableBody.append(tr);
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
            tr.append(td6);
            td1.textContent = data.id;
            td2.textContent = data.firstName;
            td3.textContent = data.lastName;
            td4.textContent = data.email;
            td5.textContent = data.phone;
            td6.textContent = data.adress.state;
            td1.classList.add('tableCell')
            td2.classList.add('tableCell')
            td3.classList.add('tableCell')
            td4.classList.add('tableCell')
            td5.classList.add('tableCell')
            td6.classList.add('tableCell')
        }


        for (let i = 0; i < data.length; i++) {
            creatDataRow(data[i])
        }
    }





}




function sortTable(index, inverse, type) {
    const table = document.querySelector('table')
    const tbody = table.querySelector('tbody')
    function compare(RowA, RowB) {
        const rowDataA = RowA.cells[index].innerHTML;
        const rowDataB = RowB.cells[index].innerHTML;

        switch (type) {
            case 'num':
                return rowDataA - rowDataB;
            case 'text':
                if (rowDataA < rowDataB) return -1;
                else if (rowDataA > rowDataB) return 1;
                return 0;
         }

    }

    function compareInverse(RowA, RowB) {
        const rowDataA = RowA.cells[index].innerHTML;
        const rowDataB = RowB.cells[index].innerHTML;
        switch (type) {
            case 'num':
                return rowDataB - rowDataA;
            case 'text':
                if (rowDataA > rowDataB) return -1;
                else if (rowDataA < rowDataB) return 1;
                return 0;


        }

    }

    let rows = [].slice.call(tbody.rows)



    if(!inverse) {
        rows.sort(compare);

    } else {
        rows.sort(compareInverse);

    }

    table.removeChild(tbody);

    for (let i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i]);
    }


    table.appendChild(tbody);
}
function eventStatistics(e) {

    if (e.target.tagName === 'TH') {
        const inverse = e.target.classList.contains('inverse-sort');
        if (e.target.id.slice(0, 7) === 'numbers') {
            document.getElementById(e.target.id).classList.toggle('inverse-sort');
            const index = e.target.cellIndex;
            sortTable(index, inverse, 'num')
        } else {
            document.getElementById(e.target.id).classList.toggle('inverse-sort');
            const index = e.target.cellIndex;
            sortTable(index, inverse, 'text')
        }
        const headers = document.querySelectorAll('th');
        Array.from(headers).forEach((item) => {
            item.classList.remove('inverse-sort-click');
            if (item.id !== e.target.id) {
                item.classList.remove('inverse-sort');
            }
        });
        document.getElementById(e.target.id).classList.add('inverse-sort-click');

    }

    else if(e.target.closest('tr')) {



        if(isTrue) {
           const infoTable = document.createElement('div');
            infoTable.classList.add('infoTable')
            root.append(infoTable);


            const TITLE = document.createElement('p');
            TITLE.innerHTML = 'Profile Info:';
            infoTable.append(TITLE);

            const SELECTED_PROFILE = document.createElement('p');
            SELECTED_PROFILE.innerHTML = `Selected profile: ${e.target.closest('tr').children[1].innerHTML} ${e.target.closest('tr').children[2].innerHTML}`;
            SELECTED_PROFILE.id = 'SELECTED_PROFILE'
            infoTable.append(SELECTED_PROFILE);

            const DESCRIPTION = document.createElement('p');
            DESCRIPTION.innerHTML =  `Description: ${data[+e.target.closest('tr').id.slice(2)].description}`;
            DESCRIPTION.id = 'DESCRIPTION';
            infoTable.append(DESCRIPTION)

            const ADDRESS = document.createElement('p');
            ADDRESS.innerHTML = `Address: ${data[+e.target.closest('tr').id.slice(2)].adress.streetAddress}`;
            ADDRESS.id = 'ADDRESS';
            infoTable.append(ADDRESS);

            const CITY = document.createElement('p');
            CITY.innerHTML = `City: ${data[+e.target.closest('tr').id.slice(2)].adress.city}`
            CITY.id = 'CITY';
            infoTable.append(CITY);

            const STATE = document.createElement('p');
            STATE.innerHTML = `State: ${data[+e.target.closest('tr').id.slice(2)].adress.state}`;
            STATE.id = 'STATE';
            infoTable.append(STATE);

            const INDEX = document.createElement('p');
            INDEX.innerHTML = `Index: ${data[+e.target.closest('tr').id.slice(2)].adress.zip}`;
            INDEX.id = 'INDEX';
            infoTable.append(INDEX);

            isTrue = false;


        }
        else {
            document.querySelector('#SELECTED_PROFILE').innerHTML = `Selected profile: ${e.target.closest('tr').children[1].innerHTML} ${e.target.closest('tr').children[2].innerHTML}`;
            document.querySelector('#DESCRIPTION').innerHTML = `Description: ${data[+e.target.closest('tr').id.slice(2)].description}`;
            document.querySelector('#ADDRESS').innerHTML = `Address: ${data[+e.target.closest('tr').id.slice(2)].adress.streetAddress}`;
            document.querySelector('#CITY').innerHTML = `City: ${data[+e.target.closest('tr').id.slice(2)].adress.city}`;
            document.querySelector('#STATE').innerHTML = `State: ${data[+e.target.closest('tr').id.slice(2)].adress.state}`;
            document.querySelector('#INDEX').innerHTML = `Index: ${data[+e.target.closest('tr').id.slice(2)].adress.zip}`;
        }
    }
}


