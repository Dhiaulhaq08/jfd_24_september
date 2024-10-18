const express   = require('express')
const app       = express ()

app.get('/', function(req,res) { 
    res.send ('hello world')
})

//menampilkan data karyawan 
app.get('/karyawan',function(req,res) { 
    res.send (`<h1>List Karyawan</h1><hr>
                `)
})

app.listen(3000, ()=>{ 
    console.log('server aktif, buka http://localhost:3000')
})