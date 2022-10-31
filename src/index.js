if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express')
const app = express();

app.use(express.json());
app.use('/role',require("./api/role/route"));
app.use('/school',require("./api/school/route"));
app.use('/student',require("./api/student/route"));
app.use('/user',require("./api/user/route"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}`)
})