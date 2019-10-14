var firebaseConfig = {
  apiKey: "AIzaSyDjtqhb3BUZ7-nznEpJ6oLeRsEO960ZZe8",
  authDomain: "puraagua-7985e.firebaseapp.com",
  databaseURL: "https://puraagua-7985e.firebaseio.com",
  projectId: "puraagua-7985e",
  storageBucket: "puraagua-7985e.appspot.com",
  messagingSenderId: "243135690208",
  appId: "1:243135690208:web:6e0f3d0acc06549aba2785",
  measurementId: "G-FGLLFXE9CC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database().ref();
const urlClientes = database.child('clientes');

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
function buscarDadosUsuario(){
  var query = location.search.slice(1);
  var partes = query.split('&');
  var id;
  partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    if(chaveValor == ''){
      window.location.href = 'index.html';
    }else{
      var valor = chaveValor[1];
      id = valor;
    }
  });

  urlClientes.child(id).once('value', (snap)=>{
    var dados = snap.val()
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