const correct_answers = ['B','B','B','B'];

const form = document.querySelector('.quiz-form');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const result = document.querySelector('.result');
    let score = 0;
    const userAnswers = [form.q1.value,form.q2.value,form.q3.value,form.q4.value,];

    userAnswers.forEach((answer,i)=>{
        if(answer === correct_answers[i]){
            score +=25;
        }
    });
    //result
    let procent = result.querySelector('span');
    result.classList.remove('d-none');
    scrollTo(0,0);
    let output = 0;
    console.log(score);
    const timer = setInterval(()=>{
        procent.textContent = output + "%";
        if(output>=score){
            clearInterval(timer);
        }else{
            output++;
        }
    },10);
});

