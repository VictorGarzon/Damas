create database damas;
use damas;
create table usuarios(
    id_usuario int(4) auto_increment,
    nombre varchar(20) not null unique ,
    password varchar(255) not null,
    constraint usu_pk primary key (id_usuario)
);

create table amigos(
    id_usuario1 int(4),
    id_usuario2 int(4),
    ac1 int(1) ,
    ac2 int(1) ,
    visto1 int(4),
    visto2 int(4),
    constraint ami_pk primary key (id_usuario1,id_usuario2),
    constraint ami_fk1 foreign key (id_usuario1) references usuarios(id_usuario) on delete cascade on update cascade,
    constraint ami_fk2 foreign key (id_usuario2) references usuarios(id_usuario) on delete cascade on update cascade
);
create table mensajes_amigos(
    id_usuario1 int(4),
    id_usuario2 int(4),
    id_mensaje int(4),
    mensaje varchar(255) not null ,
    origen int(4) not null ,
    constraint ma_pk primary key (id_usuario1,id_usuario2,id_mensaje),
    constraint ma_fk1 foreign key (id_usuario1,id_usuario2) references amigos(id_usuario1, id_usuario2)  on delete cascade on update cascade
);
create table versiones(
  amigo int(255)
);
insert into versiones(amigo) value (0);
create or replace trigger in_ver_a
    after insert on amigos
    for each row
     UPDATE versiones SET amigo = amigo+1;
create or replace trigger up_ver_a
    after update on amigos
    for each row
    UPDATE versiones SET amigo = amigo+1;
create or replace trigger de_ver_a
    after delete on amigos
    for each row
    UPDATE versiones SET amigo = amigo+1;


create table asignar(
    id_partida int(4) auto_increment,
    id_usuario1 int(4),
    id_usuario2 int(4),
    ac1 int(1) ,
    ac2 int(1) ,
    tipo int(1),
    resultado int(4),
    ac_empate1 int(1),
    ac_empate2 int(1),
    constraint asi_pk primary key ( id_partida),
    constraint asi_fk1 foreign key (id_usuario1) references usuarios(id_usuario),
    constraint asi_fk2 foreign key (id_usuario2) references usuarios(id_usuario)
);

create table movimientos(
    id_partida int(4),
    id_movimiento int(4),
    tablero varchar(255) not null ,
    moviento varchar(255) not null ,
    turno int(4) not null ,
    soplar varchar(255) not null ,
    so_con int(1) not null ,
    constraint mo_pk primary key (id_partida,id_movimiento),
    constraint mo_fk1 foreign key (id_partida) references asignar(id_partida)
);

create table mensajes_partidas(
    id_partida int(4),
    id_mensaje int(4),
    mensaje varchar(255) not null ,
    origen int(4) not null ,
    constraint mp_pk primary key (id_partida,id_mensaje),
    constraint mp_fk1 foreign key (id_partida) references asignar(id_partida)
);

create user registro@localhost identified by 'damas1';
grant select, insert on damas.usuarios to  registro@localhost;

create user amigos@localhost identified by 'damas2';
grant select on damas.usuarios to  amigos@localhost;
grant all on damas.amigos to  amigos@localhost;
grant select , insert on damas.mensajes_amigos to  amigos@localhost;


create user partidas@localhost identified by 'damas3';
grant select on damas.usuarios to  partidas@localhost;
grant select,insert,update,delete on damas.asignar to partidas@localhost;
grant select,insert,update on damas.movimientos to partidas@localhost;
grant select,insert,update on damas.mensajes_partidas to partidas@localhost;
