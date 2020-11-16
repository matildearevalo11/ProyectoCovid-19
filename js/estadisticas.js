async function leerJSON(url) {

  try {
    let response = await fetch(url);
    let user = await response.json();
    return user;
  } catch(err) {
    
    alert(err);
  }
}



function mostrar(){

			
	var url="https://martinmedinaruvian.github.io/json/covid19ColombiaMarzo.json";
	leerJSON(url).then(datos=>{

		menu(datos);

	})

}


function nacional(){

	var msg="";		
	var url="https://martinmedinaruvian.github.io/json/covid19ColombiaMarzo.json";
	leerJSON(url).then(datos=>{
		//msg+=leerDepartamentos(datos);
		//msg+=leerCiudades(datos);
		msg+=tablaNal(datos);

	})

}


function xDepartamentos(){

	var msg="";		
	
	var url="https://martinmedinaruvian.github.io/json/covid19ColombiaMarzo.json";
	leerJSON(url).then(datos=>{
		
	var dpto=urlRef(0);
	var datosdp=casosDp(datos, dpto, 0);

	document.getElementById("titulo").innerHTML=dpElegido(datosdp, 0);
	tablaDpto(estadisticasSexo(datosdp));
	})

}

function xCiudades(){

	var msg="";		
	
	var url="https://martinmedinaruvian.github.io/json/covid19ColombiaMarzo.json";
	leerJSON(url).then(datos=>{
		
	var cdd=urlRef(1);
	var datoscdd=casosDp(datos, cdd, 1);

	document.getElementById("titulo").innerHTML=dpElegido(datoscdd, 1);
	tablaCdd(estadisticasContagio(datoscdd));
	})

}



function leerDepartamentos(datos){
	var dptos= new Array();
	var nombre= new Array();
	var a=0;
	var dp=new Array();

	for(var i=0;i<datos.length;i++){
		if(!nombre.includes(datos[i].departamento_nom)){
			nombre[a]=datos[i].departamento_nom;
			dptos[a]=datos[i].departamento;
			a++
		}
		dp[0]=nombre;//nombre
		dp[1]=dptos;	//id
	}
return dp;
}
	

function departamentos(datos){
var msg="";
var dp=leerDepartamentos(datos);
for(var i=0;i<dp[0].length;i++){
	  msg+="<option value='"+dp[1][i]+"'>"+dp[0][i]+"</option>";
}
return msg;
}

function idDptos(datos){
	var id=new Array();
	var msg="";
	var a=0;

	for(let i=0;i<datos.length;i++){
		if(!id.includes(datos[i].departamento)){
		id[a]=datos[i].departamento;
		a++}
	}
return id;
}

function ciudades(datos){
	var msg="";
	for(var i=0;i<datos[0].length;i++){
		  msg+="<option value='"+datos[1][i]+"'>"+datos[0][i]+"</option>";
	}
return msg;
}


function leerCiudades(datos){
	var ciudad= new Array();
	var nombre= new Array();
	var a=0;
	var cdd=new Array();

	for(var i=0;i<datos.length;i++){
		if(!nombre.includes(datos[i].ciudad_municipio_nom)){
			nombre[a]=datos[i].ciudad_municipio_nom;
			ciudad[a]=datos[i].ciudad_municipio;
			a++
		}
		cdd[0]=nombre;
		cdd[1]=ciudad;	
	}
return cdd;
}


function idCiud(datos){
	var id=new Array();
	var msg="";
	var a=0;

	for(let i=0;i<datos.length;i++){
		if(!id.includes(datos[i].ciudad_municipio)){
		id[a]=datos[i].ciudad_municipio;
		a++}
	}
return id;
}

function leerSexo(datos){
	var sexo=new Array();
	var msg="";

	for(let i=0;i<datos.length;i++){
		sexo[i]=datos[i].sexo;
		}
	
return sexo;
}

function leerContagios(datos){
	var cont=new Array();
	var msg="";
	var a=0;

	for(let i=0;i<datos.length;i++){
		cont[i]=datos[i].fuente_tipo_contagio;
	
}
return cont;
}


function urlRef(depmun){
const urlParams = new URLSearchParams(window.location.search);
	if(depmun==0){
		var referencia = urlParams.get('departamento');
	}
	else{
		var referencia = urlParams.get('ciudad');
	}
return referencia;
}

