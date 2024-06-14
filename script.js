let choose_img_button = document.querySelector(".choose_img button");
let choose_input = document.querySelector(".choose_img input");
let imgsrc = document.querySelector(".view_img img");
let filter_buttons = document.querySelectorAll(".icons_room button");
let slider = document.querySelector(".slider input")
let filter_name = document.querySelector(".filter_info .name");
let slider_value = document.querySelector(".filter_info .value");
let rotate_btns = document.querySelectorAll(".icons_room1 button");
let reset = document.querySelector(".reset");
let save = document.querySelector(".save")


let brightness = 100, contrast = 100, saturate = 100, invert = 0, blurr = 0 , Rotate = 0 , flip_x =1 , flip_y =1;




choose_img_button.addEventListener("click", () => choose_input.click())
choose_input.addEventListener("change", () => {
    let file = choose_input.files[0];
    if (!file) return;
    imgsrc.src = URL.createObjectURL(file);
    imgsrc.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disabled");
    });
})

filter_buttons.forEach((element) => {
    element.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active")
        element.classList.add("active");
        filter_name.innerText = element.id;

        if (element.id === "brightness") {
            slider.max = "200";
            slider.value = brightness;
            slider_value.innerText = `${brightness}`
        } else if (element.id === "contrast") {
            slider.max = "200";
            slider.value = contrast;
            slider_value.innerText = `${contrast}`
        } else if (element.id === "saturate") {
            slider.max = "200";
            slider.value = saturate;
            slider_value.innerText = `${saturate}`
        } else if (element.id === "invert") {
            slider.max = "100";
            slider.value = invert;
            slider_value.innerText = `${invert}`
        } else if (element.id === "blurr") {
            slider.max = "100";
            slider.value = blurr;
            slider_value.innerText = `${blurr}`
        }
        })
    })

slider.addEventListener("input", () => {
    slider_value.innerText = `${slider.value}%`;

    let sliderState = document.querySelector(".icons_room .active");
    if (sliderState.id === "brightness") {
        brightness = slider.value;
    } else if (sliderState.id === "contrast") {
        contrast = slider.value;
    } else if (sliderState.id === "saturate") {
        saturate = slider.value;
    } else if (sliderState.id === "invert") {
        invert = slider.value;
    } else if (sliderState.id === "blurr") {
        blurr = slider.value;
    }
        imgsrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blurr}px)`
    });

    rotate_btns.forEach((element)=>{
        element.addEventListener("click",()=>{
            if(element.id === "Rotateleft"){
                Rotate -=90;
            }else if(element.id = "Rotateright"){
                Rotate +=90;
            }else if(element.id = "flip_x"){
               flip_x = flip_x === 1 ? -1 : 1;
            }else if(element.id = "flip_y"){
                flip_y = flip_y === 1 ? -1 : 1;
            }
            imgsrc.style.transform = `rotate(${Rotate}deg) scale(${flip_x},${flip_y})`;
        })
    })

    save.addEventListener("click",()=>{
        brightness = "100";
        contrast = "100";
        saturate = "100";
        blurr = "0";
        invert = "0";
        Rotate = "0";
        flip_x = 1;
        flip_y = 1;

        imgsrc.style.transform = `rotate(${Rotate}deg) scale(${flip_x},${flip_y})`;
        imgsrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blurr}px)`
    })

    reset.addEventListener("click",()=>{
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = imgsrc.naturalWidth;
        canvas.height = imgsrc.naturalHeight;

        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blurr}px)`;
        ctx.scale(flip_x,flip_y);
        ctx.translate(canvas.width/2,canvas.height/2)
        ctx.drawImage(imgsrc, -canvas.width/2 , -canvas.height/2 , canvas.width , canvas.height);

        const link = document.createElement("a");
        link.download = "image.jpg";
        link.href = canvas.toDataURL();
        link.click();
    });