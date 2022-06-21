async function theCountry() {
    let countOfCountry;
    const countries = document.querySelector(".countries");
    await fetch("https://restcountries.com/v3.1/all")
        .then((repo) => repo.json())
        .then((repo) => {
            repo.length =
                countOfCountry == "All" || countOfCountry == null
                    ? repo.length
                    : countOfCountry;
            return repo;
        })
        .then((repo) => {
            repo.forEach((con) => {
                countries.innerHTML += `
        <div class="country" data-reg="${con.region}">
                    <div class="image-box">
                        <img src="${con.flags.png}"
                            alt="">
                    </div>
                    <div class="info">
                        <h3>${con.name.common}</h3>
                        <p>Population: <span>${con.population.toLocaleString()}</span></p>
                        <p>Region: <span>${con.region}</span></p>
                        <p>Capital: <span>${con.capital}</span></p>
                    </div>
                    <div hidden class="hidden_info">
                    <span>${
                        con.altSpellings[1] == undefined
                            ? con.name.common
                            : con.altSpellings[1]
                    }</span>
                    <span>${con.population.toLocaleString()}</span>
                    <span>${con.region}</span>
                    <span>${con.subregion}</span>
                    <span>${con.capital}</span>
                    <span>${con.tld}</span>
                    <span>${con.borders != undefined ? con.borders : ""}</span>
                    </div>
                </div>
        `;
            });
        })
        .catch((rej) => {
            countries.innerHTML = `<div class='Error'>There Error in The Website Please Try Again Later</div>
                `;
            console.log(rej);
        });

    let cont = document.querySelectorAll(".countries .country");
    // the list start
    let the_list = document.getElementById("the_list");
    the_list.addEventListener("change", (e) => {
        cont.forEach((div) => {
            if (the_list.value !== "All") {
                if (div.dataset.reg == the_list.value) {
                    div.style.display = "block";
                } else {
                    div.style.display = "none";
                }
            } else {
                div.style.display = "block";
            }
        });
    });
    // the list End

    // the search bar start
    let search_bar = document.getElementById("search_bar");
    let title = document.querySelectorAll(".info h3");
    search_bar.addEventListener("input", () => {
        title.forEach((e) => {
            if (search_bar.value != "") {
                if (
                    e.innerText
                        .toLowerCase()
                        .includes(search_bar.value.toLowerCase())
                ) {
                    e.parentElement.parentElement.style.display = "block";
                } else {
                    e.parentElement.parentElement.style.display = "none";
                }
            } else {
                e.parentElement.parentElement.style.display = "block";
            }
        });
    });
    // the search bar End

    // the detail page start
    function createOverlay() {
        cont.forEach((div) => {
            div.addEventListener("click", () => {
                let header = document.querySelector("header");

                header.classList.toggle("active");

                let details = document.createElement("div");
                details.id = "overlay";
                document.querySelector("main").after(details);

                let zclone = div.cloneNode(true);

                details.innerHTML = `
                <div id="overlay">
                <div class="container">
                    <nav>
                        <div id="backbtn" class="btn">
                            <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" class='light_mode_icon' viewBox="0 0 512 512"><path fill='#222' d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z"/></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class='dark_mode_icon' viewBox="0 0 512 512"><path fill='#fff' d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z"/></svg>
                            </div>
                            <span>Back</span>
                        </div>
                    </nav>
                    <section>
                        <div class="image-box">
                            <img src="${zclone.childNodes[1].childNodes[1].src}" alt="">
                        </div>
                        <div class="info">
                            <div class="title">${zclone.childNodes[3].childNodes[1].innerText}</div>
                            <div class="text">
                                <div class="left">
                                    <ul>
                                        <li><span>Native Name:</span> ${zclone.childNodes[5].childNodes[1].innerText}</li>
                                        <li><span>population:</span> ${zclone.childNodes[5].childNodes[3].innerText}</li>
                                        <li><span>Region:</span> ${zclone.childNodes[5].childNodes[5].innerText}</li>
                                        <li><span>Sub Region:</span> ${zclone.childNodes[5].childNodes[7].innerText}</li>
                                        <li><span>Capital:</span> ${zclone.childNodes[5].childNodes[9].innerText}</li>
                                    </ul>
                                </div>
                                <div class="right">
                                    <ul>
                                        <li><span>Top Level Domin:</span> ${zclone.childNodes[5].childNodes[11].innerText}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="border">
                                <div class="text">Border Countries:</div>
                                <ul id='borders_list'>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
                `;
                let border_list = document.getElementById("borders_list");
                let index = 0;
                zclone.childNodes[5].childNodes[13].innerText != ""
                    ? zclone.childNodes[5].childNodes[13].innerText
                          .split(",")
                          .forEach((e) => {
                              if (index < 3) {
                                  border_list.innerHTML += `<li>${e}</li>`;
                              } else {
                                  border_list.innerHTML += ``;
                              }
                              index++;
                          })
                    : (border_list.innerHTML = `<li>none</li>`);
                let backBtn = document.getElementById("backbtn");
                backBtn.addEventListener("click", () => {
                    backBtn.parentElement.parentElement.parentElement.parentElement.remove();
                    header.classList.remove("active");
                });
            });
        });
    }
    createOverlay();

    // the detail page End
}
theCountry();

let footerYear = document.querySelector("footer .container .year");
let theYear = new Date();
footerYear.innerHTML = theYear.getFullYear();
let footer_comment = document.createComment(
    "This project was implemented Abdullah Shaltout"
);
document.querySelector("footer").before(footer_comment);

function light_mode() {
    let mode_text = document.getElementById("mode_text");
    document.body.classList.toggle("light_mode");
    if (
        mode_text.innerText.toLocaleLowerCase().replace(" ", "") == "darkmode"
    ) {
        mode_text.innerText = "Light Mode";
        localStorage.setItem("the_mode", "Dark Mode");
    } else {
        mode_text.innerText = "Dark Mode";
        localStorage.setItem("the_mode", "Light Mode");
    }
}

let light_mode_btn = document.querySelector(".the-mode");
light_mode_btn.addEventListener("click", () => {
    light_mode();
});

light_mode();
