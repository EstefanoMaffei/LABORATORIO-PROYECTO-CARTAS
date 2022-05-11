// JS VARIABLES


let deck = [];

let basura = [];

const tipos = ['C','D','H','S'];

const tiposEspeciales = ['A','J','Q','K'];

let puntosJugador = 0;

let puntosComputadora= 0;


// REFERENCIAS HTML 
// BOTONES


const bntPedir = document.querySelector('#btnPedir');
const btnNewGame = document.querySelector('#btnNewGame');
const btnStop = document.querySelector('#btnStop');


// JUGADOR


const cartasJugador = document.querySelector('#jugador-cartar');
const smalls = document.querySelectorAll('small');


// COMPUTADORA


const cartasComputadora = document.querySelector('#comp-cartar');









// ESTA FUNCION CREA UNA BARAJA

const crearDeck = () =>{

    for(let i = 2; i<=10; i++){
        for (const tipo of tipos) {
            deck.push(i + tipo);

        }
    }

    for(let tipo of tipos){
        for (const tiposspecial of tiposEspeciales) {
            deck.push(tiposspecial + tipo);
        }
    }

    deck = _.shuffle(deck);
    return deck
}

crearDeck();

// FUNCION DE TOMAR CARTA
const perdirCarta = () => {

    if ( deck.length === 0) throw 'No tenemos cartas en el deck';
    

    const carta = deck.pop();

    basura.unshift(carta); 
    
    return carta;
}

// VALOR CARTA

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length-1);
   
    return ( isNaN ( valor ) ) ?
            (valor === 'A')    ? 11 : 10
            : valor * 1;
}

valorCarta( perdirCarta() );


// TURNO COMPUTADORA

const turnoComputadora = ( puntosMinimos ) => {


    do{
        
        // FUNCION CONTEO DE CARTAS

        const carta = perdirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        smalls[1].innerHTML = puntosComputadora;
        const imgCarta = document.createElement('img');


        //IMAGEN CARTA
        imgCarta.src= `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        cartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {   break   }  ;

    }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        
        
        if( puntosComputadora === puntosMinimos ) {
            
            alert('nadie a ganado.')
            
        }else if (puntosMinimos > 21){ 
            
            alert('Computadora a ganado')
            
        }else if (puntosComputadora > 21){
            
            alert('Jugador a ganado')
            
        }else{
            alert('computadora a ganado')
        }
    }, 100);
    }
    
// EVENTOS PEDIR 

bntPedir.addEventListener('click', function(){
    
//FUNCION DE CONTEO DE CARTAS

    const carta = perdirCarta();
    
    puntosJugador = puntosJugador + valorCarta(carta);
    smalls[0].innerHTML = puntosJugador;
    const imgCarta = document.createElement('img');

//IMAGEN CARTA
    imgCarta.src= `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    cartasJugador.append(imgCarta);

//EVALUACION 21 PUNTOS

    if(puntosJugador > 21){
        console.warn('Haz perdido.');
        bntPedir.disabled = true;
        btnStop.disabled = true;
        turnoComputadora( puntosJugador );

    }else if( puntosJugador === 21 ){
        console.warn('Haz llegado a 21');
        turnoComputadora( puntosJugador );
        

    }
});

// EVENTOS DETENER 

btnStop.addEventListener('click', function(){

    turnoComputadora( puntosJugador );

    bntPedir.disabled = true;

    btnStop.disabled = true;


}); 

// EVENTOS NEW GAME

btnNewGame.addEventListener('click', function(){

    deck = crearDeck();

    puntosComputadora = 0;
    puntosJugador = 0

    smalls[0].innerText = 0;
    smalls[1].innerText = 0;

    cartasComputadora.innerHTML = '';
    cartasJugador.innerHTML = '';
    
    bntPedir.disabled = false;
    btnStop.disabled = false;
});