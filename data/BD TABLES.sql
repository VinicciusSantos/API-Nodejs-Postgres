drop schema public cascade;
create schema public;

CREATE TABLE projetos (
    id SERIAL PRIMARY KEY NOT NULL,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(400),
    status VARCHAR(20) NOT NULL,
    data_criacao DATE NOT NULL,
    data_finalizacao DATE
);

CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(400),
    data_criacao DATE,
    data_finalizacao DATE,
    Status VARCHAR(20)
);

CREATE TABLE projetos_posssuem_tarefas (
    fk_projeto INTEGER,
    fk_tarefa INTEGER,
    FOREIGN KEY (fk_projeto) REFERENCES projetos(id),
    FOREIGN KEY (fk_tarefa) REFERENCES tarefas(id)
);

CREATE TABLE pessoas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    fk_cargo INTEGER NOT NULL,
    data_nasc DATE NOT NULL,
    data_cadastro DATE,
    status VARCHAR(20) NOT NULL,
    qtd_tarefas_finalizadas INTEGER NOT NULL
);

CREATE TABLE equipes (
    id SERIAL PRIMARY KEY NOT NULL, 
    nome VARCHAR(50) NOT NULL,
    fk_lider int NOT NULL,
    FOREIGN KEY (fk_lider) REFERENCES pessoas (id)
);

CREATE TABLE pessoas_pertencem_equipes (
    fk_equipe INTEGER NOT NULL,
    fk_pessoa INTEGER NOT NULL,
    FOREIGN KEY (fk_equipe) REFERENCES equipes(id),
    FOREIGN KEY (fk_pessoa) REFERENCES pessoas(id)
);

CREATE TABLE projetos_posssuem_equipes (
    fk_projeto INTEGER NOT NULL,
    fk_equipe INTEGER NOT NULL,
    FOREIGN KEY (fk_equipe) REFERENCES equipes(id),
    FOREIGN KEY (fk_projeto) REFERENCES projetos(id)
);

CREATE TABLE pessoas_associam_tarefas (
    fk_pessoa INTEGER,
    fk_tarefa INTEGER,
    FOREIGN KEY (fk_pessoa) REFERENCES pessoas(id),
    FOREIGN KEY (fk_tarefa) REFERENCES tarefas(id)
);

CREATE TABLE atualizacoes (
    id SERIAL PRIMARY KEY,
    mensagem VARCHAR(400) NOT NULL,
    data DATE NOT NULL,
    fk_projeto INTEGER NOT NULL,
    fk_autor INTEGER NOT NULL,
    FOREIGN KEY (fk_projeto) REFERENCES projetos(id),
    FOREIGN KEY (fk_autor) REFERENCES pessoas(id)
);

CREATE TABLE cargos (
    id SERIAL PRIMARY KEY,
    cargo VARCHAR(100) NOT NULL,
    salario REAL NOT NULL
);


INSERT INTO cargos (cargo, salario) VALUES
('FrontEnd Junior', '2525.00'),
('BackEnd Junior', '2525.00'),
('BackEnd Pleno', '7506.30'),
('FrontEnd Pleno', '7506.30');

/* Cadastrando Projetos */
INSERT INTO projetos (nome, descricao, data_criacao, status) VALUES
('GP Inovação', 'O Grad Prix de Inovação tem por objetivo gerar negócios e resolução de desafios para demandas da indústria, envolvendo: pequenas, médias e grandes empresas, assim como, estimular o empreendedorismo e o fortalecimento do ecossistema empreendedor', '03-20-2022', 'Em Andamento'),
('Gerenciamento de Pousadas', 'Desenvolvido para administrar pousadas, hotéis, hostels ou qualquer conjunto de acomodações de forma simples e profissional', '02-12-2022', 'Em Andamento'),
('Gerenciamento Financeiro', 'Esse sistema de gestão financeira é uma solução da tecnologia para que haja gestão financeira corporativa. Com isso, a ferramenta, que pode ser um aplicativo ou um software, dispõe de recursos para ajudar no gerenciamento financeiro do negócio', '11-15-2021', 'Em Andamento'),
('API de Gerenciamento de Projetos', 'API é um acrônimo para Application Programming Interface, ou Interface de Programação de Aplicação, em português. Trata-se de um conjunto de rotinas e padrões que facilitam a comunicação e troca de informações entre sistemas', '06-05-2022', 'Em Andamento');

