import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const app = express();

app.get('/authorized', (req, res) => {
  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname,'public'), {index: 'authentication.html'}));
app.use((req, res) => {
  res.status(404);
  res.send('Resource not found')
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});