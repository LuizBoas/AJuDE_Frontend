import * as app from "/app.js";

/**
 * URI da aplicacao backend
 */
let URI = 'https://teste31102001.herokuapp.com';

/**
 * Funcao que redireciona para a view correta a partir da url
 */
function roteamento(){
    geraMenu();
    let hash = location.hash;
    let link = hash.substring(1, hash.length);
    if(link.includes("/usuario/")){
        let linkUsuario = link.substr(9);
        app.perfil(linkUsuario);
    }else if(link.includes("/campanha/")){
        let linkCampanha = link.substr(10);
        app.campanha(linkCampanha);
    }else{
        switch(link){
            case "/login":
                app.view2();
                break;
            case "/cadastro":
                app.view1();
                break;
            case "/cadastroCampanha":
                app.view3();
                break;
            case "/pesquisaCampanhas":
                app.view4();
                break;
            case "/deslogar":
                teste();
                break;
            case "/perfil":
                location.hash = '#/usuario/' + (localStorage.getItem('email'))
                break;
            default:
                app.view5();
                break;
        }
    }    
}


/**
 * Verifica se o Usuario esta logado ou nao e gera o menu adequado
 */
async function geraMenu(){
    let resposta = await fetch(URI + "/api", {
        'method':'GET',
        'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
        })
        if(resposta.status==200){
            app.viewMenu2();
        }else{
            app.viewMenu1();
        }
            
    }

/**
 * Verifica se o Usuario esta logado antes de mostrar a view de logout
 */
async function teste(){
    let resposta = await fetch(URI + "/api", {
    'method':'GET',
    'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
    })
    if(resposta.status==200){
            app.viewDeslogar(); 
    }else{
        app.view2();
    }             
};

roteamento();

window.addEventListener("hashchange", roteamento, geraMenu);
