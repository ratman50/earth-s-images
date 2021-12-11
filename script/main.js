const KEY = "c4AgUtczgge03YOPyEDwlrfuF5hU0ds11fRBwY9O";

let src, month, date, year, nameIm, dateIm;
// const img = document.querySelector(".image");
const namePict = document.querySelectorAll(
  "main .inner .contents .coord .image-information .content .download a"
);
const caption = document.querySelector(".caption");
let direction = document.querySelectorAll(".contents .picture i");
let frag = new DocumentFragment();
const containerSlider = document.querySelector(".slideshow-container");

fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${KEY}`)
  .then((reponse) => {
    return reponse.json();
  })
  .then((data) => {
    console.log(data);
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      date = new Date(element.date);
      month = date.getMonth() + 1;
      dateIm = date.getDate();
      let fin = "" + dateIm;
      fin = dateIm < 10 ? "0" + fin : fin;
      year = date.getFullYear();
      nameIm = element.image;
      src = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${fin}/png/${nameIm}.png`;
      let sliders = document.createElement("div");
      sliders.className = "slider fade";
      let img = document.createElement("img");
      img.src = src;
      sliders.append(img);
      frag.append(sliders);
    }
    containerSlider.append(frag);
    let slideIndex = 1;
    showSlide(slideIndex);
    function showSlide(n) {
      let sli = document.querySelectorAll(".slider.fade");
      if (n <= 1) {
        n = 1;
        direction[0].style.color = "grey";
      } else {
        direction[0].style.color = "";
      }
      if (n >= sli.length) {
        n = sli.length;
        direction[1].style.color = "grey";
      } else direction[1].style.color = "";

      for (let index = 0; index < sli.length; index++) {
        const element = sli[index];
        element.style.display = "none";
      }
      sli[n - 1].style.display = "";
      for (let k = 0; k < namePict.length; k++) {
        const element = namePict[k];
        element.href = sli[slideIndex - 1].firstChild.src;
      }
      caption.firstElementChild.innerText = data[slideIndex - 1].caption;
      namePict[0].innerText = data[slideIndex].image;
    }
    direction[0].addEventListener("click", () => showSlide(--slideIndex));
    direction[1].addEventListener("click", () => showSlide(++slideIndex));
    // date = new Date(data[0].date);
    // pict = data[0].image;
    // console.log(date.getDate());
    // img.src = `https://epic.gsfc.nasa.gov/archive/natural/${date.getFullYear()}/${
    //   date.getMonth() + 1
    // }/0${date.getDate()}/png/${pict}.png`;
  });