function copyEmail(e) {
    e.preventDefault();
    var copyText = document.getElementById("hidden-email");
    copyText.select();
    document.execCommand("copy");
    
    var toast = document.getElementById("toast");
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

function enviarOrcamento() {
    var nome = document.getElementById("nome").value.trim();
    var empresa = document.getElementById("empresa").value.trim();
    var servicoEl = document.querySelector('input[name="servico"]:checked');
    var mensagem = document.getElementById("mensagem").value.trim();
    var btn = document.querySelector('button[onclick="enviarOrcamento()"]');

    if (!nome) { alert("Por favor, informe seu nome."); return; }
    if (!servicoEl) { alert("Por favor, selecione o serviço de interesse."); return; }
    if (!mensagem) { alert("Por favor, descreva um pouco sobre seu projeto."); return; }

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    var texto = "Olá! Vim pelo site e quero solicitar um orçamento. 🙂\n\n" +
                "👤 *Nome:* " + nome + "\n" +
                (empresa ? "🏢 *Empresa:* " + empresa + "\n" : "") +
                "📦 *Serviço:* " + servicoEl.value + "\n\n" +
                "📝 *Projeto:* " + mensagem;

    window.open("https://wa.me/5521972894449?text=" + encodeURIComponent(texto), "_blank");

    setTimeout(() => {
        btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Enviar Orçamento pelo WhatsApp';
        btn.disabled = false;
    }, 2000);
}
