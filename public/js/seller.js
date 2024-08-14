document.addEventListener('DOMContentLoaded', (event) => {
    const navOptions = document.querySelectorAll('.nav-option');
    const tabContents = document.querySelectorAll('.tab-content');

    navOptions.forEach(option => {
        option.addEventListener('click', () => {

            navOptions.forEach((opt)=>{
                opt.classList.remove('active')
            });


            option.classList.add('active');

            tabContents.forEach(content => content.style.display = 'none');

            const tab = option.getAttribute('data-tab');
            document.getElementById(tab).style.display = 'block';
        });
    });
});



let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click", () => {
    nav.classList.toggle("navclose");
})
