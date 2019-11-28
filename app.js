let $main = document.querySelector('#main');
let $menu = document.querySelector('#menu');
let URI = 'http://localhost:8080';
// https://teste31102001.herokuapp.com

let cadastroDeUsuariosRealizado,habilitarEdicao, templatePerfil, resultadoPesquisa, template1, template2, template3, template4, template5, templateHome, templateLogar, templateDeslogar, menu1, menu2, visualiza, viewCampanha, newButton;

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
  templatePerfil = e.querySelector('#perfil');
  newButton = e.querySelector('#templateNewButton');
  habilitarEdicao= e.querySelector('#habilitarEdicao');
  cadastroDeUsuariosRealizado = e.querySelector('#cadastroDeUsuariosRealizado');
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

    let $button1= document.querySelector('#ordenaMeta');
    $button1.addEventListener('click', 
        async function(){
            localStorage.setItem('atributo', 'meta');
            view5();
        });

    let $button2= document.querySelector('#ordenaLike');
    $button2.addEventListener('click', 
    async function(){
        localStorage.setItem('atributo', 'like');
        view5();
    });

    let $button3= document.querySelector('#ordenaTempo');
    $button3.addEventListener('click', 
    async function(){
        localStorage.setItem('atributo', 'data');
        view5();
    });

    if(localStorage.getItem('atributo')==null){
        localStorage.setItem('atributo', 'meta');
    }

    let reposta = await fetch(URI + '/api/ordena/'+ localStorage.getItem('atributo'),{
        'method': 'GET',
        'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
    }); 

    let dado = await reposta.json();
    let table = document.querySelector('#homeTable');
    dado.forEach(element => {
        let linha = document.createElement('tr');

        let nome = document.createElement('td');
        nome.innerText = element.nome;

        let data = document.createElement('td');
        data.innerText = element.data;

        let status = document.createElement('td');
        status.innerText = element.status;

        let meta = document.createElement('td');
        meta.innerText = element.meta + '/' + element.doacao;

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

export async function view2() {
    let data = await Promise.resolve(fetch_templates());
    location.hash = "#/login";
    localStorage.setItem('atributo', 'meta');
    let $template = template2;
    $main.innerHTML = $template.innerHTML;

    let $loginButton = document.querySelector("#view2Button");
        $loginButton.addEventListener('click',
        async function logaUsuario() {
                let email = document.querySelector("#view2Email");
                let senha = document.querySelector("#view2Senha");
                let resposta = await fetch(URI + "/auth/login", {
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
            let resposta = await fetch(URI + `/api/campanhas/pesquisar/${nome.value}`,{
                'method':'GET',
                'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
            })
            if(resposta.status==200){
                let dado = await resposta.json();
                localStorage.setItem("array", dado);
                viewResultadoPesquisa(dado,0);
            }else{
                alert("Campanha Nao Encontrada");
            }

        }
    );
}

export async function viewResultadoPesquisa(dado,arg){
    if(arg==0){
        $main.innerHTML+= resultadoPesquisa.innerHTML;
    }

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
        meta.innerText = element.meta + '/' + element.doacao;

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
                let resposta = await fetch(URI + "/api/usuarios", {
                    'method': 'POST',
                    'body': `{"email": "${email.value}","primeiroNome": "${primeiroNome.value}","ultimoNome": "${ultimoNome.value}",
                    "cartaoCredito": "${cartaoCredito.value}","senha": "${senha.value}" }`,
                    'headers': {'Content-Type': 'application/json'}
                })
                if(resposta.status==200){
                    cadastroRealizado();
                }else{
                    alert("Email Em Uso");
                }
            }
        );
}

async function cadastroRealizado(){
    let data = await Promise.resolve(fetch_templates());
    let $template = cadastroDeUsuariosRealizado;
    $main.innerHTML = $template.innerHTML;
    let $loginButton = document.querySelector("#vaiParaLogin");
        $loginButton.addEventListener('click', function (){
            view2();
        });
}

export async function view3(){
    let data = await Promise.resolve(fetch_templates());
    location.hash = "#/cadastroCampanha";

    let $template = viewCampanha;
    let button = newButton;
    $template.innerHTML+= button.innerHTML;
    $main.innerHTML = $template.innerHTML;

    let agora = new Date();
    let hoje = agora.getFullYear() + '-' + (agora.getUTCMonth()+1) + '-' + agora.getDate();

    let nomeCampanha = document.querySelector("#cNome");
    let descricaoCampanha = document.querySelector("#cDescricao");
    let metaCampanha = document.querySelector("#cMeta");
    let dataCampanha = document.querySelector("#cData");

    nomeCampanha.removeAttribute('readonly');
    descricaoCampanha.removeAttribute('readonly');
    metaCampanha.removeAttribute('readonly');
    dataCampanha.removeAttribute('readonly');

    let donoCampanha = document.querySelector("#cDono");
    donoCampanha.value = localStorage.getItem('email');

    let statusCampanha = document.querySelector('#cStatus');
    statusCampanha.value = "ATIVA";

    document.querySelector('#cData').min = hoje;

    let $cadastraButton = document.querySelector("#newButton");
    $cadastraButton.addEventListener('click', 
        async function cadastraCampanha(){
            let urlCampanha = createURL(nomeCampanha.value);
            localStorage.setItem("url", urlCampanha);
            let resposta = await fetch(URI + "/api/campanhas", {
                'method': 'POST',
                'body': JSON.stringify({"nome": nomeCampanha.value,"descricao": descricaoCampanha.value,
                "meta": metaCampanha.value,"data": dataCampanha.value,"url": urlCampanha, "email": localStorage.getItem('email')}),
                'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
            })
            if(resposta.status==200){
                alert(`Capanha Criada, compartilhe sua campanha: localhost:8000/#/campanha/${urlCampanha}`);
                campanha(urlCampanha);
            }else if(resposta.status==500){
                alert("Erro ao Criar a Campanha, Nome de Camapanha Já Cadastrado");
            }else{
                alert("Erro ao criar a Campanha");
            }
        }
    );
}

export async function campanha(url){
    let data = await Promise.resolve(fetch_templates());

    let resposta = await fetch(URI + `/api/campanhas/${url}`, {
                    'method': 'GET',
                    'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
    })
    if(resposta.status==200){
        location.hash = `#/campanha/${url}`;
        localStorage.setItem('hash', url);

        fetch_templates
        let $template = viewCampanha;
        let $habilitarEdicao = habilitarEdicao;
        let dado = await resposta.json();

        if(dado.dono.email==localStorage.getItem('email')){
            $habilitarEdicao.innerHTML+=$template.innerHTML;
            $main.innerHTML = $habilitarEdicao.innerHTML;
        }else{
            $main.innerHTML = $template.innerHTML;

        }


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
                let resposta2 = await fetch(URI + `/like/${dado.id}`,{
                    'method':'GET',
                    'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
                })
                if (resposta2.status==200){
                    campanha(dado.url);
                }else{
                    alert('Erro, tente novamente');
                }
        });

        let doacaoButton = document.querySelector('#doacaoButton');
        doacaoButton.addEventListener('click',
            async function realizarDoacao(){
                let templateDoacao = document.querySelector('#caixaDoacao');
                let divDoacao = document.querySelector('#divDoacao');
                divDoacao.innerHTML = templateDoacao.innerHTML;

                let buttonEnviar = document.querySelector('#donation');
                buttonEnviar.addEventListener('click', 
                    async function enviarDoacao(){
                        localStorage.setItem('quantia', dado.doacao);
                        let valorDoacao = document.querySelector('#inputDoacao');
                        let agora = new Date();
                        let hoje = agora.getFullYear() + '-' + (agora.getUTCMonth()+1) + '-' + agora.getDate();
                        let resposta2 = await fetch(URI + '/doacao', {
                            'method':'POST',
                            'body': `{"valor": ${valorDoacao.value}, "idCampanha": ${dado.id}, "data" : "${hoje}"}`,
                            'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
                        });
                        if(resposta2.status==200){
                            let dadoDoacao = await resposta2.json();
                            alert('DOACAO REALIZADA');
                            if(localStorage.getItem('quantia')<dadoDoacao.meta){
                                if(dadoDoacao.doacao>=dadoDoacao.meta){
                                    alert('Parabéns Com Sua Doação a Campanha Atingiu a Meta');
                                }
                            }
                            campanha(url);
                        }else{
                            alert('DOACAO NAO REALIZADA, TENTE NOVAMENTE');
                        }
                    }
                )
            }
        );

        let enceraButton = document.querySelector('#cEncerrar');
        enceraButton.addEventListener('click', function encerrar(){
            deletar(dado);
        })

        let $comentarioButtom = document.querySelector("#comentarioButtom");
        $comentarioButtom.addEventListener('click',
            async function escreverComentario(){
                let espacoComentario = document.querySelector('#espacoComentario');
                let novoComentario = document.querySelector('#formato_novo_comentario');
                espacoComentario.innerHTML += novoComentario.innerHTML;
                $comentarioButtom.removeEventListener('click', escreverComentario);
                let $Button = document.querySelector('#enviar_comentario');
                $Button.addEventListener('click', 
                    async function enviarComentario(){
                        let novo_texto = document.querySelector('#texto_novo_comentario');
                        let resposta3 = await fetch(URI + `/comentaCampanha`,{
                            'method':'POST',
                            'body':`{"idCampanha": "${dado.id}","comentario": "${novo_texto.value}","email": "${localStorage.getItem('email')}" }`,
                            'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
                        })
                        if(resposta3.status==200){
                            alert("Seu comentário foi registrado!");
                        }
                        campanha(url);
                    }
                )  
        });
        let array = dado.hashcomentarios;
        let espacoComentario = document.querySelector('#espacoComentario');
        if(array.length>0){
            espacoComentario.innerHTML='';
            array.forEach(comentario =>{
                let div_comentario = criaComentario(comentario);
                let respostas = comentario.resposta;
                let retorno = visualizacaoRecursiva(div_comentario,respostas);
                espacoComentario.appendChild(div_comentario.caixa);
            });
        }
    }else{
        alert("Você Precisa Está Logado!");
    }
}

