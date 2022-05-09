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
const workareaPosts = document.querySelectorAll(".workareaPosts");
const NoPosts = document.querySelector(".NoPosts");
const confirmDeleteContainer = document.querySelector(".confirmDeleteContainer");
const confirmDelete = document.querySelector(".confirmDelete");
const closeConfirmBtn = document.querySelector(".closeConfirm");
const okay = document.querySelector(".okay");
const cancel = document.querySelector(".cancel");

const closeConfirm = () => {
    confirmDelete.classList.add("shrink");
    confirmDelete.classList.remove("fullscale");

    setTimeout(() => {
        confirmDeleteContainer.style.display = "none";
    }, 100);
}

closeConfirmBtn.addEventListener('click', closeConfirm)

const ConfirmPostDelete = () => {
    confirmDeleteContainer.style.display = "flex";

    setTimeout(() => {
        confirmDelete.classList.add("fullscale");
        confirmDelete.classList.remove("shrink");
    }, 0);

    okay.addEventListener('click', ()=>{
        closeConfirm();
        return true;
    });

    cancel.addEventListener('click', ()=>{
        closeConfirm();
        return false;
    });
    return true;
}


/**
 * This point handles the population of blog posts and also side bar blog post list
 */
let i = 0;

window.addEventListener('load', function(){
    fetch("../api/posts.php")
    .then(res => res.json())
    .then((data)=>{
        if(data == "No Posts Available"){
            NoPosts.style.display = "block";
        }
        else if(data == "Error Getting Posts"){
            console.log(data);
        }
        else if(data == "Error Connecting To Database"){
            console.log(data);
        }
        else{
            if(data.length > 1){
                if(NoPosts){
                    NoPosts.style.display = "none";
                }
                i = data.length;
                data.forEach((dataPost) => {
                    let {id, postTitle, postCategory, datePosted, postBody} = dataPost;

                    let postTime = datePosted.split(" ")[1];
                    let postDate = datePosted.split(" ")[0];
                    let displayTime = postTime.split(":")[0];
                    displayTime += ":" + postTime.split(":")[1];

                    let postdiv = `<div class="posts">
                                        <button class="postDeleteBtn" title="Delete Post"><i class="fa fa-trash"></i></button>
                                        <div class="imageDiv">
                                            <img src="" alt="Blog Post Image" class="BlogPostImage">
                                        </div>
                                        <div class="BlogInfo">
                                            <h3 class="BlogTitle">${postTitle}</h3>
                                            <p class="theDate">${postDate}</p>
                                            <p class="theTime">${displayTime}</p>
                                        </div>
                                    </div>`;
                    allPosts.innerHTML += postdiv;
                });

                const postDeleteBtn = document.querySelectorAll(".postDeleteBtn");
                const Posts = document.querySelectorAll(".posts");

                postDeleteBtn.forEach((postDelBtn)=>{
                    postDelBtn.addEventListener('click', ()=>{
                        let postHeader = postDelBtn.parentElement.childNodes[5].childNodes[1].innerHTML;

                        if(ConfirmPostDelete()){
                            fetch("../api/deletepost.php", {
                                method: "POST", 
                                headers: {
                                    "Content-Type": "application/json"
                                }, 
                                body: JSON.stringify({
                                    "Title": postHeader
                                })
                            })
                            .then(res=>res.json())
                            .then((data)=>{
                                if(data == "Success"){
                                    postDelBtn.parentElement.remove();
                                }
                                else{
                                    console.log(data);
                                }
                            })
                            .catch((error)=>{
                                console.log(error);
                            })
                        }
                    })
                })
            }
            else{
                i = data.length;
                if(NoPosts){
                    NoPosts.style.display = "none";
                }
                let {id, postTitle, postCategory, datePosted, postBody} = data;

                let postTime = datePosted.split(" ")[1];
                let postDate = datePosted.split(" ")[0];

                let postdiv = `<div class="posts">
                                    <button class="postDeleteBtn" title="Delete Post"><i class="fa fa-trash"></i></button>
                                    <div class="imageDiv>
                                        <img src="" alt="Blog Post Image" class="BlogPostImage">
                                    </div>
                                    <div class="BlogInfo">
                                        <h3>${postTitle}</h3>
                                        <p class="theDate">${postDate}</p>
                                        <p class="theTime">${displayTime}</p>
                                    </div>
                                </div>`;

                allPosts.innerHTML += postdiv;
            }
        }
    })
    .catch((error)=>{
        console.log(error);
    })
});
// End of population code.


//Variables to store the title and category
let title = "", category = "", postsBody = "";

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
const postBtn = document.querySelector(".post");
const postBodyElement = document.querySelector(".postBody");

postsBody = postBodyElement.value;
// postBody = postBody.split("\n").join("<br/>");

postBtn.addEventListener('click', (e)=>{
    postBtn.innerHTML = '<i class="fa fa-spinner"></i>';

    let postDetails = {
        "Title": title,
        "Category": category,
        "Body": (postBodyElement.value).split("\n").join("<br/>")
    };

    console.log(postBodyElement.value);
    fetch("../api/addpost.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postDetails)
    })
    .then(res=>res.json())
    .then((data)=>{
        if(data == "Success"){
            postBtn.innerHTML = 'POST <i class="fa fa-plus"></i>';
            location.reload();
        }
        else{
            postBtn.innerHTML = 'ERROR!!';
            setTimeout(() => {
                postBtn.innerHTML = 'POST <i class="fa fa-plus"></i>';
            }, 4000);
        }
    })
    .catch((error)=>{
        console.log(error);
        postBtn.innerHTML = 'ERROR!';
        setTimeout(() => {
            postBtn.innerHTML = 'POST <i class="fa fa-plus"></i>';
        }, 4000);
    })
})



// Change Profile Picture Functions
const changeProfilePicContainer = document.querySelector(".changeProfilePicContainer");
const changeProfilePicDiv = document.querySelector(".changeProfilePicDiv");
const closeChangeProfilePicBtn = document.querySelector(".closeChangeProfilePic");
const changeImage = document.querySelector(".changeImage");
const mobileChangeImage = document.querySelector(".mobileChangeImage");
const ImageToPreview = document.querySelector(".ImageToPreview");
const selectProfileImage = document.querySelector(".selectProfileImage");
const inpFile = document.getElementById("File");
const defaultText= document.querySelector(".defaultText");

const closeChangeProfilePic = () =>{
    changeProfilePicDiv.classList.add("shrink");
    changeProfilePicDiv.classList.remove("fullscale");
    if(defaultText.style.display !== null && ImageToPreview.style.display !== null){
        defaultText.style.display = null;
        ImageToPreview.style.display = null;
        ImageToPreview.setAttribute("src", "");
    }

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

inpFile.addEventListener("change", function(){
    const file = this.files[0];

    if(file){
        const reader = new FileReader();

        defaultText.style.display = "none";
        ImageToPreview.style.display = "block";

        reader.addEventListener("load", function(){
            ImageToPreview.setAttribute("src", this.result);
        });

        reader.readAsDataURL(file);
    }
    else{
        defaultText.style.display = null;
        ImageToPreview.style.display = null;
        ImageToPreview.setAttribute("src", "");
    }
});
