let convertBtn = document.querySelector('.convert');
let saveBtn = document.querySelector('.save');
let textareaHTML = document.querySelector('#textarea-html');
let textareaJSON = document.querySelector('#textarea-json');
let content = document.querySelector('.content');


function convertToJSON(){ 
    let textElements = document.querySelectorAll('.trescE')
    let i = 1;
    let pytania = [];
    textElements.forEach((text, id) => {
        let questionText = text.textContent.trim();
        let questionNumber = questionText.match(/^\d+/);
        let questionIndex = questionNumber ? parseInt(questionNumber[0]) : null;

        let textEl = questionText.slice(3,questionText.length)

        let answerA = [...document.querySelectorAll(`#odpa${i}`)][0]
        let answerB = [...document.querySelectorAll(`#odpb${i}`)][0]
        let answerC = [...document.querySelectorAll(`#odpc${i}`)][0]
        let answerD = [...document.querySelectorAll(`#odpd${i}`)][0]

        let textAnswerA = answerA.textContent;
        let textAnswerB = answerB.textContent;
        let textAnswerC = answerC.textContent;
        let textAnswerD = answerD.textContent;
        let goodAnswer = null;

        if(answerA.classList.contains('odpgood')){
            goodAnswer = textAnswerA
        }

        if(answerB.classList.contains('odpgood')){
            goodAnswer = textAnswerB
        }

        if(answerC.classList.contains('odpgood')){
            goodAnswer = textAnswerC
        }

        if(answerD.classList.contains('odpgood')){
            goodAnswer = textAnswerD
        }

        if (questionIndex) {

            let obrazekElement = text.nextElementSibling.querySelector('.obrazek img');
            let obrazekUrl = obrazekElement ? obrazekElement.getAttribute('src') : null;
            let url = "";

            if(typeof(obrazekUrl) == "string"){
                url = 'https://egzamin-informatyk.pl/'+obrazekUrl.slice(3,obrazekUrl.length)
            }
            
            pytania.push(
                {
                    id: i,
                    tresc: textEl,
                    odpowiedzi: {
                        answers_id: i,
                        a: textAnswerA,
                        b: textAnswerB,
                        c: textAnswerC,
                        d: textAnswerD,
                    },
                    poprawna_odpowiedz: goodAnswer,
                    obrazek: url,
                }
            );

        }

        i++;
    })
    return JSON.stringify(pytania);
}


convertBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let text = textareaHTML.value;
    content.innerHTML = text;
    let data = convertToJSON()
    textareaJSON.value = data;
    textareaHTML.value = "";
})

saveBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    let form = document.querySelector('.textarea-json').value;

    try{
        let request = await fetch('./send.php', {
            method: 'post',
            body: form,
            headers: {
                "Content-type": "application/json",
            }
        })
    
        let response = await request.text();

        console.log(response)
    }catch(error){
        console.log(error);
    }
})