/* Cadastrando Tarefas */
INSERT INTO tarefas (nome, descricao, data_criacao) VALUES
('Criar o Banco de dados da API', 'PostgreSQL é um sistema gerenciador de banco de dados objeto relacional, desenvolvido como projeto de código aberto', '06-14-2022'),
('FrontEnd da API', 'Desenvolvimento da interface gráfica do usuário de um site, por meio do uso de HTML, CSS e JavaScript, para que os usuários possam visualizar e interagir com aquele site', '06-30-2022'),
('Cadastrar Pousada', 'Total controle de tudo que acontece no seu estabelecimento, você saberá o exato momento de quem realizou qualquer ação no sistema', '03-02-2022'),
('Escolha de Melhor Plano', 'Criação de uma função que possa determinar qual é o melhor plano para um cliente do hotel', '05-05-2022'),
('Gravar o Pitch', 'O pitch é uma apresentação sumária de 3 a 5 minutos com objetivo de despertar o interesse da outra parte (investidora, investidor ou cliente) pelo seu negócio. Assim, deve conter apenas as informações essenciais e diferenciadas', '03-25-2022'),
('Fazer pesquisa de anterioridade', 'A busca de anterioridade pode ser definida como uma atividade de pesquisa sobre informações tecnológicas que atestem/comprovem a inexistência de produto, processo ou melhoria idêntica ao objeto de pedido de patente ou registro que se deseja proteger', '04-20-2022'),
('Gerar Relatórios', 'Com os indicadores, gráficos, relatórios e demais recursos', '03-05-2022'),
('Geração de boletos', 'Um boleto bancário é um documento largamente utilizado no Brasil como instrumento de pagamento de um produto ou serviço prestado. Através do boleto, seu emissor pode receber do pagador o valor referente àquele pagamento', '02-21-2022');

/* Cadastrando Pessoas */
INSERT INTO pessoas (nome, data_nasc, fk_cargo, status, qtd_tarefas_finalizadas) VALUES
('Priscila Fernandes Rosado', '10-07-2003', 1, 'Ativo', 0),
('Julieta Rangel Ribas', '02-21-1996', 3, 'Ativo', 0),
('Ana Almeida', '05-12-2000', 3, 'Desativado', 0),
('Maria Vitória Novaes', '07-10-1999', 2, 'Ativo', 0),
('Otávio Rodrigues', '08-01-2000', 3, 'Ativo', 0),
('Sr. Ryan Silveira', '10-22-1996', 1, 'Desativado', 0),
('Matheus da Mata', '10-18-2002', 2, 'Ativo', 0),
('Isis das Neves', '08-10-2002', 1, 'Desativado', 0),
('Breno da Rocha', '02-27-2001', 3, 'Ativo', 0),
('Ana Luiza da Conceição', '10-30-2003', 2, 'Ativo', 0),
('Luigi Vieira', '01-12-2002', 1, 'Ativo', 0),
('Sr. Yuri Caldeira', '07-01-1945', 1, 'Aposentado', 0),
('Rebeca Souza', '09-04-1997', 2, 'Desativado', 0),
('Nicole Araújo', '08-08-1998', 4, 'Ativo', 0),
('Sra. Alana Santos', '09-07-2003', 2, 'Ativo', 0),
('Ana Clara da Mota', '02-25-2000', 4, 'Ativo', 0),
('Maria Cecília Sales', '10-14-2002', 4, 'Desativado', 0),
('Marcelo Monteiro', '09-13-1995', 2, 'Ativo', 0),
('Mariane Carvalho', '10-30-2001', 4, 'Ativo', 0),
('Juliana Costa', '08-27-1996', 2, 'Ativo', 0);

/* Cadastrando Equipes */
INSERT INTO equipes (nome, fk_lider) VALUES
('Equipe Alfa', 12),
('Equipe Beta', 3),
('Equipe Gama', 4),
('Equipe Delta', 20),
('Equipe Épsilon', 6),
('Equipe Zeta', 13),
('Equipe Eta', 16);

/* Associando pessoas com equipes */
INSERT INTO pessoas_pertencem_equipes (fk_pessoa, fk_equipe) VALUES
(12, 1), (1,1), (19,1),
(3, 2), (10,2),
(4, 3), (9,3),
(20, 4), (5,4), (11,4),
(6, 5), (2,5), (14,5), (17,5),
(13, 6), (8,6), (15,6), (18,6),
(16, 7), (7,7);

/* Associando Tarefas com Projetos */
INSERT INTO projetos_posssuem_tarefas (fk_projeto, fk_tarefa) VALUES
(1, 5), (1, 6),
(2, 3), (2, 4),
(3, 7), (3, 8),
(4, 1), (4, 2);

/* Associando tarefas com Pessoas */
INSERT INTO pessoas_associam_tarefas (fk_pessoa, fk_tarefa) VALUES
(12, 1), (1, 2), (19, 2), (3, 1), (12, 2), 
(4, 4), (9, 3),
(20, 5), (5, 5), (11, 6), (6, 5), (2, 5), (14, 5), (17, 6), (13, 5), (8, 6), (15, 6), (18, 5),
(16, 7), (7, 8);