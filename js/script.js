window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabContents = document.querySelectorAll(".tab_content"),
    tabPenrents = document.querySelector(".tabheader__items");
  function hideTabContents() {
    tabContents.forEach((tabContent) => {
      tabContent.classList.add("hide");
      tabContent.classList.remove("show");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }
  function showTabContent(index = 0) {
    tabContents[index].classList.add("show", "fade");
    tabContents[index].classList.remove("hide");
    tabs[index].classList.add("tabheader__item_active");
  }
  hideTabContents();
  showTabContent();
  tabPenrents.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, index) => {
        if (target === tab) {
          hideTabContents();
          showTabContent(index);
        }
      });
    }
  });

  //   loader-wrapper
  const loaderWrapper = document.querySelector(".loader-wrapper");
  setTimeout(() => {
    loaderWrapper.style.display = "none";
  }, 3000);

  // timer
  const deadline = "2026-12-31T00:00:00";
  function formatNumber(number) {
    if (number >= 0 && number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  }
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const time = Date.parse(endtime) - Date.parse(new Date());
    if (time <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      ((days = Math.floor(time / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((time / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((time / (1000 * 60)) % 60)),
        (seconds = Math.floor((time / 1000) % 60)));
    }

    return {
      totalTime: time,
      days,
      hours,
      minutes,
      seconds,
    };
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();
    function updateClock() {
      const time = getTimeRemaining(endtime);

      days.textContent = formatNumber(time.days);
      hours.textContent = formatNumber(time.hours);
      minutes.textContent = formatNumber(time.minutes);
      seconds.textContent = formatNumber(time.seconds);

      if (time.totalTime <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);

  // Modal

  const modalOpenBtns = document.querySelectorAll("[data-modal]"),
    modal =document.querySelector(".modal"),
    modalCloseBtn= document.querySelector('[data-modal-close]')


  function openModal (){
    modal.classList.add("show" , "fade")
      modal.classList.remove("hide")
      document.body.style.overflow="hidden"
      clearInterval(ModalTimerId)
  }
  function closeModal (){
    modal.classList.add("hide")
    modal.classList.remove("show")
    document.body.style.overflow=""
  }

  modalOpenBtns.forEach(btn =>{
    btn.addEventListener("click" , openModal)
  })
  modalCloseBtn.addEventListener("click", closeModal)


  modal.addEventListener("click" ,(event)=>{
    if(event.target === modal){
      closeModal()
    }
  })

  document.addEventListener("keydown",(event)=>{
    if(event.code==="Escape" && modal.classList.contains("show") ){
      closeModal()
    }
  })


  const ModalTimerId= setTimeout(openModal,5000)
});
