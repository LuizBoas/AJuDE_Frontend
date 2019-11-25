let $main = document.querySelector('#main');
let $menu = document.querySelector('#menu');

let newTemplate, resultadoPesquisa, template1, template2, template3, template4, template5, templateHome, templateLogar, templateDeslogar, menu1, menu2, visualiza, viewCampanha;

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
  resultadoPesquisa = e.querySelector('#resultadoPesquisa');
  viewCampanha= e.querySelector('#campanha');
//   newTemplate = e.querySelector('#cadastro_campanha');
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

    let $loginButton = document.querySelector("#buttonDeslogar");
    $loginButton.addEventListener('click', deslogar);
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

export async function view4(){
    let data = await Promise.resolve(fetch_templates());
    location.hash = "#/pesquisaCampanhas";

    let $template = template4;
    $main.innerHTML = $template.innerHTML;

    let $pesquisaButton = document.querySelector("#view4Button");
    $pesquisaButton.addEventListener('click', 
        async function pesquisaCampanhas(){
            let nome = document.querySelector('#view4Substring');
            let resposta = await fetch(`http://localhost:8080/api/campanhas/pesquisar/${nome.value}`,{
                'method':'GET',
                'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
            })
            if(resposta.status==200){
                let dado = await resposta.json();
                localStorage.setItem("array", dado);
                viewResultadoPesquisa(dado);
            }else{
                alert("Campanha Nao Encontrada");
            }

        }
    );
}

export async function viewResultadoPesquisa(dado){
    $main.innerHTML+= resultadoPesquisa.innerHTML;

    let table = document.querySelector('table');
    dado.forEach(element => {
        let linha = document.createElement('tr');

        let nome = document.createElement('td');
        nome.innerText = element.nome;

        let data = document.createElement('td');
        data.innerText = element.data;

        let status = document.createElement('td');
        status.innerText = element.status;

        let meta = document.createElement('td');
        meta.innerText = element.meta;

        let visualizar = document.createElement('td');

        let botao = document.createElement('button');
        botao.innerText = 'Visualizar detalhes';

        botao.addEventListener('click', function chama(){
            campanha(element.url);
        })

        visualizar.appendChild(botao);

        linha.appendChild(nome);
        linha.appendChild(data);
        linha.appendChild(status);
        linha.appendChild(meta);

        linha.appendChild(visualizar);
        table.appendChild(linha);
    });

}

export async function view1(){
    let data = await Promise.resolve(fetch_templates());
    location.hash = "#/cadastro";

    let $template = template1;
    $main.innerHTML = $template.innerHTML;

    let $createButton = document.querySelector("#view1Button");
        $createButton.addEventListener('click', 
            async function cadastraUsuario() {
                let primeiroNome = document.querySelector("#view1PrimeiroNome");
                let email = document.querySelector("#view1Email");
                let ultimoNome = document.querySelector("#view1UltimoNome");
                let cartaoCredito = document.querySelector("#view1CartaoCredito");
                let senha = document.querySelector("#view1Senha");
                let resposta = await fetch("http://localhost:8080/api/usuarios", {
                    'method': 'POST',
                    'body': `{"email": "${email.value}","primeiroNome": "${primeiroNome.value}","ultimoNome": "${ultimoNome.value}",
                    "cartaoCredito": "${cartaoCredito.value}","senha": "${senha.value}" }`,
                    'headers': {'Content-Type': 'application/json'}
                })
                if(resposta.status==200){
                    alert("Usuario Cadastrado");
                }else{
                    alert("Email já cadastrado");
                }
            }
        );
}

