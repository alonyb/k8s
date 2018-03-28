function Pager(tableName, itemsPerPage) {

this.tableName = tableName;

this.itemsPerPage = itemsPerPage;

this.currentPage = 1;

this.pages = 0;

this.inited = false;

this.showRecords = function(from, to) {

var rows = document.getElementById(tableName).rows;

// i starts from 1 to skip table header row

for (var i = 1; i < rows.length; i++) {

if (i < from || i > to)

rows[i].style.display = 'none';

else

rows[i].style.display = '';

}

}

this.showPage = function(pageNumber) {

if (! this.inited) {

alert("not inited");

return;

}

var oldPageAnchor = document.getElementById('pg'+this.currentPage);

oldPageAnchor.className = 'pg-normal';

this.currentPage = pageNumber;

var newPageAnchor = document.getElementById('pg'+this.currentPage);

newPageAnchor.className = 'pg-selected';

var from = (pageNumber - 1) * itemsPerPage + 1;

var to = from + itemsPerPage - 1;

this.showRecords(from, to);

}

this.prev = function() {

if (this.currentPage > 1)

this.showPage(this.currentPage - 1);

}

this.next = function() {

if (this.currentPage < this.pages) {

this.showPage(this.currentPage + 1);

}

}

this.init = function() {

var rows = document.getElementById(tableName).rows;

var records = (rows.length - 1);

this.pages = Math.ceil(records / itemsPerPage);

this.inited = true;

}

this.showPageNav = function(pagerName, positionId) {

if (! this.inited) {

alert("not inited");

return;

}

var element = document.getElementById(positionId);

var pagerHtml = '<ul class="pagination"><li class="page-item "><span onclick="' + pagerName + '.prev();" class="pg-normal"> Anterior </span> </li>';

for (var page = 1; page <= this.pages; page++)

pagerHtml += '<li class="page-item"><span id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span> </li>';

pagerHtml += '<li class="page-item"><span onclick="'+pagerName+'.next();" class="pg-normal"> Siguiente</span> </li></ul>' ;

pagerHtml += '<form action="/post/new" method="POST"><div class="modal-header"></div><div class="modal-body"><div class="form-group"><label>Valor</label><input type="text" name="username"class="form-control" value='+page+' ></div><div class="modal-footer"><input type="submit" class="btn btn-success" value="Agregar"></div></form>'

element.innerHTML = pagerHtml;

}

}

