//patron modulo
(()=>{
    'use strict'
    let mazo    = [];
    const tipos = ['C','D','H','S'];
    const letras= ['J','Q','K','A'];
    let playerPoints = 0;
    let cpuPoints = 0;
    let playerScore = 0;
    let cpuScore = 0;
    //Referencia del HTML
    const btnNewTag = document.querySelector('#btnNewTag');
    const btnStop = document.querySelector('#btnStop');
    const btnNewGame= document.querySelector('#btnNewGame');
    const cardsPlayer= document.querySelector('#jugador-cartas');
    const cardsCPU= document.querySelector('#cpu-cartas');
    const points= document.querySelectorAll('.cards-sum');
    const score= document.querySelectorAll('.score');
    const startGame =()=>{
        mazo=crearDeck();
    }
    const crearDeck = () =>{
        mazo=[];
        for (let i = 2; i<=10; i++){
            for(let tipo of tipos){
                mazo.push(i+tipo);
            }        
        }
        for(let tipo of tipos){
            for(let letra of letras){
                mazo.push(letra+tipo);
            }
        }
        return _.shuffle( mazo );
    }
    const pedirCarta = () => {
        if (mazo.length === 0){
            throw 'Cartas Agotadas';
        }
        return mazo.pop();
    }
    const valorCarta = (carta)=>{
        const valor = carta.substring(0, carta.length-1);
        return (isNaN(valor))? (valor==='A')? 11:10:valor*1;
    }
    // CPU try
    const turnCPU = (puntosMinimos)=>{
        do{
            const carta= pedirCarta();
            cpuPoints=cpuPoints + valorCarta(carta);
            points[1].innerText=cpuPoints;
            const cardImg = document.createElement('img');
            cardImg.src=`assets/cartas/${carta}.png`;//Direccion de la carta en nuestra carpeta
            cardImg.classList.add('carta');//agregamos las propiedades del CSS
            cardsCPU.append(cardImg);

        }while((cpuPoints<=puntosMinimos)&&(puntosMinimos <=21) );
        setTimeout(()=>{
            if (cpuPoints === puntosMinimos){
                alert('EMPATE');
            }else if(puntosMinimos>21){
                cpuScore=cpuScore+1;
                score[1].innerHTML=cpuScore;
                alert('CPU WINS');
            }else if(cpuPoints>21){
                playerScore=playerScore+1;
                score[0].innerHTML=playerScore;
                alert('Player 1 WINS');
            }else{
                cpuScore=cpuScore+1;
                score[1].innerHTML=cpuScore;
                alert('CPU wins');
            }
        },5);
        
    }
    //eventos
    btnNewTag.addEventListener('click', ()=>{
        const carta= pedirCarta();
        playerPoints=playerPoints + valorCarta(carta);
        points[0].innerText=playerPoints;
        const cardImg = document.createElement('img');
        cardImg.src=`assets/cartas/${carta}.png`;//Direccion de la carta en nuestra carpeta
        cardImg.classList.add('carta');//agregamos las propiedades del CSS
        cardsPlayer.append(cardImg);
        if(playerPoints > 21){
            btnNewTag.disabled = true;
            btnStop.disabled=true;
            turnCPU(playerPoints);
        }else if(playerPoints === 21){
            btnStop.disabled=true;
            btnNewTag.disabled = true;
            turnCPU(playerPoints);
        }

    })
    btnStop.addEventListener('click', ()=>{
        btnNewTag.disabled=true;
        btnStop.disabled=true;
        turnCPU(playerPoints);
        
    })
    btnNewGame.addEventListener('click',()=>{
        startGame();
        playerPoints = 0;
        cpuPoints = 0;
        points[0].innerText = 0;
        points[1].innerText = 0;
        cardsPlayer.innerHTML='';
        cardsCPU.innerHTML='';
        btnNewTag.disabled=false;
        btnStop.disabled=false;

    })

})();