export async function view3(){
    let data = await Promise.resolve(fetch_templates());
    location.hash = "#/cadastroCampanha";

    let $template = template3;
    $main.innerHTML = $template.innerHTML;

    document.querySelector('#view3DataCampanha').max = new Date();


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
                alert(`Capanha Criada, compartilhe sua campanha: localhost:8000/#/campanha/${urlCampanha}`);
                //deveria ser 409 mas ta dando 500
            }else if(resposta.status==500){
                alert("Erro ao Criar a Campanha, Nome de Camapanha Já Cadastrado");
            }else{
                // console.log(resposta.status);
                alert("Erro ao criar a Campanha");
            }

        }
    );

    // let $visualizaButton = document.querySelector("#visualizar");
    // $visualizaButton.addEventListener('click', 
    //     async function visualizaCampanha() {
    //         let nomeCampanha = document.querySelector("#view3NomeCampanha");
    //         sessionStorage.setItem("nomeCampanha", nomeCampanha.value);
    //         let descricaoCampanha = document.querySelector("#view3DescricaoCampanha");
    //         sessionStorage.setItem("descricaoCampanha", descricaoCampanha.value);
    //         let metaCampanha = document.querySelector("#view3MetaCampanha");
    //         sessionStorage.setItem("metaCampanha", metaCampanha.value);
    //         let dataCampanha = document.querySelector("#view3DataCampanha");
    //         sessionStorage.setItem("dataCampanha", dataCampanha.value);
    //         let urlCampanha = createURL(nomeCampanha.value);
    //         sessionStorage.setItem("urlCampanha", urlCampanha);
    //         visualizar()
    //     }

    // );

}

export async function campanha(url){
    let resposta = await fetch(`http://localhost:8080/api/campanhas/${url}`, {
                    'method': 'GET',
                    'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
    })
    if(resposta.status==200){
        location.hash = `#/campanha/${url}`;
        localStorage.setItem('hash', url);
        let $template = viewCampanha;
        $main.innerHTML = $template.innerHTML;
        let dado = await resposta.json();

        let cNome = document.querySelector('#cNome');
        cNome.value = dado.nome;
        let cDescricao = document.querySelector('#cDescricao');
        cDescricao.value = dado.descricao;
        let cDono = document.querySelector('#cDono');
        cDono.value = dado.dono.email;
        let cData = document.querySelector('#cData');
        cData.value = dado.data;
        let cStatus = document.querySelector('#cStatus');
        cStatus.value = dado.status;
        let cMeta = document.querySelector('#cMeta');
        cMeta.value = dado.meta;
        let cDoacao = document.querySelector('#cDoacao');
        cDoacao.value = dado.doacao;
        let cLike = document.querySelector('#cLike');
        cLike.value = dado.likes.length;

        let $likeButtom = document.querySelector("#like");
        $likeButtom.addEventListener('click', 
            async function darLike(){
                let resposta2 = await fetch(`http://localhost:8080/like/${dado.id}`,{
                    'method':'GET',
                    'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
                })
                if (resposta2.status==200){
                    campanha(dado.url);
                }else{
                    alert('Erro, tente novamente');
                }
        });

        let $comentarioButtom = document.querySelector("#comentarioButtom");
        $comentarioButtom.addEventListener('click',
            async function escreverComentario(){
                let espacoComentario = document.querySelector('#espacoComentario');
                let novoComentario = document.querySelector('#formato_novo_comentario');
                espacoComentario.innerHTML += novoComentario.innerHTML;
                $comentarioButtom.removeEventListener('click', escreverComentario);
                //topzada
                let $Button = document.querySelector('#enviar_comentario');
                $Button.addEventListener('click', 
                    async function enviarComentario(){
                        let novo_texto = document.querySelector('#texto_novo_comentario');
                        let resposta3 = await fetch(`http://localhost:8080/comentaCampanha`,{
                            'method':'POST',
                            'body':`{"idCampanha": "${dado.id}","comentario": "${novo_texto.value}","email": "${localStorage.getItem('email')}" }`,
                            'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
                        })
                        if(resposta3.status==200){
                            alert("Seu comentário foi registrado!");
                            campanha(url);
                        }
                    }
                )  
        });
        
        let array = dado.hashcomentarios;
        let espacoComentario = document.querySelector('#espacoComentario');
        if(array.length>0){
            espacoComentario.innerHTML='';
            array.forEach(comentario =>{
                let div_comentario = criaComentario(comentario);
                espacoComentario.appendChild(div_comentario.caixa);
                //antes disso funciona
                // array.forEach(comentario =>{
                }
            );
        }



    }else{
        alert("Erro");
    }
}

