//memanggil modul bawaan dari node js yaitu http
// untuk membuat server http 
const http = require ('http')

http.createServer ( function(request,response){ 
    response.writeHead(200, {'Content-type' : 'text/html'})
    //halaman utama
    if ( request.url == '/'){ 
        response.end (`<h1>Selamat datang ngab`)
    }
    else if ( request.url == '/profil'){ 
        response.end(
        `<ul>
            <li>Nama : lengkap </li> 
            <li>Tanggal : Lahir </li>
        </ul>`
        )
    }
    // menangani halaman yang tidak ada
    else { 
        response.end ( 
            `<h1>404 : Halaman Tidak ditemukan</h1>`
        )
    }
   
}).listen (3000, function() { 
    console.log(`server sudah nyala bung, buka http://.localhost:3000`)
})

// tes nambah komentar 
// kirim ke 2z