
/////////////////////////////////////////// gear Settings

let settingsBox = document.querySelector(".settings-box");
let gearBox = document.querySelector(".gear-settings");
let gearBoxicon = document.querySelector(".gear-settings i");

gearBox.addEventListener("click", function() {
    settingsBox.classList.toggle("open");
    gearBoxicon.classList.toggle("fa-spin");
})

//////////////////////////////////////////////////////////////////  bullets

let allBullets = document.querySelectorAll(".nav-bullets .bullet");

let liTitles = document.querySelectorAll(".landing-page .header-area ul li");

function scrollTosection(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click" , (e) => {
    
            document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
    
                behavior: "smooth"
    
            });
    
        })
    })
}
scrollTosection(allBullets);
scrollTosection(liTitles);

////////////////////////////////////////////////////////////////////////////////////////////  colors & colors storage
let listsColors = document.querySelectorAll(".colors-list li");
let colorInLocalStorage = window.localStorage.getItem("color");

listsColors.forEach(li=> {
    li.classList.remove("active");
    if (li.dataset.color === colorInLocalStorage) li.classList.add("active"); 
});

listsColors.forEach(list=>{
    list.addEventListener("click",function(e) {
        switchActive(e);
        document.documentElement.style.setProperty("--textcolor",this.dataset.color)
        window.localStorage.setItem("color",`${this.dataset.color}`);
    });
});
document.documentElement.style.setProperty("--textcolor",colorInLocalStorage)


//////////////////////////////////////////////////////////////////////////////////// select landing photo
let landingPage = document.querySelector(".landing-page");
let arrOfImages = ["images/1.jpg","images/2.jpg","images/3.jpg","images/4jpg.jpg","images/5.jpg"];
let count = 0;

// variable to set the interval


let backgroundInterval;
let backgroundOption = true;
let backgroundLocalItem = window.localStorage.getItem("background-option");

if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
}

// function to rundomize the image
function rundomize() {
if (backgroundOption === true) {
    
    backgroundInterval = setInterval(()=>{
            landingPage.style.backgroundImage = `url('${arrOfImages[count]}')`;
            count=(count+1)%arrOfImages.length;
            // if (count === arrOfImages.length)count=0;
        },2000)
}
}
    ////////////////////////////////////////////////////////////////////////////////random background
let btnRandom = document.querySelectorAll(".random-background span");

btnRandom.forEach(btn => {
    btn.addEventListener("click",(e)=>{
        
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            rundomize();
            window.localStorage.setItem("background-option",true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            window.localStorage.setItem("background-option",false);
            
        }
        switchActive(e);
        
    })
})

rundomize();

//////////////////////////////////////////////////////////////////////////////////////// increase progress

let skillsSection = document.querySelector(".skills");

let skillsBox = document.querySelectorAll(".skills .skill-box .skill-progress span");

window.onscroll = function() {
    if (window.scrollY >= skillsSection.offsetTop-200) {
        skillsBox.forEach(span => {
            let dataWidth = span.dataset.progress;
            span.style.width = `${dataWidth}`;
        })
    }
}

///////////////////////////////////////////////////////////////////////////////////// our gallery

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener("click",(e)=>{
        // create pop up overlay
        let overLay = document.createElement("div");
        overLay.className = "popup-overLay";
        document.body.appendChild(overLay);

        // create the pop up box
        let popUpBox = document.createElement("div");

        popUpBox.className = "popup-box";

        let createImg = document.createElement("img");
        createImg.src = img.src;

        // let imgUrl = img.getAttribute("src");
        // let putUrlIntoImg = createImg.setAttribute("src",`${imgUrl}`);

        popUpBox.appendChild(createImg);

        document.body.appendChild(popUpBox);

        // create the close span
        let closeButton = document.createElement("span");

        let closeButtonText = document.createTextNode("X");

        closeButton.appendChild(closeButtonText);

        closeButton.className = "close-button";

        popUpBox.prepend(closeButton);

        // add alt  text on photo

        if (img.alt !== null) {
            let imgHeading = document.createElement("h3");
            
            let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popUpBox.prepend(imgHeading);
        }

    })
})

document.addEventListener("click",function(e) {
    if (e.target.className === "close-button") {
        e.target.parentNode.remove();

        document.querySelector(".popup-overLay").remove();
    }
})

//////////////////////////////////////////////////////////////////////////  show and hide bullets
let btnShowAndHide = document.querySelectorAll(".opion-box .view-bullte span");

let sectionOfBullet = document.querySelector(".nav-bullets");

let getBulletFromStorage = window.localStorage.getItem("bulletsOption");


if (getBulletFromStorage !== null) {
    btnShowAndHide.forEach(span => {
        span.classList.remove("active");
    })

    if(getBulletFromStorage === '1') {
        sectionOfBullet.style.opacity=`${1}`;

        document.querySelector(".opion-box .view-bullte .yes").classList.add("active");
    } else {
        sectionOfBullet.style.opacity=`${0}`;

        document.querySelector(".opion-box .view-bullte .no").classList.add("active");
    }

}


btnShowAndHide.forEach(btn => {
    btn.addEventListener("click",(e)=>{
        
        if (e.target.dataset.bullet === "yes") {
            sectionOfBullet.style.opacity=`${1}`;

            

            window.localStorage.setItem("bulletsOption",`${1}`);

            
        } else {
            

            sectionOfBullet.style.opacity=`${0}`;
            
            window.localStorage.setItem("bulletsOption",`${0}`);
            
        }
        switchActive(e);
    })
})

////////////////////////////////////////////////////////////////////////////  switch active class

function switchActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(evOne=>{
        evOne.classList.remove("active");
            })
            ev.target.classList.add("active");
}

////////////////////////////////////////////////////////////////////////////  reset option 

let resetBtn = document.querySelector(".reset-option");

resetBtn.addEventListener("click",(e)=> {

    localStorage.removeItem("color");
    localStorage.removeItem("background-option");
    localStorage.removeItem("bulletsOption");
    location.reload();
});

///////////////////////////////////////////////////////////////////////  toggle icone

let rightToggle = document.querySelector(".header-area .links-container .toggle-menu");
let leftToggle = document.querySelector(".middleList .toggle-menu");

let showRightToggle = document.querySelector(".header-area .links-container .links"); 
let showLeftToggle =  document.querySelector(".middleList .second-links");

function burgerIcone (icone , list) {
    icone.onclick = function () {
        icone.classList.toggle("arrow");
        list.classList.toggle("open");
    }
}

document.addEventListener("click",(e)=>{
    // console.log(e.target)
    if (e.target !== rightToggle || e.target !== leftToggle) {
        console.log("it is not a button");
    }
})


// if (showRightToggle.classList.contains("open")) {
//     window.onclick = function() {
//             console.log(3)
//             rightToggle.classList.remove("arrow");
//             showRightToggle.classList.remove("open");
//         }
//     }

burgerIcone(rightToggle,showRightToggle);
burgerIcone(leftToggle,showLeftToggle);