function criaComentario(comentario){
	let newTemplate = document.querySelector('#comentario');
	let caixa_comentario = document.createElement('div');
	caixa_comentario.innerHTML = newTemplate.innerHTML;

	let c = {
		objetoComentario: comentario,
		caixa: caixa_comentario.children[0],
		div_lista_respostas: null
    };

    c.email = c.caixa.children[0];
    c.textoComentario = c.caixa.children[1];
    c.botoes = c.caixa.children[3];

    function preenche(){
		c.email.innerText = comentario.usuario.email;
        c.textoComentario.innerHTML = comentario.comentario;
        //botao de enviar comentario
        c.botaoEnviarComentario = c.botoes.children[0];
    };

    preenche();

    c.botaoEnviarComentario.addEventListener('click', 
    async function escreverComentario(){
        let espacoComentario = c.caixa;
        let novoComentario = document.querySelector('#formato_novo_comentario');
        espacoComentario.innerHTML += novoComentario.innerHTML;
        //topzada

        let buttonEnviar = document.querySelector('#enviar_comentario');
        buttonEnviar.addEventListener('click', 
        async function enviarComentario(){
            let novo_texto = document.querySelector('#texto_novo_comentario');
            let resposta3 = await fetch(`http://localhost:8080/comentaComentario`,{
                'method':'POST',
                'body':`{"idCampanha": "${comentario.id}","comentario": "${novo_texto.value}","email": "${localStorage.getItem('email')}" }`,
                'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
            })
            if(resposta3.status==200){
                alert("Seu comentário foi registrado!");
                campanha(localStorage.getItem('hash'));
            }
        }
        ) 
    })

    



    c.caixa.classList.add('caixa_comentario');
    return c;
}


async function comentarioComentario(comentario){
    let template = document.querySelector('#formato_novo_comentario');
    let caixa_comentario = document.createElement('div');
    caixa_comentario.innerHTML = template.innerHTML;
    let c ={
        objetoComentario: comentario,
        caixa: caixa_comentario.children[0]
    };

    c.caixaTexto = c.caixa.children[0];
    c.botoes = c.caixa.children[1];
    c.botaoEnviarComentario = c.botoes.children[0];


    c.botaoEnviarComentario.addEventListener('click', function enviarComentario(){

        async function comentarComentario(){
            let texto = c.caixaTexto.value;
            
            let id = comentario.objetoComentario.id;
            console.log(texto) 
        }

    })
}







// export async function visualizar(){
//     let data = await Promise.resolve(fetch_templates());
//     location.hash = "#/visualizar";

//     let $template = visualiza;
//     $main.innerHTML = $template.innerHTML;

//     let nomeDaCampanha = document.querySelector('#vNome');
//     nomeDaCampanha.innerText = sessionStorage.getItem("nomeCampanha");
//     let descicaoDaCampanha = document.querySelector('#vDescricao');
//     descicaoDaCampanha.innerText = sessionStorage.getItem("descricaoCampanha");
//     let metaDaCampanha = document.querySelector('#vMeta');
//     metaDaCampanha.innerText = sessionStorage.getItem("metaCampanha");
//     let dataDaCampanha = document.querySelector('#vData');
//     dataDaCampanha.innerText = sessionStorage.getItem("dataCampanha");
//     // $template.innerHTML= "<h1>teste<h1>"
//     // $main.innerHTML = $template.innerHTML;

//     console.log($template);
// }

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