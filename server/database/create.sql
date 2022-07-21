drop schema public cascade;
create schema public;

CREATE TABLE projetos (
    pr_id SERIAL PRIMARY KEY NOT NULL,
    pr_nome VARCHAR(50) NOT NULL,
    pr_descricao VARCHAR(400),
    pr_status VARCHAR(20) NOT NULL,
    pr_data_criacao DATE NOT NULL default CURRENT_DATE,
    pr_data_finalizacao DATE
);

CREATE TABLE tarefas (
    tr_id SERIAL PRIMARY KEY,
    tr_nome VARCHAR(50) NOT NULL,
    tr_descricao VARCHAR(400),
    tr_data_criacao DATE default CURRENT_DATE,
    tr_data_finalizacao DATE,
    tr_status VARCHAR(20),
    tr_prioridade varchar(20)
);

CREATE TABLE projetos_possuem_tarefas (
    fk_projeto INTEGER,
    fk_tarefa INTEGER,
    FOREIGN KEY (fk_projeto) REFERENCES projetos(pr_id),
    FOREIGN KEY (fk_tarefa) REFERENCES tarefas(tr_id)
);

CREATE TABLE pessoas (
    pe_id SERIAL PRIMARY KEY,
    pe_nome VARCHAR(50) NOT NULL,
    pe_data_nasc DATE NOT NULL,
    pe_data_cadastro DATE default CURRENT_DATE,
    pe_status VARCHAR(20) NOT NULL,
    pe_cargo VARCHAR(100) NOT NULL,
    pe_salario REAL NOT NULL
);

CREATE TABLE equipes (
    eq_id SERIAL PRIMARY KEY NOT NULL, 
    eq_nome VARCHAR(50) NOT NULL,
    fk_lider int NOT NULL,
    FOREIGN KEY (fk_lider) REFERENCES pessoas (pe_id)
);

CREATE TABLE pessoas_pertencem_equipes (
    fk_equipe INTEGER NOT NULL,
    fk_pessoa INTEGER NOT NULL,
    FOREIGN KEY (fk_equipe) REFERENCES equipes(eq_id),
    FOREIGN KEY (fk_pessoa) REFERENCES pessoas(pe_id)
);

CREATE TABLE projetos_posssuem_equipes (
    fk_projeto INTEGER NOT NULL,
    fk_equipe INTEGER NOT NULL,
    FOREIGN KEY (fk_equipe) REFERENCES equipes(eq_id),
    FOREIGN KEY (fk_projeto) REFERENCES projetos(pr_id)
);

CREATE TABLE pessoas_associam_tarefas (
    fk_pessoa INTEGER,
    fk_tarefa INTEGER,
    FOREIGN KEY (fk_pessoa) REFERENCES pessoas(pe_id),
    FOREIGN KEY (fk_tarefa) REFERENCES tarefas(tr_id)
);

CREATE TABLE atualizacoes (
    att_id SERIAL PRIMARY KEY,
    att_mensagem VARCHAR(400) NOT NULL,
    att_data DATE NOT NULL default CURRENT_DATE,
    fk_projeto INTEGER NOT NULL,
    fk_autor INTEGER NOT NULL,
    FOREIGN KEY (fk_projeto) REFERENCES projetos(pr_id),
    FOREIGN KEY (fk_autor) REFERENCES pessoas(pe_id)
);

/* Cadastrando Projetos */
INSERT INTO projetos (pr_nome, pr_descricao, pr_data_criacao, pr_status) VALUES
('GP Inovação', 'O Grad Prix de Inovação tem por objetivo gerar negócios e resolução de desafios para demandas da indústria, envolvendo: pequenas, médias e grandes empresas, assim como, estimular o empreendedorismo e o fortalecimento do ecossistema empreendedor', '03-20-2022', 'Em Andamento'),
('Gerenciamento de Pousadas', 'Desenvolvido para administrar pousadas, hotéis, hostels ou qualquer conjunto de acomodações de forma simples e profissional', '02-12-2022', 'Em Andamento'),
('Gerenciamento Financeiro', 'Esse sistema de gestão financeira é uma solução da tecnologia para que haja gestão financeira corporativa. Com isso, a ferramenta, que pode ser um aplicativo ou um software, dispõe de recursos para ajudar no gerenciamento financeiro do negócio', '11-15-2021', 'Em Andamento'),
('API de Gerenciamento de Projetos', 'API é um acrônimo para Application Programming Interface, ou Interface de Programação de Aplicação, em português. Trata-se de um conjunto de rotinas e padrões que facilitam a comunicação e troca de informações entre sistemas', '06-05-2022', 'Em Andamento');

-- Teste do grafico de projetos
INSERT INTO projetos (pr_nome, pr_descricao, pr_data_criacao, pr_status, pr_data_finalizacao) VALUES
('teste1', 'blablabla', '2018-01-01', 'Concluido', '2022-06-30'),
('teste2', 'blablabla ;-;', '2010-12-15', 'Concluido', '2022-06-18'),
('teste3', 'blablabla dnv', '2019-08-25', 'Concluido', '2022-05-21'),
('teste4', 'blablabla novamente', '2010-05-12', 'Concluido', '2022-05-13'),
('teste5', 'blablabla pra testar um negoco', '2018-01-03', 'Concluido', '2022-04-14'),
('teste6', 'blablabla eai blz?', '2010-05-12', 'Concluido', '2022-03-24');

