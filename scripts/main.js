const newest = document.querySelector(".newest");
const OpenMobileNav = document.querySelector(".OpenMobileNav");
const newest_list = document.querySelector(".newest-list");
const contact = document.querySelector(".contact");
const ContactDiv = document.querySelector(".contactDiv");
const subscribeForm = document.querySelector(".subscribeForm");
const email = document.querySelector(".email");
const submitEmail = document.querySelector(".submitEmail");
const sendEmail = document.querySelector(".sendEmail");
const senderName = document.querySelector(".senderName");
const senderEmail = document.querySelector(".senderEmail");
const senderMessage = document.querySelector(".senderMessage");
const sendEmailBtn = document.querySelector(".sendEmailBtn");

contact.addEventListener("click", ()=>{
    ContactDiv.scrollIntoView({
        behavior: "smooth"
    });
});

subscribeForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    if(!(email.value == "")){
        submitEmail.disabled = true;

        fetch("/api/subscribe.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "Email": email.value
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data == "Success"){
                email.value = "";
                submitEmail.disabled = false;
            }
            else{
                email.value = data;
            }
        });
    }
    else{
        console.log("No No!!");
    }
});

sendEmail.addEventListener("submit", (e)=>{
    e.preventDefault();
})
