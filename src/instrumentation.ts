export async function register() {
  if (process.env.NEXT_RUNTIME === 'edge') {
    return;
  }

  const dns = await import('node:dns');
  dns.setDefaultResultOrder('ipv4first');
}