/* Cadastrando Tarefas */
INSERT INTO tarefas (tr_nome, tr_descricao, tr_data_criacao, tr_status, tr_prioridade) VALUES
('Criar o Banco de dados da API', 'PostgreSQL é um sistema gerenciador de banco de dados objeto relacional, desenvolvido como projeto de código aberto', '06-14-2022', 'Em Desenvolvimento', 'Alta'),
('FrontEnd da API', 'Desenvolvimento da interface gráfica do usuário de um site, por meio do uso de HTML, CSS e JavaScript, para que os usuários possam visualizar e interagir com aquele site', '06-30-2022', 'Não Iniciado', 'Alta'),
('Cadastrar Pousada', 'Total controle de tudo que acontece no seu estabelecimento, você saberá o exato momento de quem realizou qualquer ação no sistema', '03-02-2022', 'Em Desenvolvimento', 'Baixa'),
('Escolha de Melhor Plano', 'Criação de uma função que possa determinar qual é o melhor plano para um cliente do hotel', '05-05-2022', 'Cancelado', 'Media'),
('Gravar o Pitch', 'O pitch é uma apresentação sumária de 3 a 5 minutos com objetivo de despertar o interesse da outra parte (investidora, investidor ou cliente) pelo seu negócio. Assim, deve conter apenas as informações essenciais e diferenciadas', '03-25-2022', 'Em Desenvolvimento', 'Alta'),
('Fazer pesquisa de anterioridade', 'A busca de anterioridade pode ser definida como uma atividade de pesquisa sobre informações tecnológicas que atestem/comprovem a inexistência de produto, processo ou melhoria idêntica ao objeto de pedido de patente ou registro que se deseja proteger', '04-20-2022', 'Em Desenvolvimento', 'Alta'),
('Gerar Relatórios', 'Com os indicadores, gráficos, relatórios e demais recursos', '03-05-2022', 'Concluido', 'Baixa'),
('Geração de boletos', 'Um boleto bancário é um documento largamente utilizado no Brasil como instrumento de pagamento de um produto ou serviço prestado. Através do boleto, seu emissor pode receber do pagador o valor referente àquele pagamento', '02-21-2022', 'Concluido', 'Alta');

/* Cadastrando Pessoas */
INSERT INTO pessoas (pe_nome, pe_data_nasc, pe_status, pe_cargo, pe_salario) VALUES
('Priscila Fernandes Rosado', '10-07-2003', 'Ativo', 'FrontEnd Junior', '2525.00'),
('Julieta Rangel Ribas', '02-21-1996', 'Ativo', 'FrontEnd Junior', '2525.00'),
('Ana Almeida', '05-12-2000', 'Desativado', 'FrontEnd Junior', '2525.00'),
('Maria Vitória Novaes', '07-10-1999', 'Ativo', 'BackEnd Junior', '2525.00'),
('Otávio Rodrigues', '08-01-2000', 'Ativo', 'BackEnd Junior', '2525.00'),
('Sr. Ryan Silveira', '10-22-1996', 'Desativado', 'FrontEnd Junior', '2525.00'),
('Matheus da Mata', '10-18-2002', 'Ativo', 'BackEnd Pleno', '2525.00'),
('Isis das Neves', '08-10-2002', 'Desativado', 'FrontEnd Junior', '2525.00'),
('Breno da Rocha', '02-27-2001', 'Ativo', 'BackEnd Junior', '2525.00'),
('Ana Luiza da Conceição', '10-30-2003', 'Ativo', 'FrontEnd Pleno', '2525.00'),
('Luigi Vieira', '01-12-2002', 'Ativo', 'BackEnd Junior', '2525.00'),
('Sr. Yuri Caldeira', '07-01-1945', 'Aposentado', 'FrontEnd Junior', '2525.00'),
('Rebeca Souza', '09-04-1997', 'Desativado', 'BackEnd Pleno', '2525.00'),
('Nicole Araújo', '08-08-1998', 'Ativo', 'BackEnd Pleno', '2525.00'),
('Sra. Alana Santos', '09-07-2003', 'Ativo', 'FrontEnd Junior', '2525.00'),
('Ana Clara da Mota', '02-25-2000', 'Ativo', 'FrontEnd Pleno', '2525.00'),
('Maria Cecília Sales', '10-14-2002', 'Desativado', 'BackEnd Pleno', '2525.00'),
('Marcelo Monteiro', '09-13-1995', 'Ativo', 'FrontEnd Junior', '2525.00'),
('Mariane Carvalho', '10-30-2001', 'Ativo', 'BackEnd Pleno', '2525.00'),
('Juliana Costa', '08-27-1996', 'Ativo', 'FrontEnd Pleno', '2525.00');

/* Cadastrando Equipes */
INSERT INTO equipes (eq_nome, fk_lider) VALUES
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

/* Associando projetos com equipes */
INSERT INTO projetos_posssuem_equipes (fk_projeto, fk_equipe) VALUES
(1, 1), (1,2),
(2, 3),
(3, 4), (3,5), (3,6),
(4, 7);

/* Associando Tarefas com Projetos */
INSERT INTO projetos_possuem_tarefas (fk_projeto, fk_tarefa) VALUES
(1, 5), (1, 6),
(2, 3), (2, 4),
(3, 7), (3, 8),
(4, 1), (4, 2);

/* Associando tarefas com Pessoas */
INSERT INTO pessoas_associam_tarefas (fk_pessoa, fk_tarefa) VALUES
(12, 1), (3, 1),
(1, 2), (19, 2), (12, 2), 
(4, 4), (9, 3),
(20, 5), (5, 5), (11, 6), (6, 5), (2, 5), (14, 5), (18, 5), (13, 5),
(17, 6), (8, 6), (15, 6),
(16, 7),
(7, 8);