const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = 3000
const fs = require('fs')
const data = fs.readFileSync('data.json','utf-8')
let data1 = JSON.parse(data)

app.set('views', path.join(__dirname, 'views')); 


app.set('view engine', 'ejs');
app.get('/', (req, res) => { // rows menajadi variavke di list.ejs
  
  res.render('lihat',{ rows : data1}) // paramaters rows untuk ngirim data ke list 
  
}) 
app.get('/tambah', (req,res)=>{
  res.render('tambah')
})
app.post('/tambah',(req, res)=>{
  console.log(req.body)
  data1.push({string:req.body.string, integer: req.body.integer, float :req.body.float, date: req.body.date, boolean : req.body.boolean})
  fs.writeFileSync('data.json', JSON.stringify(data1))
   res.redirect('/')
})
app.get('/delet/:id',(req,res)=>{
  const index = req.params.id
    data1.splice(index,1)
    fs.writeFileSync('data.json',JSON.stringify(data1))
    res.redirect('/')

})
app.get('/edit/:id', (req,res)=>{
  console.log(req.params.id)
  res.render('edit', {item:data1[req.params.id]})
})
app.post('/edit/:id',(req,res)=>{
  
  data1[req.params.id] ={string:req.body.string, integer: req.body.integer, float :req.body.float, date: req.body.date, bolean : req.body.bolean}
  fs.writeFileSync('data.json', JSON.stringify(data1))
  res.redirect('/') 
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
