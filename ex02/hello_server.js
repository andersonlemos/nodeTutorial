var http= require('http');

var atendeRequisicao = function(req,res){
    res.writeHead('200',{"Content-Type":"text-html"});
    res.write('<h1>Hello World!!</h1>');
    res.end();
};

var server = http.createServer(atendeRequisicao);

var servidorLigou =  function(){
  console.log("Servidor rodando!");
};

server.listen(3001,servidorLigou);
