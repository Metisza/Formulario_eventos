(function () {
    'use strict';

    const txtTitulo = document.getElementById("txtTitulo")
    const btn = document.getElementById("btn")
    const formCadastro = document.querySelector(".formCadastro")

    formCadastro.addEventListener("submit", function (e) {
        console.log(txtTitulo.value)
        if (!txtTitulo.value) {
            //após o alert, será executada a função de callback
            showErrorMessage("Preencha todos os campos", function () {
                txtTitulo.focus()
            })
            e.preventDefault()
        }
    })

    //variaveis criadas para fechar o alert
    const feedbackMessage = document.getElementById("feedbackMessage")
    const feedbackMessageCloseBtn = feedbackMessage.getElementsByTagName("button")[0]

    function showErrorMessage(msg, cb) {
        //alert(msg)
        //feedbackMessage.setAttribute("class", "show")
        //feedbackMessage.textContent= msg
        feedbackMessage.classList.add("show")
        feedbackMessage.getElementsByTagName("p")[0].textContent = msg

        feedbackMessageCloseBtn.focus()
        // função criada para fechar a caixa do alert "preencha todos os campos"
        function hideErrorMessage() {
            feedbackMessage.classList.remove("show")
            //melhorando a performance
            feedbackMessageCloseBtn.removeEventListener("click", hideErrorMessage)
            feedbackMessageCloseBtn.removeEventListener("keyup", pressedKeyboardOnBtn)

            if (typeof cb === "function") {
                cb()
            }
        }

        //melhorando a acessibilidade
        function pressedKeyboardOnBtn(e) {
            if (e.keyCode === 27) {
                hideErrorMessage()
            }
        }

        feedbackMessageCloseBtn.addEventListener("click", hideErrorMessage)
        feedbackMessageCloseBtn.addEventListener("keyup", pressedKeyboardOnBtn)
    }
    const txtDescricao = document.getElementById("txtDescricao")
    const contadorContainer = document.getElementById("contador")
    const resta = contadorContainer.getElementsByTagName("span")[0]
    const maxima = txtDescricao.maxLength

    mostrarNumero(maxima)

    //contadorContainer.removeAttribute("style")
    contadorContainer.style.display = "block"

    //função para mostrar o numeros de caracteres
    function checkLength() {
        let numeroLetrasDigitadas = this.value.length
        let caractersRestantes = parseInt(maxima) - parseInt(numeroLetrasDigitadas)
        mostrarNumero(caractersRestantes)
    }

    function mostrarNumero(n) {
        resta.textContent = n
    }

    txtDescricao.addEventListener("input", checkLength)

    //btn começa desabilitado
    btn.disabled = true
    //após o checked, o btn se torna disponível
    const chkAceito = document.getElementById("chkAceito")
    chkAceito.addEventListener("change", function () {
        btn.disabled = !this.checked
    })
})()
