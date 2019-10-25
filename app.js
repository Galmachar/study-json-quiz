var coll = document.getElementsByClassName("collapsible");
let quizform = document.getElementById("form");
const choose = document.querySelector(".my-5");
const buttons = document.getElementsByClassName("how_many");
const pytanie = document.getElementById("pytanie");

//JSON
const getTodos=(resource,callback)=>{

  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange',()=>{
      if(request.readyState ===4 && request.status===200){
          const data = JSON.parse(request.responseText);
          callback(undefined,data);
      }else if(request.readyState === 4){
          callback('could not fetch data', undefined);
      };
  });
  
  request.open('GET',resource);
  request.send();
  };
//END OF JSON


choose.innerHTML += `<div class="text-center">
          <button class="how_many btn-light" value="5">5 pytań</button>
</div>
<div class="text-center">
          <button class="how_many btn-light" value="20">20 pytań</button>
</div>
<div class="text-center">
          <button class="how_many btn-light" value="50">50 pytań</button>
</div>`
const clickable = () => {
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    //get json
    getTodos('json/test.json',(err,data)=>{
      if(err){
        console.log(err);
    }else if(data){

      how_many = buttons[i].value;
      //losowanie
      wylosowane = [];
      for (let i=0; i<how_many;i++){
          const los=()=>{
              x=Math.floor(Math.random() * data.length);
              if(wylosowane.includes(x)){
                  los();
              }else{
                  wylosowane.push(x);
              }
          };
          los()  
      }
      //koniec losowania


      console.log(data.length);
      for (let i = 0; i < how_many; i++) {
        quizform.innerHTML +=
          `<div class="collapsible">${data[wylosowane[i]].id}</div>
                <div class="content">
                  <p class="text"> ${data[wylosowane[i]].title}</p>
        </div>`
      } 
      quizform.innerHTML += `<div class="text-center">
      <input type="submit" class="btn btn-light"> </div>`;
      clickable();
      pytanie.classList.add("zniknij");
      //  console.log(data[0].pytanie);
    }else{
        console.log("unkonown error")
    }
    });

    
  })
}

/*
for(let i=0;i<5;i++){
    quizform.innerHTML+=
    `<div class="collapsible">${i+1}. Testowe pytanie ${i+1}</div>
            <div class="content">
              <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>`
}
*/






