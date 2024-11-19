    <!-- Dialog Salvar Produção-->
    <dialog id="myDialogSalvarProd">
        <div class="dialog-header">
            <span>Salvar Produção em</span>
            <a id="novaLista">+ Nova Lista</a>
        </div>
        <hr>
        <div class="dialog-content">
            <label>
                <input type="checkbox"> Lista 1
            </label>
            <hr>
            <label>
                <input type="checkbox"> Lista 2
            </label>
            <hr>
            <label>
                <input type="checkbox"> Lista 1
            </label>
            <hr>
            <label>
                <input type="checkbox"> Lista 1
            </label>
            <hr>
        </div>
        <div class="dialog-footer">
            <button class="cancel-btn" id="cancelDialogSalvarProd">Cancelar</button>
            <button class="confirm-btn" id="confirmDialogSalvarProd">OK</button>
        </div>
    </dialog>

    <!-- Dialog Nova Lista -->
    <dialog id="myDialogNovaLista">
        <div class="dialog-header">
            Nova Lista
        </div>
        <hr>
        <div class="dialog-content">
            <input type="text" placeholder="Inserir título da lista...">
        </div>
        <div class="dialog-footer">
            <button class="cancel-btn" id="cancelDialogNovaLista">Cancelar</button>
            <button class="confirm-btn" id="confirmDialogCriarNovaLista">Criar</button>
        </div>
    </dialog>

    <!-- Dialog Avaliar -->
    <dialog id="myDialogAvaliar">
        <div class="dialog-header">
            Avaliação
        </div>
        <hr>
        <div class="dialog-content">
            <p id="tituloAvaliacao">Como você avalia {Produção}?</p>
            <div class="star-rating">
                <input type="radio" name="rating" id="star1" value="1">
                <label for="star1" class="star">&#9733;</label> <!-- Código HTML da estrela -->
                
                <input type="radio" name="rating" id="star2" value="2">
                <label for="star2" class="star">&#9733;</label>
                
                <input type="radio" name="rating" id="star3" value="3">
                <label for="star3" class="star">&#9733;</label>
                
                <input type="radio" name="rating" id="star4" value="4">
                <label for="star4" class="star">&#9733;</label>
                
                <input type="radio" name="rating" id="star5" value="5">
                <label for="star5" class="star">&#9733;</label>
            </div>
        </div>
        <div class="dialog-footer">
            <button class="cancel-btn" id="cancelDialogAvaliar">Cancelar</button>
            <button class="confirm-btn" id="confirmDialogAvaliar">Avaliar</button>
        </div>
    </dialog>

        <!-- Dialog Adicionar Tag -->
    <dialog id="myDialogAdicionarTag">
        <div class="dialog-header">Adicionar Tag</div>
        <hr>

        <div class="dialog-content">
            <!-- Contêiner das tags adicionadas -->
            <div id="tagsContainer" class="tags-container"></div>

            <!-- Input para adicionar novas tags -->
            <div class="tag-input-wrapper">
                <input type="text" id="inputTag" placeholder="Adicionar Tag">
                <button id="confirmTag" class="check-btn">&#10004;</button> <!-- Adicionar tag -->
            </div>
        </div>

        <div class="dialog-footer">
            <button class="cancel-btn" id="cancelDialogAdicionarTag">Cancelar</button>
            <button class="confirm-btn" id="confirmDialogAdicionarTag">Adicionar</button>
        </div>
    </dialog>


    


        <!-- Dialog de Login -->
    <dialog id="myDialogLogin">
        <div class="dialog-header">Faça login para executar essa ação</div>
        <hr>
        <div class="dialog-content">
            <label for="loginUsuario">Usuário / Email</label>
            <input type="text" id="loginUsuario" placeholder="Digite seu usuário">

            <label for="loginSenha">Senha</label>
            <div class="password-wrapper">
                <input type="password" id="loginSenha" placeholder="Digite sua senha">
                <button type="button" id="toggleSenha" class="eye-btn">&#128065;</button> <!-- Ícone de olho -->
            </div>

            <a href="#" class="forgot-link">Esqueceu a senha?</a>

            <button id="login-btn">Entrar</button>

            <div class="separator">OU</div>

            <div class="register-link">
                Não possui conta? <a href="cadastro.php">Cadastrar</a>
            </div>
        </div>
    </dialog>