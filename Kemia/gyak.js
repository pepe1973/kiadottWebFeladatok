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

function myFunction(that) {

    let fileTartalom = that.responseText;

    let tomb = fileTartalom.split('\n');
    let okor = 0;
    let szoveg = '';
    let kiir = '<p>6. Feladat: Keresés</p>';
    let idoTomb = [];
    let map = new Map();
    let szamolMap = new Map();
    let vanE = false;

    /*szoveg = '<p>2. Feladat: Adatok beolvasása</p>';

    szoveg += '<table><tr>';
    let elsoSor = tomb[0].split(';');
    for (let i = 0; i < elsoSor.length; i++) {
        szoveg += `<th>${elsoSor[i]}</th>`;
    }*/

    for (let j = 1; j < tomb.length; j++) {
        let sorTomb = tomb[j].split(';');
        idoTomb[j - 1] = sorTomb[0];
        map.set(j, sorTomb[0]);
        /*szoveg += '<tr>';
        for (let i = 0; i < sorTomb.length; i++) {
            //szoveg += `<td>${sorTomb[i]}</td>`;
            
        }
        szoveg += '</tr>';*/
        if (sorTomb[0] == 'Ókor') {
            okor++;
        }
        if (ellenoriz() != 'emptyString') {
            if (sorTomb[2].toUpperCase() == ellenoriz().toUpperCase()) {
                kiir += `<pre>          Az elem vegyjele: ${sorTomb[2]}</p>`;
                kiir += `<p>          Az elem neve: ${sorTomb[1]}</p>`;
                kiir += `<p>          Rendszáma: ${sorTomb[3]}</p>`;
                kiir += `<p>          Felfedezés éve: ${sorTomb[0]}</p>`;
                kiir += `<p>          Felfedező: ${sorTomb[4]}</pre>`;
                vanE = true;
            }
        }
    }
    //szoveg += '</table>';

    if (!vanE) {
        kiir += '<pre>          Nincs ilyen elem az adatforrásban.</pre>';
    }

    let max = 0;

    for (let k = okor; k < idoTomb.length - 1; k++) {
        if (Number(idoTomb[k + 1]) - Number(idoTomb[k]) >= max) {
            max = Number(idoTomb[k + 1]) - Number(idoTomb[k]); 
        }
    }

    for (const elem of map.values()) {
        let ev = elem;
        let db = 0;
        for (const item of szamolMap) {
            if (item[0] == ev) {
                db = item[1];
                szamolMap.delete(ev);
                break;
            }
        }
        szamolMap.set(ev, ++db);
    }

    kiir += `<p>7. Feladat: ${max} év volt a leghosszabb időszak két elem felfedezése között.</p>`;
    kiir += '<p>8. Feladat: Statisztika</p>';

    kiir += '<pre>';
    for (const elem of szamolMap) {
        if (elem[1] >= 4 && elem[0] != 'Ókor') {
            kiir += `<p>          ${elem[0]}: ${elem[1]} db</p>`;
        }
    }
    kiir += '</pre>';

    szoveg += `<p>3. Feladat: Elemek száma: ${tomb.length - 1}</p>`;
    szoveg += `<p>4. Feladat: Felfedezések száma az ókorban: ${okor}</p>`;

    document.getElementById('demo_1').innerHTML = szoveg;
    document.getElementById('demo_2').innerHTML = kiir;
}

function ellenoriz() {
    if (document.forms['urlap']['vegyjel'].value != '') {
        return document.forms['urlap']['vegyjel'].value;    
    } else {
        return 'emptyString';
    }
}