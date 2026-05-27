function enviarOrcamento() {
    var nome = document.getElementById("nome").value.trim();
    var empresa = document.getElementById("empresa").value.trim();
    var servicoEl = document.querySelector('input[name="servico"]:checked');
    var mensagem = document.getElementById("mensagem").value.trim();
    var btn = document.querySelector('button[onclick="enviarOrcamento()"]');

    if (!nome) { alert("Por favor, informe seu nome."); return; }
    if (!servicoEl) { alert("Por favor, selecione o serviço de interesse."); return; }
    if (!mensagem) { alert("Por favor, descreva um pouco sobre seu projeto."); return; }

    btn.innerHTML = 'Enviando...';
    btn.disabled = true;
    
    var texto = "Ola! Vim pelo site e quero solicitar um orcamento.\n\n" +
                "Nome: " + nome + "\n" +
                (empresa ? "Empresa: " + empresa + "\n" : "") +
                "Servico: " + servicoEl.value + "\n\n" +
                "Projeto: " + mensagem;

    var url = "https://wa.me/5521972894449?text=" + encodeURIComponent(texto);
    
    window.open(url, "_blank");

    setTimeout(() => {
        btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Enviar Orçamento pelo WhatsApp';
        btn.disabled = false;
    }, 2000);
}
