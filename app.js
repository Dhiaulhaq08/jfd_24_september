const express   = require('express')
const app       = express ()

app.set('view engine', 'ejs') // settomg pengunaan template engine untuk express 
app.set('views', './view-ejs') //setting penggunaan folder untuk menyimpan file .ejs

//function render ('nama file')
//nama filenya wajib berkekstensi .ejs
//otomatis mengambill file .ejs yang ada di folder view-ejs 
//kenapa otomatis ? sesuai setingan yuang ada di atas 

app.get('/', function(req,res) { 
    res.render('index')
})

//menampilkan data karyawan 
app.get('/karyawan',function(req,res) { 
    let profil = { 
        nama: 'prabowo subianto',
    }
    res.render('pendidikan', profil)
})

app.listen(3000, ()=>{ 
    console.log('server aktif, buka http://localhost:3000')
})