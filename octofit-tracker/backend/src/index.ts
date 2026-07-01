import app, { PORT } from './server';

app.listen(PORT, () => {
  console.log(`OctoFit backend running on port ${PORT}`);
});
