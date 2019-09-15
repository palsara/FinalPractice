const mariadb = require('mariadb');

const pool = mariadb.createPool({
  user: 'root',
  password: 'ROOT',
  database: 'final-practice',
  connectionLimit: 5,
});

module.exports = class DB {
  constructor() {
    pool.getConnection().then(conn => this.conn = conn);
  }

  async read(id) {
    let sql = `
    SELECT *
    FROM products`;
    if (id) {
      sql += ` WHERE id=${id}`;
    }
    const result = await this.conn.query(sql);
    return result;
  }

  async create(data) {
    const sql = `
    INSERT INTO products
    ( name, category, price, manufacturer)
    VALUES
	  ('${data.name}', '${data.category}', ${data.price},'${data.manufacturer}')
`;
    const result = await this.conn.query(sql);
    return result;
  }

  async update(data) {
    const sql = `
    UPDATE products
    SET name = '${data.name}', category = '${data.category}', price = ${data.price}, manufacturer = '${data.manufacturer}'
    WHERE id = ${data.id}`;
    const result = await this.conn.query(sql);
    return result;
  }

  async delete(id) {
    const sql = `
    DELETE FROM products
    WHERE id=${id}`;
    const result = await this.conn.query(sql);
    return result;
  }
};
