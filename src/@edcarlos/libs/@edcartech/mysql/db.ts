import mysql from 'serverless-mysql'

export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    //port: parseInt('3306'),
    port: Number('3306'),
    //port: parseInt(process.env.MYSQL_PORT),
  },
})

export async function query(q: string,values: (string | number)[] | string | number = []) {
  try {
    const results = await db.query(q, values)
    await db.end()
    return results
  } catch (e:any) {
    throw Error(e.message) 
  }
}

export const authDb = mysql({
    config: {
      host: process.env.MYSQL_AUTH_HOST,
      database: process.env.MYSQL_AUTH_DATABASE,
      user: process.env.MYSQL_AUTH_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      port: parseInt('3306'),
      //port: parseInt(process.env.MYSQL_PORT),
    },
  })

  export async function authQuery(q: string,values: (string | number)[] | string | number = [] ) {
    try {
      const results = await authDb.query(q, values)
      await authDb.end()
      return results
    } catch (e:any) {
      throw Error(e.message) 
    }
  }