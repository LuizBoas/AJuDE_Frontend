let $main = document.querySelector('#main');
let $menu = document.querySelector('#menu');

let template1, template2, template3, template4, template5, templateHome, templateLogar, templateDeslogar, menu1, menu2, visualiza;

async function fetch_templates() {
  let html_templates = await (fetch('templates.html').then(r => r.text()));
  let e = document.createElement("div");
  e.innerHTML = html_templates;
  template1 = e.querySelector('#cadastroDeUsuarios');
  template2 = e.querySelector('#loginDoUsuario');
  template3 = e.querySelector('#cadastroDeCampanhas');
  template4 = e.querySelector('#pesquisaCampanhas');
  template5 = e.querySelector('#campanhas');
  templateHome = e.querySelector('#home');
  templateLogar = e.querySelector('#logar');
  templateDeslogar = e.querySelector('#deslogar');
  menu1 = e.querySelector('#menu1');
  menu2 = e.querySelector('#menu2');
  visualiza = e.querySelector('#visualizaCampanha');
}

export async function viewMenu1(){
    let data = await Promise.resolve(fetch_templates());

    let $template = menu1;
    $menu.innerHTML = $template.innerHTML;
}

export async function viewMenu2(){
    let data = await Promise.resolve(fetch_templates());

    let $template = menu2;
    $menu.innerHTML = $template.innerHTML;
}


export async function viewDeslogar(){
    let data = await Promise.resolve(fetch_templates());

    let $template = templateDeslogar;
    $main.innerHTML = $template.innerHTML;

    let $a = document.querySelector('#viewDeslogar');
    $a.addEventListener('click', deslogar);
}

function deslogar(){
    localStorage.clear();
    view5();

}

export async function view5(){
    let data = await Promise.resolve(fetch_templates());
    location.hash = "#/home";

    let $template = templateHome;
    $main.innerHTML = $template.innerHTML;
}

export async function view2() {
    let data = await Promise.resolve(fetch_templates());
    location.hash = "#/login";

    let $template = template2;
    $main.innerHTML = $template.innerHTML;

    let $loginButton = document.querySelector("#view2Button");
        $loginButton.addEventListener('click',
        async function logaUsuario() {
                let email = document.querySelector("#view2Email");
                let senha = document.querySelector("#view2Senha");
                let resposta = await fetch("http://localhost:8080/auth/login", {
                    'method': 'POST',
                    'body': `{"email": "${email.value}","senha": "${senha.value}" }`,
                    'headers': {'Content-Type': 'application/json'}
                })
                if(resposta.status==200){
                    let dado = await resposta.json();
                    localStorage.setItem("token", dado.token);
                    localStorage.setItem("email", email.value);
                    alert("Login Efetivado");
                    view5();
                }else{
                    alert("Erro ao Logar, tente novamente");
                }

            }
        );
}

export async function view1(){
    let data = await Promise.resolve(fetch_templates());
    location.hash = "#/cadastro";

    let $template = template1;
    $main.innerHTML = $template.innerHTML;

    let $createButton = document.querySelector("#view1Button");
        $createButton.addEventListener('click', 
            function cadastraUsuario() {
                let primeiroNome = document.querySelector("#view1PrimeiroNome");
                let email = document.querySelector("#view1Email");
                let ultimoNome = document.querySelector("#view1UltimoNome");
                let cartaoCredito = document.querySelector("#view1CartaoCredito");
                let senha = document.querySelector("#view1Senha");
                fetch("http://localhost:8080/api/usuarios", {
                    'method': 'POST',
                    'body': `{"email": "${email.value}","primeiroNome": "${primeiroNome.value}","ultimoNome": "${ultimoNome.value}",
                    "cartaoCredito": "${cartaoCredito.value}","senha": "${senha.value}" }`,
                    'headers': {'Content-Type': 'application/json'}
                })
                .then(r => r.json())
                .then(r => {console.log(r)}) //fins de visualizacao
                .then(alert("Usuario Cadastrado")); //fins de visualizacao
            }
        );
    let $a = document.querySelector('#link');
    $a.addEventListener('click', view2);
}

