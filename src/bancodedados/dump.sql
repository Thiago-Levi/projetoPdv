create database projeto_pdv;

drop table usuarios;
drop table categorias;

create table usuarios (
	id serial primary key,
	nome text not null,
	email text unique not null,
	senha text not null
);

create table categorias(
	id serial primary key,
	descricao text not null
);

create table produtos(
	id serial primary key,
	descricao text not null,
	quantidade_estoque int not null,
	valor int not null,
	categoria_id int not null,
	foreign key (categoria_id) references categorias(id)
);

create table clientes (
  id serial primary key,
  nome text not null,
  email text not null unique,
  cpf text not null unique,
  cep text,
  rua text,
  numero int,
  bairro text,
  cidade text,
  estado char(2),
  usuario_id int not null,
  foreign key (usuario_id) references usuarios (id)
);

create table pedidos (
	id serial primary key,
 	cliente_id int references clientes(id),
 	observacao text,
 	valor_total int not null
);

create table pedido_produtos (
	id serial primary key,
	pedido_id int references pedidos(id),
 	produto_id int references produtos(id),
 	quantidade_produto int not null,
 	valor_produto int not null
);

insert into categorias (descricao)
values
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');