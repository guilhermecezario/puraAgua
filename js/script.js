var id;

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
function addCliente(){
  if($("#nome").val() && $("#sobrenome").val() && $("#telefone").val() && $("#cidade").val() && $("#rua").val() && $("#numeroCasa").val() && $("#bairro").val()){
    urlClientes.push({
      nome: $("#nome").val(),
      sobrenome: $("#sobrenome").val(),
      telefone: $("#telefone").val(),
      cidade: $("#cidade").val(),
      rua: $("#rua").val(),
      numeroCasa: $("#numeroCasa").val(),
      bairro: $("#bairro").val()
    }).then(function(data){
      window.location.href = 'index.html';
    });
  }
}
function abrirCliente(id){
  window.location.href = 'perfilUsuario.html?id='+id;
}
function abrirVenda(){
  window.location.href = 'novaVenda.html?id='+id;
}

function addVenda(){
  buscarUrl();
  if($("#dataVenda").val() && $("#dataGalao").val() && $("#quantidade").val() && $("#valorTotal").val()){
    urlVendas.push({
      dataVenda: $("#dataVenda").val(),
      dataGalao: $("#dataGalao").val(),
      quantidade: $("#quantidade").val(),
      valorTotal: $("#valorTotal").val(),
      idCliente: id
    }).then(function(data){
      window.location.href = 'perfilUsuario.html?id='+id;
    });
  }
}
function buscarUrl(){
  var query = location.search.slice(1);
  var partes = query.split('&');
  partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    if(chaveValor == ''){
      window.location.href = 'index.html';
    }else{
      var valor = chaveValor[1];
      id = valor;
    }
  });
}
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

function buscarVendas(){
  urlVendas.once('value', data =>{
    $('#bodyTable').text('');
    data.forEach((element) => {
      dados = element.val();
      if(dados.idCliente == id){
        $('#bodyTable').append('<tr>'+
        '<th>'+dados.dataVenda+'</th>'+
        '<th>'+dados.dataGalao+'</th>'+
        '<th>'+dados.quantidade+'</th>'+
        '<th>'+dados.valorTotal+'</th>'+
        '</tr>');
      }
    });
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