<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link id="favicon" rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/filmes.css">
    <link rel="stylesheet" href="css/busca.css">
    <script src="js/buscaAvancada.js" defer></script>
    <script src="js/script.js" defer></script>
    <title>Movie Tag ∙ Busca Avançada</title>
</head>
<body>
    <!-- Menu -->
    <header>
    <?php require_once 'navbar.php'; ?>
    </header>
    
    <section>
        <h1>Busca Avançada</h1>
        <div id="conteudo">
            <!-- filtros de busca -->
            <div>
                <!-- botoes de mostrar e esconder -->
                <button class="botaoTodosFiltros" id="botaoMostrar">Mostrar tudo</button>
                <button class="botaoTodosFiltros" id="botaoEsconder">Esconder tudo</button>
                
                <form id="buscaAvancada" action="" method="">
                    <div id="totalFiltros">
                        <!-- caixa com um filtro -->
                        <div class="filtro">
                            <p class="rotulo">Título da produção<i class='bx bx-chevron-down'></i></p>
                            <div class="divInput" >
                                <input type="text" name="titulo" id="tituloProducao" class="inputGrande" placeholder="ex.: Vingadores">
                            </div>
                        </div>

                        <!-- caixa com um filtro -->
                        <div class="filtro">
                            <p class="rotulo">Tipo de produção<i class='bx bx-chevron-down'></i></p>
                            <div class="divInput divMaiorCheckbox">
                                <div class="divMenorCheckbox">
                                    <input type="checkbox" name="tipo[]" id="movie" value="movie">
                                    <label for="movie">Filme</label>
                                </div>
                                <div class="divMenorCheckbox">
                                    <input type="checkbox" name="tipo[]" id="tv" value="tv">
                                    <label for="tv">Série</label>
                                </div>
                                <!--
                                <div class="divMenorCheckbox">
                                    <input type="checkbox" name="tipo[]" id="minisserie" value="minisserie">
                                    <label for="minisserie">Minissérie</label>
                                </div>
                                <div class="divMenorCheckbox">
                                    <input type="checkbox" name="tipo[]" id="animacao" value="animacao">
                                    <label for="animacao">Animação</label>
                                </div>
                                <div class="divMenorCheckbox">
                                    <input type="checkbox" name="tipo[]" id="curta" value="curta">
                                    <label for="curta">Curta-Metragem</label>
                                </div>-->
                            </div>
                        </div>

                        <!-- caixa com um filtro -->
                        <div class="filtro">
                            <p class="rotulo">Data de lançamento<i class='bx bx-chevron-down'></i></p>
                            <div class="divInput">
                                <p class="subrotulo">Por ano</p>
                                <input type="number" name="anoLancamento" id="anoLancamento" class="inputGrande" placeholder="ex.:1990">
                            </div>
                        </div>

                        <!-- caixa com um filtro -->
                        <div class="filtro">
                            <p class="rotulo">Avaliações<i class='bx bx-chevron-down'></i></p>
                            <div class="divInput">
                                <p class="subrotulo">Em porcentagem</p>
                                <div id="avaliacao">
                                    <input type="number" name="avaliacaoMenor" id="avaliacaoMenor" placeholder="ex.: 60">
                                    <p>a</p>
                                    <input type="number" name="avaliacaoMaior" id="avaliacaoMaior" placeholder="ex.: 100">
                                </div>
                            </div>
                        </div>

                        <!-- caixa com um filtro 
                        <div class="filtro">
                            <p class="rotulo">Gênero<i class='bx bx-chevron-down'></i></p>
                            <div class="divInput">
                                <input type="text" name="genero" id="genero" class="inputGrande" placeholder="ex.: Romance">
                            </div>
                        </div>-->

                        <!-- caixa com um filtro 
                        <div class="filtro">
                            <p class="rotulo">Tags<i class='bx bx-chevron-down'></i></p>
                            <div class="divInput">
                                <input type="text" name="tag" id="tag" class="inputGrande" placeholder="ex.: Segunda Guerra Mundial">
                            </div>
                        </div>-->

                        <!-- caixa com um filtro
                        <div class="filtro">
                            <p class="rotulo">Plataformas<i class='bx bx-chevron-down'></i></p>
                            <div class="divInput divMaiorCheckbox">
                                <div class="divMenorCheckbox">
                                    <input type="checkbox" name="plataformas[]" id="netflix" value="netflix">
                                    <label for="netflix">Netflix</label>
                                </div>
                                <div class="divMenorCheckbox">
                                    <input type="checkbox" name="plataformas[]" id="primeVideo" value="primeVideo">
                                    <label for="primeVideo">Prime Video</label>
                                </div>
                                <div class="divMenorCheckbox">
                                    <input type="checkbox" name="plataformas[]" id="max" value="max">
                                    <label for="max">HBO Max</label>
                                </div>
                                <div class="divMenorCheckbox">
                                    <input type="checkbox" name="plataformas[]" id="star" value="star">
                                    <label for="star">Star+</label>
                                </div>
                                <div class="divMenorCheckbox">
                                    <input type="checkbox" name="plataformas[]" id="apple" value="apple">
                                    <label for="apple">Apple TV+</label>
                                </div>
                                <div class="divMenorCheckbox">
                                    <input type="checkbox" name="plataformas[]" id="disney" value="disney">
                                    <label for="disney">Disney+</label>
                                </div>
                            </div>
                        </div>-->

                        <!-- caixa com um filtro 
                        <div class="filtro">
                            <p class="rotulo">Idioma<i class='bx bx-chevron-down'></i></p>
                            <div class="divInput">
                                <input type="text" name="idioma" id="idioma" class="inputGrande" placeholder="ex.: Espanhol">
                            </div>
                        </div>

                        
                        <div class="filtro">
                            <p class="rotulo">Tempo de duração<i class='bx bx-chevron-down'></i></p>
                            <div class="divInput">
                                <p class="subrotulo">Em minutos</p>
                                <input type="number" name="duracao" id="duracao" class="inputGrande" placeholder="ex.: 180">
                            </div>
                        </div>-->

                        <!-- caixa com um filtro-->
                        <div class="filtro">
                            <p class="rotulo">Classificação indicativa<i class='bx bx-chevron-down'></i></p>
                            <div class="divInput divClassifInd">
                                <button class="classifInd livre">L</button>
                                <button class="classifInd dez">10</button>
                                <button class="classifInd doze">12</button>
                                <button class="classifInd catorze">14</button>
                                <button class="classifInd dezesseis">16</button>
                                <button class="classifInd dezoito">18</button>
                            </div>
                        </div> 
                        
                    </div>

                    <!-- botao de pesquisa -->
                    <button id="botaoPesquisar">Pesquisar</button>

                    <div class="wrapperLoading">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="shadow"></div>
                        <div class="shadow"></div>
                        <div class="shadow"></div>
                    </div>
                </form>
            </div>

            <!--imagem que aparece antes da pesquisa-->
            <div id="antesPesquisa">
                <img src="img/logo2.svg" alt="logo-MT-alt">
                <p>Seus resultados aparecerão aqui!</p>
            </div>

            <div class="resultados" style="display: none;">
                <div class="sort-container">
                    <label for="ordem">Ordenar por</label>
                    <select name="ordem" id="ordem">
                        <option value="melAval">Melhor avaliado</option>
                        <option value="mRecente">Mais recente</option>
                        <option value="mAntigo">Mais antigo</option>
                    </select>
                </div>
                    <div class="itens">
                        <!-- Results will be dynamically inserted here -->
                    </div>
                </div>
        </div>

        
    </section>

    <!-- Footer -->
    <?php include_once 'footer.php'; ?>
</body>
</html>