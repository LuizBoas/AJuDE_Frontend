import * as poxa from "/app.js";

function roteamento(){
    geraMenu();
    let hash = location.hash;
    let link = hash.substring(1, hash.length);
    // console.log("link: " + link);
    if(link.includes("/campanha/")){
        let linkCampanha = link.substr(10);
        // console.log(linkCampanha);
        poxa.campanha(linkCampanha);
    }else{
        switch(link){
            case "/login":
                poxa.view2();
                break;
            case "/cadastro":
                poxa.view1();
                break;
            case "/cadastroCampanha":
                poxa.view3();
                break;
            case "/pesquisaCampanhas":
                poxa.view4();
                break;
            case "/deslogar":
                teste();
                break;
            case "/visualizar":
                break;
            default:
                poxa.view5();
                break;
        }
    }
    
}
function geraMenu(){
    fetch("http://localhost:8080/api", {
        'method':'GET',
        'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
        })
        .then(r => { 
            if(r.status==200){
                poxa.viewMenu2();

            }else{
                poxa.viewMenu1();
            }
            
        }
    );
}

function teste(){
    fetch("http://localhost:8080/api", {
    'method':'GET',
    'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
    })
    .then(r => { 
                if(r.status==200){
                    poxa.viewDeslogar(); 

                }else{
                    poxa.view2();
                }
                
            }
        );
};

roteamento();

window.addEventListener("hashchange", roteamento, geraMenu);
