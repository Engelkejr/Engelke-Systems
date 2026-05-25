        function copyEmail(e) {
            e.preventDefault();
            var copyText = document.getElementById("hidden-email");
            copyText.select();
            copyText.setSelectionRange(0, 99999); 
            
            var toast = document.getElementById("toast");
            toast.className = "show";
            setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
        }
