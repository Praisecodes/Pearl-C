const blogRedirect = document.querySelector(".blogRedirect");
const OpenMobileSideBar = document.querySelector(".workarea-nav-open");
const mobileSideBarContainer = document.querySelector(".mobileSideBarContainer");
const mobileSideBar = document.querySelector(".mobileSideBar");
const allPosts = document.querySelector(".allPosts");
const NewPostForms = document.querySelector(".NewPostForms");
const closeNewPostHeader = document.querySelector(".closeNewPostHeader");
const NewPostHeaderContainer = document.querySelector(".NewPostHeaderContainer");
const NewPostHeader = document.querySelector(".NewPostHeader");
const addPost = document.querySelector(".addPost");
const mobileAddPost = document.querySelector(".mobileAddPost");
const CreatePostBtn = document.querySelector(".CreatePost");
const TitleInput = document.querySelector(".TitleInput");
const categoryInput = document.querySelector(".categoryInput");
const titleBar = document.querySelector(".titleBar");
const editBtn = document.querySelector(".edit");
const heading = document.querySelector(".heading");
const topCat = document.querySelector(".topCat");

//Variables to store the title and category
let title = "", category = "";

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

const closeNewPost = () =>{
    if(!(TitleInput.value == "" && categoryInput == "")){
        TitleInput.value = "";
        categoryInput.value = "";
    }
    NewPostHeader.classList.add("shrink");
    NewPostHeader.classList.remove("fullscale");
    setTimeout(() => {
        NewPostHeaderContainer.style.display = "none";
    }, 100);
}

const addNewPost = () => {
    NewPostHeaderContainer.style.display = "flex";
    CreatePostBtn.innerHTML = "Create Post";
    setTimeout(() => {
        NewPostHeader.classList.add("fullscale");
        NewPostHeader.classList.remove("shrink");
    }, 0);
}

const CreatePost = () =>{
    title = TitleInput.value.toUpperCase();
    category = categoryInput.value.toUpperCase();

    if(!((title == "" && category == "") || title == "" || category == "")){
        NewPostForms.style.display = "flex";
        allPosts.style.display = "none";
        
        heading.innerHTML = title;
        topCat.innerHTML = `(${category})`;
    
        closeNewPost();
    }
}

const editHeading = () => {
    addNewPost();
    CreatePostBtn.innerHTML = "Update Title";
    TitleInput.value = heading.innerHTML;
    categoryInput.value = category;
}

closeNewPostHeader.addEventListener('click', closeNewPost);
addPost.addEventListener('click', addNewPost);
mobileAddPost.addEventListener('click', addNewPost);
editBtn.addEventListener('click', editHeading);
CreatePostBtn.addEventListener('click', CreatePost);