
let $main = document.querySelector('#main');

(async function main() {
    // roteamento
    let hash = location.hash;
    if (["", "#view1"].includes(hash)) {
      view1();
    } else if (["#view2"].includes(hash)) {
      view2();
    }
  }());

function view1(){
    let $template = document.querySelector('#cadastro');
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

    let $a = document.querySelector('a');
    $a.addEventListener('click', view2);
}

function view2() {
    let $template = document.querySelector('#login');
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
    let $a = document.querySelector('a');
    $a.addEventListener('click', view1);
}