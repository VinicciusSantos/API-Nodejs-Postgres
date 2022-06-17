CREATE TABLE projetos (
    id SERIAL PRIMARY KEY NOT NULL,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(400),
    data_criacao DATE
);

CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(400),
    data_criacao DATE
);

CREATE TABLE possuem_projetos_tarefas (
    id SERIAL PRIMARY KEY NOT NULL,
    fk_projetos int NOT NULL,
    fk_tarefas int NOT NULL,
    FOREIGN KEY (fk_projetos) REFERENCES projetos (id),
    FOREIGN KEY (fk_tarefas) REFERENCES tarefas (id)
);

CREATE TABLE pessoas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    profissao VARCHAR(30),
    data_nasc DATE,
    fk_tarefa int,
    FOREIGN KEY (fk_tarefa) REFERENCES possuem_projetos_tarefas (id)
);

CREATE TABLE equipes (
    id SERIAL PRIMARY KEY NOT NULL, 
    nome VARCHAR(50) NOT NULL,
    fk_projetos int,
    fk_lider int NOT NULL,
    FOREIGN KEY (fk_projetos) REFERENCES projetos (id),
    FOREIGN KEY (fk_lider) REFERENCES pessoas (id)
);

CREATE TABLE pertencem_pessoas_equipes (
    fk_pessoas int NOT NULL,
    fk_equipes int NOT NULL,
    FOREIGN KEY (fk_pessoas) REFERENCES pessoas (id),
    FOREIGN KEY (fk_equipes) REFERENCES equipes (id)
);
 


/* INSERTS */
INSERT INTO projetos (nome, descricao, data_criacao) VALUES
('GP Inovação', 'O Grad Prix de Inovação tem por objetivo gerar negócios e resolução de desafios para demandas da indústria, envolvendo: pequenas, médias e grandes empresas, assim como, estimular o empreendedorismo e o fortalecimento do ecossistema empreendedor', '03-20-2022'),
('Gerenciamento de Pousadas', 'Desenvolvido para administrar pousadas, hotéis, hostels ou qualquer conjunto de acomodações de forma simples e profissional', '02-12-2022'),
('Gerenciamento Financeiro', 'Esse sistema de gestão financeira é uma solução da tecnologia para que haja gestão financeira corporativa. Com isso, a ferramenta, que pode ser um aplicativo ou um software, dispõe de recursos para ajudar no gerenciamento financeiro do negócio', '11-15-2021'),
('API de Gerenciamento de Projetos', 'API é um acrônimo para Application Programming Interface, ou Interface de Programação de Aplicação, em português. Trata-se de um conjunto de rotinas e padrões que facilitam a comunicação e troca de informações entre sistemas', '06-05-2022')

INSERT INTO tarefas (nome, descricao, data_criacao) VALUES
('Criar o Banco de dados da API', 'PostgreSQL é um sistema gerenciador de banco de dados objeto relacional, desenvolvido como projeto de código aberto', '06-14-2022'),
('FrontEnd da API', 'Desenvolvimento da interface gráfica do usuário de um site, por meio do uso de HTML, CSS e JavaScript, para que os usuários possam visualizar e interagir com aquele site', '06-30-2022'),
('Cadastrar Pousada', 'Total controle de tudo que acontece no seu estabelecimento, você saberá o exato momento de quem realizou qualquer ação no sistema', '03-02-2022'),
('Escolha de Melhor Plano', 'Criação de uma função que possa determinar qual é o melhor plano para um cliente do hotel', '05-05-2022'),
('Gravar o Pitch', 'O pitch é uma apresentação sumária de 3 a 5 minutos com objetivo de despertar o interesse da outra parte (investidora, investidor ou cliente) pelo seu negócio. Assim, deve conter apenas as informações essenciais e diferenciadas', '03-25-2022'),
('Fazer pesquisa de anterioridade', 'A busca de anterioridade pode ser definida como uma atividade de pesquisa sobre informações tecnológicas que atestem/comprovem a inexistência de produto, processo ou melhoria idêntica ao objeto de pedido de patente ou registro que se deseja proteger', '04-20-2022'),
('Gerar Relatórios', 'Com os indicadores, gráficos, relatórios e demais recursos', '03-05-2022'),
('Geração de boletos', 'Um boleto bancário é um documento largamente utilizado no Brasil como instrumento de pagamento de um produto ou serviço prestado. Através do boleto, seu emissor pode receber do pagador o valor referente àquele pagamento', '02-21-2022')

