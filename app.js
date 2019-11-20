let $main = document.querySelector('#main');
let $menu = document.querySelector('#menu');

let template1, template2, template3, template4, template5, templateHome, templateLogar, templateDeslogar, menu1, menu2;
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
            function logaUsuario() {
                let email = document.querySelector("#view2Email");
                let senha = document.querySelector("#view2Senha");
                localStorage.setItem("email", email.value);
                fetch("http://localhost:8080/auth/login", {
                    'method': 'POST',
                    'body': `{"email": "${email.value}","senha": "${senha.value}" }`,
                    'headers': {'Content-Type': 'application/json'}
                })
                .then(r => r.json())
                .then(r => {localStorage.setItem("token", r.token)});
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
        function cadastraCampanha(){
            let nomeCampanha = document.querySelector("#view3NomeCampanha");
            let descricaoCampanha = document.querySelector("#view3DescricaoCampanha");
            let metaCampanha = document.querySelector("#view3MetaCampanha");
            let dataCampanha = document.querySelector("#view3DataCampanha");
            let urlCampanha = createURL(nomeCampanha.value);
            localStorage.setItem("url", urlCampanha);
            fetch("http://localhost:8080/api/campanhas", {
                'method': 'POST',
                //'body': `{"nome": "${nomeCampanha.value}","descricao": "${descricaoCampanha.value}","meta": "${metaCampanha.value}"}`,
                'body': JSON.stringify({"nome": nomeCampanha.value,"descricao": descricaoCampanha.value,
                "meta": metaCampanha.value,"data": dataCampanha.value,"url": urlCampanha, "email": localStorage.email}),
                'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
            })
            .then(r => r.json())
            .then(console.log(dataCampanha.value))
            .then(r => {console.log(r)}) //fins de visualizacao
            .then(alert("Campanha Criada")); //fins de visualizacao
        }
    );
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