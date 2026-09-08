const { Client } = require('pg');
const c = new Client({
  connectionString: 'postgresql://postgres:123456@localhost:5432/langchain',
});
c.connect()
  .then(async () => {
    const tables = await c.query(
      "select tablename from pg_tables where schemaname='public' order by tablename",
    );
    console.log('tables:', tables.rows.map((r) => r.tablename));
    for (const t of ['checkpoints', 'checkpoint_blobs', 'checkpoint_writes']) {
      try {
        const cnt = await c.query(`select count(*)::int as n from ${t}`);
        const sample = await c.query(
          `select thread_id from ${t} limit 5`,
        );
        console.log(t, 'count=', cnt.rows[0].n, 'threads=', sample.rows.map((r) => r.thread_id));
      } catch (e) {
        console.log(t, 'ERROR:', e.message);
      }
    }
    await c.end();
  })
  .catch((e) => {
    console.error('CONNECT ERROR:', e.message);
    process.exit(1);
  });
