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
    const todosClientes = data.val();
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
  if($("#nome").val() && $("#sobrenome").val() && $("#telefone").val() && $("#cidade").val() && $("#rua").val() && $("#numero").val() && $("#bairro").val()){
    urlClientes.push({
      nome: $("#nome").val(),
      sobrenome: $("#sobrenome").val(),
      telefone: $("#telefone").val(),
      cidade: $("#cidade").val(),
      rua: $("#rua").val(),
      numero: $("#numero").val(),
      bairro: $("#bairro").val()
    });
    console.log('foi');
    window.location.href = 'index.html';
  }
}
function abrirCadCliente(){
  window.location.href = 'cadCliente.html';
}
$('#buscar').keyup(function(){
  var nomeFiltro = $(this).val().toLowerCase();
  console.log(nomeFiltro);
  $('table tbody').find('tr').each(function() {
    var conteudoCelula = $(this).find('th:first').text();
    var corresponde = conteudoCelula.toLowerCase().indexOf(nomeFiltro) >= 0;
    $(this).css('display', corresponde ? '' : 'none');
  });
});