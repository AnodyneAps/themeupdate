(function(a){
	$('.youtube-cover-image, .youtube-button').on('click', function (e) {
		$('.youtube-cover-image , .youtube-button').hide();
	});
	// scroll smothing for readmore button
	$('.btn-readmore').on('click', function () {
		$('html, body').animate({ scrollTop: $(this.hash).offset().top - 80 }, 1000);
		return false;
	});

})(jQuery);



//Men size chart functionality
const btn = document.getElementById("men__sizes");
const DOM = document.querySelector(".sizes__DOM");
const loading = `<div class="loader"><img src="https://cdn.shopify.com/s/files/1/0539/3527/6214/files/sizes-loading.gif?v=1660724792" alt="loading"></div>`;
const url = "https://cdn.shopify.com/s/files/1/0539/3527/6214/files/men_sizes.json?v=1660720097";



window.addEventListener("load", async ()=>{
	try{
		const response = await fetch(url);
		const data = await response.json();
		displayItems(data);
	}catch(error){
		displayError(error);
	}
});

function displayItems(items){

	btn.addEventListener("click", (e)=>{
		const btnWeight = e.target.value;
		const displayData = items.map((item)=>{
			const { id, size } = item;
			if(btnWeight == ''){
				return
			} else {
				if(btnWeight === id){
					return `<p class="recommended__size">We recommend size: <span class="size__recommendation">${item.size}</span> for men similar to your weight.</p>`
				}
			}
		}).join(" ");
		setTimeout(()=>{
			if(btnWeight == ''){
				return
			} else{
				DOM.innerHTML = loading;
				setTimeout(()=>{
					if(btnWeight < 49 ){
						DOM.innerHTML = `<p class="recommended__size">Please write weight number only for adults. </p>`
					} else if (btnWeight > 125){
						DOM.innerHTML = `<p class="recommended__size">Please write weight number between 49 - 125kg. </p>`
					}else{
						DOM.innerHTML = displayData;
					}
				}, 1000)
			}
		}, 1000)

		})
}

function displayError(err){
	DOM.innerHTML = `<p class="recommended__size">>There was an error ${err}</p>`;
}

// variables for accordios
var accordionBtn = document.querySelectorAll('.accordion__title');
var allTexts = document.querySelectorAll('.accordion__flex');
var accIcon = document.querySelectorAll('.accIcon');

// event listener
accordionBtn.forEach(function (el) {
	el.addEventListener('click', toggleAccordion)
});

// function
function toggleAccordion(el) {
	var targetText = el.currentTarget.nextElementSibling.classList;
	var targetAccIcon = el.currentTarget.children[0];
	var target = el.currentTarget;

	if (targetText.contains('accordion-show')) {
		targetText.remove('accordion-show');
		targetAccIcon.classList.remove('anime');
		target.classList.remove('accordionTitleActive');
	}
	else {
		accordionBtn.forEach(function (el) {
			el.classList.remove('accordionTitleActive');

			allTexts.forEach(function (el) {
				el.classList.remove('accordion-show');
			})

			accIcon.forEach(function (el) {
				el.classList.remove('anime');
			})

		})

		targetText.add('accordion-show');
		target.classList.add('accordionTitleActive');
		targetAccIcon.classList.add('anime');
	}
}


const closeBtn = document.querySelector(".close__btn");
const flipBar = document.querySelector(".flip-container");

window.addEventListener("scroll", () => {
	let scroll = this.scrollY;
	if(scroll > 699){ flipBar.classList.add("fixed-bottom")
	}
	else if(scroll < 500) {flipBar.classList.remove("fixed-bottom")
}
	
});
if(typeof closeBtn != 'undefined' && closeBtn ){

closeBtn.addEventListener("click", (e)=> {
	localStorage.setItem("className", "show-flip");
	let classFromLocalStorage = localStorage.getItem("className");
	if (!classFromLocalStorage){
		flipBar.classList.add("show-flip")
	}
	flipBar.classList.remove("show-flip");
});
}
const checkCookie = () => {
	let classFromLocalStorage = localStorage.getItem("className");
	if(classFromLocalStorage == "show-flip") {
		flipBar.classList.add("hide");
		flipBar.classList.remove("show-flip");
	} else {
		flipBar.classList.add("show-flip");
		flipBar.classList.remove("hide");
	}
}

window.onload = () =>{
	setTimeout(()=>{
		checkCookie();
	},1000)
}


// clear localStorage after some time 
let  minute = 1; // to clear the localStorage after 1 minute
               // (if someone want to clear after 1 hour multiply by extra 60 or if you want to add more minuttes simply add 10 infront of minute variable)
let now = new Date().getTime();
var setupTime = localStorage.getItem('setupTime');
if (setupTime == null) {
    localStorage.setItem('setupTime', now)
} else {
    if(now-setupTime > minute*60*1000) {
       localStorage.removeItem("className");
        localStorage.setItem('setupTime', now);
    }
}

setInterval(() => {
	//set day hours
	const d = new Date();
	const setTimeOfDay = d.getHours();
	//set day hours
	let	date1 = new Date().setHours(08,59,59) 
	let date2 =  new Date().setHours(14,59,59) 
	let date3 = new Date().setHours(32,59,59) 

  const currentDate = d;
  const timeBetweenDates1 = Math.ceil(( date1 - currentDate ) / 1000)
	const timeBetweenDates2 = Math.ceil(( date2 - currentDate ) / 1000);
	const timeBetweenDates3 = Math.ceil(( date3 - currentDate ) / 1000)
			if(setTimeOfDay >= 0 && setTimeOfDay < 9){
				if(timeBetweenDates1 < 0) return
				flipAllCards(timeBetweenDates1)
			}
			else if(setTimeOfDay >= 9 && setTimeOfDay < 15){
				if(timeBetweenDates2 < 0) return
				flipAllCards(timeBetweenDates2)
			}
			else{
				if(timeBetweenDates3 < 0) return
				flipAllCards(timeBetweenDates3)
			}
	}, 1000)


function flipAllCards(time) {
  const seconds = time % 60
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600)

  flip(document.querySelector("[data-hour-tens]"), Math.floor(hours / 10))
  flip(document.querySelector("[data-hour-ones]"), hours % 10)
  flip(document.querySelector("[data-minute-tens]"), Math.floor(minutes / 10))
  flip(document.querySelector("[data-minute-ones]"), minutes % 10)
  flip(document.querySelector("[data-second-tens]"), Math.floor(seconds / 10))
  flip(document.querySelector("[data-second-ones]"), seconds % 10)
}

function flip(flipCard, newNumber){

	const topHalf = flipCard.querySelector(".top");
	const startNumber = parseInt(topHalf.textContent);
	if(newNumber === startNumber) return 

	const bottomHalf = flipCard.querySelector(".bottom");
	const topFlip = document.createElement("div");
	topFlip.classList.add("top-flip");
	const bottomFlip = document.createElement("div");
	bottomFlip.classList.add("bottom-flip");


topHalf.textContent = startNumber;
bottomHalf.textContent = startNumber;
topFlip.textContent = startNumber;
bottomFlip.textContent = newNumber;



topFlip.addEventListener("animationstart", e =>{
	topHalf.textContent = newNumber;
})
topFlip.addEventListener("animationend", e =>{
	topFlip.remove();
})

bottomFlip.addEventListener("animationend", e =>{
	bottomHalf.textContent = newNumber;
	bottomFlip.remove();
})

flipCard.append(topFlip, bottomFlip);
}

