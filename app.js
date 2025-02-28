const express = require('express');
const videoRoutes = require('./src/routes/videoRoutes');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', videoRoutes);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Handle SPA
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// For Vercel serverless functions
if (process.env.VERCEL) {
  app.listen();
} else {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;