export async function view3(){
    let data = await Promise.resolve(fetch_templates());
    location.hash = "#/cadastroCampanha";

    let $template = template3;
    $main.innerHTML = $template.innerHTML;

    let $cadastraButton = document.querySelector("#view3Button");
    $cadastraButton.addEventListener('click', 
        async function cadastraCampanha(){
            let nomeCampanha = document.querySelector("#view3NomeCampanha");
            sessionStorage.setItem("nomeCampanha", nomeCampanha.value);
            let descricaoCampanha = document.querySelector("#view3DescricaoCampanha");
            sessionStorage.setItem("descricaoCampanha", descricaoCampanha.value);
            let metaCampanha = document.querySelector("#view3MetaCampanha");
            sessionStorage.setItem("metaCampanha", metaCampanha.value);
            let dataCampanha = document.querySelector("#view3DataCampanha");
            sessionStorage.setItem("dataCampanha", dataCampanha.value);
            let urlCampanha = createURL(nomeCampanha.value);
            sessionStorage.setItem("urlCampanha", urlCampanha);
            localStorage.setItem("url", urlCampanha);
            let resposta = await fetch("http://localhost:8080/api/campanhas", {
                'method': 'POST',
                'body': JSON.stringify({"nome": nomeCampanha.value,"descricao": descricaoCampanha.value,
                "meta": metaCampanha.value,"data": dataCampanha.value,"url": urlCampanha, "email": localStorage.email}),
                'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
            })
            if(resposta.status==200){
                let dado = await resposta.json();
                alert("Capanha Criada");
            }else{
                alert("Erro ao criar a Campanha");
            }

        }
    );

    let $visualizaButton = document.querySelector("#visualizar");
    $visualizaButton.addEventListener('click', 
        async function visualizaCampanha() {
            let nomeCampanha = document.querySelector("#view3NomeCampanha");
            sessionStorage.setItem("nomeCampanha", nomeCampanha.value);
            let descricaoCampanha = document.querySelector("#view3DescricaoCampanha");
            sessionStorage.setItem("descricaoCampanha", descricaoCampanha.value);
            let metaCampanha = document.querySelector("#view3MetaCampanha");
            sessionStorage.setItem("metaCampanha", metaCampanha.value);
            let dataCampanha = document.querySelector("#view3DataCampanha");
            sessionStorage.setItem("dataCampanha", dataCampanha.value);
            let urlCampanha = createURL(nomeCampanha.value);
            sessionStorage.setItem("urlCampanha", urlCampanha);
            visualizar()
        }

    );

}

export async function visualizar(){
    let data = await Promise.resolve(fetch_templates());
    location.hash = "#/visualizar";

    let $template = visualiza;
    $main.innerHTML = $template.innerHTML;

    let nome = sessionStorage.getItem("nomeCampanha");
    console.log(nome);
    //isso aqui nao pega
    visualiza.querySelector('#vNome').innerHTML("oi");
}


export async function view4(){
    let data = await Promise.resolve(fetch_templates());
    location.hash = "#/pesquisaCampanhas";

    let $template = template4;
    $main.innerHTML = $template.innerHTML;

    let $pesquisaButton = document.querySelector("#view4Button");
    $pesquisaButton.addEventListener('click', 
        function pesquisaCampanhas(){
            let nome = document.querySelector('#view4Substring');
            fetch(`http://localhost:8080/api/campanhas/pesquisar/${nome.value}`,{
                'method':'GET',
                'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
            })
            .then(r =>r.json())
            .then(r => {console.log(r)})
        }
    );
}

function createURL (text){     
    text = text.toLowerCase();                                                           
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    text = text.replace(new RegExp('[ ]','gi'), '-');
    text = text.replace(new RegExp('[,]','gi'), '');
    return text;                 
}