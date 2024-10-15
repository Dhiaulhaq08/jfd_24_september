//memanggil modul bawaan dari node js yaitu http
// untuk membuat server http 
const http = require ('http')

http.createServer ( function(request,response){ 
    response.writeHead(200, {'Content-type' : 'text/html'})
    response.end(
        `<h1>Selamat datang `
    )
}).listen (3000, function() { 
    console.log(`server sudah nyala, buka http://.localhost:3000`)
})