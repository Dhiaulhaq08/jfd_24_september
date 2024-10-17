const mysql = require('mysql2')
const http = require ('http')
const fs = require ('fs')

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


http.createServer ( async function(request,response){
    response.writeHead(200, {'Content-type' : 'text/html'})
    if ( request.url == '/'){ 
        fs.createReadStream('./view/halaman-utama.html').pipe(response)
    }

    else if ( request.url == '/karyawan'){ 
        //tarik data 
        let data = await getAll_karyawan()
        let html_list_karyawan = ''
        for (const i in data) {
            html_list_karyawan += 
            `<b>Nama Lengkap</b>: ${data[i].nama} <br>
            <b>NIK</b>: ${data[i].nik} <br>
            <b>Tanggal Lahir</b>: ${new Date(data[i].tanggal_lahir).toLocaleDateString('id-ID')} <br>
            <b>Alamat</b>: ${data[i].alamat} <br>
            <b>Jabatan</b>: ${(data[i].jabatan_nama) ? data[i].jabatan_nama : '-' } <br>
            <b>Agama</b>: ${(data[i].agama_nama) ? data[i].agama_nama : '-'} <br>
            <br> <br><br>
            `        
            }
        
        response.end(`<h1>Selamat datang di data karyawan</h1>
                ${html_list_karyawan}
                `
        
        )
    }
}).listen (3000, function() { 
    console.log(`server sudah nyala bung, buka http://.localhost:3000`)
})
