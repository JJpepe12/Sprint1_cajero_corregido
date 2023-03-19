// 1. Escribir una lista de usuarios con los siguientes datos: nombre, número de documento, contraseña y tipo de usuario
// El tipo de usuario será: 1: administrador, 2: cliente. Guardarla en un array de objetos
const listaUsuarios = [
	{
		nombre: 'Administrador',
		documento: '00123',
		contrasena: 'admin123',
		tipo: 1
	},
	{
		nombre: 'Jose',
		documento: '12345',
		contrasena: 'Jose12345',
		tipo: 2
	},
	{
		nombre: 'Maria',
		documento: '67890',
		contrasena: 'Maria67890',
		tipo: 2
	}
];

// 2. Realizar un programa que al inicio solicite ingresar documento y contraseña
// si el usuario no existe debe indicar que no existe y volver a preguntar usuario y contraseña

const bienvenidaCajero = () => {
	const numeroDocumento = prompt("Por favor ingrese su documento");
	const pwd = prompt("Por favor ingrese su contraseña");
	return {
    numeroDocumento,
    pwd,
	};
};

const validarUsuario = () => {
	let usuarioIniciado = bienvenidaCajero();

	let buscarUsuario = listaUsuarios.find(
    (user) =>
		user.documento === usuarioIniciado.numeroDocumento &&
		user.contrasena === usuarioIniciado.pwd
	);
  	//Si el usuario no existe, se debe volver a ejecutar la bienvenida y la búsqueda del usuario
	while (!buscarUsuario) {
    alert("Los datos ingresados son incorrectos");
    usuarioIniciado = bienvenidaCajero();
    buscarUsuario = listaUsuarios.find(
		(user) =>
        user.documento === usuarioIniciado.numeroDocumento &&
        user.contrasena === usuarioIniciado.pwd
    );
	}
	return buscarUsuario;
};

// si el usuario es administrador, debe permitir cargar el cajero de la siguiente manera:
// 3. Solicitar la cantidad de billetes de 5, 10, 20, 50 y 100 mil pesos COP.
// 4. Almacenar esta información en un array de objetos.

const dineroDisponible = [
	{ denominacion: 100000, cantidad: 0 },
	{ denominacion: 50000, cantidad: 0 },
	{ denominacion: 20000, cantidad: 0 },
	{ denominacion: 10000, cantidad: 0 },
	{ denominacion: 5000, cantidad: 0 }
];

let totalDinero = 0;

const cargarCajero = () => {
	alert("Por favor, cargue el cajero con dinero");

	dineroDisponible.forEach((billete) => {
    const cantidadDepositadaStr = prompt(
    `Por favor ingrese la cantidad de billetes de ${billete.denominacion} a depositar`
    );
    const cantidadDepositada = Number(cantidadDepositadaStr);
    billete.cantidad += cantidadDepositada;

    // Sumar el total de cada denominación de billete al total general
    totalDinero += billete.denominacion * billete.cantidad;
    console.log(
      `Hay ${billete.denominacion * billete.cantidad} en billetes de ${billete.denominacion}`
    );
	});
	console.log("Total de dinero en el cajero", totalDinero);
};

// 6. Una vez el cajero esté cargado, debe volver a solicitar usuario y contraseña,
// si es administrador, se repite el mismo proceso, sumar a la cantidad actual

const repetirProceso = () => {
	const usuarioEncontrado = validarUsuario();
	//Si el usuario ingresado existe, procedemos a validar que tipo de usuario es.
	if (usuarioEncontrado) {
    if (usuarioEncontrado.tipo === 1) {
		cargarCajero();
		repetirProceso(); // return repetirProceso para admin
		
		// si es cliente debe proseguir de la siguiente manera:
		// 7. Si el cajero no tiene dinero cargado, debe aparecer un mensaje en consola:
		//“Cajero en mantenimiento, vuelva pronto.” Y reiniciar desde el inicio
		} else {
		if (totalDinero == 0) {
			console.log("Cajero en mantenimiento, vuelva pronto.");
			repetirProceso(); // repetirProceso para reiniciar
		} else {
        retirarDinero();
		}
		}
	}
};

// 8. Si el cajero ya tiene dinero cargado, debe preguntar la cantidad deseada a retirar
// Luego debe indicar cuánto dinero puede entregar basado en la cantidad disponible y los tipos de billetes
// Luego debe mostrar en consola cuántos billetes de cada denominación entregó.
// Priorizando siempre las denominaciones más altas y redondeando a la cifra menor

const retirarDinero = () => { //preguntar cantidad a retirar
	const cantidadRetirar = parseInt(prompt("Ingrese la cantidad que desea retirar: ")); //convertir string a número
	console.log("El usuario quiere retirar " + cantidadRetirar);

	if (cantidadRetirar > totalDinero) { //validación dinero disponible
		console.log("Lo sentimos, no hay suficiente dinero disponible en el cajero");
	} else { //let dinero luego de cada desembolso
		let dineroRestante = cantidadRetirar;

		dineroDisponible.forEach((billete) => { 
		const cantidadEntregar = Math.floor(dineroRestante / billete.denominacion); //redondea a la cifra menor los billetes necesarios
		if (cantidadEntregar > billete.cantidad) { //si hay dinero, pero no es suficiente, se ajusta a cero
			billete.cantidad = 0;
		} else {
			billete.cantidad -= cantidadEntregar; //si hay suficiente se resta la  cantidad al dinero entregado
		}
		console.log(
			`Se entregan ${cantidadEntregar} billetes de ${billete.denominacion}`
		); //actualiza let 
		dineroRestante -= cantidadEntregar * billete.denominacion;
		});

		// 9. Posteriormente, debe aparecer en consola, el dinero restante en el cajero.
		console.log(
		`Dinero restante en el cajero: ${totalDinero - cantidadRetirar}`
		);
	}
};
repetirProceso(); // repetirProceso para reiniciar

