console.log("Short Notes App");

// creating some constants
const addNewNoteIcon = document.getElementById("addNewNoteIcon");
const addNoteDiv = document.getElementById("addNoteDiv");
const crossSign = document.getElementById("crossSign"); // cross button
const userNote_date = document.getElementById("userNote_date"); // for date
const note_title = document.getElementById("note_title"); // note heading
const userNote = document.getElementById("userNote"); // note description
const addNoteBtn = document.getElementById("addNoteBtn");

const modifyNoteDiv = document.getElementById("modifyNoteDiv");
const modify_crossSign = document.getElementById("modify_crossSign"); // modify cross button
const modify_note_title = document.getElementById("modify_note_title");
const modify_userNote = document.getElementById("modify_userNote");
const modifyNoteBtn = document.getElementById("modifyNoteBtn");
const modifyNote_form = document.getElementById("modifyNote_form");

const hiddenLayer = document.getElementById("hiddenLayer");

const showInfo_top = document.getElementById("showInfo_top");
showInfo_top.addEventListener("click", removeInfo);
setTimeout(removeInfo, 10000);  // automatic close after 10s

function removeInfo() {
  changeDisplay(showInfo_top, "none");
}

addNewNoteIcon.addEventListener("click", () => {
  changeDisplay(addNewNoteIcon, "none");
  changeDisplay(addNoteDiv, "flex");
});

crossSign.addEventListener("click", () => {
  changeDisplay(addNewNoteIcon, "flex");
  changeDisplay(addNoteDiv, "none");
  clearValues();
});

addNoteBtn.addEventListener("click", () => {
  let date = new Date();
  userNote_date.value = `${date.toLocaleString()}`;
});

function changeDisplay(id, value) {
  id.style.display = `${value}`;
}

function clearValues() {
  note_title.value = "";
  userNote.value = "";
}

let edit_delete_cont_id = undefined;

function getOptions_edit_del(id) {
  changeDisplay(id, "block");
  changeDisplay(hiddenLayer, "block");
  edit_delete_cont_id = id;
}

hiddenLayer.addEventListener("click", () => {
  changeDisplay(edit_delete_cont_id, "none");
  changeDisplay(hiddenLayer, "none");
});

let note_id = undefined;

function getEditWindow(id, old_note_title, old_note_desc, _id) {
  changeDisplay(id, "none");
  changeDisplay(modifyNoteDiv, "flex");
  setModify_oldValues(old_note_title, old_note_desc);
  note_id = _id;
}

function setModify_oldValues(val1, val2) {
  modify_note_title.value = val1;
  modify_userNote.value = val2;
}

modify_crossSign.addEventListener("click", () => {
  changeDisplay(modifyNoteDiv, "none");
});

modifyNoteBtn.addEventListener("click", () => {
  modifyNote_form.action = `/update-document/${note_id}`;
});
