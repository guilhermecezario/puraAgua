var id;


//funções da pagina inicial
function buscarClientes(){
  urlClientes.once('value', data =>{
    $('#bodyTable').text('');
    data.forEach((element) => {
      dados = element.val();
      key = element.key;
      $('#bodyTable').append('<tr id='+key+' onclick=abrirCliente(this.id)>'+
      '<th>'+dados.nome+'</th>'+
      '<th>'+dados.rua+'</th>'+
      '<th>'+dados.telefone+'</th>'+
      '</tr>');
    });
  });
}
function abrirCliente(id){
  window.location.href = 'perfilUsuario.html?id='+id;
}

//funções da pagina adicionar cliente
function addCliente(){
  $('#button').html('carregando');
  $("#button").prop("disabled", true);
    urlClientes.push({
      nome: $("#nome").val(),
      sobrenome: $("#sobrenome").val(),
      telefone: $("#telefone").val(),
      cidade: $("#cidade").val(),
      rua: $("#rua").val(),
      numeroCasa: $("#numeroCasa").val(),
      bairro: $("#bairro").val()
    }).then(function(){
      window.location.href = 'index.html';
    });
}

//funções da pagina perfil do cliente
function buscarCliente(){
  buscarUrl();

  urlClientes.child(id).once('value', (snap)=>{
    var dados = snap.val();
    $("#nome").html(dados.nome);
    $("#sobrenome").html(dados.sobrenome);
    $("#telefone").html(dados.telefone);
    $("#rua").html(dados.rua);
    $("#bairro").html(dados.bairro);
    $("#cidade").html(dados.cidade);
    $("#numeroCasa").html(dados.numeroCasa);
  });

  buscarVendas();
}

function excluirVenda(id){
  let opcao = confirm('deseja excluir essa venda?');

  if(opcao == true){
    urlVendas.child(id).remove();
  }
}

function buscarVendas(){
  urlVendas.on('value', data =>{
    $('#bodyTable').text('');
    data.forEach((element) => {
      dados = element.val();
      if(dados.idCliente == id){
        $('#bodyTable').append('<tr>'+
        '<th>'+dados.dataVenda+'</th>'+
        '<th>'+dados.dataGalao+'</th>'+
        '<th>'+dados.quantidade+'</th>'+
        '<th>'+dados.valorTotal+'</th>'+
        '<th>'+'<img class="buttonExcluir" src="img/excluir.png" id="'+element.key+'" onclick="excluirVenda(this.id)">'+'</th>'+
        '</tr>');
      }
    });
  });
}
function abrirEditCliente(){
  window.location.href = 'editCliente.html?id='+id;
}
function abrirVenda(){
  window.location.href = 'novaVenda.html?id='+id;
}
function excluirCliente(){
  let opcao = confirm('Isso irá apagar todos os dados desse usuario');
  if(opcao == true){
    urlClientes.child(id).remove().then(function(){
      window.location.href = 'index.html';
    })
  }
}
//funções da pagina de editar cliente
function onloadEditCliente(){
  buscarUrl();
  
  urlClientes.child(id).once('value', (snap)=>{
    var dados = snap.val();
    console.log(dados);
    $("#nome").val(dados.nome);
    $("#sobrenome").val(dados.sobrenome);
    $("#telefone").val(dados.telefone);
    $("#rua").val(dados.rua);
    $("#bairro").val(dados.bairro);
    $("#cidade").val(dados.cidade);
    $("#numeroCasa").val(dados.numeroCasa);
  });
}
function editCliente(){
  $('#button').html('carregando');
  $("#button").prop("disabled", true);
  urlClientes.child(id).update({
    nome: $("#nome").val(),
    sobrenome: $("#sobrenome").val(),
    telefone: $("#telefone").val(),
    cidade: $("#cidade").val(),
    rua: $("#rua").val(),
    numeroCasa: $("#numeroCasa").val(),
    bairro: $("#bairro").val()
  }).then(function(data){
    window.location.href = 'perfilUsuario.html?id='+id;
  });
}

//funções da tela de adicionar venda
function addVenda(){
  $('#button').html('carregando');
  $("#button").prop("disabled", true);
  buscarUrl();
  if($("#dataVenda").val() && $("#dataGalao").val() && $("#quantidade").val() && $("#valorTotal").val()){
    urlVendas.push({
      dataVenda: $("#dataVenda").val().split('-').reverse().join('/'),
      dataGalao: $("#dataGalao").val(),
      quantidade: $("#quantidade").val(),
      valorTotal: Number($("#valorTotal").val()),
      idCliente: id
    }).then(function(data){
      window.location.href = 'perfilUsuario.html?id='+id;
    });
  }else{
    $('#mensagem').html("Todos os campos são obrigatorios");
  }
}
//funções da tela de login do administrador
function entrarAdmin(){
  var auth = firebase.auth();
  var email = $('#email').val();
  var senha = $('#senha').val();
  if(email && senha){
    auth.signInWithEmailAndPassword(email, senha).then(function(){
      window.location.href = 'admin.html';
    }).catch((data)=>{
      if(data.code == 'auth/user-not-found'){
        $('#mensagem').html("Você não é administrador");
      }else if(data.code == "auth/wrong-password"){
        $('#mensagem').html("Senha incorreta");
      }else if(data.code == "auth/network-request-failed"){
        $('#mensagem').html("Sem conexão com a internet");
      }
    });
  }
}

//funções da tela do administrador
function conferirAdmin(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      contarTotal();
    } else {
      window.location.href = 'index.html';
    }
  });
}
function logout(){
  firebase.auth().signOut()
  .then(function() {
    window.location.href = 'index.html';
  }, function(error) {
    console.error( error );
  });
}
function contarTotal(){
  let dia = 0;
  let semana = 0;
  let mes = 0;
  date = new Date;
  var carr = new Date;
  console.log(date);
  var first = carr.getDate() - carr.getDay() + 1;
  var last = first + 6;
  var primeiroDia = new Date(carr.setDate(first)).getDate();
  var ultimoDia = new Date(carr.setDate(last)).getDate();
  urlVendas.once('value', (snap)=>{
    snap.forEach((aux)=>{
      let dados = aux.val();
      let dataCortada = dados.dataVenda.split('/');
      console.log(dataCortada);
      if(date.getFullYear() == dataCortada[2] && date.getMonth()+1 == dataCortada[1]){
        mes += dados.valorTotal;
        if(date.getDate() == dataCortada[0]){
          dia += dados.valorTotal;
        }
        if(ultimoDia < primeiroDia){
          if(dataCortada[0] >= 31 || dataCortada[0] <= ultimoDia){
            semana += dados.valorTotal;
          }
        }else if(dataCortada[0] >= primeiroDia && dataCortada[0] <= ultimoDia){
          semana += dados.valorTotal;
        }
      }
    });
    $('#totalDia').html(dia);
    $('#totalSemana').html(semana);
    $('#totalMes').html(mes);
  });
}

//funções usada em varias paginas
function buscarUrl(){
  var query = location.search.slice(1);
  var partes = query.split('&');
  partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    if(chaveValor[1] == ''){
      window.location.href = 'index.html';
    }else{
      var valor = chaveValor[1];
      id = valor;
    }
  });
}

$('#buscar').keyup(function(){
  var nomeFiltro = $(this).val().toLowerCase();
  $('table tbody').find('tr').each(function() {
    var conteudoCelula = $(this).find('th:first').text();
    var corresponde = conteudoCelula.toLowerCase().indexOf(nomeFiltro) >= 0;
    $(this).css('display', corresponde ? '' : 'none');
  });
});