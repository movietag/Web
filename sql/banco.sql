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
    idUsu INT,
    FOREIGN KEY (idUsu) REFERENCES USUARIO (id) ON DELETE CASCADE
);

CREATE TABLE LISTA (
    id INT PRIMARY KEY,
    nome VARCHAR(50),
    idUsu INT,
    FOREIGN KEY (idUsu) REFERENCES USUARIO (id) ON DELETE RESTRICT
);

CREATE TABLE AVALIA_PRODUCAO (
    idUsu INT,
    idProd INT,
    porcentagemAvaliacao DECIMAL(5, 2),
    PRIMARY KEY (idUsu, idProd),
    FOREIGN KEY (idUsu) REFERENCES USUARIO (id) ON DELETE RESTRICT,
    FOREIGN KEY (idProd) REFERENCES PRODUCAO (id) ON DELETE RESTRICT
);

CREATE TABLE ACESSA_PRODUCAO (
    idUsu INT,
    idProd INT,
    dataHora TIMESTAMP,
    PRIMARY KEY (idUsu, idProd),
    FOREIGN KEY (idUsu) REFERENCES USUARIO (id) ON DELETE RESTRICT,
    FOREIGN KEY (idProd) REFERENCES PRODUCAO (id) ON DELETE RESTRICT
);

CREATE TABLE ACESSA_TAG (
    idUsu INT,
    idTag INT,
    dataHora TIMESTAMP,
    PRIMARY KEY (idUsu, idTag),
    FOREIGN KEY (idUsu) REFERENCES USUARIO (id) ON DELETE RESTRICT,
    FOREIGN KEY (idTag) REFERENCES TAG (id) ON DELETE SET NULL
);

CREATE TABLE PRODUCAO_TAG (
    idProd INT,
    idTag INT,
    PRIMARY KEY (idProd, idTag),
    FOREIGN KEY (idProd) REFERENCES PRODUCAO (id) ON DELETE RESTRICT,
    FOREIGN KEY (idTag) REFERENCES TAG (id) ON DELETE SET NULL
);

CREATE TABLE FAVORITA_TAG (
    idUsu INT,
    idTag INT,
    PRIMARY KEY (idUsu, idTag),
    FOREIGN KEY (idUsu) REFERENCES USUARIO (id) ON DELETE SET NULL,
    FOREIGN KEY (idTag) REFERENCES TAG (id) ON DELETE SET NULL
);

CREATE TABLE PRODUCAO_LISTA (
    idProd INT,
    idLista INT,
    PRIMARY KEY (idProd, idLista),
    FOREIGN KEY (idProd) REFERENCES PRODUCAO (id) ON DELETE RESTRICT,
    FOREIGN KEY (idLista) REFERENCES LISTA (id) ON DELETE SET NULL
);