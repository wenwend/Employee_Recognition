CREATE SEQUENCE signature_id_seq;
CREATE TABLE signature(id int primary key nextval(‘signature_id_seq'), data TEXT, e_id int UNIQUE references employee(id);
alter SEQUENCE signature_id_seq owned by signature.id; // to make a serial for employee id see note 1


CREATE SEQUENCE employee_id_seq;
CREATE TABLE employee( id int primary key not null DEFAULT nextval(‘employee_id_seq'), username varchar(254) not null, password varchar(254) not null, first_name varchar(20), last_name varchar(20), create_date date SET DEFAULT CURRENT_DATE, admin_id int references admin(id) null);
alter SEQUENCE employee_id_seq owned by employee.id; // to make a serial for employee id see note 1

CREATE SEQUENCE admin_id_seq;
CREATE TABLE admin(id int primary key DEFAULT nextval(‘admin_id_seq'), email varchar(254), password varchar(254) not null, admin_id int references admin(id) null);
 alter sequence admin_id_seq owned by admin.id; 

CREATE SEQUENCE award_id_seq;
CREATE TABLE award(id int primary key not null DEFAULT nextval(‘award_id_seq'), type int references award_type(id), given_fname varchar(20) not null, given_lname varchar(20) not null, given_email varchar(254) not null, e_id int references employee(id), given_date date SET DEFAULT CURRENT_DATE, given_time time);
alter sequence award_id_seq owned by award.id;

CREATE TABLE award_type(id int primary key not null, name varchar(254) not null);

CREATE SEQUENCE cer_id_seq;
CREATE TABLE certificate(id int primary key default nextval(‘cer_id_seq’), data bytea, a_id int references award(id));
alter sequence cer_id_seq owned by certificate.id;

********

\d+ signature
                                             Table "public.signature"
 Column |  Type   | Collation | Nullable |             Default             | Storage  | Stats target | Description 
--------+---------+-----------+----------+---------------------------------+----------+--------------+-------------
 id     | integer |           | not null | nextval('sig_id_seq'::regclass) | plain    |              | 
 data   | text    |           |          |                                 | extended |              | 
 e_id   | integer |           |          |                                 | plain    |              | 
Indexes:
    "signature_pkey" PRIMARY KEY, btree (id)
    "constraint_eid" UNIQUE CONSTRAINT, btree (e_id)
Foreign-key constraints:
    "signature_e_id_fkey" FOREIGN KEY (e_id) REFERENCES employee(id)

********

\d+ employee
                                                          Table "public.employee"
   Column    |          Type          | Collation | Nullable |               Default                | Storage  | Stats target | Description 
-------------+------------------------+-----------+----------+--------------------------------------+----------+--------------+-------------
 id          | integer                |           | not null | nextval('employee_id_seq'::regclass) | plain    |              | 
 username    | character varying(254) |           | not null |                                      | extended |              | 
 password    | character varying(254) |           | not null |                                      | extended |              | 
 first_name  | character varying(20)  |           |          |                                      | extended |              | 
 last_name   | character varying(20)  |           |          |                                      | extended |              | 
 create_date | date                   |           |          | CURRENT_DATE                         | plain    |              | 
 admin_id    | integer                |           |          |                                      | plain    |              | 
Indexes:
    "employee_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "employee_admin_id_fkey" FOREIGN KEY (admin_id) REFERENCES admin(id)
Referenced by:
    TABLE "award" CONSTRAINT "award_e_id_fkey" FOREIGN KEY (e_id) REFERENCES employee(id)