INSERT INTO possuem_projetos_tarefas (fk_projetos, fk_tarefas) VALUES
(1, 5), (1, 6), (1, 2),
(2, 3), (2, 4),
(3, 7), (3, 8),
(4, 1)

INSERT INTO pessoas (nome, profissao, data_nasc) VALUES
('Priscila Fernandes Rosado', 'FrontEnd', '10-07-2003'),
('Julieta Rangel Ribas', 'BackEnd', '02-21-1996'),
('Ana Almeida', 'Testes', '05-12-2000'),
('Maria Vitória Novaes', 'BackEnd', '07-10-1999'),
('Otávio Rodrigues', 'FrontEnd', '08-01-2000'),
('Sr. Ryan Silveira', 'FrontEnd', '10-22-1996'),
('Matheus da Mata', 'BackEnd', '10-18-2002'),
('Isis das Neves', 'Mobile', '08-10-2002'),
('Breno da Rocha', 'FrontEnd', '02-27-2001'),
('Ana Luiza da Conceição', 'BackEnd', '10-30-2003'),
('Luigi Vieira', 'Banco de Dados', '01-12-2002'),
('Sr. Yuri Caldeira', 'BackEnd', '07-01-1945'),
('Rebeca Souza', 'Testes', '09-04-1997'),
('Nicole Araújo', 'FrontEnd', '08-08-1998'),
('Sra. Alana Santos', 'BackEnd', '09-07-2003'),
('Ana Clara da Mota', 'BackEnd', '02-25-2000'),
('Maria Cecília Sales', 'BackEnd', '10-14-2002'),
('Marcelo Monteiro', 'Testes', '09-13-1995'),
('Mariane Carvalho', 'BackEnd', '10-30-2001'),
('Juliana Costa', 'FrontEnd', '08-27-1996')

INSERT INTO equipes (nome, fk_projetos, fk_lider) VALUES
('Equipe Alfa', 1, 12),
('Equipe Beta', 1, 3),
('Equipe Gama', 2, 4),
('Equipe Delta', 3, 20),
('Equipe Épsilon', 3, 6),
('Equipe Zeta', 3, 13),
('Equipe Eta', 4, 16)

INSERT INTO pertencem_pessoas_equipes (fk_pessoas, fk_equipes) VALUES
(12, 1), (1,1), (19,1),
(3, 2), (10,2),
(4, 3), (9,3),
(20, 4), (5,4), (11,4),
(6, 5), (2,5), (14,5), (17,5),
(13, 6), (8,6), (15,6), (18,6),
(16, 7), (7,7)

UPDATE pessoas SET fk_tarefa = 5 WHERE id = 1
UPDATE pessoas SET fk_tarefa =  WHERE id = 2
UPDATE pessoas SET fk_tarefa = * WHERE id = 3
UPDATE pessoas SET fk_tarefa =  WHERE id = 4
UPDATE pessoas SET fk_tarefa =  WHERE id = 5
UPDATE pessoas SET fk_tarefa =  WHERE id = 6
UPDATE pessoas SET fk_tarefa =  WHERE id = 7
UPDATE pessoas SET fk_tarefa =  WHERE id = 8
UPDATE pessoas SET fk_tarefa =  WHERE id = 9
UPDATE pessoas SET fk_tarefa = * WHERE id = 10
UPDATE pessoas SET fk_tarefa =  WHERE id = 11
UPDATE pessoas SET fk_tarefa = 6 WHERE id = 12
UPDATE pessoas SET fk_tarefa =  WHERE id = 13
UPDATE pessoas SET fk_tarefa =  WHERE id = 14
UPDATE pessoas SET fk_tarefa =  WHERE id = 15
UPDATE pessoas SET fk_tarefa =  WHERE id = 16
UPDATE pessoas SET fk_tarefa =  WHERE id = 17
UPDATE pessoas SET fk_tarefa =  WHERE id = 18
UPDATE pessoas SET fk_tarefa = 2 WHERE id = 19
UPDATE pessoas SET fk_tarefa =  WHERE id = 20
