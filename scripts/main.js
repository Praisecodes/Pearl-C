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
const mobileNavContainer = document.querySelector(".mobileNavContainer");
const mobileNav = document.querySelector(".mobileNav");
const closeMobileNav = document.querySelector(".closeMobileNav");

contact.addEventListener("click", ()=>{
    ContactDiv.scrollIntoView({
        behavior: "smooth"
    });
});

subscribeForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    if(!(email.value == "")){
        submitEmail.disabled = true;
        submitEmail.innerHTML = '<i class="fa fa-spinner"></i>';

        fetch("./api/subscribe.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "Email": email.value
            })
        })
        .then(res => res.json())
        .then((data)=>{
            if(data == "Success"){
                email.value = "";
                submitEmail.innerHTML = `<i class="fa fa-circle-check"></i>`;
                setTimeout(()=>{
                    submitEmail.innerHTML = `Subscribe <i class="fa fa-bell">`;
                    setTimeout(()=>{
                        submitEmail.disabled = false;
                    }, 100);
                }, 4000);
            }
            else{
                // console.log(data);
                submitEmail.innerHTML = `<i class="fa fa-x"></i>`;
                setTimeout(()=>{
                    submitEmail.innerHTML = `Subscribe <i class="fa fa-bell">`;
                    setTimeout(()=>{
                        submitEmail.disabled = false;
                    }, 100);
                }, 4000);
            }
            // console.log(data);
        })
        .catch((error) => {
            // console.log(error);
            submitEmail.innerHTML = `<i class="fa fa-x"></i>`;
                setTimeout(()=>{
                    submitEmail.innerHTML = `Subscribe <i class="fa fa-bell">`;
                    setTimeout(()=>{
                        submitEmail.disabled = false;
                    }, 100);
                }, 1000);
        });
    }
    else{
        console.log("No No!!");
        submitEmail.innerHTML = `<i class="fa fa-x"></i>`;
                setTimeout(()=>{
                    submitEmail.innerHTML = `Subscribe <i class="fa fa-bell">`;
                    setTimeout(()=>{
                        submitEmail.disabled = false;
                    }, 100);
                }, 4000);
    }
});

sendEmail.addEventListener("submit", (e)=>{
    e.preventDefault();

    sendEmailBtn.innerHTML = "Sending...";
    sendEmailBtn.disabled = true;

    let Body = senderMessage.value;
    let mainBody = Body.split("\n").join("<br/>");

    let messageContent = {
        "Name": senderName.value,
        "Email": senderEmail.value,
        "Body": mainBody
    };

    if(!(messageContent.Name == "") && !(messageContent.Email == "") && !(messageContent.Body == "")){
        fetch("./api/sendEmail.php", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(messageContent)
        })
        .then(res=>res.json())
        .then((data) => {
            if(data == "Success"){
                sendEmailBtn.innerHTML = `Sent <i class="fa fa-circle-check"></i>`;
                setTimeout(() => {
                    sendEmailBtn.innerHTML = `Send <i class="fa fa-paper-plane">`;
                    sendEmailBtn.disabled = false;
                }, 4000);
                senderName.value = "";
                senderEmail.value = "";
                senderMessage.value = "";
            }
            else{
                sendEmailBtn.innerHTML = `Not Sent <i class="fa fa-x"></i>`;
                setTimeout(()=>{
                    sendEmailBtn.innerHTML = `Send <i class="fa fa-paper-plane">`;
                    sendEmailBtn.disabled = false;
                }, 4000);
                console.log(data);
            }
        })
        .catch((error) => {
            console.log(error);
            sendEmailBtn.innerHTML = `Not Sent <i class="fa fa-x"></i>`;
                setTimeout(()=>{
                    sendEmailBtn.innerHTML = `Send <i class="fa fa-paper-plane">`;
                    sendEmailBtn.disabled = false;
                }, 4000);
        })
    }
    else{
        sendEmailBtn.innerHTML = `Not Sent <i class="fa fa-x"></i>`;
        setTimeout(()=>{
            sendEmailBtn.innerHTML = `Send <i class="fa fa-paper-plane">`;
            sendEmailBtn.disabled = false;
        }, 4000);
    }
});

OpenMobileNav.addEventListener('click', (e)=>{
    mobileNavContainer.style.display = "block";
    setTimeout(() => {
        mobileNav.classList.add("showNav");
        mobileNav.classList.remove("hideNav");
    }, 100);
});

closeMobileNav.addEventListener('click', (e)=>{
    mobileNav.classList.add("hideNav");
    mobileNav.classList.remove("showNav");
    setTimeout(() => {
        mobileNavContainer.style.display = "none";
    }, 500);
});
