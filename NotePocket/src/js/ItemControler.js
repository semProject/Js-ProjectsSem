import * as StorageCtrl from "./storageControler";

// Class note
class Card {
  constructor(id, title, desc, color) {
    this.id = id;
    this.title = title;
    this.description = desc;
    this.color = color;
    this.date = new Date().toLocaleDateString();
    this.isPined = false;
  }
}

// Data Structure / State
const data = {
  NotesList: StorageCtrl.getList(),
  notesAmount: StorageCtrl.getListLength() || 0
};

//Reset Modal values
function pullNotesList() {
  data.NotesList = StorageCtrl.getList();
}
export function orderNotesList() {
  data.NotesList = StorageCtrl.getList();
  let pinedList = data.NotesList.filter(el => {
    return el.isPined === true;
  });
  let unPinedList = data.NotesList.filter(el => {
    return el.isPined != true;
  });
  data.NotesList = pinedList.concat(unPinedList);
  StorageCtrl.setList(data.NotesList)
}

//get notes array
export const getItemsList = () => {
  return data.NotesList;
};

// Add note in to array
export const addItem = noteContent => {
  let { title, description, color } = noteContent;
  const noteId = `index-${data.notesAmount}`;
  switch (color) {
    case "Yellow":
      color = "has-background-warning";
      break;
    case "Gray":
      color = "has-background-grey-lighter";
      break;
    case "Blue":
      color = "has-background-primary";
      break;
    case "Green":
      color = "has-background-success";
      break;
    default:
      color = "has-background-warning";
  }
  const item = new Card(noteId, title, description, color);  
  StorageCtrl.putItem(item);
  pullNotesList();  
  data.notesAmount++;
};

// Update item into array
export const updateItem = noteElem => {
  console.log(noteElem);
  switch (noteElem.color) {
    case "Yellow":
      noteElem.color = "has-background-warning";
      break;
    case "Gray":
      noteElem.color = "has-background-grey-lighter";
      break;
    case "Blue":
      noteElem.color = "has-background-primary";
      break;
    case "Green":
      noteElem.color = "has-background-success";
      break;
    default:
      noteElem.color = "has-background-warning";
  }
  StorageCtrl.updateNote(noteElem);
  pullNotesList();
};

// Get item from array
export const getItem = noteID => {
  return StorageCtrl.getItem(noteID);
};

// Delete item array
export const deleteItem = passElem => {
  StorageCtrl.deleteNote(passElem);
  pullNotesList();
};

// move item on front of array
export const pinItem = elemID => {
  data.NotesList.forEach(el => {
    if (el.id === elemID.id) {
      el.isPined = !el.isPined;
      StorageCtrl.updateNote(el);
    }
  });

  let pinedList = data.NotesList.filter(el => {
    return el.isPined === true;
  });
  let unPinedList = data.NotesList.filter(el => {
    return el.isPined != true;
  });
  data.NotesList = pinedList.concat(unPinedList);
};
