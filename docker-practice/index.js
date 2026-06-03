// Un serveur HTTP minimaliste — rien à voir avec NestJS ou Prisma
// Son seul rôle : servir d'exemple pour pratiquer les commandes Docker de base

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Hello depuis Docker !\n');
});

server.listen(3001, () => {
  console.log('Serveur démarré sur http://localhost:3001');
});
