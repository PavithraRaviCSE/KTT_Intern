-- database
-- used to store huge amount of data in a structured way


-- need of database 
-- to store large amount of data 

--sql vs nosql 
-- query language for database operations(cred),row and colume structure, predefined structure, vertical scaling, ACID property , transactions and complex queries
-- graph structure or key-value or document based, dynamic structure,horizontally scalable, less consistant, fast read and write i large data.


-- rdbms 
-- relational database management system, column contains related values, row contains informaiton of a particular thing. 
-- primary key 
-- unique, not null, used for clustered indexing

--musql (oracle, enterprice, heavy read)
--postgresSQL(opensource, heavy write operation, functions and many datatype supported)
--sql(microsoft)
--Oracle(commercial user)

--foreing key
--reference the other table's primary key

-- composit key
-- combain 2 or more column to uniquely identify a record

--DDL


--create
create table Student(id serial PRIMARY key, name varchar NOT null,email VARCHAR UNIQUE not null);

--alter
alter table Student rename to  students;
select * from students;

alter table Students rename COLUMN id to studentId;

alter table students add COLUMN DOB date;
drop table students;


