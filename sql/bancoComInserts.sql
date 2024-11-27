-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Tempo de geração: 27/11/2024 às 21:28
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
(1, 1, '2024-11-27 21:26:07'),
(1, 2, '2024-11-27 21:11:05'),
(1, 3, '2024-11-27 19:49:10'),
(1, 4, '2024-11-27 19:49:24'),
(1, 5, '2024-11-27 19:49:35'),
(2, 1, '2024-11-27 20:26:58'),
(2, 2, '2024-11-27 20:26:54');

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

--
-- Despejando dados para a tabela `avalia_producao`
--

INSERT INTO `avalia_producao` (`idUsu`, `idProd`, `avaliacao`) VALUES
(1, 1, 3);

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
(3, 558449, 'Gladiador 2'),
(4, 1118031, 'Apocalipse Z: O Princípio do Fim'),
(5, 402431, 'Wicked');

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
(1, 3),
(2, 3),
(1, 4);

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
(1, 'alien', 1),
(2, 'humor', 1),
(3, 'ação', 1),
(4, 'laboratório', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `usuario` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pathImg` longtext COLLATE utf8mb4_unicode_ci,
  `admin` boolean COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id`, `usuario`, `senha`, `email`, `pathImg`) VALUES
(1, 'guihocosta', '$2y$10$fb546QnnBf4OWKL96NCIIeVmbmSqTPseyDKhTQeQ6PnX1nbK2cAEK', 'guiihocosta@gmail.com', 'iVBORw0KGgoAAAANSUhEUgAAAWEAAAFhCAYAAACh/xvXAAAACXBIWXMAAAsTAAALEwEAmpwYAABMg0lEQVR4nO29d5xcV333/969u1qterEsW5bcu3GjuAAuwDUYDJhmWuCBGxIgTwgkQBIS8pDkSSD5hRbyEAihXGpCMTUYjLk2LhhjXHDDcpVcJEuyurTafnd/f3zO1YzGs7szuzNzzpk979frvmbL7MzZmTuf+z3f2jE+Po6PRFkyHzgIOARYYb5eCiwCFgDzgF5gbtntHKAb6Co7orKjo+LoNLfljJcdxfdjZbd52dfVjsl+l1e5b/njF+RAP7AVuAu4Po/TDXW9gE0kypIO9D4cBqwBjgRWo/epeI960OvfAYwCI8AwMGSO0YqjeA2K13cqJnr/JqK47wiwC8iA3+RxOlTj37eEKEs6gSXo9TzWHKuB5ebn89C5DHqthoFBcwxTej3Lz7Vqr2eEXpPitsvcFj8rP4qfFfeZ6rUv3scxDnzvh4EB9P73A31lxx5gJ3pv9phjL9CXx2k+6YvmOB2ui3CUJT3A0ehkW4U+xAcBK5EAL0Yf6B4ksN2UTojyE6T4ulJgyw+o/UNbTrkgj9f4s2q/m+q+5c9XfMB2A+uAXwLXA7fkcToyjf9h2kRZMgc4GTgOvUergCOQCC+kdEEsf4/KX//Ki1i1C1C112Eq6nkvi/uOIVF4BPjXPE6/V8djNIUoS1YDpwPHoNf0KHNbGBy9lAyMwpiAAy/4la9r5flWSeXnorPKzys/N+X3Kb+tpPx5Kw2TcnHOKV00RsqOIUrCvB3YgRFkc7sNeBhYl8fp8ARrcIYu2wuoJMqSJUhcjwCORx/uw4BDgWXoQ70QWbauMBMBnymrgJPMsRP4LTpRm0qUJYciUTgJCcTR6H1aZo55zV5Dk1kDXAe0XITNTuJ49PqeDpxmvj4UGSHzW70mhxlH4juArP0BJM6bgY1RlqxDF9THgCeALa4JsxMiHGXJYg4U3WPM7eno6h6YmFHgIeAa4EFkPTSFKEuWI7E9DYnvGcAz0Da4XdiHdhcPA3e08onN5+Ao4GzgHPQ6P72Va/CQDkqG2USsA+5D7+nDUZbcDTwObMzjtL/5S5wca+6IKEvmImt2JfA84DLgOWjLGpicHF31h4BbgU/mcXplM57IuIPmIiv3JcDrkfC2A2OUfJGDwCbgd8jP/j95nN7b7AVEWRKhXcPBQAy8BTi32c87y3kS+AXwfeAmdNEdtOX/t2IJmw/2y4FL0RV/BSV/YWBqHgZ+iKzf3yI3RMMxQaDnA68Dzkfvk0tuoJmyHbgBfSDvBDYif+IousC1giOB3wcuQbvB4GpoPgcBrwBehFwUNwLfj7LkyjxOW26VttQSjrLkCOBlwHPRNmsV4aSrhXFk8d4N3IKE93FgazOCcFGWrEDv03nAs4DDmXy75wvj6LW7HbgXCe8GlGWyO4/TsVYtJMqS04AXAy8ETkUXuIAddqML8C3oonxFHqebW/XkLRFhI77no+3ss9GHOjA5Q8jHew/wG3P7CIr4NsXvG2XJkWhn8iL0Ph2HnWBjI+kHHgDup/Q6rkP+wIFWLybKktOR2+3F6AK3stVrCEzKQ8gy/jFwYx6nm5r9hE0V4ShLlgFnAS8FXoks38DEjCPL7DEkGLcAN+dxuq6ZTxplySr0PsXIAvb9IjmKdgoPIKv3NuC2PE4fsbWgKEuOQb7el6OL3CJbawnUxEPAD4D/AX6bx+neZj1RU0TY+HyXoSDOXxKu9pMxjtJq+lFQ6AcoKPRwM5/UpEHNR4L7JuAd6D3zlVFK6Ul3odSyH+Vx+qStBUVZ0o3E9gTgnci3PsfWegLT4n7gn1EMpq8Z7r9mBeaeD7wH+X57m/Qc7cJO4NvAd5GfcieK1jebhcC7gP+FhNj3gNsDwH8DVyJ3Qz+teR0n4zTgz5BvfSUh8OwjxwL/CrwA+BSKzTSUhlrCJs/xHeiK/zTCVX8yrgeuBX4FrAU2taLSzaQGvg5ti5+NCmN8pQ/4KfBrczxk0/ItiLLkTOC1KOh2PKpqC/hNHwrqfimP0y838oEbJsLmxHsH+nAf2pAHbT/2IR9lhtKi1uZxuq1VTx5lydnAq9B7dGKrnrcJbEDBk2uQ+D5oI8hWSZQlJwAXUsosCX7f9mMt8BXgq40K2s1YhE3fgOcAfwy8uhGLakN2oTfvOiTA17QyHzHKkoNQMOgNKB/VVzYCN6MdxE+a7TevFVNJeDYqOHopykMNtC99wGeB/2hE0HxGIhxlSS/y+/4DOgkDB7IPVef8FPhMHqe/a+WTmwvkCuCNwF+hvgO+kaOTfh3y+X4hj9OmFKfUiwlAL0GBzT9F3cwCs4cvAX8PbJhJjvm0A3NRlnQhq+qvUbJ54ED6ga8CX0QBNxtBomcBH0Q7FV+LLR4CPoei0xuxH2wr53wUgH4+odx+NvImVHL+PlR5Ny2mZQkbAX458Heo0U406R/MLoaBy4ErkN/ysVaXQprg21tQWtRJ+CkQW1Ca2eXAnXmcbre8nv1EWXII8IfIv34i/meWBKZPHyrseH8epxun8wB1i7DJL3058CFCh6dKbgG+BVzZatdDgSk5/mN0lT7GxhpmSI4Cbl8BfpXH6XrL6zmAKEvORQHolxBKjQNiBJ2v/5jH6aP1/vF03BHPR7mPQYBLPIai9N/I4/RHthYRZckpyP/7HvzsyfEgcBXw7TxOr7e9mHKiLFmK3A/vBC62vJyAW3QDfwBsjbLkU3mcbqnnj+uyhKMsORn4GKp7D8jv+xjwH8B/2kqTMgG4U5Fv6g021jBD9qHA20fzOP2a7cWUY1pNLkd5v39JCL4FJmYP8I/Av9fTp7hmS9j4gd8PXFT/2tqSfuSv/ASq1hq0uJZzgX8CnmlxDdNlCPga8BnUeNs11gAfRobHYstrCbjNQhSL2Qj8V61/VJMlbPzAHwD+hFCIARKLz6DmHo/a6EFaEGXJS5EF/FwcmZRSB/ejXcT3sRDAnIooSy5Ar+3zCFVvgdoYRfUA7wPuriV1bcoPrdmOnYeiwUGA4Wrg86jnaJ/NhURZUvjnL7S5jmlyA/BvwFV5nO6xvZhKoiy5FL22F9heS8ArulBK6J+h3ixTakQtltPTkKofNaOl+c9WVHTx+TxOf2lzIebCeCHwN/gnwEOoZPtjeZxebXsxlURZshBVF36A9hnjFGgtc4HXANdEWfLdPE73TXbnSd0RUZYsQn7g/9PQJfpFjnJWvwH8/VQvaLMxVVpnIz/lc22upU7GUYe464E/z+P0IcvrOQDjcjsIFSB9mND7OjAzxlG2zzuA6ydzS3RO8UAXEPpBPAr8X3Qhsj6ZFQnwR/BvGOQulEv5dpQJ4RqLUVvP/4ffneUCbtCB2mBewhT91Cd0R0RZchgahnd8I1fmGb8GPooa7liZxFqOGY3zLlSO7FOV4jbU8ORzeZxutb2YSsyO74+B/00IwAUaRyfwe2iW4dcnu9NEvACNu/Et4t4ofoFy/n6Yx+kuy2shypIlqFDgxfjVp3kPyoD43HTLOpuJeV3/BL22wQURaDSHApdGWXLsRHd4isCaMeeLaY9ZY9NhAFVtfTKP0+tsLwb2z+p7O2qV6JOltgf4AvDZPE6n3eCkWZRd2P6EMIIr0DzOQ16Fj1X7ZTVLeA6yts5q3pqcpR/4GfABhwR4IXAp6oa23PJy6mE7Gtv0EUcF+CBUXfhBggAHmstK4KIoS5aZAPABVBPhuWhA52wMTvwUdYZ7wPI6yjkNBQV9mtW3DxWy/AWww/JanoIZwPkS4F/ws8dGwD9OQbUW8yp/Uc3feyRwBn75HRvBD4FPAvfMpEFzI4mypOgHcSSKtvrClcCHXWm+XoVXooutT66dgN8cgqaufAEZKfs5wBI2W7SXM/vGs1yHekD8Ko/T3PZiYH9TnkuRa8gnAb4B+IRrecAFUZZciKZgzPbio0BriVDv9bNMrv9+Ki3hE5CfbLZYwaPATcD/da11Irpqvha/GoY/AHw6j9Nf2V5INaIsOQ14L/7lWAfag0XA29C0mAeLH+63hE2XtNPQpACfclCnyxhwB/DxPE6vsbyWAzA7knfhz9iocbTF+iRgrZ/yRERZ0mkyTP4W+YIDARt0od3taSYLDTjQHXEofo9Br5ctaP7bj20vpBzjhvjfaCyRLwygUUQ/y+PUZkvPiViK0tDOZ3YYGAF36UI9SZaX/6DgUFRmN1v4HPAtV3zAsD9qfxYaTeTT6Jy1KNPgMdsLmYCzUEWcTyl+zWQHsBtdPIeRWy5HO5pOdKHqQm7J+egi5uugWBc5ATgMNQU7QISPx8+m4NPhK8DXHIzeL0NpLMcwdV8PV9iIJgncY3sh1Yiy5BkoVc6ni1ojGEHFMhuAR8ztZlRCvgPlxA8j8R0zBygI3IGEOEJCvAC9fgejnNfVKGNnFRJnnwLHLnAu2uneAUaEjQV2KnqR25kx1MXrk3mcOtVEJsqSXkqVNb6c1HtQQ/Zv215INczQ0zfjX7vP6dCPxq4/ao5NSGwfRUGgR/M43T2TJzCFBgcjAT4WTR1Zjqy6w4EjzNe+nL+2OBQ4I8qS7+VxOlRYwqtp/0Y9Odo2fxiwMgl5Ck5AXbwW2V5IHdwIfNV2e89qGN/6K1HKZTsyDuxFTcO3oiYxNwDXNis90Ew+2WKOm4ufmyDT6Wj02fnAcaj1wUKqFCcEAKWrHQncX4jwSegK1s5sQm6IX7jkBy7jLNT2zhfGUYn3bbYXUomx2E5Hk6ePtLuaprER+C7KRlmHzu9RSm6FlpHH6ViUJXcCd6NWoEehCrHLUIN8nwyLVnEYEuL9InwIsMTaclrDtUDqogBHWXIEatDuix8Y4FtoNJET1YXl5HE6HmXJH6ALWzttjcdQd7/rgAxYD+zI43TY6qqQEKP1jUZZsha5QX4DpKgZ2LPRhTEglmDcv4UIL6O9o5+/QQK83fZCJuBV+DXFehj4DmUJ565g3BDPRa+nT/02JmMQ+DnwExTMedjFvswFxm2xzxyPRllyP7KOz0J52j5NhGkWSylEuMzZ3q7jvHeifOBrLa+jKqZL2gvxp2HSMHA58Os8TkdtL6YKq1E2xGrbC2kA24FbkP/1R3mc3m55PdPCBMHXAVdHWXILqgY9F1nGPZP9bRuzADg8ypI5Xchxvor2sRrKyZHP7GoXt81mYOcL8MdvOYbSnT6G0p2cwljBz0F+SJ/pQ9v5K1AzfKcyeWZCHqcZkEVZch7wR8A5SH9mmxh3oYySg7tQikk7pqaNAY+jrkWunsS9KIXKl2YyfWhHcb+LFzU0GfwNthcxQ0aQq+eTwL1YCLS1iBtRUPfZwF8Dz7O7HCssBQ7rQh3T2jF62YeyIdYaH5VTGKvtLHP4YgVsRjsL6/P2JuC5aDitr6xFo6B+AGxw9ELXEMz/1h9lyQ3An6H0zN+n/RMEyunFiPAK/OrUVSv3A19DPmEXWYLaVPpSSjsC/ArlojonDlGWHI+KMnzMSy387P8N3DDTogqfMAN074yy5FPI8v99ZB3PBuYBhxeWcLu1rnwU+Hwepw/bXsgkrEQBuW7bC6mRh4Er8jjdY3shE/AS5F/0jYeQAH85j9P7bS/GFnmcPgZ8McqSx1HvlJfgj4EyXXqB1V3IIvNFCGohB65GGRFOYsrET0LJ2r5Ms77JHM4RZclqFIw71PZa6mAEGQv/ksfp520vxhXyOL0qypKbkevrLbRnvKqgB1jRiVIlfBGCWtgM3OK4P+0oZAX79Lrf6eLIesPvoaCcL+Souuw9OGws2MK4Y/4W+AgOzihsIHOA5Z1IjX2q1JqKK9G8OJc5BtXY+8L1OFieXMY5+GUF3wR8AJXQu2wsWCOP0wHg68CHUEl2O9IFLOoyX7SLCD8JZHmcuv6mHYU/aWmgaP2dthdRiZkGczJy7fjSrD1DQ0ZvCgI8OXmcbo+y5Buo8u6vUWOgdqILWNBOAgwq7bzF9iImI8qSJfjjCx5HqX6/yeN0r+3FVGERatLjgxWcA1ehcVo32l6ML+Rxugv4cpQl48D78cvtNBURMK8TibDvTU7GUT/VH6Jgh8uci3KDfWAE9SrYZnkdE3Eo8GrcH10/AvwSDZS92vZifCSP06+gApYNttfSQDqAnnYQYFCDk2tRQM7FfgblnIva/PnAAMo0cTXX+ghU8u3ybq7oY/3PlPXgDUyLrwAfRX2U24U5hQj7LsR7gf9CPmEnibKkw6SmnYw/BQU7UaDTue5zUZYsRb5g1906W1GU/zoXKzd9wrShvRz4FNr9tgPdhTvCdzYjS3jA8jomowN19lppeyE1MowmkNznYg9mZAG73qhnBwrC/cRE+wMzJI/TJ4AvISF2fddbC1E7uCP2ohSqzY5bGh3IFeFL8vlelMvqqnichNsVcrtQ2fwXHQ1qeksep+uBT6DJLoOWlzNj2sEKvhf4pqPWWjk9QIza9vnALuA+24uoRpQlc4HTcHcQwSgSiE95EKPwkjxOH0dCfIflpcyYdsiOuB81lnGdZcCZuB/JL9gK3IoCS65xCvKtu8oDwLeMxRZoEnmcXgP8GGVGeYvvIjwIrHPcDVGMsz8DP/JZC9YBDzq6w1iNu5MzxtBctatsL2SW8GXgm7YXMRN8d0esRdaa6yxC/sv5thdSI1uBO1wYIDkBK3F3Ovh3gB/mcbrP9kJmA6afyXeQW9JLfM+O+CWOV8gZeoET8ae09hGUGeEqR6CpBC4xDjyGmrK7OsmlXbkZ+DzuDhuYlKJs2Ud3xBBwax6nzuYGlzEPCYfrOa0FTwJOdkwzrp3jcK/96g7gG8DNLrhwoixZjOIPcylNbulHn5sdppl6PY8XobhGLzqfO1Ea4zAqbd9pyy2Yx+nOKEsuRymLz8OfSTWAP6JQjftxVCiqsAJ1TnNNOCZiN+62EDwRvZ6u8Tvg/+GANRZlyaHAK4CzgWPR4IYRVPL7MPCdKEtuzuO0pvQu0yjpJOAy4FSUo92Link2Ikv0u1GWrLcYn9kG/JtZn6uuqqp04W/F3DocrOSqxKRTHQ8str2WOtiAu+0DT8A9Ed6FMnSs56pHWXIm8BfA85HFOgd9zseRIJ+LRs5/NsqSz0yVw2xmIV6G5sAdicR3DrKEc5QqeIE5/g1LAck8TgejLLkJuAcFwL1xs/rsE74F95v1AByCTlRfXud+lHHian7rybgnwjcBqQMCfDrwPmQFH4zcEYVgRsg1sRi5xt4FvDfKkqnOy7cCHwSegcYNzaPkxuw23x8EXAy8P8qSFzbyf6oH03HtMzia3z4RvvqD+5DvzdXGMuUcDpxuexF18AhuX9wOw63p4HuBa/I4fcDWAqIs6YyyZDnwduBV1Da4dzXwNuCSKEuqakCUJWcBf4hcEVMuA7gIeE+UJUcbH7INfgr8xtJzTwsfRXgENRj3JQJd+IN9YS3qxeEcRiwW4tZg2tuAX1tewxwUkHo5chfUyirg3SjgdgDGDfF26u/fewFwKZYulHmcjqD3w4eAPVDapviyVQZtl29C3fZ9YD5++YPXAVtsL2ICetAW25XzdRy4DrjL8jrmAOdRf3e+CLnKTjPBN/1QVuwa4JnUZlVXci52S8qvQw29vMCVk7keBpD14Uup4kL8aV0JsB53rYi5uFP2PYZcNzdiv79tJ/LLTic1qwdlFJSLZhcKwk3nvO1C/mibmUAPIyEesbiGmvHRHTGMXmRXu3vtx2yfD8af13gY2OhCnmsl5rVcCiyxvJSCHH3QH7QdkDPMZXpGVQcS8HIXTycS5en4dTsp5RFbwbgk7gMetLWGevAxO2IvSgVyTiiqsBR/uqaNo9fW1WBnYWG5Uvo9jra8ruwacqbX6LwD5YSXl6iPIXffdIyH8YrHssV64Abbi6iFQoB9sdTGUA6rq0JRyREoRc0HxpAIu7rD6EI9I1woeBlDwcu78jh1wS02BjzO9ApF9qBAd3mMJUeulukU7OQzWEsj2YD6jLtwQZgU36zg3Wib4apQVOLTJI3CEnbVj1aIsAtVnv3oA/647YUYhpFvut6A6igS4DvLmzXlcTqax+mDqDlWvWK6FwXOrfrJjUviDtRW1Oldc5Ed4YslvB11S3LBB1cLh+BeYcFEjKEdhssivAI3RHgn8HPcCQ4PoUq1G6jv/XsM+CwTC2YK/LbOtdyFpp7vrvPvmsEOIMPxTKqibNkXdqIafV9EeAUKevhAjvoAuDouJkKvpQsivBkF5Zx4rUxgsC/Kkk+gc+4VNfzZLjSr7RpjNVbjduCLqEBmTQ2P+Vvgn/I4daXYZzfasbwBtwp8DsC37IitwAOORKNrwaVA0lSMIsvIVVdPFwp0uiDCm4DH8jgds72QcvI4vQ/4GPBtFJiqxjCqKPso8NXJfNpGnL8P/BMKQk5k3W4GrgA+bKZduMIgypBw9ZwG/Gtl+WQep1ttL6IWTE2+T+lpOfAEjlh3VYhQ0YvtnswjKI3PSUMgj9MboyxZi6y/GDXtmYvcTUUQ7lt5nP68xsfbjpr9/AZ4HfActCOJ0GuxGbgGCborFjCgHUKUJdtQh7UjLS9nQnx0RziPyWldhF+VckXE39VosisivAN3AnJVyeN0B/DvUZZ8CZXMr0QX1w3TFco8Tm8DbjNtMo9ERTO7gPV5nG5rxLqbxE5UV3AabpW778eFrV2tjOK4g72MDlRU4FOlXI5OWFdFuBO5dmxn9GxCvaydJ4/TgShLiqKFcfQZmimbUYC8E8gn8Se7wigK5l+Ao+miXfiTHTGIO9HoWliEo1feCRhClo2rLSy7sFyJZXgSj1olmpakDXtPjRvG1Qt1NcaRCG/HURH2yR+8G0/cEYZe/Npp7AN2u+rrREUaPbghwk75PgNT8gAOa4dPIrEVd7t7VdKBBMO2/7Ie9qE+za4yBwWYbBsNm12fpBxlSTdqTzkXXby6zG032vGMoqDaALA3j9MJ3/coS+ajXV2PeZwimD9e9jij5nFcyA2upBjAGkS4AWzDnTr9WvBNhPfibmYE6Fy17d4ZwVFDwASDI7QDewYaenkEmoaxhJJ7bAgFF7ehNLZboyy5Af1fI0i0ip4yB6NsiHNRrvBS1NhnrrlvsTvdAfw2ypLrUBAsB8Zc2FWZNeyKssRpEfbFJ7wLd4dPVtJBaayMDxRBT1f9waDz1PZFbTdK83KR5Sj49FoknAsofb6LnuEdSGRzc4wAr0fulZ8B30E9I05FM+pegrIrCtdaeYXtOMqoKR7rVSho+XNUvfdz3CqqcnaX59Ogz91IiH2hOGl9oBBhp4oPKnCh498+HEv8N/noLwZ+H02iPoap+woXF7NeZCEfgtLOLkQ7ooNR35ND61jKQpQ/fBjwAuCVUZZ8wubYpwqcet/K8ckdsRs36tFrxaeJJWMo4u2S5VKJCyI8hP3uYPuJsmQeGrD558A5M3y4lTSm2dQyc5wOzI+y5FN5nN7agMedKUPIYre9m3oKtk/qetiDw1ezKvhUCDOGu417ClzYsQ3j1ut0NpquPJUA58jC3cPM0stGkEtwE0r5muq1eBPw7ihLlszgORvFCI52U/PJEt7jgqO/DnzxtYNE2GV/MLjxWo7hiMvGuCFeATx7krsV4rsWFWyMoSEDZ1Dqw1HL61r0mr4DjRZ7ArkwzkZBwMmC0GcDL4my5JuWe20U/mvnKFJOXDjBJ2Mcf6rlClzYPtdKEawJTM4Y7rhsTgWOn+I+NwH/jjq+FRZwF/Ib/yEKytUyyPMB4J9RsG0AXbCLMvILgfeisuBqrEFBvm9j9wLmzAW0El8s4UH8E2GfLOEi59MVgQlMzflMPI5+CI19/yBwex6nlW68LVGWbEXpZH+DMnkmOld/A3wc+EmVfOJdUZZcjizjf0BWbyW9wLOANVGWPOLZbrYl+GKp9eOXPxj8eW0LnLQSynDhw+uCX7rgdCaeX7gB+EIepzdWEWAAzOSM76CuapO991cAl09U0JHH6T7Tke1qJnZprQROYXrToBuJK+/dAfgiFAO4FRCpBZ9KwoucT5dxwRXgRMZLlCURat4+0Vo2A9cZv/FkDKNG7BO5onLUJa2Wc+NRJp7Q0QkcjaxiWzjx3lXDF6Eo0kt8wiWraSrGsS9wU+HChaIofrCGqYybz9S+3FoDbpOl3I1S+2DVYSYuiOhEVXs2X7tuy88/Ib7MmCuqcnyhA38ucL7gQmClG/ul01BbIVAjrL56DInJAtGdTO53bgVFDw3ncNI8r0KO+5ZaJT5knRT4YLUXZbY2KRri2KaR75dvn6vpYvsiMCG+iPAo9q2gegmWcGMZwX4f28WoPNc2Plw0XcPZWY8+ibBP7gjw57X1hUKEbVpuC7A/PTu4uuokypI5qDjFSYo30/U31Ed3hE/FGuD+WkexL8IAh5rgmE0a+Zl1/X2fEea9WoX6WTiJL4E5F9KT6sWnk9sH62oURfJtu6UOQl3GbNIoES7e93amA1XtueBGqoovb4CPIuzDDqOgA0cjx2WMocpJ2+fBCpTzOhvwIXVxKjpQi0+n3RE+4EJ6Ur34IsDgh0U0hop2bJ8Hq5i4T4JLNOL8axcRPh37u5cJcf2DV2D7g9fuFG4plxlD5eu2A7QrgRMsr2EqfNqFNZt5wMmoeb2T+BI8aocrsst04Eb+62QU7RRtX5AXAAc7EJwL1MZKNO3DWXzJjgg0Fx8CtGOok55tSxi0tbXZB6FRxlMjS8Gd05EoS7pQINXmezUlPljBvuJTMLET+x2upmIM9SawbQmD/MJPM/mnNnC1Ys4pEUYFGqcTRHjW4oJY1Eohwq59iMrJ0YxBFyzhQ4BLsHfhauT7NNl5Wo/Yz8GNvhrlLEbv0wLbC5mMIMLNwxcrGOSKmIvbaWouifBiNGBzhaXnb5Q7Yqqso3qyZgaZvCNbS/PQTRvPo4HzqG16iDV8Ccy5bKFNhE/BxE60ZXPNkilnDA2qdGGH0QWcBJxoevu2kg500ZzseWv9vBQTVSaiHuF8CLiH6u9PseZWshjN31vc4uetG18Ccz6ssRLfSq3n4XaGRJEd4YIlDLpgnYadctgu9H5NxFxqD7QWbSYnep5axfNmIEUN5StZgNbbSoPvSKqPW3IOl7ef5fgowj4F5kCWsMvBuVHkjnBlKnQXcBHwQ2BrC5933DzfZ9B2u/KiFCGrdBtTn387gR+hHUZ3lfsPAjfWsqg8ToejLPkp8CSqUCsuTuPmcW5n4skbzeAw4NwWPt+08UWEXe9rUA3fqvx6mNy6sk3hjnDFEu4EzgLOirLkoTxOW9LrOI/TsShLdgP/hS6c1UR4AOibaixRHqf7oiy5CbgL/T+VIjyCBLTWte0Gromy5BeUWkcWbrnhKmttClGWLEOuCFs++7rwpfG46zms1XBFLGqlB1gQZUlnjTPFWk2RouaKJdyBttkXA78CHmzVE5uJxXvMMdPHKnYYDcOsb6JRR63gXODFFp+/LnyxMH1zRxRJ8D65I7qR9eLq7qgo1qjZMmsRz0IWccABTFbEeSg/2At8Ccz5ksVRjm8i3Enrgyc1Y6yrftwT4SOBZ9peRGA/RYMl1zVtP05+4Krgi9ukHN9EuAP1XHXVEgbloU6Wi2qDCLgoypLLbC8kAMA78SQrosAnEXa9y1clvolwJ8qpdFmEi8burnEicJmFnOGAIcqSjihLjgJegcNTNKrhiwhH+LPWAt/yhDtR42uXc4Vz7A/7rEaEXBIvsthPYrazDHgzcLjthdSLL8IW3BHNpwNZwi6LcDFnzkVWA38BHBnaXLYW0y3t6cA7cLxPRDV8EeFu/HNH+GgJL8Lh19mkUw3hZvpfNxKCi/GgVLbNOA54K2qs5N0F0BcR7sFtX2U1fBRh1y1haGHS/zRYCLwHj9Kj2oQLULc0X/TsAHzJE56L281lKhnHTxFehvsiPILblYhHA0mUJUfaXshsIMqS84EEj3cfvuTf9uB2X4Nq5LgtFpUES7hxvAp4c5Qlzs41aweiLFmF/MBeF8v4IMAgK9jpnqBVGMUvS7gD9SJw1ids6EfWsMssBF4PXBLS1ppDlCW9wNuB2PZaZoovItyJnyLskyVcDPt0/Zzow81c4UpOAN4NHG1KaQMNIsqSbuBC4E1ohpzX+HRyOD0nqgqu+y6rMQf3z4k9+CHCEfAM4KMofS3QOM4D/j/gKNw/X6fEp39gvmcWxQju+y4r6cF9n7AvIgx6LV8GvDfKkkNtL6YdiLLkHOCvgFPxS78mxKd/Yh5+ZUgM45cl3EEQ4WbQiYJH74yyZKXtxfhMlCUnA39GG/iBy/FJhHvxxy/c0ibWDaLwCbt+oduLXyIMOm//FHhbyJionyhLOqMsOQRZwK+1vZ5G45MIz8Uvv/Ag/lnCc3C/KMaH7IhqLESBuvfaXoiHHAx8HHi17YU0A1/6CYPcEb7UhY+jETO+iUUP7u82fHxdQZ+xlcDvR1ny4ShL5k/1BwGIsuQE4NPIt+6TEVYzvlTMgQR4oe1F1IGLUyCmIgIWOd6AZh9+inDBGuQj/mCUJUfbXozLRFnybODvkQXs02e/LnzqTrYAfyxhkFjss72IaVD0FHZV6Hy1hMtZDrwPWBplyX8Cdzo6188KphDjQuS+udjuapqP6/6/cubhydXQjOIZibLE5rDD6bIAbftcFbph3Bn2ORPmoCkQhwIfj7Lk1jxOByyvySomBXUB8ELg/6AxRW2PT4G5+ZTGaPtCv+0FTIOFuO1787EIZjJeAnwGeFloCM/BKHD5SeAUy2tpGT6J8CL865S0F/+stiVo1+Eqo/iV+jcV3Uhw/gH4tyhLTrS8HitEWXIRkAJ/hCoMZ03PDZ/cEfPxyycM6nMwgCduFMNS3N5x+NadrhY6gOPRaJ6VUZZcDmR5nG6xu6zmY7IfLgEuA86xvBwr+CTCPraz7EPBOZ9EeAlui/AY7SfCBXPRoMozgacZMV6fx+kOq6tqAlGWrEalx5eZwzcDq2H4JMJduF9SW8lu5JI4xPZC6mAJbrsjxmlfES44AvgAmhhxeZQlVwAb8jj1MdtmPyb1cREaR/Q6c6yxuigH8Mkn3I1/lvBe/EtTW4z7IuxTn+aZcBbwYeDrwOuiLHG9kGYqVgB/AnzT3B5mdzlu0IU/BRsR7ldzVbIHP0XY5eyIDvwyHmZCZI6nA38LXBZlyS+B/8nj9C6rK6sRY/1eDFyELirHosrBgMGnYg3wzxLehaxhn1iM2z7hTmZR5NzQiYJ2hyN/8QVRltwI3Av8Lo/Te20urpIoSxagjI+T0NDT5wAn4/Z5ZQ2ffMIA86Is6TDFED6wC1nDPuF6UUyxe5utrERW5UXAA8CtUZbcDNwBbELn3O48TodbtSDTB2MhmnJxOLJ4n4kuGKtatQ5f8U2EF6BKI19aGRaBOZ8oBn66Shf+nbfN4nhzvBEJ8s3AWuDBKEvuB7aiz8oQKnIZnYkBYyrautBnsAddsNegQNvRwBnI6l0+3eeYjfh2Mi8EFkdZstUTa7gPP6vmXE4X8mEOng2OReN+xpDgbkHCfDeyku8DNkZZshsYqadXhRHfXmTprkauhTOBp5nnXYJcRLPRVTRjfBPhXlRMsNX2QmpkAFnDvrEoypJeR3sZ9BA+6NXopHRx6kEX0tXINbAXGQR70Pm4L8qSfsosZA7MOCkCguUW70IktkUjrYXm1jcNcQ7fXsBelObyIB6kKeVxOm4sD9+Yh4IoLoqwb2OubFIUOFVzD4xTKgEfo/R5KvqLF1atbxrhHb69wPNRkw+f6EcnuG9ZKPOBbbYXUoWF+Jcl4yLFOCvfCqDaDt98a734J8LFls8nXJ6wsQR31xYI1I2PInwQflmVg/iTzVHg8sDPRbi7tkCgbnwT4fnIJ+wTo/hnCRdpSC6yBLcr+gKBuvBNhOchEfZp3cO4GeCajCIq7iIrcTuFLhCoC5/EDLRNXoG7AlENH9PUXBbhFbjdYCgQqAvfRBiUJ+yTJdSHm1kGkzEHd4NfRdVkINAW+CjCc3FXIKrRD/jWlLtI0HcKU7k1F/9SKwOBCfFRhOdgGvnYXkiN+GgJu9rEpwsFZ0PFXKBt8FaE8eeDuAd40vYi6qToiuUa81B2RCDQNvgowhESCV/Wvhf/LOFeHOv9alwRB6OYQCDQNvgiZOUUrRZ9sYQHgZ22F1Enc3FMhNEO6CjctNADgWnjowh3oVxRLyLkeZzmqNH2qOWl1MMc3CuI6AFOwN3UuUBgWvgqwqvwq/HILvyaNRfhXnZEDxqZ49rFIRCYET6m+nSjPqk+WUR7gO0ox9UHN0oH7ondQjSvzLWLQ8Bv+oHfIJfh6Wg8U0t10UdLuBBhL9wRhgGUK1zzNAMH6HUsDXA5cAx+Gg4B9xhB4vsvwN+b45/QNJKW4uMJ7ZVP2JCjfGHnG9GXMReYE2XJsO1RUuZicDAhPS0wc0ZQyuhNwKfzOL2u7Hd3RllyHhrf1DJ8FOEItbP0qXR5DPmEfbKEi9Lllk3tnYRioooPrpyA29wFfAz4MdXjNFtp8RAGH0W4A21NfcoXzSlN2PCFoqdwB/bXvRwF5QKB6bIZ+ALwLeCRPE77JrjfPtT/u2WtEXwUYTCWUZQlkUkBc53CHeGbJeyKy+cw4AL8auYfcINdwC+A7wFZHqebp7j/MHJZBBGegg7gEFRQsMfyWmohxz93RDFt1wWOR+PVA4Fa2Qn8FvgpcFUep3fV+HejtDin31cRBonwIvwQ4VHUU9gnEe6g5I6wRpQlRWqaT53zAnYoCqM2AlcD38jj9LY6H6OYQN0yulCamo/bvEPwp4R1GEVkfRLhTty4SJ9KsIIDU5Oj9LL/NsfD08zqsWIJ+yjAoP4RvlhHIyjq6oP/usCVi/Ma4Ejbiwg4y+PAj4BrkQg/AWyfQVply4PQLlg602Uh/lTNDaOKOZ9EuAM3zo+TkRAHAiB3w++Ax4AHgduBu1HGg087zf248CGbLj6NuRlFFXM+Tl22RpQlq4Gn414JdaB19KFd5CbgIeAO4B4kwg/ncepTY6yq+CzC3ljCeZyORVmyE7+a+HSUHba4BL/zg/OKowj6jJUd42W31bbCHWW3nVVuy4+o4rY4XGYMGSfDqO3rEPqcbEV9uJ8A7kUW7215nDa7eKh47VqGzyLsk08YdEX3IZOjHNtFGs9FDVV8YQyJSSEkO82xC+2EdqIsmT7UT6Tf3Ba5qSNIpIvXvQiORqh4podSJWMvpeb7xbEAGScLUaOjeebn88zfRRWHDb//OLoYDSHR3YGEdh1wP3IxPIQyHHZbqAMoXu+WPqGvLEcpar7QTylNzXXrxCqmV8Qq4ETcLFXei7bDjyLReBRZbYWw7kNC24fEptwKrrSEy63gWi3halZwNUu4m9Jg3B7zfRclMe82R7nIz0Ni3lv2t3MpVVB28VQLe9z8X8NlR7859qLzvqhEK363zxy7zPfllvCQxSKsIMJ10IN6SPjCCDoZR/HHlz2RMDSb+cBrsG8FDyGLbAdKMXwEWWyPokDrbvO7XUhIRn0JDplxUZUCXohxIbZdlES60nout6CL86Tc9VJY9kPmGMFciBz34xavRcvowv6WcyYcHGVJdx6nPgS8xtF2dAg/RHgMe9NADgXeSuv7g/QjX+RG4GG0PX6cMhHO49S3oa1VMRcLLy4YLaa4+LT0CX0W4eWoveFWy+uole1IhH0oMil8dy0lypJu4BnAGS14umFkze4ENiBf5L3ArcDteZwOtGANAbfowZII+yrES4Bl+CHC5ZawDxRR61ZzDPASmtdOsDjXdwN3AleiEtff5XHa34TnC/iFFRH2mWXIGvaBceQ79E2EW32Bfg7wCpojwPuAzBx3It/uXqDPE5dWoPn00OKMkXYQYV+Cc75ZwqO0uKF7lCUnAS+lse6aMeA2lOR/Laq2Wp/HqW/pgoHWML/VT+i7CC/HHxEGv0S4SBlqJRcD5zXosbaictYbgV8Dd+dx+niDHjvQZpi0yLlYGKHluwgvxp+5Y4Ul7MK4oFoocl5b4o6IsuQ4JMIzcS+NoAkK9yHhvbyOPrKB2U0HGh6wrNVP7LsI9+BP1dw4EjVffI+DwGArhnwaK+RdwLOn+RBFcPl24PNIfHc3aHmB2UEHcAQWMpd8F+GihNMXhvEnN3NfiwQ4Ak4Dzmf6w1t/BnwbuR425XG6t0HLC8weOtAElyWtfmLfRTjCLxG2kW0wHcZQ1kArWAL8JSpRrodxJLpXIRG+O+T1BmZABxoe0PJsK99FuAPVuvvCMPaq0OphiBY0G4qyZC7qlPZKaq8izFG2QwZcA9zQgs5agfZnAerYN93d2LTxXYQB5kdZ0ulBzf44pXp612l6x7coS7pQTvAfUZsAD6CqtluANI/TrInLC8wiTExiBRoe0PLmWu0gwotRbp8PfsCWDxGcJntQJkczORpIgHOmuN8YEuBrgI8CNzneACbgH12oX4mV4QHt0FJxHrDIXM1cxxdLeA9qWtNMLgMureF+PwV+D3gncHMQ4EATmI8GyloZEtEOlvA8lNv3hO2F1EDRzs919tFEd0SUJa9BwjqZ/+0u4HtoiONdFvvLBtqfpShH3Up8qV1E+GDbi6iRUfywhAeQX7ihmB62TwPeA5w0wd0eA34B/BC4Ko9Tn0ZCBTzD7KBPQPGJYAlPEy9E2OTcjkdZ4kMkf5AGz8MzAnwM8DfAWVXusge1kfwm8JU8Tnc18vkDgQlYApyNxcrbdhDhXrSd6MCPHNxW92OYDv003hLuRQUZr6b6aJzvAR/N4/TeBj9vIDAZRwCn21xAO4jwXPxpZwna6rtOP2q72Ug60HavMhi8Dvg35PsNDXYCreY04IU2F9AOItyLX53UBpFv2OXXfguND8wNogq371JyR1wL/DdKO9vV4OcLBCbFtE69BAvtK8vpwp9eBhNRuCN8YRBVzrkqwiPA443ORsjjdDTKkruAjyDrA5RytraRzxMI1MFLgOfZXoTv441A02CXmFsfevUWIuxqufUmczQcE5y83RyBgDWiLFmF3BArbK+lHYo1OoBFuCtqlQzhdk/h9cA224sIBJpFlCU9wPuBZ9peC7SHCIOCcz6MkQf3RXgdGu8eCLQdJlXyGcDLcGQgRLuIsE/N3V0X4fuBjbYXEQg0iacBHwKOwhH9c2IRDaAb6PGkf4TLIjwKrMvjtOHVcoGAbaIsOQr4U+BFqBe5E7STCM+hxaOqp8kwbpYuj6NOdFtsLyQQaDRRlhyC2qa+1fJSnoKraVL10oVcEj6IsKvtLMdQ57RgBQfaBrM7noP6lbwHBzWiXSzhTvRC+/D/uNpJLUdWsA9pfoFArfQgH/CbcTR43y6WcAdySTh3lavCKG6K8AhqH9n0sUaBQCuIsuRU4A+A1wCrLC9nQtpFhDtRdoQPlvAoblYpjgC/ovkTNQKBpmJmF74YeAvqE2ylRWWttJMIL8QPER7DTRHeDtwWMiMCvmLmFh4FvAD4Y5SO5jztJsLOpJ1MQo57gblR4D40SDMQ8Aojvr2oJ8lf41gK2lQUvSN8xycRdrFXRx/wKG76qgOBqXgu8EbUjGc1fujAftqhgQ/o/1iEZy++Q+wFHsA9C50oS3rRLLq5KPjahaLcXej9Lm4jFJid6BwYo3SuF2mCxVGMnRop+3oI6M/j1Icm/LOOKEtWouGcL0PDAo5GGuAd7WYJ++ATdpFtwC9psSUcZck8VL9ffixC7+USc7sY9XvtoSS43ZSEt1yAO5n4HBgrux1D4lvcFkJciHMhyP1RlvShncIAulj1oU54A2gEVHHsRc3wh/I4dbUi0muiLJmDhPcZwDnAcebWa7eq14svoxN9UH2whDtwK5VuFFgL3NGMicYmUr3IHIWY9qIWgqtR6tAq4FBzu8Lct7vRa2kAg0iE9wC70fSRnSiouc183xdlyQ7z+wFUIVlUSRZiP1T28+LrkTBR+kBMt7PlqF/4YuTzvQS4CMczHuqh3UTYB0s4wq11bgJ+1QgBMAGS4v/rRgNYT0SWy9NR5LoQZJ8a8RfMNUctk1wKa3kQCe0ApbFRW5BobzbHVmCHEe89yLIe5UBXYeXX5e6VcdOr2UtMVVsnpXOnE50jZ6JMh+egIbHWe/82gyDCrWeyLbMN1gN3z/RBTIvAM5DgnoB8dMciweql5MftxK2dQLOYi6y18YqjmiukcIEUVvZ2ZGEXbpBi8Go/cnvsRCK+DZWa7zK/85Vu4CQ0cPNI4DDkdjga9QmfS/to1VNol3/MJ3dEYS26woPAb6fzh2Y6wdPQNvFMJLor0NZxAY6WibaQ6bqecuSiqPRTF98PUbKwB4Hdxne9q+zYaW77kGU9UPF3A8C+PE6bLt7GrVD4+hearwt31Bp03qwClqHzZh6eBtmmQzuJcC9uWZgTUUT4XWArmvO2t9Y/iLJkBRLds4CTkbVyDLCyKSucnUTofJ4OA0h495qjcIkMIiEv90X3R1lSBBTLg4zFBWCk7OvCei+OYkdTZKQUnQx7zNeFkC5BrqeF5mfzkNAuRu6qg3HT/98yXBGDmdKBP2XL3bhz0l0JXD/VnaIsWYwCZ0ci/9xFwNlNXVlguvRSCnzWywgS5CKgWIj3EAda5YUIF0cX+vz1IpEtbn0ZOWaVdpi2DBJhX/oJz8ENER4FfpDH6f3VfhllSYTWugC4FHg98Gymb6EF3KcbWaiLbS9kNtFOecK+iHAP9n2lo8AdaJ7cRByFqpDOR37fJbRRWlAg4Art5I5wxcKcinnYF7O9wGdRUO4Aoiw5BngVysc8AfnsfHDzBAJe0i4iDKUUKNfpxe5Q0hHg18AVeZzuK34YZcka1PYvBi4gBNoCgZbgg2jVQgfupX5NRJH3aIuHgS/lcboFIMqSpSjb4VIgwZEx4IHAbKHdRNiHbfN87InwEPCzPE4vL2v/90bgfcgHHAgEWky7iDDof/Hh/5mPPd/1j4BPmK/PBd6F3A8hGh4IWMIH0aoVX9wRCy097xBwOzAQZcnbgLej0tCQchYIWKRdUtTAvZ4MT8G4AGwlsHeiIouTkBV8nKV1BAKBMtqlqTs43hjGdIoqmrrYoBt4vqXnDgQCE9BJewgwuNentxo2RTgQCDiI09v3OplstI0L2LaEA4GAg7STCIMflnA7BUMDgcAMaTcRdpkONKolWMKBQGA/7SbCLvu3O4HDUVeyQCAQANpLhF3P8uhA/XiDCAcCgf20kwiD2yLciUa5BBEOBAL7KVLUXBavWnH9/+hA7ohZMzsrEAhMTSftMVkDSrOvXGUJEmGX0+gCgUCLaSd3RDE63DnMqKAjUIP0QCAQ2E87ifAo7lrC84DjsdtHOBAIOEg7ifAYjlrCSISPIxRqBAKBCtolMDeORnS7KsJzgMMIIhwIBCpopwY+I+ZwkTnAKkJQLhBwha3ABhww3Nqln/AYsoRHbS9kApYgd4QP06ADgXalH7gfzVm81Xx/EvACFLOxQrtsj511R0RZ0onmtx2F+w2GAoF2ZBgJ7lXAZ4Bf53E6BPv7fL8N+DSW+rq0S2BuHLkiXLTqlwOnEAQ4ELDBOHAT8GfAu4FfIVEGII/TceBm4B4suTPbyRIexM0UtaPQOKFAINA6BoGrge8BtwHr8zjdM8F9+4GdWNKPLvPELlqQ9ZCjF9I5dwTKijjT9iICgVnCY8B1wA3AHcBteZxOJa49KG5jxTPQLiI8BvThpiV8GLDC9iIsME6plHycyc+zjoqjs+w2EJiKzcCj5rge+EEepxvr+PvFqLmWFc9AO7kj9uGYCEdZsgA4AT/9wTnVRXSs4siRj23IHIPAgPl6GPnZcpS5klPKSy9/TTpR+l6EzsnimENpJFS3OYqfd1MS60KwK8W7UtwrBd7H9yWgc2kEnWOPAj8Evg+sLQJudbIcWIql86FdRDhHIuyaO+Is4HTbi5gGfcAW4Elgr/l+L7AH2A3sALaZr/eY3/Uj8S2EtxDd6bwnlaJcLr49SJjnmWMuMB9YiLaUi4Fe8/O55ute83e95m8Wm/suNI8Z8IccuA8F0n4J/Azl+44wfSNsCRbPg3YR4TEkCK6J8IXA020vYgLGkHg+CawHHkIn80ZgE7AdWbWFFVuI6kjFMQrkJsrcEkxaUSHShWCXi3Vn2e86K+7XiQR5IRLvJZREebk5liAX0kGo9Wi5RR4KblrPADovfwn8HAnwXmBXHqc7Z/LAUZbMRe+3NdrFJ5wDu3BEhI1IrACeiT7othlDAYuHgXXA48ia3W2Orcjy3ZHH6W5bi6wVI/jFhWHGRFkyB1nIC8xRWNYLkfXcRckCn0vJ6l6IRHoJJTFfZH4emvdPnwHgQeBeVFzxODpHH8jj9L4GP1cvlnt8FyLsOzlKMXGlYq4DOAelp7WacWTdbkKvyU7gEXQy3wPcl8fpDgvrcpY8ToeRG2VXrX8TZUk3JTE+CF10l5ljCbKol1FyjfQgi7pc0HvLjrmU/NyzhSFkBGw3t32UdmZ3Arfmcbq+yWvowbKh1C7uiFFk2bkiwj3IFdGKrIgiMFZUBd2H0nOuB34H7JxmsCIwCXmcjqBzbgfaXVQlypLCF11Y0QuQSB9sjpXmWGF+vhRZ1PMoiXK5a6VakLHa9zapDN6WB3FHkaW7CQXVHgR+C6xFWQ478zht5Y62G73W1mgXEc5xyye8Bng+soSazSPoJL4NVQPdQylI2Q6uJt8pLpBFocBkGRtdlPzUS8uOwtJeTMmCLiy4yuBk4U7povX+61FkCBTB212UXF57kPA+jOIPG83PC3EeA8ZaGVswFK4oa7SLCI+jq6t1wYmyZCnwUmA1zbNIHkOlllcDt6Pt3B4UqHBlNxBgv/8aaj839wCbzDSWypS8wjIuDziWBx3Ls0aKYz4Hujzmln1d/rjFc1Wes+UW7CgK1hZpiH1IdPdRypzZjYJmg5QCt8UxZO4/UEMBRatwQoTboZ/wGO6ULS8BXk3jnf1bkKV7M/AAsijuM/7MQJthtuQz3tmZoGM3TxXcQnSjiqOS8tzwIjtmlANzw4eBQYeEtR4WYrmYql0Cc8Poymz1f4myZD7wbJSW1oi2lTuQz2w9cAtwZR6n9zbgcQOzhLKg4z7ba3GUpWj+ozXapZ/wINDvwJX4FOCtzGyW3Aj6f7YCPwK+DtwdLN5AoCksRwMXrNEuPuFhJFy2eRrKipguOXA3Skr/BkrTcXmAaSDgO4cil4Q12kWE92B5uxVlyUnAxUz/Nb0dWb0/Q1HlLS1O1QkEZhWmt8saLKf0tYMIj6CgVb/ldbwRpaXVy02o4/8NwC2T9DwNBAKNpZh4Y5V2KFvei3IOrVmNUZacBVyK/Eu1MIyS028DLs/j9KfNWlsgEJiQU4BjbC+iXUR4A9pStPT/MD0iFgHvAI6s4U9GUR7lL4HPAVeHgFsgYI2jkTvCKu3gjtiDRNjGhWQe8gNfTG0NW9YCXwAuRy6UEHALBOyxAstBOWgPEd6LatBtsAoND1zJ5M79J4EvA98BHp5p+71AIDAzoiyZhwNBOWgPEd6Ohvi12hVxGPAnqFvaZJ2vrgC+AtyUx+mGVqwtEAhMjHEjPovaXIhNpx2KNba1ujWjaQT9ClSYMZEAP4QaUH8xj9PbWrOyQCBQA93Ay3AgMwLaIzDX0q19lCWdwAXA66nuT9qH2kn+B/DVEHgLBJxjCXAerelyOCW+W8KjqJNTK1mD/MDPrvK7fjR08F9RS8mR1i0rEAhMhelOdwSqlHMC333CxQDKlhBlyULgr1FpcqUbYgfwCeBrwBOhpWQg4CQLgefhQFZEge8ivAkVajQdU+L4V8BlPLX/6PVIfH+Ux+mTrVhPIBCYFocDb8ahGYC+uyMeQQGwphJlyXLgNSgbovzNGwCuBf41j9Ormr2OQCAwfYwhdT5qtOUMvovwenM0m3OAv+RAAd6D0s8+lMdp0y8EgUBgxpyCspqcwvfsiMdQnnCzWcOB6SzDqOPZR4AnWvD8gUBg5pxM9YC6VXz2Ce8CHmlRkcZDaJjmqUh0PwF8J4/TIMCBgAdEWXIGyg3utbyUp+CzCG9A0ydawW3A+1BqyzbghjxOd7fouQOBwMy5GGVFOIfPPuGNtChH2PR6+EUrnisQCDSWKEtOBF6MijScoxN/py0/inJzA4FAoComt//PgTNtr2UiOvG3neLvUDvIQCAQeAqmx8tzgBfhUHFGJZN1/3KZPjQQs9Uly4FAwB+OAv4OOMTyOibFx8DcCOrLsKHV7SsDgYAfmFazfwqcbXkpU+KjJbwPuAalqAUCgcABRFlyEPAW4Pdsr6UWfAzM9QM3ElwRgUCggihLelF/l7cD8y0vpxbGfQzMDaLMiCHbCwkEAu5gJma8AAnwEZaXUytjProjtqJWkb5dPAKBQHM5B/gQ6hHhDb4F5vYAt9DCHsI2MNM7FqLk8qXAIrS1WmiOXvTedQKR+Toq+76Dif3942j3Uxy5OcYqbodRl7hB5ALqR/744us+8/uBPE5D8/qANaIs6QZeBfwxmh3nFb6J8HrgJ0gkvCTKkh4krIuRmM4BeszXS4CDzO+XmNtllER4EQeKcFR2dJqjmB47mQiDXsMiHlAuwGNoYkm5CBfiu6/s60KE90VZssd8vw9dIAdRFstoxW1x7P/7MP4pMBOiLFlKSYCdLciYhDHfypYfBn5lexFTYa7M3Ugoe4C5qA3mStRU+ljks1qGRHUxsBwJcLMbjBQi3YwL8AgS4UKQBzHWMgeK+FZUaLMtypIdKNNll7lPIdSjHGiZjwKjwQ0VKIiyZAXwOlQRd7jl5UyXsS5KJ7oPrHe9cU6UJcuA44BVSHSPQi30jkVzrRbiZ2pgLXSjC0utAxTHUYB1H2pJuhV1qduIGiXtMcduNNB1a5Ql24AdYXzU7MUE4FYj6/et6HPmK+M+uSO2o85pThFlyXzgRODpwDOQ4B6GBKkbuRt6kUXcruI7XTrQLmEucr0ciazgYWT5lvusR5FlvQvYHGXJJiTYj5vjCRSwbet4QQBQGfL7gDPQ7tFnvBLhO3DAFRFlyWr05hfW7hpk4a4yR+X8uUBtdKIL1hxqy+8shrwWlvJeYKexlAuXSD+yoDeXHVuDH9pPoiw5DXgD8EJk9LQD3ojwOBqmeVernzjKkkJgVyDhPQWdAMfhaGu8WcICc0w0unwU+aJ3oYGwhQhvMVb0ZiTgQ5R8133m/n15nHob/G0nTKbQScAJwOuBV+JfQsFkjPryzzwJ3JHH6WCzn8hkLyxAvtsTgfOQm+F4DhxxFHCbLkopfWuq/H4XCg7uMV/vRGL9KPBElCUbkY96AAn1aMUxEoKEzcO4+ZYDzwRei1wQS2yuqUmMFjPmXOcOZLk0DePsPwg4Hc2heg5K/l7UzOcNWGMJE3+ox5CL4wlKw2S3oLjETiTOm6Ms2WLut99qDk2lpo/5DIIummejCecvxuE2lDNknDIRdv3E+TWwrlkPHmXJ0Wj+1MuBY5AlPB8FjAKzj05KRTJHc6AlXAQJB1AGx2Y0cHY98GiUJU+gDn+h13UdGAE+B7gEuAgFt5fgR/+H6TIGDLvujhhHVse1NHiKhml193y03TkZ+Xh9qTcPtIYIZbZMlrs9RsmlUQQId5sA4U4OLG7ZjkT7SSTg22ZrtWGUJXNQ2uap6EJ3LPL9HoviL7MBL0S4H/gf4N5G+N+Mn+l49Ea/wBzHzvRxA7OaTqZ2bQyhc3k7cmtsNV9vjbLkSfP9bhQgHEIpekPmKApf+nwUbPOZW0bJqp2PmqyfhD6Lp6BYi3NTkFvAGDDgugjvAr6FTtBpE2XJAuRnuhD5mJ6LtpuBQLPppGRNL0fCU0nh2ihS7vaWHU8Wh7Gud3FgaXh5hWG5y6QoRy9K08dn6q82LoPyoyiV70I58T0oxbAbuXIORbnfR6Nd5nJKBUyzUXQrGQX6ioo5V33C24C1eZxOq22lSW9ZDsTAH+LoyOvArKeX6hkclRSW8S5zFD7pzeb77ZQqDYfLjhFgJMqS8nLw8l4h5WINBwpsIbKF0BYFSHNQzKQXBbSLnPk15utDkcU7p76XYlYxAuztMl+4KMI70Jj5rdP54yhLFgNvQhHW45EYBwI+02OOpZSEtFxYywW2ENX9fTcqflfZOa84ygW4vDNfcXSVHeX3K8S5vG9Kke0QqM4IsKsL+ZtcrMNfC3wJXclrxhRXvBxZv89E26FAoJ0oxK+bkMHjM8PAti7kb3XN4Z8Dv83j9O5a/8CUE5+MUs1eiVJcAoFAwFUGgc1dyIfkWi39emrsExFlyTzkbngDsoBPbOK6AoFAoFEMApu6kM/VpXlt48DVaKLyhJhIbQ8qZ/xT4PymrywQCAQax35L+EnzjStsB25g6oDcMaid3aXU3r82EAgEXKEPeLILNdDebnkx5VwH3DZRcYZJ/n4L8FLU3yH0dggEAj6yBWMJb0e176PYbRE3joKE3wYeqfylcT88HaWc/S+UixgIBAI+MoSGEeztNGNiNmJ/gvEgcAVwQ2XLSlPx9iLg74APEAQ4EAj4zS5gSx6n+5u670RVNjZLeXegvOD9rhFj/c5Broe/QXXmgUAg4DtF5eN+90NR6miTB1FucHm63FLgw6jfQ8j7DQQC7cJuTPJBMXjybuSSsMWjwDcwVwaAKEvOBv4D5f8eQXuNNAkEArObJ4B7oCRsDwP3AhdbWtBdwA/yOB2PsqQXNdp5N/IDBwKBQLuxFpOA0AlgupTdhXzDrWYEuCuP021RlhwEvA74CEGAA4FAe7IDuMckRex3RwA8BNxmYUEbgAdMp/0/Aj6O5rwFAoFAO3I78j4AB4rwBiTEreZ21Anqc6j8OFS/BQKBdmYd8gkDBwa7NiFBbDUno7zf02jvoX6BQCAAcCdlIrzfEjapYXeiAF3+1L9rGicB5xIEOBAItDdjyA1xZ/m0oM6KO60DvopmXgUCgUCgcQygVNwHy394gAjncboNTTee1kihQCAQCEzIDpSK+2T5DystYVBnn7twq8dwIBAI+MwwcvU+XvmLaiK8B2UqPNbkRQUCgcBsYSPS1d2Vv3iKCOdxOgL8HLgJ98YeBQKBgG+MIj39qdHXA6hmCWMqOX4APNDUpQUCgUD7cz/w/coWvQVVRdhwJZr11sp0tUAgEGgncuRZuGKiO0wownmcDgA/Am5s/LoCgUBgVnAt8D2jp1WZzBIGuBmNGxpv4KICgUBgNrAH5QXfOtmdJhXhPE73AT8GvkYQ4kAgEKiVEdQP/YrJrGCAjvHxqbU1ypJTUCXdGUxtPQcCgcBsZhjF096Wx+mmqe5cq6A+DHwGNSEOFnEgEAhUZwy4A/hHNDZuSmoSYZNa8U3gcuxPZQ4EAgFXWY+KMm6tlhNcjZpdC8Y//O8oUBcIBAKBA3kCeQy+XzGweFLq8u/mcfoY8GmUuhYIBAIB0Qd8Cfh6Hqd1jYmrO8iWx+mdwL8A16FyvEAgEJjN7AS+DPxnZYe0WqgpO6IaUZacDnweOJMwjj4QCMxOdiHPwLvyOJ1WvGwm6WZrgbejgo5AIBCYbYwC30GzMfum+yDTtoQLoiy5AHg/8NIZPVAgEAj4wy4gBT6dx+m6mTzQjEUYIMqSs4B3Aq8lzIoLBALtzUbkiv1KHqePzPTBGiLCAFGWHAG8F3glsKYhDxoIBALuMIbmw6XAv+dxOm0XRDkNE2GAKEu6gHcDbwOOBeY07MEDgUDAHkNoGv0ngW/ncTrWqAduqAgDRFmyADgd+HPg0oY+eCAQCNjhGyg198GpGvLUS8NFGCDKkk7gROAVwOuBUxv+JIFAINB87gK+jqrgHmrGEzRFhAuiLFkIxChgdxZwdNOeLBAIBBrHRjQX7r+Aq0zbhqbQVBEuiLJkNXAJSmM7HVgNdDT9iQOBQKA+tiLr9wrghzNNP6uFlohwQZQly4E3muMEYB4K3gVBDgQCthgFBoDH0IDjLzQi9axWWl1uvAP4ImqJ+Swkxq8Aelq8jkAgECi4Aw2tuBLYDPS38slbagmXE2VJD3A4ck88HTgNCfPBVhYUCARmE3cBtwO3oNYL6+rtftYorIlwOVGWHISCdieghkAnAUcCy80RRioFAoHpMghsR1buOuBuZP0+ADyUx2lub2mOiHAlUZacidLaVqHqu6ORhbwIWAj0IhdGcGMEAgGAHA3XHEDuhL3AbmAL8BCwAY1puzOP00dtLbIaTopwOVGWRMAhwHHAKchaPhyJ8gokzN2E2XeBwGyjAwXV+pHg7gQ2oVmYa4H7zNfbbVu7k/H/Ay8sa+x2Bp7BAAAAAElFTkSuQmCC'),
(2, 'luanotonii', '$2y$10$RdBIKrCArbU4UjgmhAuIVuehC.NCL7jVdOUXUBXhKjIFcVpYM0DtG', 'luanotoni@gmail.com', NULL);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
