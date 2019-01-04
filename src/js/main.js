(function(){
    function nombrar(nombre){
        return nombre;
    }

    function saludar(nombre){
        console.log(nombre, 'Un saludo');
    }

    saludar(nombrar('Sergio Alejandro'));
    saludar(nombrar('Alejandro'));


})();


