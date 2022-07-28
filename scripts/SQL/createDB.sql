CREATE SCHEMA IF NOT EXISTS buddyHouseDB;
SET search_path TO buddyHouseDB;

DROP TABLE IF EXISTS "LOCATION" CASCADE;
DROP TABLE IF EXISTS school CASCADE;
DROP TABLE IF EXISTS manager CASCADE;
DROP TABLE IF EXISTS colocation CASCADE;
/*DROP TABLE IF EXISTS roomatesgroup CASCADE;*/
DROP TABLE IF EXISTS "USER" CASCADE;



create table "LOCATION" (
location_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
coordx varchar(50) not null,
coordy varchar(50) not null
);

INSERT INTO "LOCATION" (coordx,coordy) VALUES
('4 12 412,2N','2 10 526,8E'),
('5 25 428,3S','3 11 525,9E'),
('6 35 422,4O','8 36 200,2E'),
('7 45 435,6E','9 11 365,1E'),
('8 42 689,6N','10 11 982,1E'),
('9 25 435,6E','11 11 367,1E'),
('10 45 435,6E','12 11 365,1E'),
('11 45 435,6E','13 11 365,1E');


create table SCHOOL (
school_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
nameSchool varchar(50) not null,
location_id_fk2 integer not null,
foreign key (location_id_fk2) references "LOCATION"(location_id)
);

INSERT INTO SCHOOL (nameSchool, location_id_fk2) VALUES
('ULB',1),
('ICHEC',2),
('SAINT-LOUIS',3),
('IHECS',4);

create table MANAGER (
manager_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
email varchar(50) not null unique,
namemanager varchar(50) not null,
phonenumber varchar(50)
);

INSERT INTO MANAGER (email, namemanager, phonenumber) VALUES
('john@iesn.be','John','0498701956'),
('isabelle@odoo.be','Isabelle','0476526589'),
('chris@henallux.be','Chris','0495698732'),
('marie@iesn.be','Marie','0468689515');

create table COLOCATION (
colocation_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
colocation_name varchar(50) not null,
address varchar(50) not null,
"description" varchar(250) not null,
price float not null,
size varchar(10) not null,
manager_id_fk integer not null,
location_id_fk integer not null,
foreign key (location_id_fk) references "LOCATION"(location_id),
foreign key (manager_id_fk) references MANAGER(manager_id)
);
INSERT INTO COLOCATION (colocation_name, address, description, price, "size", manager_id_fk, location_id_fk) VALUES
('Residence Student','Rue du sablon 25','Belle résidence en centre-ville',465,8,1,5),
('Residence Maria','Rue du bois 10','Charmante maison de maître rénovée',500,6,2,6),
('Forum','Avenue Charlemagne','Résidence studieuse proche des transports',350,10,3,7),
('Kot for Student','Boulevard Hosman','Kots entièrement rénovés',375,4,4,8);

/* Table pour fonctionnalité supplémentaire
create table ROOMATESGROUP (
roomatesGroup_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
groupName varchar(50),
colocation_id_fk integer,
foreign key (colocation_id_fk) references COLOCATION(colocation_id)
);
*/

create table "USER" (
user_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
email varchar(50) not null unique,
password text not null,
isadmin boolean,
lastname varchar(50) not null,
firstname varchar(50) not null,
birthdate date not null,
sexe char not null,
"address" varchar(50) not null,
statut varchar(50) not null,
phonenumber varchar(50),
description varchar(200),
netflixandchill boolean,
relax boolean,
seriousstudent boolean,
athletic boolean,
party boolean,
obsessivecleaning boolean,
noparty boolean,
smoke boolean,
sizeofcolocation varchar(50),
school_id_fk int,
colocation_id_fk2 int,
foreign key (school_id_fk) references SCHOOL(school_id),
foreign key (colocation_id_fk2) references COLOCATION(colocation_id)
);

INSERT INTO "USER" (email, password, isadmin, lastname, firstname, birthdate, sexe, address, statut, phonenumber, description, netflixandchill, relax, seriousstudent, athletic, party, obsessivecleaning, noparty, smoke, sizeofcolocation, school_id_fk, colocation_id_fk2)
VALUES
('chloe@hotmail.fr','$2a$10$fiKILzSQn2YvA.mbmxhqa.7f8pErrnl4qofZY7nE/a5Vq8KakfPKG',false,'Dufour','Chloé','1996-05-19','F','Rue du bois joli 25','Student','0475256585','Future étudiante à l ULB',true, true,true,false,false,true,true,false,'grande',1,1),
('louis@hotmail.fr','$2a$10$fiKILzSQn2YvA.mbmxhqa.7f8pErrnl4qofZY7nE/a5Vq8KakfPKG',true,'Dujardin','Louis','1998-02-20','M','Rue du crayon 85','Student','0476859874','Etudiant cool à l ICHEC',true, true,false,true,true,false,false,true,'moyenne',2,2),
('simon@hotmail.fr','$2a$10$fiKILzSQn2YvA.mbmxhqa.7f8pErrnl4qofZY7nE/a5Vq8KakfPKG',false,'Lupin','Simon','2000-01-02','M','Boulevard Charlemagne','Worker','0485698745','Employé chez Fortis',true, true,true,false,false,true,true,false,'grande',3,3),
('zoe@hotmail.fr','$2a$10$fiKILzSQn2YvA.mbmxhqa.7f8pErrnl4qofZY7nE/a5Vq8KakfPKG',true,'Fontaine','Zoé','2002-05-25','F','Rue du pachis','Student','0479684454','Future étudiante à Saint-Louis',true, true,true,false,false,true,true,false,'grande',4,4);

