CREATE SEQUENCE signature_id_seq;
CREATE TABLE signature(id int primary key nextval(‘signature_id_seq'), data TEXT);
alter SEQUENCE signature_id_seq owned by signature.id; // to make a serial for employee id see note 1


CREATE SEQUENCE employee_id_seq;
CREATE TABLE employee( id int primary key not null DEFAULT nextval(‘employee_id_seq'), username varchar(254) not null, password varchar(254) not null, first_name varchar(20), last_name varchar(20), create_date date SET DEFAULT CURRENT_DATE, s_id int UNIQUE references signature(id), admin_id int references admin(id) null);
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

