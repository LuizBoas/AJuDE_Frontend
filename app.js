
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

let template1, template2, template3, template4;
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

let token;

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
                .then(r => {token = r.token})
                .then(r => {window.console.log(token)});
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
                //'body': `{"nome": "${nomeCampanha.value}","descricao": "${descricaoCampanha.value}","meta": "${metaCampanha.value}"}`,
                'body': JSON.stringify({"nome": nomeCampanha.value,"descricao": descricaoCampanha.valu,"meta": metaCampanha.value}),
                'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`}
            })
            .then(r => r.json())
            .then(r => {console.log(r)});
            console.log({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`});
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



/*POST /api/campanhas HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBQUBBQSIsImV4cCI6MTU3MzA2MTc5OH0.3doDZdwhgoS5SIkgaMqG24gwAKEfqYjs3iHvccHgoeKjJPtuAJ-dlCjoF5Lx-zSt-oV2F5oQ_vXssJHbF1G-NQ
User-Agent: PostmanRuntime/7.19.0
Accept:
Cache-Control: no-cache
Postman-Token: f955838f-00c8-4a78-8eb0-02cf565b6c8e,16cb0bba-63e9-418f-ad54-8350e4ec7868
Host: localhost:8080
Accept-Encoding: gzip, deflate
Content-Length: 69
Connection: keep-alive
cache-control: no-cache

{
	"nome": "testerrraaaddaeee", 
	"descricao": "teste" ,
	"meta": 1
}
*/
/*
function view4(){
    let $template = template4;
    $main.innerHTML = $template.innerHTML;
    
    let $pesquisaButton = document.querySelector("#pesquisaCampanha");
    $pesquisaButton.addEventListener('click', 
        function pesquisaCampanha(){
            let subString = document.querySelector("#newSubString")
            fetch("http://localhost:8080/api/campanhas/subString", { /* modificar quando fazer o back, fazer o get tambem quanto fazer o back */
            'method': 'POST',
            'body': `{"subString": "${subString.value}"}`,
            'headers': {'Content-Type': 'application/json', 'Authorization': `Bearer ${token.value}`}
        })
        .then(r => r.json())
        .then(r => {console.log(r)});
    }
);


}





let $pesquisaCampanha = document.querySelector('#viewPesquisaCampanha');
$menuPesquisaCampanha.addEventListener('click', view4);

template4 = e.querySelector('#pesquisaCampanha');


localStorage.setItem("");

localStorage

pathname

*/