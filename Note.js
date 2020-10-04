function newObj(arrOfObj, id, date, title, text) {
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
            let h2 = document.createElement("h2");
            newLI.append(h2);
            h2.id = "h2" + arrOfObj[i].id;
            h2.className = "h2Class";
            let h3 = document.createElement("h3");
            newLI.append(h3);
            h3.id = "h3" + arrOfObj[i].id;
            h3.className = "h3Class";
            h2.textContent = arrOfObj[i].title;
            h3.textContent = arrOfObj[i].text;
            if (arrOfObj[i].title === "")
            {
                h2.textContent = "Без теми"
            }
            if (arrOfObj[i].text === "")
            {
                h3.textContent = "Текст відсутній..."
            }
            newLI.id = "li" + arrOfObj[i].id;
            newLI.className = "liClass";
            UL.prepend(newLI);
        }
    }
}

const setDate = () => {
    let now = new Date();
    let date = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "   " + now.getDay() + "." + now.getMonth() + "." + now.getFullYear();
    return date;
}

function createNewNote() {
    let idd = idGen();
    let date = setDate();
    newObj(arrOfObj, idd, date, "", "");
    idArr.push(idd);
    currentLI = document.createElement("li");
    UL.append(currentLI);
    setURL(arrOfObj[arrOfObj.length - 1]);
    let h6 = document.createElement("h6");
    currentLI.append(h6);
    h6.id = "h6" + idd;
    h6.className = "h6Class";
    h6.textContent = setDate();
    let h2 = document.createElement("h2");
    currentLI.append(h2);
    h2.id = "h2" + idd;
    h2.className = "h2Class";
    h2.textContent = "Тема";
    let h3 = document.createElement("h3");
    currentLI.append(h3);
    h3.id = "h3" + idd;
    h3.className = "h3Class";
    h3.textContent = "Текст нотатки...";
    currentLI.id = "li" + idd;
    currentid = currentLI.id;
    currentLI.className = "liClass";
    UL.prepend(currentLI);
    title.value = "";
    noteField.value = "";
    localStorage.setItem('NotePlus', JSON.stringify(arrOfObj));
    /*document.addEventListener('click', function(event) {
        var isClickInsideElement1 = title.contains(event.target);
        if (!isClickInsideElement1) {
            arrOfObj[arrOfObj.length - 1].title = title.textContent;
            LI.innerHTML = "<h2>" + arrOfObj[arrOfObj.length - 1].title + "</h2>" + " <h2>" + arrOfObj[arrOfObj.length - 1].text + "</h2>";
        }
    });
    document.addEventListener('click', function(event) {
        var isClickInsideElement2 = title.contains(event.target);
        if (!isClickInsideElement2) {
            arrOfObj[arrOfObj.length - 1].text = noteField.textContent;
            LI.innerHTML = "<h2>" + arrOfObj[arrOfObj.length - 1].title + "</h2>" + " <h2>" + arrOfObj[arrOfObj.length - 1].text + "</h2>";
        }
    });*/
};

const saveNote = () => {
    let ind = idSearch(currentid);
    if (title.value !== arrOfObj[ind].title || noteField.value !== arrOfObj[ind].text)
    {
        let date = setDate();
        arrOfObj[ind].date = date;
        arrOfObj[ind].title = title.value;
        arrOfObj[ind].text = noteField.value;
        let currentH6 = document.getElementById("h6" + currentid.slice(2));
        let currentH2 = document.getElementById("h2" + currentid.slice(2));
        let currentH3 = document.getElementById("h3" + currentid.slice(2));
        currentH6.textContent = date;
        currentH2.textContent = title.value;
        currentH3.textContent = noteField.value;
        if (title.value === "")
        {
            currentH2.textContent = "Без теми"
        }
        if (noteField.value === "")
        {
            currentH3.textContent = "Текст відсутній..."
        }
        UL.prepend(currentLI);
        arrOfObj.push(arrOfObj.splice(ind,ind + 1)[0]);
        localStorage.setItem('NotePlus', JSON.stringify(arrOfObj));
    }
}

const deleteNote = () => {
    let ind = idSearch(currentid);
    arrOfObj.splice(ind, ind + 1);
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
    return Math.floor(Math.random() * 20000) + Math.floor(Math.random() * 20000);
}


function current(e){
    // e.target ссылается на кликнутый <li> элемент
    // Он отличается от e.currentTarget который будет ссылаться на родительский <ul> в этом контексте
    currentid = "li" + e.target.id.slice(2);
    currentLI = document.getElementById(currentid);
    let ind = idSearch(currentid);
    title.value = arrOfObj[ind].title;
    noteField.value = arrOfObj[ind].text;
    location.hash = currentid.slice(2);
}

let arrOfObj = [];
let idArr = [];
let currentid;
let currentLI;
const title = document.getElementById('title');
const noteField = document.getElementById('noteField');
const createButton = document.getElementById("createBtn");
const saveButton = document.getElementById("saveBtn");
const deleteButton = document.getElementById("deleteBtn")
const UL = document.getElementById("ulBar");
document.addEventListener("DOMContentLoaded", function() {
    pageLoad();
});
// Назначим обработчик к списку
// Он будет вызван когда кликнут на любой <li>
UL.addEventListener('click', current, false);
createButton.addEventListener("click", createNewNote);
saveButton.addEventListener('click', saveNote);
deleteButton.addEventListener('click', deleteNote)

window.addEventListener('hashchange', () => {
    for (let i = 0; i < arrOfObj.length; i++) {
        if (location.hash === '#' + notesArray[i].id) {
            currentid = "li" + location.hash.slice(1);
            currentLI = document.getElementById(currentid);
            let ind = idSearch(currentid);
            title.value = arrOfObj[ind].title;
            noteField.value = arrOfObj[ind].text;
            return;
        }
    }
    if (location.hash === '') {
        title.value = '';
        noteField.getElementById('note-text').value = '';
        currentid = "";
        currentLI = NULL;
    }
})

//let LI = document.getElementById("liID");


/*function getEventTarget(e) {
    e = e || UL.event;
    return e.target || e.srcElement;
}

UL.onclick = function(event) {
    var target = getEventTarget(event);
    target.style.backgroundColor =  '#f00';
}*/



/*UL.addEventListener('click', liClick);
function liClick() {
    noteField.value = $(this).index();
}*/


/*
const newSideBarItem = document.createElement("sideBar_item");
sideBar.append(newSideBarItem);
newSideBarItem.innerText("earfavaeJHUHIUJOI");*/