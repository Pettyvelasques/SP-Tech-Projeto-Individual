create database reisen_garage;

use reisen_garage;

create table usuario(
idUsuario int primary key auto_increment,
username varchar(45),
nome varchar(45),
sobrenome varchar(45),
cidade varchar(45),
email varchar(45),
senha varchar(20)
);

create table garagem(
idGaragem int auto_increment,
fkUsuario int,
primary key (idGaragem, fkUsuario),
foreign key (fkUsuario) references usuario(idUsuario)
);

create table moto(
idMoto int primary key auto_increment,
modelo varchar(45),
marca varchar(45),
preco int,
cilindrada smallint,
potencia float,
torque float,
consumo float,
tanque float
);

insert into moto values
(null, 'Shadow 750', 'Honda', 41435, 745, 45.5, 6.5, 18.5, 14.6),
(null, 'Boulevard 800', 'Suzuki', 42329, 805, 55, 6.7, 15, 15.5),
(null, 'Virago 535', 'Yamaha', 19800, 535, 45, 4.6, 17.1, 13.5),
(null, 'Dragstar 650', 'Yamaha', 28101, 649, 39.4, 5.1, 19, 16),
(null, 'Midnight 950', 'Yamaha', 45412, 942, 53.6, 7.8, 17, 17),
(null, 'Vulcan 900', 'Kawasaki', 38125, 903, 50, 8, 18.2, 20),
(null, 'Shadow 600', 'Honda', 26669, 583, 39, 5.1, 18, 11);

create table motoNaGaragem(
fkGaragem int,
fkUsuario int,
fkMoto int,
motoComprada tinyint,
primary key (fkGaragem, fkUsuario, fkMoto),
foreign key (fkGaragem) references garagem(idGaragem),
foreign key (fkUsuario) references usuario(idUsuario),
foreign key (fkMoto) references moto(idMoto)
);

select * from usuario;
select * from garagem;
select * from moto;