function menu(datos){

var msg="";
var msg2="";
var msg3="";


		   msg+="<select class='form-control' id='primero' name='departamento'>"+
	            "<option  v-for='ciudad of ciudades' v-bind:value='ciudad'>DEPARTAMENTO"+departamentos(datos)+"</option></select>";

		
		   msg2+="<select class='form-control' id='segundo' name='departamento' onclick='mostrarMun()'>"+
	            "<option  v-for='ciudad of ciudades' v-bind:value='ciudad'>DEPARTAMENTO"+departamentos(datos)+"</option></select><br>";
	      

document.getElementById("departamento").innerHTML=msg;
document.getElementById("departamento1").innerHTML=msg2;
}




function mostrarMun(){
var msg="";
var municipios="";
var mc="";
var url="https://martinmedinaruvian.github.io/json/covid19ColombiaMarzo.json";
	leerJSON(url).then(datos=>{
		municipios=leerCiudades(datos);
		var id=seleccionMun("segundo");
		mc=municipioxDpto(municipios, id);
		msg+="<select class='form-control' id='ciudad' name='ciudad'>"+
			 "<option  v-for='ciudad of ciudades' v-bind:value='ciudad'>CIUDAD</option>"+ciudades(mc)+"</select>";	
			
	document.getElementById("munici").innerHTML=msg;
	})

}

function municipioxDpto(municipios,id){
   var municipio=new Array();
   var m= new Array();
   var mun= new Array();
   var a=0;
   for(let i=0; i<municipios[0].length;i++){
      if(ids(municipios[1][i],id)){
      m[a]=municipios[0][i];
      mun[a]=municipios[1][i];
      a++;
    }
   }
   municipio[0]=m;
   municipio[1]=mun;
   return municipio;
}


function ids(primero,segundo){
  	if(primero==segundo){
  		return true
  	}
    if(segundo.length==1&&primero.length==4){
      	if(primero[0]==segundo[0])
      		return true;
    }
    //caso especial departamento y ciudad repetido
    if(segundo.length==2&&primero==13001){
    	return false;
    }
    if(segundo.length==2&&primero.length==5){
      if(primero[0]==segundo[0]&&primero[1]==segundo[1])
      	return true;
    }

  return false;
}

function seleccionMun(id){
  var msg="";
    var l=document.getElementById(id);

    var iS =l.selectedIndex;
    var oS = l.options[iS];
    msg = oS.value;
  
return msg;
}

function redireccionarDpto(msg){
	var url='./html/ref1.html'+msg+''; 
		if(msg=='?departamento=ninguno'){ confirm("El departamento seleccionado no es válido. Intente nuevamente.");
	   		 location.reload();
	    }
	    else{
	  location.href=url;
	}
}

function dpt(){
  var msg="";
    var l=document.getElementById('primero');
    var iS =l.selectedIndex;
    var oS = l.options[iS];
    var vS = oS.value;
    msg+='?departamento='+vS;

    redireccionarDpto(msg);
}


function casosDp(datos, id, numero){

	var datos2=new Array();
	var a=0;
	for(let i=0;i<datos.length;i++){
	   if(numero==0){
	   if(ids(datos[i].departamento,id)){
	      datos2[a]=datos[i];
	      a++;
	      } 
	   }
   if(numero==1){
   if(ids(datos[i].ciudad_municipio,id)){
      datos2[a]=datos[i];
      a++;
      }
   }
}

return datos2;
}




function dpElegido(datos, numero){

	  if(numero==0){
	  		var msg="<h3>"+datos[0].departamento_nom+"</h3>";
	  }
	  if(numero==1){
	  		var msg="<h3>"+datos[0].ciudad_municipio_nom+"</h3>";
	  }
  		return msg;
}


function redireccionarCd(msg){
	var url='./html/ref2.html'+msg+''; 
	  location.href=url;
}

function cdd(){
  var msg="";
    var l=document.getElementById('ciudad');
    var iS =l.selectedIndex;
    var oS = l.options[iS];
    var vS = oS.value;
    msg+='?ciudad='+vS;

    redireccionarCd(msg);
}

