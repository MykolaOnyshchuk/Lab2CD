const newObj = (arrOfObj, id, date, title, text) => {
    arrOfObj[arrOfObj.length] = {
        id: id,
        date: date,
        title: title,
        text: text
    }
};

const pageLoad = () => {
    if (localStorage.getItem("NotePlus") !== null) {
        arrOfObj = JSON.parse(localStorage.getItem('NotePlus'));
        for (let i = 0; i < arrOfObj.length; i++) {
            let newLI = document.createElement("li");
            UL.append(newLI);
            let h6 = document.createElement("h6");
            newLI.append(h6);
            h6.id = "h6" + arrOfObj[i].id;
            h6.className = "h6Class";
            h6.textContent = arrOfObj[i].date;
            let h3 = document.createElement("h3");
            newLI.append(h3);
            h3.id = "h3" + arrOfObj[i].id;
            h3.className = "h3Class";
            let h4 = document.createElement("h4");
            newLI.append(h4);
            h4.id = "h4" + arrOfObj[i].id;
            h4.className = "h4Class";
            h3.textContent = arrOfObj[i].title;
            h4.textContent = arrOfObj[i].text;
            if (arrOfObj[i].title === "")
            {
                h3.textContent = "Без теми"
            }
            if (arrOfObj[i].text === "")
            {
                h4.textContent = "Текст відсутній..."
            }
            newLI.id = "li" + arrOfObj[i].id;
            newLI.className = "liClass";
            UL.prepend(newLI);
        }
    }
    hashManage();
}

const setDate = () => {
    let now = new Date();
    let date = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "   " + now.getDate() + "." + (now.getMonth()+1) + "." + now.getFullYear();
    return date;
}

const createNewNote = () => {
    let idd = idGen();
    let date = setDate();
    newObj(arrOfObj, idd, date, "", "");
    idArr.push(idd);
    if (currentLI != null) {
        currentLI.style.backgroundColor = "mediumpurple";
    }
    currentLI = document.createElement("li");
    UL.append(currentLI);
    currentLI.style.backgroundColor = "#306";
    setURL(arrOfObj[arrOfObj.length - 1]);
    let h6 = document.createElement("h6");
    currentLI.append(h6);
    h6.id = "h6" + idd;
    h6.className = "h6Class";
    h6.textContent = setDate();
    let h3 = document.createElement("h3");
    currentLI.append(h3);
    h3.id = "h3" + idd;
    h3.className = "h3Class";
    h3.textContent = "Тема";
    let h4 = document.createElement("h4");
    currentLI.append(h4);
    h4.id = "h4" + idd;
    h4.className = "h4Class";
    h4.textContent = "Текст нотатки...";
    currentLI.id = "li" + idd;
    currentid = currentLI.id;
    currentLI.className = "liClass";
    UL.prepend(currentLI);
    title.value = "";
    noteField.value = "";
    localStorage.setItem('NotePlus', JSON.stringify(arrOfObj));
}

const saveNote = () => {
    let ind = idSearch(currentid);
    if (title.value !== arrOfObj[ind].title || noteField.value !== arrOfObj[ind].text)
    {
        let date = setDate();
        arrOfObj[ind].date = date;
        arrOfObj[ind].title = title.value;
        arrOfObj[ind].text = noteField.value;
        let currentH6 = document.getElementById("h6" + currentid.slice(2));
        let currentH3 = document.getElementById("h3" + currentid.slice(2));
        let currentH4 = document.getElementById("h4" + currentid.slice(2));
        currentH6.textContent = date;
        currentH3.textContent = title.value;
        currentH4.textContent = noteField.value;
        if (title.value === "")
        {
            currentH3.textContent = "Без теми"
        }
        if (noteField.value === "")
        {
            currentH4.textContent = "Текст відсутній..."
        }
        UL.prepend(currentLI);
        arrOfObj.push(arrOfObj.splice(ind,ind + 1)[0]);
        localStorage.setItem('NotePlus', JSON.stringify(arrOfObj));
    }
}

const deleteNote = () => {
    let ind = idSearch(currentid);
    arrOfObj.splice(ind, 1);
    UL.removeChild(currentLI);
    localStorage.setItem('NotePlus', JSON.stringify(arrOfObj));
    title.value = "";
    noteField.value = "";
    location.hash = "";
}

const idSearch = (idOfLI) => {
    let ind;
    for (let i = 0; i < arrOfObj.length; i++) {
        if (arrOfObj[i].id == idOfLI.slice(2)) {
            ind = i;
        }
    }
    return ind;
}

const setURL = (elemOfArr) => {
    location.hash = elemOfArr.id;
}

const idGen = (elemOfArr) =>{
    return Math.floor(Math.random() * 100000);
}

const hashManage = () => {
    if (location.hash === '') {
        title.value = '';
        noteField.value = '';
        currentid = "";
        currentLI = null;
    }
    else {

        if (currentLI != null) {
            currentLI.style.backgroundColor = "mediumpurple";
        }
        for (let i = 0; i < arrOfObj.length; i++) {
            if (location.hash === '#' + arrOfObj[i].id) {
                currentid = "li" + location.hash.slice(1);
                currentLI = document.getElementById(currentid);
                currentLI.style.backgroundColor = "#306";
                let ind = idSearch(currentid);
                title.value = arrOfObj[ind].title;
                noteField.value = arrOfObj[ind].text;
                return;
            }
        }
    }
}

const current = (e) => {
    if (currentLI != null) {
        currentLI.style.backgroundColor = "mediumpurple";
    }
    currentid = "li" + e.target.id.slice(2);
    currentLI = document.getElementById(currentid);
    currentLI.style.backgroundColor = "#306";
    let ind = idSearch(currentid);
    title.value = arrOfObj[ind].title;
    noteField.value = arrOfObj[ind].text;
    location.hash = currentid.slice(2);
}

const mouseHighlight = (e) => {
    highlightID = "li" + e.target.id.slice(2);
    document.getElementById(highlightID).style.backgroundColor = "rebeccapurple";
}

const mouseUnhighlight = (e) => {
    if (highlightID === currentid) {
        document.getElementById(highlightID).style.backgroundColor = "#306";
    }
    else {
        document.getElementById(highlightID).style.backgroundColor = "mediumpurple";
    }
}

let arrOfObj = [];
let idArr = [];
let currentid;
let currentLI;
let highlightID;
const title = document.getElementById('title');
const noteField = document.getElementById('noteField');
const createButton = document.getElementById("createBtn");
const deleteButton = document.getElementById("deleteBtn");
const UL = document.getElementById("ulBar");
document.addEventListener("DOMContentLoaded", function() {
    pageLoad();
})
UL.addEventListener('click', current);
UL.addEventListener('mouseover', mouseHighlight);
UL.addEventListener('mouseout', mouseUnhighlight);
createButton.addEventListener("click", createNewNote);
deleteButton.addEventListener('click', deleteNote)
window.addEventListener('hashchange', hashManage);
title.oninput = function () {
    saveNote();
}
noteField.oninput = function () {
    saveNote();
}
