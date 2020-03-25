'use strict';

function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open("GET", "./felfedezesek.csv", true);
    xhttp.send();
}

let ertek = '';
let szoveg = '';
let map = new Map();

function myFunction(that) {
    let fileTartalom = that.responseText;

    let tomb = fileTartalom.split('\n');
    let okor = 0;

    szoveg = '<p>2. Feladat: Adatok beolvasása</p>';

    szoveg += '<table><tr>';
    let elsoSor = tomb[0].split(';');
    for (let i = 0; i < elsoSor.length; i++) {
        szoveg += `<th>${elsoSor[i]}</th>`;
    }

    for (let j = 1; j < tomb.length; j++) {
        let sorTomb = tomb[j].split(';');
        map.set(j, sorTomb);
        szoveg += '<tr>';
        for (let i = 0; i < sorTomb.length; i++) {
            szoveg += `<td>${sorTomb[i]}</td>`;
            
        }
        if (sorTomb[0] == 'Ókor') {
            okor++;
        }
        szoveg += '</tr>';
    }

    szoveg += '</table>';

    szoveg += `<p>3. Feladat: Elemek száma: ${tomb.length - 1}</p>`;
    szoveg += `<p>4. Feladat: Felfedezések száma az ókorban: ${okor}</p>`;
    szoveg += `<div>5. Feladat: Kérek egy vegyjelet:
                <form name="urlap" style="display:inline;">
                    <input type="text" name="vegyjel" value="" />
                    <input type="submit" value="Ellenőriz" onclick="ellenoriz()" />
                </form></div>`;
    
    let reg = /^[A-Z,a-z]{1, 2}$/;            
    if (ellenoriz().toUpperCase() == reg.toUpperCase()) {
        
    } else {
        
    }

    document.getElementById('demo').innerHTML = szoveg;
}

function ellenoriz() {
    return document.forms['urlap']['vegyjel'].value;
}