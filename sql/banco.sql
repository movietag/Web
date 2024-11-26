-- --------------------------------------------------------
-- Tabela: USUARIO
-- --------------------------------------------------------
CREATE TABLE `USUARIO` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `usuario` VARCHAR(50) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `pathImg` longtext
  UNIQUE (`usuario`),
  UNIQUE (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabela: TAG
-- --------------------------------------------------------
CREATE TABLE `TAG` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(50) NOT NULL,
  `idUsu` INT(11),
  FOREIGN KEY (`idUsu`) REFERENCES `USUARIO`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabela: PRODUCAO
-- --------------------------------------------------------
CREATE TABLE `PRODUCAO` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `idAPI` INT(11) NOT NULL,
  `nomeProd` VARCHAR(255) NOT NULL -- Nome da produção (filme/série/documentário)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabela: LISTA
-- --------------------------------------------------------
CREATE TABLE `LISTA` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(50) NOT NULL,
  `idUsu` INT(11),
  FOREIGN KEY (`idUsu`) REFERENCES `USUARIO`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabela: PRODUCAO_TAG
-- --------------------------------------------------------
CREATE TABLE `PRODUCAO_TAG` (
  `idProd` INT(11),
  `idTag` INT(11),
  PRIMARY KEY (`idProd`, `idTag`),
  FOREIGN KEY (`idProd`) REFERENCES `PRODUCAO`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`idTag`) REFERENCES `TAG`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabela: PRODUCAO_LISTA
-- --------------------------------------------------------
CREATE TABLE `PRODUCAO_LISTA` (
  `idProd` INT(11),
  `idLista` INT(11),
  PRIMARY KEY (`idProd`, `idLista`),
  FOREIGN KEY (`idProd`) REFERENCES `PRODUCAO`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`idLista`) REFERENCES `LISTA`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabela: ACESSA_PRODUCAO
-- --------------------------------------------------------
CREATE TABLE `ACESSA_PRODUCAO` (
  `idUsu` INT(11),
  `idProd` INT(11),
  `dataHora` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsu`, `idProd`),
  FOREIGN KEY (`idUsu`) REFERENCES `USUARIO`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`idProd`) REFERENCES `PRODUCAO`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabela: ACESSA_TAG
-- --------------------------------------------------------
CREATE TABLE `ACESSA_TAG` (
  `idUsu` INT(11),
  `idTag` INT(11),
  `dataHora` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsu`, `idTag`),
  FOREIGN KEY (`idUsu`) REFERENCES `USUARIO`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`idTag`) REFERENCES `TAG`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabela: AVALIA_PRODUCAO
-- --------------------------------------------------------
CREATE TABLE `AVALIA_PRODUCAO` (
  `idUsu` INT(11),
  `idProd` INT(11),
  `avaliacao` INT(11) NOT NULL CHECK (avaliacao BETWEEN 0 AND 5),
  PRIMARY KEY (`idUsu`, `idProd`),
  FOREIGN KEY (`idUsu`) REFERENCES `USUARIO`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`idProd`) REFERENCES `PRODUCAO`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabela: FAVORITA_TAG
-- --------------------------------------------------------
CREATE TABLE `FAVORITA_TAG` (
  `idUsu` INT(11),
  `idTag` INT(11),
  PRIMARY KEY (`idUsu`, `idTag`),
  FOREIGN KEY (`idUsu`) REFERENCES `USUARIO`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`idTag`) REFERENCES `TAG`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
