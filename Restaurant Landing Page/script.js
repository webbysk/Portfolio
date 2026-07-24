document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function(e){

        if(this.hostname === window.location.hostname){

            e.preventDefault();

            document.body.style.opacity="0";

            document.body.style.transition=".4s";

            setTimeout(()=>{

                window.location=this.href;

            },400);

        }

    });

});