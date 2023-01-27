//patron modulo
(()=>{
    'use strict'
    let mazo    = [];
    const tipos = ['C','D','H','S'],
          letras= ['J','Q','K','A'];
    let playersPoints=[],
        playerScore = 0,
        cpuScore = 0;
    //Referencia del HTML
    const btnNewTag = document.querySelector('#btnNewTag'),
          btnStop = document.querySelector('#btnStop'),
          btnNewGame= document.querySelector('#btnNewGame');

    const divCards=document.querySelectorAll('.divCards'),
          points= document.querySelectorAll('.cards-sum'),
          score= document.querySelectorAll('.score');
    //Iniciar Juego
    const startGame =(players=2)=>{
        mazo=barajarMazo();
        playersPoints=[];
        for(let i =0;i<players;i++){
            playersPoints.push(0);
        }
        points.forEach(elem=>elem.innerText=0);
        divCards.forEach(elem=>elem.innerHTML='');
        btnNewTag.disabled=false;
        btnStop.disabled=false;
    }
    const barajarMazo = () =>{
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
    // CPU try, el ultimo indice del arreglo corresponde a la CPU
    const cardsAcum= (carta,turn)=>{
            playersPoints[turn]=playersPoints[turn] + valorCarta(carta);
            points[turn].innerText=playersPoints[turn];
            return playersPoints[turn];
    }
    const newCard=(carta,turn)=>{
            const cardImg = document.createElement('img');
            cardImg.src=`assets/cartas/${carta}.png`;//Direccion de la carta en nuestra carpeta
            cardImg.classList.add('carta');//agregamos las propiedades del CSS
            divCards[turn].append(cardImg);
    }

    const whoIsWinner =()=>{
        const [puntosMinimos,cpuPoints]=playersPoints;
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

    const turnCPU = (puntosMinimos)=>{
        let cpuPoints=0;
        do{
            const carta= pedirCarta();
            cpuPoints= cardsAcum(carta,playersPoints.length-1);
            newCard(carta,playersPoints.length-1);

        }while((cpuPoints<=puntosMinimos)&&(puntosMinimos <=21) );

        whoIsWinner();                
    }
    //eventos
    btnNewTag.addEventListener('click', ()=>{
        const carta= pedirCarta();
        const playerPoints = cardsAcum(carta,0);

        newCard(carta,0);

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
        turnCPU(playersPoints[0]);
        
    })
    btnNewGame.addEventListener('click',()=>{
        startGame();
    })

})();
