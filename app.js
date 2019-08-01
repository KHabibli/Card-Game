const deleteCards = document.querySelectorAll('.card');
const clr = document.getElementById('color');
const takenCard = document.getElementById('takenCard');
takenCard.textContent = '';
deleteCards.forEach(function(card,index){
    card.innerHTML = `<small>${index+1}</small>`
    
})
var targetClass = [];
var ids = [];
let clicks = 0;

document.getElementById('mix').addEventListener('click', getCards);

function getCards() {
    const cards = document.querySelectorAll('.card');
    const cardsArr = Array.apply(null, cards);
    let index1, index2;
    let ids = ['primary' , 'info' , 'warning' , 'secondary' , 'dark' , 'white'];
    
    ids.forEach(function(color){
        index1 = giveIndex(cardsArr.length);
        index2 = giveIndex(cardsArr.length);
        if (index1 === index2) {
            index2 = giveIndex(cardsArr.length);
        }
        if (index1 === index2) {
            index2 = giveIndex(cardsArr.length);
        }
        if (index1 === index2) {
            index2 = giveIndex(cardsArr.length);
        }
        cardsArr[index1].classList.add(color);
        cardsArr[index2].classList.add(color);
        cardsArr.splice(index1, 1);
        if (index1 > index2) {
            cardsArr.splice(index2, 1);
        } else {
            cardsArr.splice(index2 - 1, 1);
        }
    }) 

    document.getElementById('mix').style.display = 'none';

    document.querySelector('.cards').addEventListener('click', function (e) {
        if(e.target.className.includes('col-2') ){
            targetClass.push(e.target.className);
            takenCard.textContent += `${e.target.textContent} `;
        }
        ids.push(e.target.innerHTML);
        clr.className = `form-control mt-3 bg-${e.target.classList[4]}`;
        if(targetClass.length == 2){
                if(ids[0] == ids[1]){
                targetClass = [];
                ids = [];
            }else{
                if(targetClass[0] === targetClass[1]){
                    deleteCards.forEach(function(card,index){
                        if(card.className == targetClass[0]){
                            card.className = `col-2 mr-4 card bg-success`;
                        }
                    })
                    
                }
            }        
        }
        if(targetClass.length >1){
            targetClass = [];
            ids = [];
            takenCard.textContent += ' | ';
        }
        clicks++;
        over();
    
    })
    
    function over(){
        let check = 0;
        deleteCards.forEach(function(cards){
            if(cards.className == 'col-2 mr-4 card bg-success'){
                check++;
            }
        })
        if(check == 12){
            takenCard.textContent = `You made ${clicks} moves`;
            let t = 3;
            let x = setInterval(() => {
                clr.value = `Restarting in ${t}`;
                t--;
                if(t <= 0){
                    clearInterval(x);
                    window.location.reload()
                }
            },1000)
        }
    }
}



function giveIndex(limit) {
    return Math.floor(Math.random() * limit);
}

