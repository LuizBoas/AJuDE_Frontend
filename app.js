
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

let template1, template2;
async function fetch_templates() {
  let html_templates = await (fetch('templates.html').then(r => r.text()));
  let e = document.createElement("div");
  e.innerHTML = html_templates;
  template1 = e.querySelector('#cadastro');
  template2 = e.querySelector('#login');
}

let $menuLogin = document.querySelector('#viewLogin');
$menuLogin.addEventListener('click', view2);

let $menuCadastro = document.querySelector('#viewCadastro');
$menuCadastro.addEventListener('click', view1);

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
                .then(r => {console.log(r)});
            }
        );
    let $a = document.querySelector('#link');
    $a.addEventListener('click', view1);
}