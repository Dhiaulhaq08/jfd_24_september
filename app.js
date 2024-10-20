const express   = require('express')
const app       = express ()
const mysql = require ( 'mysql2')

app.set('view engine', 'ejs') // settomg pengunaan template engine untuk express 
app.set('views', './view-ejs') //setting penggunaan folder untuk menyimpan file .ejs

// sambungkan ke mysql
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'dbjfd_sep24'
})

//buka koneksi 
db.connect((error)=>{ 
    if (error) { 
        throw error
    } else  { 
        console.log('berhasi tersambung')
    }
})

function getAll_karyawan() { 
    return new Promise( ( resolve, reject) => {
        db.query( `SELECT 
            kry.*, jbt.nama as jabatan_nama, 
            jbt.singkatan as jabatan_singkatan, 
            agm.nama as agama_nama 
        FROM karyawan as kry 
        LEFT JOIN jabatan as jbt ON jbt.id = kry.jabatan 
        LEFT JOIN agama as agm ON agm.id = kry.agama`,function(errorSql,hasil) { 
            if (errorSql) { 
                reject(errorSql)
            }else { 
                resolve(hasil)
            }
        })
    })
}
//function render ('nama file')
//nama filenya wajib berkekstensi .ejs
//otomatis mengambill file .ejs yang ada di folder view-ejs 
//kenapa otomatis ? sesuai setingan yuang ada di atas 

app.get('/', function(req,res) { 
    res.render('index')
})

//menampilkan data karyawan 
app.get('/karyawan',async function(req,res) { 
    let data = { 
        karyawan: await getAll_karyawan()
    }
    res.render('pendidikan', data) 
})

app.listen(3000, ()=>{ 
    console.log('server aktif, buka http://localhost:3000')
})