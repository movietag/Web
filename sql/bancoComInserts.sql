-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Tempo de geração: 27/11/2024 às 23:23
-- Versão do servidor: 8.2.0
-- Versão do PHP: 8.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `moviedb`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `acessa_producao`
--

CREATE TABLE `acessa_producao` (
  `idUsu` int NOT NULL,
  `idProd` int NOT NULL,
  `dataHora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `acessa_producao`
--

INSERT INTO `acessa_producao` (`idUsu`, `idProd`, `dataHora`) VALUES
(1, 1, '2024-11-27 23:21:53'),
(1, 2, '2024-11-27 23:22:02'),
(1, 3, '2024-11-27 23:22:22'),
(2, 1, '2024-11-27 23:19:50');

-- --------------------------------------------------------

--
-- Estrutura para tabela `acessa_tag`
--

CREATE TABLE `acessa_tag` (
  `idUsu` int NOT NULL,
  `idTag` int NOT NULL,
  `dataHora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `avalia_producao`
--

CREATE TABLE `avalia_producao` (
  `idUsu` int NOT NULL,
  `idProd` int NOT NULL,
  `avaliacao` int NOT NULL
) ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `favorita_tag`
--

CREATE TABLE `favorita_tag` (
  `idUsu` int NOT NULL,
  `idTag` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `lista`
--

CREATE TABLE `lista` (
  `id` int NOT NULL,
  `nome` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idUsu` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `producao`
--

CREATE TABLE `producao` (
  `id` int NOT NULL,
  `idAPI` int NOT NULL,
  `nomeProd` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `producao`
--

INSERT INTO `producao` (`id`, `idAPI`, `nomeProd`) VALUES
(1, 912649, 'Venom: A Última Rodada'),
(2, 1184918, 'Robô Selvagem'),
(3, 558449, 'Gladiador 2');

-- --------------------------------------------------------

--
-- Estrutura para tabela `producao_lista`
--

CREATE TABLE `producao_lista` (
  `idProd` int NOT NULL,
  `idLista` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `producao_tag`
--

CREATE TABLE `producao_tag` (
  `idProd` int NOT NULL,
  `idTag` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `producao_tag`
--

INSERT INTO `producao_tag` (`idProd`, `idTag`) VALUES
(1, 1),
(1, 2),
(3, 2),
(1, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tag`
--

CREATE TABLE `tag` (
  `id` int NOT NULL,
  `nome` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idUsu` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `tag`
--

INSERT INTO `tag` (`id`, `nome`, `idUsu`) VALUES
(1, 'alien', 2),
(2, 'ação', 2),
(3, 'humor', 2),
(4, 'robô', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `usuario` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pathImg` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id`, `usuario`, `senha`, `email`, `pathImg`) VALUES
(1, 'guihocosta', '$2y$10$Us1rri3EfT3ItELUmkVLj.EgQNvZ2OwKimHWFkB9a.uWcdvBpwXcy', 'guiihocosta@gmail.com', NULL),
(2, 'luanotoni', '$2y$10$5bP0TxfF3mDe6am3FxmrXeMeWwEQns2w8dDVYELu/ZFR7HfQSkUH6', 'luanotoni@gmail.com', NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `acessa_producao`
--
ALTER TABLE `acessa_producao`
  ADD PRIMARY KEY (`idUsu`,`idProd`),
  ADD KEY `idProd` (`idProd`);

--
-- Índices de tabela `acessa_tag`
--
ALTER TABLE `acessa_tag`
  ADD PRIMARY KEY (`idUsu`,`idTag`),
  ADD KEY `idTag` (`idTag`);

--
-- Índices de tabela `avalia_producao`
--
ALTER TABLE `avalia_producao`
  ADD PRIMARY KEY (`idUsu`,`idProd`),
  ADD KEY `idProd` (`idProd`);

--
-- Índices de tabela `favorita_tag`
--
ALTER TABLE `favorita_tag`
  ADD PRIMARY KEY (`idUsu`,`idTag`),
  ADD KEY `idTag` (`idTag`);

--
-- Índices de tabela `lista`
--
ALTER TABLE `lista`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsu` (`idUsu`);

--
-- Índices de tabela `producao`
--
ALTER TABLE `producao`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `producao_lista`
--
ALTER TABLE `producao_lista`
  ADD PRIMARY KEY (`idProd`,`idLista`),
  ADD KEY `idLista` (`idLista`);

--
-- Índices de tabela `producao_tag`
--
ALTER TABLE `producao_tag`
  ADD PRIMARY KEY (`idProd`,`idTag`),
  ADD KEY `idTag` (`idTag`);

--
-- Índices de tabela `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsu` (`idUsu`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `lista`
--
ALTER TABLE `lista`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `producao`
--
ALTER TABLE `producao`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `acessa_producao`
--
ALTER TABLE `acessa_producao`
  ADD CONSTRAINT `acessa_producao_ibfk_1` FOREIGN KEY (`idUsu`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `acessa_producao_ibfk_2` FOREIGN KEY (`idProd`) REFERENCES `producao` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `acessa_tag`
--
ALTER TABLE `acessa_tag`
  ADD CONSTRAINT `acessa_tag_ibfk_1` FOREIGN KEY (`idUsu`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `acessa_tag_ibfk_2` FOREIGN KEY (`idTag`) REFERENCES `tag` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `avalia_producao`
--
ALTER TABLE `avalia_producao`
  ADD CONSTRAINT `avalia_producao_ibfk_1` FOREIGN KEY (`idUsu`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `avalia_producao_ibfk_2` FOREIGN KEY (`idProd`) REFERENCES `producao` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `favorita_tag`
--
ALTER TABLE `favorita_tag`
  ADD CONSTRAINT `favorita_tag_ibfk_1` FOREIGN KEY (`idUsu`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorita_tag_ibfk_2` FOREIGN KEY (`idTag`) REFERENCES `tag` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `lista`
--
ALTER TABLE `lista`
  ADD CONSTRAINT `lista_ibfk_1` FOREIGN KEY (`idUsu`) REFERENCES `usuario` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `producao_lista`
--
ALTER TABLE `producao_lista`
  ADD CONSTRAINT `producao_lista_ibfk_1` FOREIGN KEY (`idProd`) REFERENCES `producao` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `producao_lista_ibfk_2` FOREIGN KEY (`idLista`) REFERENCES `lista` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `producao_tag`
--
ALTER TABLE `producao_tag`
  ADD CONSTRAINT `producao_tag_ibfk_1` FOREIGN KEY (`idProd`) REFERENCES `producao` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `producao_tag_ibfk_2` FOREIGN KEY (`idTag`) REFERENCES `tag` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `tag`
--
ALTER TABLE `tag`
  ADD CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`idUsu`) REFERENCES `usuario` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;