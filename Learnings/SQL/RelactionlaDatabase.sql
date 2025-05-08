-- database
-- used to store huge amount of data in a structured way
-- user fr storing , managing and securing organized collections of data


-- need of database 
-- to store large amount of data 

--sql vs nosql 
-- query language for database operations(cred),row and colume structure, predefined structure, vertical scaling, ACID property , transactions and complex queries
-- graph structure or key-value or document based, dynamic structure,horizontally scalable, less consistant, fast read and write i large data.


-- rdbms 
-- relational database management system, column contains related values, row contains informaiton of a particular thing. 
-- primary key 
-- unique, not null, used for clustered indexing
--supports multiple user , ACID, normalization, schema is limited

--mysql (oracle, enterprice, heavy read)


--postgresSQL(opensource, heavy write operation, functions and many datatype supported)
-- jsonb -> hierarchical store data, key value pair,  tree like structre ,(datatype + metadata)
-- features  -> indexing, comparison, no need to parse


--sql(microsoft)
--Oracle(commercial user)

--foreing key
--reference the other table's primary key

-- composit key
-- combain 2 or more column to uniquely identify a record

--DDL


--create
-- create table Student(id serial PRIMARY key, name varchar NOT null,email VARCHAR UNIQUE not null);

--alter
-- alter table Student rename to  students;
-- select * from students;

-- alter table Students rename COLUMN id to studentId;

-- alter table students add COLUMN DOB date;


-- drop table students;


-- CREATE TYPE status_enum AS ENUM ('active', 'inactive');
-- create table Customer(id serial primary key,name  VARCHAR not null unique, dob date check(dob < CURRENT_DATE), createdAt TIMESTAMP default CURRENT_TIMESTAMP, available boolean default true, status status_enum, smapleJson JSON,fruitlist TEXT[], image bytea );


select * from sample;
--select * from "UserRoles";
--INSERT INTO "UserRoles" ("name") VALUES ('admin');


select * from students;
select * from customer;

INSERT INTO Customer (
    name, 
    dob, 
    available, 
    status, 
    smapleJson, 
    fruitlist
) VALUES (
    'Kavi', 
    '2004-10-17', 
    TRUE, 
    'inactive', 
    '{"key": "value"}', 
    ARRAY['apple', 'banana'] 
    
);


select * from customer where status = 'active';

update customer set status = 'inactive', name ='nivetha' where id = 1;


update Customer set fruitlist = array_append(fruitlist, 'orange') where id = 1;
update Customer set fruitlist = array_remove(fruitlist,'apple') where id = 1;
update Customer set fruitlist =  array_replace(fruitlist, 'banana' , 'apple') where id = 1;


select * from sampleTable;

alter table sampleTable rename column smaplejson to samplejson;

update sampleTable set samplejson = jsonb_set(
	samplejson::jsonb, '{name}','"pavi"'
)::json where id = 1;



alter table sampleTable add column jsonbdata jsonb;

update sampleTable set jsonbdata = jsonb_build_object('status', 'active', 'details', jsonb_build_object('age', 25, 'location', 'CA')) where id = 2;

select jsonbdata->>'details' from sampleTable;


-- sample table 

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT CHECK (age > 0),
    email VARCHAR(100) UNIQUE,
    enrolled_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(10) DEFAULT 'active'
);

INSERT INTO student (name, age, email, enrolled_date, status) VALUES
('John Doe', 20, 'john.doe@example.com', '2023-01-15 10:00:00', 'active'),
('Jane Smith', 22, 'jane.smith@example.com', '2022-05-10 14:30:00', 'inactive'),
('Mark Johnson', 23, 'mark.johnson@example.com', '2021-09-20 08:00:00', 'active'),
('Emily Davis', 21, 'emily.davis@example.com', '2023-03-22 11:45:00', 'active'),
('Michael Brown', 24, 'michael.brown@example.com', '2021-11-13 09:20:00', 'inactive'),
('Olivia Wilson', 19, 'olivia.wilson@example.com', '2023-06-01 16:15:00', 'active'),
('Liam Moore', 25, 'liam.moore@example.com', '2022-12-01 13:25:00', 'inactive'),
('Sophia Taylor', 18, 'sophia.taylor@example.com', '2023-02-10 07:30:00', 'active'),
('James Anderson', 21, 'james.anderson@example.com', '2022-08-25 15:00:00', 'inactive'),
('Isabella Thomas', 20, 'isabella.thomas@example.com', '2021-06-14 10:40:00', 'active'),
('Benjamin Harris', 22, 'benjamin.harris@example.com', '2023-04-19 12:50:00', 'active'),
('Charlotte Clark', 19, 'charlotte.clark@example.com', '2021-07-30 17:30:00', 'inactive'),
('William Lewis', 23, 'william.lewis@example.com', '2023-01-05 09:15:00', 'active'),
('Ava Walker', 21, 'ava.walker@example.com', '2022-09-15 18:05:00', 'active'),
('Jackson Young', 24, 'jackson.young@example.com', '2021-12-17 10:25:00', 'inactive'),
('Amelia Allen', 22, 'amelia.allen@example.com', '2023-05-11 14:00:00', 'active'),
('Lucas King', 19, 'lucas.king@example.com', '2022-06-22 08:50:00', 'inactive'),
('Mia Scott', 20, 'mia.scott@example.com', '2021-10-10 11:10:00', 'active'),
('Ethan Wright', 23, 'ethan.wright@example.com', '2023-07-05 16:45:00', 'active'),
('Madison Hall', 21, 'madison.hall@example.com', '2022-03-30 09:30:00', 'inactive');


CREATE TABLE course (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    course_duration INT, -- Duration in weeks
    instructor_name VARCHAR(100)
);


CREATE TABLE student_courses (
    student_id INT REFERENCES student(id),
    course_id INT REFERENCES course(course_id),
    enrollment_date TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (student_id, course_id)
);


INSERT INTO course (course_name, course_duration, instructor_name) VALUES
('Mathematics', 12, 'Dr. John Doe'),
('Physics', 14, 'Dr. Jane Smith'),
('Computer Science', 16, 'Dr. Mark Johnson'),
('Chemistry', 12, 'Dr. Emily Davis'),
('Biology', 10, 'Dr. Michael Brown');


INSERT INTO student_courses (student_id, course_id) VALUES
(1, 1),  
(2, 2), 
(3, 3),  
(4, 4),  
(5, 5), 
(1, 3),  
(2, 4),  
(3, 2),  
(4, 5), 
(5, 1);





select * from student;
select * from course;
select * from student_courses;


-- complex joins
select student.*, course.course_name from student join student_courses  on id = student_courses.student_id
inner join course on course.course_id = student_courses.course_id;


select student.*, course.course_name from student join student_courses  on student.id = student_courses.student_id
inner join course  on course.course_id = student_courses.course_id where course.course_name = 'Physics'

 
