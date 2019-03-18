// const emptyArr = [];

// emptyArr.push({
//   id: "index-0",
//   color: "has-background-warning",
//   isPined: false,
//   title: "title text",
//   description: "desrription text",
//   date: "11/11/1111"
// });
// emptyArr.push({
//   id: "index-1",
//   color: "has-background-primary",
//   isPined: false,
//   title: "title text",
//   description: "desrription text",
//   date: "11/11/1111"
// });
// emptyArr.push({
//   id: "index-2",
//   color: "has-background-success",
//   isPined: false,
//   title: "title text",
//   description: "desrription text",
//   date: "11/11/1111"
// });

// setList(emptyArr);

// -- LOCAL STORAGE --
// Set local storage list
export function setList(arr) {
    localStorage.setItem("NotesList", JSON.stringify(arr));
}

// Get local storage list
export function getList() {
    const noteslist = JSON.parse(localStorage.getItem("NotesList")) || [];  
    return noteslist;
}

// Get local storage list length
export function getListLength() {
    try{
        const noteslist = JSON.parse(localStorage.getItem("NotesList"));
        return noteslist.length;
    }catch(err){}
}

// Get local storage list item
export function getItem(noteID) {
    const noteslist = JSON.parse(localStorage.getItem("NotesList"));
    var result = noteslist.filter(obj => {
        return obj.id === noteID;
    });
    return result[0];
}

// Put local storage list item
export function putItem(item) {
    const noteslist = getList();
    noteslist.push(item);
    setList(noteslist);
}

// Update local storage list item
export function updateNote(item) {
    const noteslist = getList();
    noteslist.forEach((el, key) => {
        if (el.id == item.id) {
            noteslist.splice(key, 1, item);
        }
    });
  setList(noteslist);
}

// Delete local storage list item
export function deleteNote(item) {
  const noteslist = getList();
  noteslist.forEach((el, key) => {
    if (el.id == item.id) {
      noteslist.splice(key, 1);
    }
  });  
  setList(noteslist);
}

