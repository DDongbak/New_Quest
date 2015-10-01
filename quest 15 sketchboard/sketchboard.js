var Figure = function(square, triangle, circle){
    this.square=square;
    this.triangle=triangle;
    this.circle=circle;

    this.initialize();
}
var _ = Figure.prototype;

_.initialize = function(){
    this.setDoms();
}

_.setDoms = function(){
    that=this;
    console.log("square : "+ that.square);
    console.log("triangle : "+ that.triangle);
    console.log("circle : "+ that.circle);

    this.square.addEventListener('click', function (ev){
        console.log('square clicked');
                    
        DrawSquare = function(){
            var square = new Square(that, document.querySelector(".x_square"), document.querySelector(".y_square"));               
        }
        DrawSquare();
    });

    this.triangle.addEventListener('click', function (ev){
        console.log('triangle clicked');

        DrawTriangle = function(){
            var triangle = new Triangle(that, document.querySelector(".A_triangle"), document.querySelector(".B_triangle"), document.querySelector(".C_triangle"));            
        }
        DrawTriangle();
    });

    this.circle.addEventListener('click', function (ev){
        console.log('circle clicked');

        DrawCircle = function(){
            var circle = new Circle(that, document.querySelector(".r_circle"));
        }   
        DrawCircle();
    });

}


var Square = function(figure, x_square, y_square){
    this.figure = figure;
    this.x_square = x_square;
    this.y_square = y_square;    

    this.dom = null;

    this.left = 100;
    this.top = 500;

    this.initialize();
}

var _ = Square.prototype;

_.initialize = function(){
    this.setSquareDom();
    this.bindEvents();
}

_.setSquareDom = function(){
    
    console.log(this.figure);
    var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");

    svg.setAttribute("width",this.x_square.value);
    svg.setAttribute("height",this.y_square.value);
    svg.setAttribute("fill",'#E0E0E0')
    svg.setAttribute("class", 'svg');

    svg.style.position = 'absolute';
    svg.style.left = this.left;
    svg.style.top = this.top;
    
    var svgNS = svg.namespaceURI;

    var rect = document.createElementNS(svgNS,"rect");
    rect.setAttribute("x",0);
    rect.setAttribute("y",0);
    rect.setAttribute("width", this.x_square.value);
    rect.setAttribute("height", this.y_square.value);
    rect.setAttribute("fill", '#95B3D7');
    rect.setAttribute("class","rect");

    document.body.appendChild(svg);
    svg.appendChild(rect);

    this.dom=svg;
}

_.bindEvents = function(){
    that = this;
    console.log("square bindEvents start")
    //this.dom.addEventListener('click', function (ev){
    Keyboardmove = function(){
        console.log("keyboardmove acted")
    }
    document.body.addEventListener("keydown", function(e){

        if(e.keyCode==37){
            that.left=that.left-5;
            that.dom.style.left=that.left;
        }
        if(e.keyCode==38){
            that.top=that.top-5;
            that.dom.style.top=that.top;
        }
        if(e.keyCode==39){
            that.left=that.left+5;
            that.dom.style.left=that.left;
        }
        if(e.keyCode==40){
            that.top=that.top+5;
            that.dom.style.top= that.top;
        }
        //if()
        if(e.keyCode==46){
            document.body.removeChild(document.querySelector(".svg"));
            that.dom=null;
            that.left = 100;
            that.top =500;
        }
        console.log(e.keyCode);
    });
}


///////////////////////////triangle


var Triangle = function (figure, A_triangle, B_triangle, C_triangle){
    this.figure = figure;
    this.A_triangle = A_triangle;
    this.B_triangle = B_triangle;
    this.C_triangle = C_triangle;

    this.dom = null;
    this.points = null;

    this.left = 100;
    this.top = 500;
    this.initialize();
}

var _ = Triangle.prototype;

_.initialize = function(){
    this.setTriangleDom();
    this.bindEvents();
}

_.setTriangleDom = function(){

    var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("width",300);
    svg.setAttribute("height",300);
    svg.setAttribute("fill",'#E0E0E0')
    svg.setAttribute("class", 'svg');

    svg.style.position = 'absolute';
    svg.style.left = this.left;
    svg.style.top = this.top;
    
    var svgNS = svg.namespaceURI;

    var tri = document.createElementNS(svgNS,"polygon");
    this.points=this.A_triangle.value+" "+this.B_triangle.value+" "+this.C_triangle.value;

    tri.setAttribute("points",this.points); 
    tri.setAttribute("fill", '#95B3D7');
    tri.setAttribute("class","tri");

    document.body.appendChild(svg);
    svg.appendChild(tri);

    this.dom=tri;
}

