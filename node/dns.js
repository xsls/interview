const dns = require('dns');
dns.lookup('nodejs.org', (err, addresses, family) => {
  console.log('addresses:', addresses);
  console.log('family', family);
});
console.log('>>>>>>>>>>>');
dns.resolve4('nodejs.org', (err, addresses) => {
  if (err) throw err;
  console.log(`addresses: ${JSON.stringify(addresses)}`);
  addresses.forEach((a) => {
    dns.reverse(a, (err, hostnames) => {
      if (err) {
        throw err;
      }
      console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
    });
  });
});
console.log('<<<<<<<<<<<');
dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
  console.log(hostname, service);
    // Prints: localhost ssh
});
