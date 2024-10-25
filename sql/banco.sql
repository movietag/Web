CREATE TABLE PRODUCAO (
    id INT PRIMARY KEY,
    idAPI INT
);

CREATE TABLE USUARIO (
    id INT PRIMARY KEY,
    senha VARCHAR(255),
    usuario VARCHAR(50),
    email VARCHAR(100),
    pathImg VARCHAR(255)
);

CREATE TABLE TAG (
    id INT PRIMARY KEY,
    nome VARCHAR(50),
    idUsu INT
);

CREATE TABLE LISTA (
    id INT PRIMARY KEY,
    nome VARCHAR(50),
    idUsu INT
);

CREATE TABLE Avalia_Producao (
    idUsu INT,
    idProd INT,
    porcentagemAvaliacao DECIMAL(5, 2),
    PRIMARY KEY (idUsu, idProd)
);

CREATE TABLE Acessa_Producao (
    idUsu INT,
    idProd INT,
    dataHora TIMESTAMP,
    PRIMARY KEY (idUsu, idProd)
);

CREATE TABLE Acessa_Tag (
    idUsu INT,
    idTag INT,
    dataHora TIMESTAMP,
    PRIMARY KEY (idUsu, idTag)
);

CREATE TABLE Possui_Tag (
    idProd INT,
    idTag INT,
    PRIMARY KEY (idProd, idTag)
);

CREATE TABLE Avalia_Tag (
    idUsu INT,
    idTag INT,
    curtida BOOLEAN,
    PRIMARY KEY (idUsu, idTag)
);

CREATE TABLE Favorita_Tag (
    idUsu INT,
    idTag INT,
    PRIMARY KEY (idUsu, idTag)
);

CREATE TABLE Relacionada (
    idProd INT,
    idLista INT,
    PRIMARY KEY (idProd, idLista)
);

ALTER TABLE TAG 
    ADD CONSTRAINT idUsu
    FOREIGN KEY (idUsu)
    REFERENCES USUARIO (id)
    ON DELETE CASCADE;

ALTER TABLE LISTA 
    ADD CONSTRAINT idUsu
    FOREIGN KEY (idUsu)
    REFERENCES USUARIO (id)
    ON DELETE RESTRICT;

ALTER TABLE Avalia_Producao 
    ADD CONSTRAINT idUsu
    FOREIGN KEY (idUsu)
    REFERENCES USUARIO (id)
    ON DELETE SET NULL;

ALTER TABLE Avalia_Producao 
    ADD CONSTRAINT idProd
    FOREIGN KEY (idProd)
    REFERENCES PRODUCAO (id)
    ON DELETE SET NULL;

ALTER TABLE Acessa_Producao 
    ADD CONSTRAINT idUsu
    FOREIGN KEY (idUsu)
    REFERENCES USUARIO (id)
    ON DELETE RESTRICT;

ALTER TABLE Acessa_Producao 
    ADD CONSTRAINT idProd
    FOREIGN KEY (idProd)
    REFERENCES PRODUCAO (id)
    ON DELETE SET NULL;

ALTER TABLE Acessa_Tag 
    ADD CONSTRAINT idUsu
    FOREIGN KEY (idUsu)
    REFERENCES USUARIO (id)
    ON DELETE SET NULL;

ALTER TABLE Acessa_Tag 
    ADD CONSTRAINT idTag
    FOREIGN KEY (idTag)
    REFERENCES TAG (id)
    ON DELETE SET NULL;

ALTER TABLE Possui_Tag 
    ADD CONSTRAINT idProd
    FOREIGN KEY (idProd)
    REFERENCES PRODUCAO (id)
    ON DELETE RESTRICT;

ALTER TABLE Possui_Tag 
    ADD CONSTRAINT idTag
    FOREIGN KEY (idTag)
    REFERENCES TAG (id)
    ON DELETE SET NULL;

ALTER TABLE Avalia_Tag 
    ADD CONSTRAINT idUsu
    FOREIGN KEY (idUsu)
    REFERENCES USUARIO (id)
    ON DELETE SET NULL;

ALTER TABLE Avalia_Tag 
    ADD CONSTRAINT idTag
    FOREIGN KEY (idTag)
    REFERENCES TAG (id)
    ON DELETE SET NULL;

ALTER TABLE Favorita_Tag 
    ADD CONSTRAINT idUsu
    FOREIGN KEY (idUsu)
    REFERENCES USUARIO (id)
    ON DELETE SET NULL;

ALTER TABLE Favorita_Tag 
    ADD CONSTRAINT idTag
    FOREIGN KEY (idTag)
    REFERENCES TAG (id)
    ON DELETE SET NULL;

ALTER TABLE Relacionada 
    ADD CONSTRAINT idProd
    FOREIGN KEY (idProd)
    REFERENCES PRODUCAO (id)
    ON DELETE RESTRICT;

ALTER TABLE Relacionada 
    ADD CONSTRAINT idLista
    FOREIGN KEY (idLista)
    REFERENCES LISTA (id)
    ON DELETE SET NULL;
