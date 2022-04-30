const blogRedirect = document.querySelector(".blogRedirect");
const OpenMobileSideBar = document.querySelector(".workarea-nav-open");
const mobileSideBarContainer = document.querySelector(".mobileSideBarContainer");
const mobileSideBar = document.querySelector(".mobileSideBar");
const allPosts = document.querySelector(".allPosts");
const NewPostForms = document.querySelector(".NewPostForms");

blogRedirect.addEventListener("click", (e)=>{
    window.location = "../";
});

OpenMobileSideBar.addEventListener('click', (e)=>{
    mobileSideBarContainer.style.display = "block";
    setTimeout(() => {
        mobileSideBar.classList.add("showRight");
        mobileSideBar.classList.remove("showLeft");
    }, 0);
});

mobileSideBarContainer.addEventListener('click', (e)=>{
    mobileSideBar.classList.add("showLeft");
    mobileSideBar.classList.remove("showRight");
    setTimeout(() => {
        mobileSideBarContainer.style.display = "none";
    }, 500);
});

const addNewPost = () => {
    allPosts.style.display = "none";
    NewPostForms.style.display = "flex";
}