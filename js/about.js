const about = document.getElementById("about");
const DATA_URL = "https://api.github.com/users/";

const user=["Eusebiolujan","AntoM37","belenperna23","Che-Pibe27","pabloribeiro23","RafaelSouzaMaciel","thiagoleoncino"]

user.map((github)=>{
    fetch(DATA_URL+github)
    .then(reponse=>reponse.json()) 
    .then(data=>{
        const userData=showData(data)
about.innerHTML+=userData
    })
})

function showData(e){
    const name= e.name??e.login
    return `
    
    <div class=" p-[2px] rounded-se-[100px] rounded-bl-[100px] shadowcard w-[300px] mt-5 mb-3 mx-2">
    <div class="flex flex-col py-7 rounded-md rounded-se-[100px] rounded-bl-[100px] bg-[#0F212E] z-40 h-full w-full">
      <div class="text-center font-bold hover:scale-105 rounded-t-full items-center flex flex-col ">
      <img src="${e.avatar_url}" alt="Avatar" width="150" height="150" class="rounded-t-full">
      <label class="mt-2 text-white truncate max-w-[200px]">${name}</label>
      </div>
      <div class="flex items-center justify-center mt-4">
      <a href="${e.html_url}" target="_blank" class="hover:scale-110">
          <img src="/e-commerce/webfonts/icons-github1.svg" alt="GitHub" width="64" height="64">
      </a>
      <a href="" target="_blank" class="hover:scale-110">
        <img src="/e-commerce/webfonts/icons-linkedin1.svg" alt="LinkedIn" width="64" height="64">
      </a>
      </div>
    </div>
    </div>
    `
}