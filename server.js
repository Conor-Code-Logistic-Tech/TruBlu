import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'data:'],
      'script-src': ["'self'"],
      'style-src': ["'self'", "'unsafe-inline'"],
    }
  }
}));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

app.get('/', (req, res) => {
  res.render('home', {
    company: 'TruBlu Financial',
    tagline: 'Financial clarity that feels effortless',
    nav: [
      { href: '#solutions', label: 'Solutions' },
      { href: '#why', label: 'Why Us' },
      { href: '#testimonials', label: 'Results' },
      { href: '#contact', label: 'Contact' }
    ]
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`▶ Listening on http://localhost:${port}`));
