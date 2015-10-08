var Figure = function(){

	this.square = null;
	this.triangle = null;
	this.circle = null;
	this.clickeddom=null;

	this.name = 0;
	
	this.addsquare();
	this.addtriangle();
	this.addcircle();

	this.clickdom();
	this.movedom();

	this.controlsquare();
	this.controltriangle();
	this.controlcircle();
	this.controlclickdom();
	this.controlmovedom();
}

var _ = Figure.prototype;

_.addsquare = function(){

	var that = this;

	$(".square").click(function(){

		var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");

		var width = $(".x_square").val();
		var height = $(".y_square").val();

		console.log("x_square.value : "+width);
		console.log("y_square.value : "+height);

	    svg.setAttribute("width",width);
	    svg.setAttribute("height",height);
	    svg.setAttribute("class", 'svg');
	    svg.setAttribute("id","nonclicked");
	    svg.setAttribute("name",that.name);

	    svg.style.position = 'absolute';
	    svg.style.left = 100;
	    svg.style.top = 500;
	    
	    var svgNS = svg.namespaceURI;

	    var rect = document.createElementNS(svgNS,"rect");
	    rect.setAttribute("width", width);
	    rect.setAttribute("height", height);
	    rect.setAttribute("fill", '#95B3D7');
	    rect.setAttribute("class","rect");

	    document.body.appendChild(svg);
	    svg.appendChild(rect);

	    that.square = { 'width' : width,
						'height' : height,
						'class' : 'svg',
						'id' : 'nonclicked',
						'name' : that.name,
						'position' : 'absolute',
						'left' : 100,
						'top' : 500,
						'fill' : '#95B3D7',
						'rectclass' : "rect"
						};

	    that.name++;

		console.log('square object are made well -> svg : '+that.square.class);

	    //var JsonSquareDom = JSON.stringify(svg); //JSON으로 바꿔야한다면 사용하자

	    socket.emit('square', that.square);
	});

}

_.addtriangle = function(){

	var that = this;

	$(".triangle").click(function(){

		var points = $(".A_triangle").val()+" "+$(".B_triangle").val()+" "+$(".C_triangle").val();

		var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");

		//var width = Math.max()//나중에 처리

	    svg.setAttribute("width",300);
	    svg.setAttribute("height",300);
	    svg.setAttribute("class", 'svg');
	    svg.setAttribute("id","nonclicked");
	    svg.setAttribute("name",that.name);

	    svg.style.position = 'absolute';
	    svg.style.left = 200;
	    svg.style.top = 500;
	    
	    var svgNS = svg.namespaceURI;

	    var tri = document.createElementNS(svgNS,"polygon");

	    tri.setAttribute("points",points); 
	    tri.setAttribute("fill", '#95B3D7');
	    tri.setAttribute("class","tri");

	    document.body.appendChild(svg);
	    svg.appendChild(tri);

	    that.triangle = { 'width' : 300,
						'height' : 300,
						'class' : 'svg',
						'id' : 'nonclicked',
						'name': that.name,
						'position' : 'absolute',
						'left' : 200,
						'top' : 500,
						'points' : points,
						'fill' : '#95B3D7',
						'triclass' : "tri"
						};
	    that.name++;

		console.log('triangle object are made well -> points : '+that.triangle.points);

		socket.emit('triangle', that.triangle);

	});
}

_.addcircle = function(){

	var that = this;

	$(".circle").click(function(){

		var radius = $(".r_circle").val();

		var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");

	    svg.setAttribute("width",2*radius);
	    svg.setAttribute("height",2*radius);
	    svg.setAttribute("class", 'svg');
	    svg.setAttribute("id","nonclicked");
	    svg.setAttribute("name",that.name);

	    svg.style.position = 'absolute';
	    svg.style.left = 300;
	    svg.style.top = 500;

	    var svgNS = svg.namespaceURI;

	    var cir = document.createElementNS(svgNS,"circle");

	    cir.setAttribute("cx",radius);
	    cir.setAttribute("cy",radius);
	    cir.setAttribute("r", radius);
	    cir.setAttribute("fill", '#95B3D7');
	    cir.setAttribute("class","cir");

	    document.body.appendChild(svg);
	    svg.appendChild(cir);

	    that.circle = { 'width' : 2*radius,
						'height' : 2*radius,
						'class' : 'svg',
						'id' : 'nonclicked',
						'name' : that.name,
						'position' : 'absolute',
						'left' : 300,
						'top' : 500,
						'cx' : radius,
						'cy' : radius,
						'r' : radius,
						'fill' : '#95B3D7',
						'circlass' : "cir"
						};
	    that.name++;	
	    					
		console.log('circle object are made well -> r : '+that.circle.r);

		socket.emit('circle', that.circle);

	});
}

