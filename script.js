
function copyEmail(e) {

        function copyEmail(e) {

            e.preventDefault();
            var copyText = document.getElementById("hidden-email");
            copyText.select();
            copyText.setSelectionRange(0, 99999); 
            
            var toast = document.getElementById("toast");
            toast.className = "show";
            setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
        }

        function enviarOrcamento() {
            var nome = document.getElementById("nome").value.trim();
            var empresa = document.getElementById("empresa").value.trim();
            var servicoEl = document.querySelector('input[name="servico"]:checked');
            var mensagem = document.getElementById("mensagem").value.trim();

            if (!nome) { alert("Por favor, informe seu nome."); return; }
            if (!mensagem) { alert("Por favor, descreva um pouco sobre seu projeto."); return; }

            var servico = servicoEl ? servicoEl.value : "Não informado";

            var texto = "Olá! Vim pelo site e quero solicitar um orçamento. 🙂\n\n";
            texto += "👤 *Nome:* " + nome + "\n";
            if (empresa) texto += "🏢 *Empresa:* " + empresa + "\n";
            texto += "📦 *Serviço de interesse:* " + servico + "\n\n";
            texto += "📝 *Sobre o projeto:*\n" + mensagem;

            var url = "https://wa.me/5521972894449?text=" + encodeURIComponent(texto);
            window.open(url, "_blank");
        }
