let msg = document.querySelector("#msg");
let chatcontainer = document.querySelector(".chat-container");
const url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBAUQOiPDM7mgYGG543GeedD7eFNRjzdE8"

let user={
    data:null,
}

async function generateResponse(aichatbox) {
    let text = aichatbox.querySelector(".ai-chat")
    let requestOption={
        method:"POST",
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "contents": [{
              "parts":[{"text": user.data}]
              }]
             })
    }

    try{
        let response = await fetch(url,requestOption)
        let data = await response.json()
        let apiresponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
        text.innerHTML=apiresponse;
    }
    catch(error){
        console.log(error)

    }
    finally{
        chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})
    }
    
}
function createchatbox(html,classes){
    let div =  document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}

function handelchatbox(message){
    user.data=message;
    let html=`<img src="user.png" alt="" id="user-img" width="50">
    <div class="user-chat">
        ${user.data}
    </div>`
    msg.value=""

    let userchatbox = createchatbox(html,"user-chatbox");
    chatcontainer.appendChild(userchatbox);

    chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})
   
    setTimeout(() => {
        let html = `<img src="AI.png" alt="" id="ai-img" width="50">
            <div class="ai-chat">
                <img src="loading.gif" alt="" class="load">
            </div>`

        let aichatbox = createchatbox(html,"ai-chatbox");
        chatcontainer.appendChild(aichatbox);
        chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})
        generateResponse(aichatbox);
    }, 600);
}

msg.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        handelchatbox(msg.value);
    }
    
})