_.bindEvents = function(){
    that = this;
    console.log("triangle bindEvents start")
    //this.dom.addEventListener('click', function (ev){
    Keyboardmove = function(){
        console.log("keyboardmove acted")
    }
    document.body.addEventListener("keydown", function(e){

        if(e.keyCode==37){
            var A_split = that.A_triangle.value.split(',');
            var B_split = that.B_triangle.value.split(',');
            var C_split = that.C_triangle.value.split(',');

            A_split[0] = A_split[0]-5;
            B_split[0] = B_split[0]-5;
            C_split[0] = C_split[0]-5;

            that.A_triangle.value = A_split.join(',');
            that.B_triangle.value = B_split.join(',');
            that.C_triangle.value = C_split.join(',');

            that.points=that.A_triangle.value+" "+that.B_triangle.value+" "+that.C_triangle.value;
                 ///이거 콤마구분하는 코드 찾기
            that.dom.setAttribute("points",that.points);
        }
        if(e.keyCode==38){
            var A_split = that.A_triangle.value.split(',');
            var B_split = that.B_triangle.value.split(',');
            var C_split = that.C_triangle.value.split(',');

            A_split[1] = A_split[1].toString()-5;
            B_split[1] = B_split[1].toString()-5;
            C_split[1] = C_split[1].toString()-5;

            that.A_triangle.value = A_split.join(',');
            that.B_triangle.value = B_split.join(',');
            that.C_triangle.value = C_split.join(',');

            that.points=that.A_triangle.value+" "+that.B_triangle.value+" "+that.C_triangle.value;
                 ///이거 콤마구분하는 코드 찾기
            that.dom.setAttribute("points",that.points);
        }
        if(e.keyCode==39){
            var A_split = that.A_triangle.value.split(',');
            var B_split = that.B_triangle.value.split(',');
            var C_split = that.C_triangle.value.split(',');

            A_split[0] = Number(A_split[0])+5;
            B_split[0] = Number(B_split[0])+5;
            C_split[0] = Number(C_split[0])+5;

            that.A_triangle.value = A_split.join(',');
            that.B_triangle.value = B_split.join(',');
            that.C_triangle.value = C_split.join(',');

            that.points=that.A_triangle.value+" "+that.B_triangle.value+" "+that.C_triangle.value;
                 ///이거 콤마구분하는 코드 찾기
            that.dom.setAttribute("points",that.points);
        }
        if(e.keyCode==40){
            var A_split = that.A_triangle.value.split(',');
            var B_split = that.B_triangle.value.split(',');
            var C_split = that.C_triangle.value.split(',');

            A_split[1] = Number(A_split[1])+5;
            B_split[1] = Number(B_split[1])+5;
            C_split[1] = Number(C_split[1])+5;

            that.A_triangle.value = A_split.join(',');
            that.B_triangle.value = B_split.join(',');
            that.C_triangle.value = C_split.join(',');

            that.points=that.A_triangle.value+" "+that.B_triangle.value+" "+that.C_triangle.value;
                 ///이거 콤마구분하는 코드 찾기
            that.dom.setAttribute("points",that.points);
        }
        //if()
        if(e.keyCode==46){
            document.body.removeChild(document.querySelector(".svg"));
            that.dom=null;
            that.points = null;
        }
        console.log(e.keyCode);
    });
}


//////////////////////Circle///////////////


var Circle = function(figure, r_circle){
    this.figure=figure;
    this.r_circle=r_circle;

    this.dom = null;

    this.left = 100;
    this.top =500;

    this.initialize();
}

var _ = Circle.prototype;

_.initialize = function(){
    this.setCircleDom();
    this.bindEvents();
}

_.setCircleDom = function(){

    var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("width",2*this.r_circle.value);
    svg.setAttribute("height",2*this.r_circle.value);
    svg.setAttribute("fill",'#E0E0E0')
    svg.setAttribute("class", 'svg');
    svg.style.position = 'absolute';
    svg.style.left = this.left;
    svg.style.top = this.top;

    var svgNS = svg.namespaceURI;

    var cir = document.createElementNS(svgNS,"circle");
    cir.setAttribute("cx",this.r_circle.value);
    cir.setAttribute("cy",this.r_circle.value);

    cir.setAttribute("r", this.r_circle.value);
    cir.setAttribute("fill", '#95B3D7');
    cir.setAttribute("class","cir");

    document.body.appendChild(svg);
    svg.appendChild(cir);

    this.dom=svg;
}

_.bindEvents = function(){
    that = this;
    console.log("circle bindEvents start")
    //this.dom.addEventListener('click', function (ev){
    Keyboardmove = function(){
        console.log("keyboardmove acted")
    }
    document.body.addEventListener("keydown", function(e){

        if(e.keyCode==37){
            that.left=that.left-5;
            that.dom.style.left=that.left;
        }
        if(e.keyCode==38){
            that.top=that.top-5;
            that.dom.style.top=that.top;
        }
        if(e.keyCode==39){
            that.left=that.left+5;
            that.dom.style.left=that.left;
        }
        if(e.keyCode==40){
            that.top=that.top+5;
            that.dom.style.top=that.top;
        }
        //if()
        if(e.keyCode==46){
            document.body.removeChild(document.querySelector(".svg"));
            that.dom=null;
            that.left = 0;
            that.top =0;
        }
        console.log(e.keyCode);
    });
}