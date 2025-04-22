const { Sequelize } = require('sequelize');

const username = "postgres";
const dbname = "Students";
const password = "1234";

const sequelize = new Sequelize(dbname , username, password, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false 
});

module.exports = sequelize;



//data types in sequlize
/*  shift alt a
String types: STRING, TEXT, CHAR.

Number types: INTEGER, BIGINT, FLOAT, DECIMAL.

Boolean: BOOLEAN.

Date/time types: DATE, DATEONLY, TIME, NOW.

Binary: BLOB, BUFFER.

JSON: JSON, JSONB.

UUID: UUID.

Geospatial: GEOMETRY, POINT, LINESTRING.

Enum: ENUM.

Array: ARRAY. */