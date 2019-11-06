
let $main = document.querySelector('#main');

(async function main() {
    let data = await Promise.all([fetch_status(), fetch_templates()]);
    // roteamento
    let hash = location.hash;
    if (["", "#view1"].includes(hash)) {
      view1();
    } else if (["#view2"].includes(hash)) {
      view2();
    } 
  }());

async function fetch_status() {
  let data = await (fetch('api/status').then(r => r.json()));
  return data;
}

let template1, template2, template3;
async function fetch_templates() {
  let html_templates = await (fetch('templates.html').then(r => r.text()));
  let e = document.createElement("div");
  e.innerHTML = html_templates;
  template1 = e.querySelector('#cadastro');
  template2 = e.querySelector('#login');
  template3 = e.querySelector('#cadastroCampanha');
}

let $menuLogin = document.querySelector('#viewLogin');
$menuLogin.addEventListener('click', view2);

let $menuCadastro = document.querySelector('#viewCadastro');
$menuCadastro.addEventListener('click', view1);

let $menuCadastroCampanha = document.querySelector('#viewCadastroCampanha');
$menuCadastroCampanha.addEventListener('click', view3);

function view1(){
    let $template = template1;
    $main.innerHTML = $template.innerHTML;

    let $createButton = document.querySelector("#create");
        $createButton.addEventListener('click', 
            function cadastraUsuario() {
                let primeiroNome = document.querySelector("#newPrimeiroNome");
                let email = document.querySelector("#newEmail");
                let ultimoNome = document.querySelector("#newUltimoNome");
                let cartaoCredito = document.querySelector("#newCartaoCredito");
                let senha = document.querySelector("#newSenha");
                fetch("http://localhost:8080/api/usuarios", {
                    'method': 'POST',
                    'body': `{"email": "${email.value}","primeiroNome": "${primeiroNome.value}","ultimoNome": "${ultimoNome.value}",
                    "cartaoCredito": "${cartaoCredito.value}","senha": "${senha.value}" }`,
                    'headers': {'Content-Type': 'application/json'}
                })
                .then(r => r.json())
                .then(r => {console.log(r)});
            }
        );
    let $a = document.querySelector('#link');
    $a.addEventListener('click', view2);
}

let token = null;

function view2() {
    let $template = template2;
    $main.innerHTML = $template.innerHTML;

    let $loginButton = document.querySelector("#login");
        $loginButton.addEventListener('click',
            function logaUsuario() {
                let email = document.querySelector("#email");
                let senha = document.querySelector("#senha");
                fetch("http://localhost:8080/auth/login", {
                    'method': 'POST',
                    'body': `{"email": "${email.value}","senha": "${senha.value}" }`,
                    'headers': {'Content-Type': 'application/json'}
                })
                .then(r => r.json())
                .then(r => {token = r.token});
                //.then(r => {window.console.log((r).token)});
            }
        );
    let $a = document.querySelector('#link');
    $a.addEventListener('click', view1);
}

function view3(){
    let $template = template3;
    $main.innerHTML = $template.innerHTML;

    let $cadastraButton = document.querySelector("#cadastraCampanha");
    $cadastraButton.addEventListener('click', 
    function cadastraCampanha(){
        let nomeCampanha = document.querySelector("#newNomeCampanha");
        let descricaoCampanha = document.querySelector("#newDescricaoCampanha");
        let metaCampanha = document.querySelector("#newMetaCampanha");
        fetch("http://localhost:8080/api/campanhas", {
                    'method': 'POST',
                    'credentials': 'include',
                    'body': `{"nome": "${nomeCampanha.value}","descricao": "${descricaoCampanha.value}", 
                    "meta": "${metaCampanha.value}"}`,
                    'headers': {'Content-Type': 'application/json', 'Authorization': `Bearer ${token.value}`}
                })
                .then(r => r.json())
                .then(r => {console.log(r)});
        }
    );

}
