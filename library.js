var Library = function (search, update){
	this.search = search;
	this.update = update;
	this.showtable = null;

	this.initialize();
}

var _ = Library.prototype;

_.initialize = function(){
	this.bindEvents();
}

_.bindEvents = function(){
	var that = this;

	this.search.addEventListener('click', function(){
		var bindsearch = new Bindsearch(that, document.querySelector(".menu"), document.querySelector(".content"));
		console.log('bindsearch-content :' + bindsearch.content.value)
		if(bindsearch.menu.value === null || bindsearch.content.value === null){
			alert('please check your query');
		}
		else{
			var XHR = new XMLHttpRequest();
			XHR.open('POST', '/search', true);
			XHR.onreadystatechange = function(){
				if(XHR.readyState === 4 && XHR.status === 200){
					console.log('search-XHR has started');
					console.log("XHR.resposeText :"+ XHR.responseText);
					AddFindedbook = function(e){
						var booklist = new Booklist(that, XHR.responseText);
					}
					AddFindedbook();
				}
			}
			var data = "menu="+bindsearch.menu.value+"&content="+bindsearch.content.value;
			console.log('data -> /search : '+data);
			XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			XHR.send(data);
		}
	});
	this.update.addEventListener('click', function(){
		console.log('updating success');
		var bindupdate = new Bindupdate(that, document.querySelector(".title"), document.querySelector(".lender"), document.querySelector(".loan_date"));

		if(bindupdate.title.value === null || bindupdate.lender.value === null || bindupdate.loan_date.value === null){
			alert('please check your update query');
		}
		else{
			var XHR = new XMLHttpRequest();
			XHR.open('POST', '/update', true);
			XHR.onreadystatechange = function(){
				if(XHR.readyState ===4 && XHR.status ===200){
					console.log('update-XHR has started');
					alert(XHR.responseText);
				}
			}
			var data = "title="+bindupdate.title.value+"&lender="+bindupdate.lender.value+"&loan_date="+bindupdate.loan_date.value;
			console.log('data -> /update : ' + data);
			XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			XHR.send(data);
		}
	});
}


var Bindsearch = function (library, menu, content){
	this.library = library;
	this.menu = menu;
	this.content = content;
}

var Bindupdate = function (library, title, lender, loan_date){
	this.library = library;
	this.title = title;
	this.lender = lender;
	this.loan_date = loan_date;
}

var Booklist = function (library, data){
	this.library = library;
	this.data = data;//XHR.responseText
	this.fixeddata= null;
	this.dom = null;

	this._initialize();
}

_ = Booklist.prototype;

_._initialize = function(){
	this._fixData();
	this._setDom();
}

_._fixData = function(){
	if(this.data.length==1){
		this.fixeddata = eval("("+this.data+")"); //객체배열이면 괄호지우고		
	}
	else{
		this.fixeddata = eval(this.data); //객체배열이면 괄호지우고		
	}

}

_._setDom = function(){
	console.log('Booklist _setDom');
	console.log(this.fixeddata);

	var arr = [];
	var row = [];
	var cell = [];

	for(i=0;i<this.fixeddata.length;i++){
		arr.push(this.fixeddata[i]);	
	}
	if(this.library.showtable==1){
		document.body.removeChild(document.querySelector(".booklist"));

	}
	this.dom = document.createElement('table');
	this.dom.className = "booklist";

	for(i=0;i<arr.length+1;i++){
		if(i==0){
			row.push(this.dom.insertRow(i));

			cell.push(row[i].insertCell(0));
			cell[0].innerHTML = 'title';
			cell.push(row[i].insertCell(1));
			cell[1].innerHTML = 'lender';
			cell.push(row[i].insertCell(2));
			cell[2].innerHTML = 'loaned';
			cell.push(row[i].insertCell(3));
			cell[3].innerHTML = 'loan_date';	
		}
		else{
			row.push(this.dom.insertRow(i));

			cell.push(row[i].insertCell(0));
			cell[0+4*i].innerHTML = arr[i-1]["title"];
			cell.push(row[i].insertCell(1));
			cell[1+4*i].innerHTML = arr[i-1]["lender"];
			cell.push(row[i].insertCell(2));
			cell[2+4*i].innerHTML = arr[i-1]["loaned"];
			cell.push(row[i].insertCell(3));
			cell[3+4*i].innerHTML = arr[i-1]["loan_date"];	
		}
	}
	console.log('row :' + row);

	document.body.appendChild(this.dom);
	this.library.showtable = 1;
}

