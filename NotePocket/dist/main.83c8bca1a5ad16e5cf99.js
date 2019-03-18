!function(o){var n={};function a(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return o[e].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=o,a.c=n,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(o,n,function(e){return t[e]}.bind(null,n));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,o){e.exports=o(2)},function(e,t,o){},function(e,t,o){"use strict";o.r(t);o(1);function d(e){localStorage.setItem("NotesList",JSON.stringify(e))}function s(){return JSON.parse(localStorage.getItem("NotesList"))||[]}function i(o){var n=s();n.forEach(function(e,t){e.id==o.id&&n.splice(t,1,o)}),d(n)}var l=function e(t,o,n,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.id=t,this.title=o,this.description=n,this.color=a,this.date=(new Date).toLocaleDateString(),this.isPined=!1},u={NotesList:s(),notesAmount:function(){try{return JSON.parse(localStorage.getItem("NotesList")).length}catch(e){}}()||0};function f(){u.NotesList=s()}var n,r=function(){return u.NotesList},c=function(e){var t=e.title,o=e.description,n=e.color,a="index-".concat(u.notesAmount);switch(n){case"Yellow":n="has-background-warning";break;case"Gray":n="has-background-grey-lighter";break;case"Blue":n="has-background-primary";break;case"Green":n="has-background-success";break;default:n="has-background-warning"}var i,r,c=new l(a,t,o,n);i=c,(r=s()).push(i),d(r),f(),u.notesAmount++},a=function(e){return t=e,JSON.parse(localStorage.getItem("NotesList")).filter(function(e){return e.id===t})[0];var t},m=function(e){var o,n;o=e,(n=s()).forEach(function(e,t){e.id==o.id&&n.splice(t,1)}),d(n),f()},N={notesBox:document.getElementById("noteBox"),openModal:document.getElementById("openNote"),closeModal:document.getElementById("closeModal"),modal:document.getElementById("modalNewCard"),modalNoteId:document.getElementById("modalNoteId"),modalNoteTitle:document.getElementById("modalNoteTitle"),modalNoteDescription:document.getElementById("modalNoteDescription"),modalNoteColor:document.getElementById("modalNoteColor"),modalNoteDate:document.getElementById("modalNoteDate"),addNewNote:document.getElementById("addNewNote"),resetModalNote:document.getElementById("resetModal")},g=function(e){null!==e&&(N.notesBox.innerHTML="",e.forEach(function(e){var t='<div class="column is-3-desktop is-4-tablet is-6-mobile" id="'.concat(e.id,'">\n      <div class="card ').concat(e.color,'" >\n      <header class="card-header">\n      <p class="card-header-title" >').concat(e.title,'</p>\n      <span class="icon icon--rotate ').concat(e.isPined?"icon--rotatePined":"icon--rotate",'" >\n      <i class="fas fa-thumbtack" id="pinButton" data-id="').concat(e.id,'"></i>\n      </span>\n      <span class="icon" >\n      <i class="fas fa-times-circle has-text-danger" id="deleteButton" data-id="').concat(e.id,'"></i>\n      </span>\n      </header>\n      <div class="card-content">\n      <div class="content" >').concat(e.description,'</div>\n      </div>\n      <footer class="card-footer ">\n      <span class="card__data  card-footer-item " id="noteDate">').concat(e.date,"</span>\n      </footer>\n      </div>\n      </div>");N.notesBox.innerHTML+=t}))};function p(){N.modal.classList.toggle("is-active"),N.addNewNote.textContent="Add",N.modalNoteTitle.value="",N.modalNoteDescription.value="",N.modalNoteColor.options[0].selected=!0}function v(){return{id:N.modalNoteId.value,title:N.modalNoteTitle.value||"Title",description:N.modalNoteDescription.value||"Description",color:N.modalNoteColor.value,date:N.modalNoteDate.value}}N.openModal.addEventListener("click",p),N.closeModal.addEventListener("click",p),N.addNewNote.addEventListener("click",function(e){var t;e.preventDefault();var o=N.addNewNote.textContent;if("Add"===o){var n=v();c(n),t=r(),g(t),p()}else if("Update"===o){var a=v();!function(e){switch(console.log(e),e.color){case"Yellow":e.color="has-background-warning";break;case"Gray":e.color="has-background-grey-lighter";break;case"Blue":e.color="has-background-primary";break;case"Green":e.color="has-background-success";break;default:e.color="has-background-warning"}i(e),f()}(a),t=r(),g(t),p()}}),N.resetModalNote.addEventListener("click",function(){N.modalNoteTitle.value="",N.modalNoteDescription.value="",N.modalNoteColor.options[0].selected=!0}),document.body.addEventListener("click",function(e){var t,o;"deleteButton"===e.target.id?function(e){e.preventDefault();var t=e.target.closest("#".concat(e.target.dataset.id));m(t),o=t,n="#".concat(o.id),document.querySelector(n).remove();var o,n}(e):"pinButton"===e.target.id?function(e){var t=e.target.closest("#".concat(e.target.dataset.id));!function(t){u.NotesList.forEach(function(e){e.id===t.id&&(e.isPined=!e.isPined,i(e))});var e=u.NotesList.filter(function(e){return!0===e.isPined}),o=u.NotesList.filter(function(e){return 1!=e.isPined});u.NotesList=e.concat(o)}(t);var o=r();g(o)}(e):e.target.closest(".card")&&(t=e.target.closest(".column").id,o=a(t),p(),N.addNewNote.textContent="Update",function(e){switch(N.modalNoteId.value=e.id,N.modalNoteDate.value=e.date,N.modalNoteTitle.value=e.title,N.modalNoteDescription.value=e.description,e.color){case"has-background-warning":N.modalNoteColor.options[0].selected=!0;break;case"has-background-grey-lighter":N.modalNoteColor.options[1].selected=!0;break;case"has-background-success":N.modalNoteColor.options[2].selected=!0;break;case"has-background-primary":N.modalNoteColor.options[3].selected=!0;break;default:N.modalNoteColor.options[0].selected=!0}}(o))}),n=r(),function(){u.NotesList=s();var e=u.NotesList.filter(function(e){return!0===e.isPined}),t=u.NotesList.filter(function(e){return 1!=e.isPined});u.NotesList=e.concat(t),d(u.NotesList)}(),console.log(n),g(n)}]);