async function deletar(dado){
    let id = dado.id;
    let reposta = await fetch(URI + `//api/campanhas/encerar/${id}`, {
        'method':'PUT',
        'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
    })
    if(reposta.status==200){
        alert('Campanha Encerrada')
        campanha(dado.url);
    }else{
        alert('Você Não Possui Autorização Para Encerrar a Campanha');
    }
}

async function visualizacaoRecursiva(div_comentario,respostas){
    // console.log(respostas)
    if(respostas.length>0){
        respostas.forEach(newComentario => {
            let div_reposta = criaComentario(newComentario);
            visualizacaoRecursiva(div_reposta,newComentario.resposta);
            div_comentario.caixa.appendChild(div_reposta.caixa);
        });
    }
    return div_comentario;
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
		c.email.innerText = "user: " + comentario.usuario.email;
        c.textoComentario.innerHTML = comentario.comentario;
        c.botaoEnviarComentario = c.botoes.children[0];
    };
    preenche();

    if(localStorage.getItem('email') == comentario.usuario.email){
        let deletarComentario = document.createElement('button');
        deletarComentario.innerText = 'Deletar Comentário';
        c.botaoDeletarComentario = deletarComentario;
        c.botoes.appendChild(deletarComentario);

        let idComentario = c.objetoComentario.id;

        c.botaoDeletarComentario.addEventListener('click', 
            async function fetch_cadastro_usuario(){
                let resposta = await fetch(URI + `/apagarComentario/${idComentario}/`,{
                    "method":"DELETE",
                    'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
                });
                console.log(resposta)
                let dados = await resposta.json();
                if(resposta.status == 200){
                    alert("Seu Comentario Foi Apagado!");
                    campanha(localStorage.getItem('hash'));
                }
            }
        );
    }

    c.botaoEnviarComentario.addEventListener('click', 
    async function escreverComentario(){
        let espacoComentario = c.caixa;
        let novoComentario = document.querySelector('#formato_novo_comentario');
        espacoComentario.innerHTML += novoComentario.innerHTML;

        let buttonEnviar = document.querySelector('#enviar_comentario');
        buttonEnviar.addEventListener('click', 
        async function enviarComentario(){
            let novo_texto = document.querySelector('#texto_novo_comentario');
            let resposta3 = await fetch(URI + `/comentaComentario`,{
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

export async function perfil(email){
    let data = await Promise.resolve(fetch_templates());
    location.hash = `#/usuario/${email}`;

    let $template = templatePerfil;
        $main.innerHTML = $template.innerHTML;

    let resposta = await fetch(URI + `//usuarios/${email}`, {
        'method': 'GET',
        'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
    })
    if(resposta.status==200){
        let dado = await resposta.json();
        let primeiroNome = document.querySelector("#pPrimeiroNome");
        primeiroNome.value = dado.primeiroNome;
        let ultimoNome = document.querySelector("#pUltimoNome");
        ultimoNome.value = dado.ultimoNome;
        let email = document.querySelector("#pEmail");
        email.value = dado.email;

        let resposta2 = await fetch(URI + `/api/campanhas/usuario/${dado.email}`, {
            'method': 'GET',
            'headers': {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`}
        })

        if(resposta2.status==200){
            let dado2 = await resposta2.json();
            viewResultadoPesquisa(dado2,1);
        }else{
            let table = document.querySelector('table');
            let linha = document.createElement('tr');
            let nome = document.createElement('td');
            nome.innerText = 'Usuario Não Possui Campanhas Ativas';
            linha.appendChild(nome);
            table.appendChild(linha);
        }

    }else{
        alert('Usuario Não Encontrado')
    }
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