function nal(){
	var url='./html/ref3.html'; 

	  location.href=url;
}

	
function estadisticasSexo(datos){

	var sx=leerSexo(datos);
	var fm=new Array(2);
	 fm[0]=0;
	 fm[1]=0;
	for (var i = 0; i<sx.length; i++) {
		if(sx[i]=='F'){
			fm[0]+=1;
		}
		if(sx[i]=='M' || sx[i]=='m'){
			fm[1]+=1;
		}
	}
	return fm;
}

function estadisticasContagio(datos){

	var sx=leerContagios(datos);
	var ri=new Array(2);
	 ri[0]=0;
	 ri[1]=0;
	for (var i = 0; i<sx.length; i++) {
		if(sx[i]=='Relacionado'){
			ri[0]+=1;
		}
		if(sx[i]=='Importado'){
			ri[1]+=1;
		}
	}
	return ri;
}



function array(datos){
	var deptos=new Array();
	var msg="";
	var a=0;

	for(let i=0;i<datos.length;i++){
		deptos[i]=datos[i].departamento_nom;
	}
return deptos;
}


function contagioDpto(datos){

	var dpto=leerDepartamentos(datos)[0]; 
	var d=new Array(dpto.length);  
	var final=new Array();	

for(var i = 0; i < datos.length; i++){	
	for(var j = 0; j < dpto.length; j++){

		if(dpto[j]==datos[i].departamento_nom){
			if(d[j]==null){
				d[j]=1;
			}
			else{
			d[j]+=1;}	
		}
	}
}
	final[0]=dpto;
	final[1]=d;

return final;
}


function tablaDpto(datos){
	var data= new google.visualization.DataTable(); 
	crearEncabezados(data, 'Sexo', 'Cantidad'); //ya
	data.addRows(datos.length);

	for (var i = 0; i<datos.length; i++) {
		if(i==0){
			data.setCell(i,0,'Femenino');
		}
    	else{
    		data.setCell(i,0,'Masculino');
    	}
    		data.setCell(i,1,datos[i]);
	}

	var table= new google.visualization.Table(document.getElementById('table_div'));
	table.draw(data, {showRowNumber: true, width: "40%", height: '40%' });
	
	var departamentos = {'title': 'Estadisticas por Sexo', 'colors': ['pink','blue'], 'width': '1200', 'height': '1200'};

	var grafica= new google.visualization.PieChart(document.getElementById('grafico'));
	grafica.draw(data,departamentos);
}


function tablaCdd(datos){
	var data= new google.visualization.DataTable(); 
	crearEncabezados(data, 'Fuente de Contagio', 'Cantidad'); //ya
	data.addRows(datos.length);

	for (var i = 0; i<datos.length; i++) {
		if(i==0){
			data.setCell(i,0,'Relacionado');
		}
    	else{
    		data.setCell(i,0,'Importado');
    	}
    		data.setCell(i,1,datos[i]);
	}

	var table= new google.visualization.Table(document.getElementById('table_div'));
	table.draw(data, {showRowNumber: true, width: "40%", height: '40%' });
	
	var ciudades = {'title': 'Estadisticas por fuente de contagio', 'colors': ['black','gray'], 'width': '700', 'height': '700'};

	var grafica= new google.visualization.PieChart(document.getElementById('grafico'));
	grafica.draw(data,ciudades);
}



function tablaNal(datos){

	var data= new google.visualization.DataTable();
	var d=contagioDpto(datos);
	var dp=d[0];  //dptos
	var dl=d[1];  //numero
	crearEncabezados(data, 'Departamentos', 'Número de Casos');
	data.addRows(d[0].length);

	for (var i = 0; i<d[0].length; i++) {
		
		data.setCell(i,0,dp[i]);
		data.setCell(i,1,dl[i]);
	}

	var table= new google.visualization.Table(document.getElementById('table_div'));
	table.draw(data, {showRowNumber: true, width: "40%", height: '40%' });
	
	var departamentos = {'title': 'Estadisticas Colombia', 'colors': ['gray','#f2f2f2'], 'width': '1200', 'height': '1200'};

	var grafica= new google.visualization.BarChart(document.getElementById('grafico'));
	grafica.draw(data,departamentos);
}

function crearEncabezados(data, info1, info2){

	data.addColumn('string', info1);
	data.addColumn('number', info2);
}

