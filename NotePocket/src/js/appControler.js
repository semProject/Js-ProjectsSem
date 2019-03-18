// Modules import
//import * as StorageCtrl from "./storageControler";
import * as ItemCtrl from "./ItemControler";
import * as UiCtrl from "./UIControler";

// Add event listeners
UiCtrl.DomElements.openModal.addEventListener("click", UiCtrl.toggleModal);
UiCtrl.DomElements.closeModal.addEventListener("click", UiCtrl.toggleModal);
UiCtrl.DomElements.addNewNote.addEventListener("click", addORUpdateItem);
UiCtrl.DomElements.resetModalNote.addEventListener("click", resetNote);

// Dynamic add addEventListener  in nodeElement
document.body.addEventListener("click", function(evt) {
  if (evt.target.id === "deleteButton") {
    deleteItem(evt);
  } else if (evt.target.id === "pinButton") {
    // console.log("PINN");
    pinItem(evt);
  } else if (evt.target.closest(".card")) {
    // updateItem(evt.target.closest(".card"));
    updateItem(evt.target.closest(".column").id);
  }
});

// Init App
export function init() {
  ItemCtrl.orderNotesList();
  const noteList = ItemCtrl.getItemsList();
  console.log(noteList);
  UiCtrl.paintNotes(noteList);
}

// Init update item
function updateItem(elemID) {
  const noteItem = ItemCtrl.getItem(elemID);
  UiCtrl.toggleModal();
  UiCtrl.DomElements.addNewNote.textContent = "Update";
  UiCtrl.setModalValues(noteItem);
  // finish in addORUpdateItem()
}

//Add or Update note
function addORUpdateItem(e) {
  e.preventDefault();
  // Get Items list
  let noteList;
  // Checking method type
  const method = UiCtrl.DomElements.addNewNote.textContent;

  // If method is 'Add', add item into list.
  if (method === "Add") {
    const noteContent = UiCtrl.getModalValues();
    ItemCtrl.addItem(noteContent);
    noteList = ItemCtrl.getItemsList();
    UiCtrl.paintNotes(noteList);
    UiCtrl.toggleModal();

    // If method is 'Update',update list item.
  } else if (method === "Update") {
    const noteContent = UiCtrl.getModalValues();
    ItemCtrl.updateItem(noteContent);
    noteList = ItemCtrl.getItemsList();
    UiCtrl.paintNotes(noteList);
    UiCtrl.toggleModal();
  }
}

// Delete note
function deleteItem(evt) {
  evt.preventDefault();
  const noteBox = evt.target.closest(`#${evt.target.dataset.id}`);
  ItemCtrl.deleteItem(noteBox);
  UiCtrl.deleteListItem(noteBox);
}

// Reset Modal values
function resetNote() {
  UiCtrl.resetModal();
}

// Add note into front of list
function pinItem(evt) {
  const cardID = evt.target.closest(`#${evt.target.dataset.id}`);
  ItemCtrl.pinItem(cardID);
  const noteList = ItemCtrl.getItemsList();
  // console.log(noteList);
  UiCtrl.paintNotes(noteList);
}
