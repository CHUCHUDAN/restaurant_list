//引入express框架
const express = require('express')
const app = express()
//設定埠號
const port = 3000
//引入handlebars
const exphbs = require('express-handlebars')
//引入json檔案
const restaurantList = require('./restaurant.json')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))



//設定路由
app.get('/', (req, res) => {

  res.render('index', { restaurants: restaurantList.results })
})
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(item => item.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  const keywords = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase()
  const searchResult = restaurantList.results.filter(data =>
    data.name.toLowerCase().includes(keyword) ||
    data.category.toLowerCase().includes(keyword)
  )
  if (searchResult.length === 0) {
    return res.render('noresult', { keywords })
  }
  return res.render('index', { restaurants: searchResult, keywords})
})
//啟動並監聽伺服器
app.listen(port, () => {
  console.log(`The web is Listen on http://localhost:${port}`)
})