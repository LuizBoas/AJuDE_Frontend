function cadastraUsuario() {
    let nome = document.querySelector("#newNome");
    let nota = document.querySelector("#newNota");
    fetch('https://lab01-projsw-ufcg.herokuapp.com/api/disciplinas', {
        'method': 'POST',
        'body': `{"nome": "${nome.value}", "nota": ${nota.value}}`,
        'headers': {'Content-Type': 'application/json'}
    })
    .then(r => r.json())
    .then(d => {
        disciplinas.push(d);
        fetch_disciplinas(disciplinas);
    });
}