_.clickdom = function(){

	var that = this;

	$(document).on('click','svg', function(){

		console.log("clickdom started");

		$(".svg").attr('id','nonclicked');
		$(".svg").children().attr('fill',"#95B3D7");

		this.id = "clicked";

		this.firstChild.setAttribute("fill","yellow");

		console.log("in clickdom this.name : "+$(this).attr('name'));

		that.clickeddom = {	'id' : this.id,
							'name' : $(this).attr('name'),
							'fill' : "yellow"
		};

		console.log('clickeddom object are made well -> name : '+that.clickeddom.name);

		socket.emit('clickeddom', that.clickeddom);
	});
}

_.movedom = function(){

	$(document).on('keydown', function(e){
		console.log("keycode : "+e.keyCode);

		var obj = $("#clicked").offset();

		if(e.keyCode==37){
			$("#clicked").css('left',obj.left-5)
		}

		if(e.keyCode==38){
			$("#clicked").css('top',obj.top-5)
		}

		if(e.keyCode==39){
			$("#clicked").css('left',obj.left+5)
		}

		if(e.keyCode==40){
			$("#clicked").css('top',obj.top+5)
		}

		if(e.keyCode==46){
			$("#clicked").remove();
		}

		socket.emit('keycode', e.keyCode);
	});

}

_.controlsquare = function() {

	var socket = io.connect('http://localhost:1111');

	socket.on('fromserver_square', function (data){
		console.log("started controlsquare");

		var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");

		svg.setAttribute("width",data.width);
	    svg.setAttribute("height",data.height);
	    svg.setAttribute("class", data.class);
	    svg.setAttribute("id",data.id);
	    svg.setAttribute("name",data.name);

	    svg.style.position = data.position;
	    svg.style.left = data.left;
	    svg.style.top = data.top;
	    
	    var svgNS = svg.namespaceURI;

	    var rect = document.createElementNS(svgNS,"rect");
	    rect.setAttribute("width", data.width);
	    rect.setAttribute("height", data.height);
	    rect.setAttribute("fill", data.fill);
	    rect.setAttribute("class",data.rectclass);

	    document.body.appendChild(svg);
	    svg.appendChild(rect);
	});
}

_.controltriangle = function(){

	var socket = io.connect('http://localhost:1111');

	socket.on('fromserver_triangle', function (data){
		console.log("started controltriangle");

		var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");

		//var width = Math.max()//나중에 처리

	    svg.setAttribute("width",data.width);
	    svg.setAttribute("height",data.height);
	    svg.setAttribute("class", data.class);
	    svg.setAttribute("id",data.id);
	    svg.setAttribute("name",data.name);	    

	    svg.style.position = data.position;
	    svg.style.left = data.left;
	    svg.style.top = data.top;
	    
	    var svgNS = svg.namespaceURI;

	    var tri = document.createElementNS(svgNS,"polygon");

	    tri.setAttribute("points",data.points); //////요게문제
	    tri.setAttribute("fill", data.fill);
	    tri.setAttribute("class",data.triclass);

	    document.body.appendChild(svg);
	    svg.appendChild(tri);

	});
}

_.controlcircle = function(){

	var socket = io.connect('http://localhost:1111');

	socket.on('fromserver_circle', function (data){
		console.log("started controlcircle");

		var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");

		//var width = Math.max()//나중에 처리

	    svg.setAttribute("width",data.width);
	    svg.setAttribute("height",data.height);
	    svg.setAttribute("class", data.class);
	    svg.setAttribute("id",data.id);
	    svg.setAttribute("name",data.name);

	    svg.style.position = data.position;
	    svg.style.left = data.left;
	    svg.style.top = data.top;
	    
	    var svgNS = svg.namespaceURI;

	    var cir = document.createElementNS(svgNS,"circle");

	    cir.setAttribute("cx",data.cx); 
	    cir.setAttribute("cy",data.cy); 
	    cir.setAttribute("r",data.r); 
	    cir.setAttribute("fill", data.fill);
	    cir.setAttribute("class",data.circlass);

	    document.body.appendChild(svg);
	    svg.appendChild(cir);

	});
}

_.controlclickdom = function(){

	var socket = io.connect('http://localhost:1111');

	socket.on('fromserver_clickeddom', function (data){
		console.log("started controlclikckdom");

		$(".svg").attr('id','nonclicked');
		$(".svg").children().attr('fill','#95B3D7')

		var clickeddom = "svg[name='"+data.name+"']";
		console.log(typeof clickeddom);

		$(clickeddom).attr('id', 'clicked');
		$(clickeddom).children().attr('fill', data.fill);
	});
}

_.controlmovedom = function() {

	var socket = io.connect('http://localhost:1111');

	socket.on('fromserver_keycode', function (data){
		console.log("started controlmovedom");

		var obj = $("#clicked").offset();

		console.log(obj);

		console.log("keycode data : "+data);

		if(data==37){
			$("#clicked").css('left',obj.left-5)
		}

		if(data==38){
			$("#clicked").css('top',obj.top-5)
		}

		if(data==39){
			$("#clicked").css('left',obj.left+5)
		}

		if(data==40){
			$("#clicked").css('top',obj.top+5)
		}

		if(data==46){
			$("#clicked").remove();
		}

	});

}