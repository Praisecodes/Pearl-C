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
const storyName = document.querySelector(".storyName");
const closeDeletePostBtn = document.querySelector(".closeDeletePost");
const deletePostBtn  = document.querySelector(".deletePost");
const write = document.querySelector(".write");
const cat = document.querySelector(".cat");
const deletePostDiv = document.querySelector(".deletePostDiv");
const deletePostContainer = document.querySelector(".deletePostContainer");
const deleteBtn = document.querySelector(".delete");

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

const closeDeletePost = () => {
    if(!(storyName.value == "")){
        storyName.value = "";
    }
    deletePostDiv.classList.add("shrink");
    deletePostDiv.classList.remove("fullscale");
    setTimeout(()=>{
        deletePostContainer.style.display = "none";
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

const openDeletModal = () => {
    write.innerHTML = `Delete "${title}"`;
    cat.innerHTML = `Category: ${category}`;
    deletePostBtn.innerHTML = `Delete ${category}`;

    deletePostContainer.style.display = "flex";
    setTimeout(() => {
        deletePostDiv.classList.add("fullscale");
        deletePostDiv.classList.remove("shrink");
    }, 0);
    deletePostBtn.style.opacity = "0.8";
    deletePostBtn.disabled = true;
}

const DeletePost = () =>{
    NewPostForms.style.display = "none";
    allPosts.style.display = "flex";
    closeDeletePost();
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
closeDeletePostBtn.addEventListener('click', closeDeletePost);
deleteBtn.addEventListener('click', openDeletModal);
deletePostBtn.addEventListener('click', DeletePost);

storyName.addEventListener('keyup', (e)=>{
    if(!(storyName.value == title)){
        deletePostBtn.style.opacity = "0.8";
        deletePostBtn.disabled = true;
    }
    else{
        deletePostBtn.style.opacity = "1";
        deletePostBtn.disabled = false;
    }
});

// Create Post Functions





// Change Profile Picture Functions
const changeProfilePicContainer = document.querySelector(".changeProfilePicContainer");
const changeProfilePicDiv = document.querySelector(".changeProfilePicDiv");
const closeChangeProfilePicBtn = document.querySelector(".closeChangeProfilePic");
const changeImage = document.querySelector(".changeImage");
const mobileChangeImage = document.querySelector(".mobileChangeImage");

const closeChangeProfilePic = () =>{
    changeProfilePicDiv.classList.add("shrink");
    changeProfilePicDiv.classList.remove("fullscale");

    setTimeout(() => {
        changeProfilePicContainer.style.display = "none";
    }, 100);
}

const openChangeProfilePic = () => {
    changeProfilePicContainer.style.display = "flex";

    setTimeout(() => {
        changeProfilePicDiv.classList.add("fullscale");
        changeProfilePicDiv.classList.remove("shrink");
    }, 0);
}

closeChangeProfilePicBtn.addEventListener('click', closeChangeProfilePic);
changeImage.addEventListener('click', openChangeProfilePic);
mobileChangeImage.addEventListener('click', openChangeProfilePic);
