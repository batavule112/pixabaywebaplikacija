var page = 1;
var imageType = "all";
var orient = "all";
var category = "all";
var res = 12;
var order = "popular";
var timeout;
var pagination = document.getElementsByClassName('pagination');
for ( var p = 0; p < pagination.length; p++) {
	pagination[p].style.display = 'none';
}
function searchClean() {
	grid.masonry('destroy');
	$(".grid").children('div').remove();
	page = 1;
	search();
}
document.getElementById('search').addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
    searchClean();
    } 
});
function search (){
	var url = "https://pixabay.com/api/?key=7964595-ef854d08be69ff790495f4514&order="+ order +"&page="+ page +"&per_page="+ res +"&category="+ category +"&orientation="+ orient +"&image_type="+ imageType +"&q=";
	var inputSearch = document.getElementById('search').value;
	var request = new XMLHttpRequest();
	request.open('GET', url + inputSearch, true);
	request.onload = function(){
		if(this.status === 200){
			var data = JSON.parse(this.responseText);
			string = "";
			string += "<div class='grid-sizer'>";
			string += "</div>";
			for(var i = 0; i<data.hits.length; i++) {
			var content = data.hits[i];
			string += "<div class='col-md-3 col-sm-6 grid-item'>";
			string += "<a class='center'href='"+ content.webformatURL +"' data-fancybox='images' data-caption='Tags: "+content.tags+"<br>Submited by: "+content.user+"'>";
			string += "<img src='"+ content.webformatURL +"'/>";
			string += "</a>";
			string += "<div class='info'>";
			string += "<div class='likes'>";
			string += "<i class='fas fa-thumbs-up'></i>"
			string += "<h6>" + content.likes + "</h6>";
			string += "</div>";
			string += "<div class='rest'>";
			string += "<i class='fas fa-eye'></i>";
			string += "<h6>" + content.views + "</h6>";
			string += "</div>";
			string += "</div>";
			string += "</div>"; }
			var el = document.getElementsByClassName('grid')[0];
			el.innerHTML = string;
			fadeIn(el);
				grid.imagesLoaded().progress( function() {
				  grid.masonry(masonryOptions);
				});
				var numOfPages = Math.round(data.totalHits / res);
				document.getElementsByClassName('track')[0].innerHTML = page+" / "+numOfPages;
				document.getElementsByClassName('track')[1].innerHTML = page+" / "+numOfPages;
				for ( var p = 0; p < pagination.length; p++) {
					pagination[p].style.display = 'none';
					if ( numOfPages > 1 ) {
						pagination[p].style.display = 'flex';
					} else  pagination[p].style.display = 'none';
				}
				if ( page == 1 ) {
					document.getElementsByClassName('prev')[0].style.display = 'none';
					document.getElementsByClassName('prev')[1].style.display = 'none';
				} else {
					document.getElementsByClassName('prev')[0].style.display = 'block';
					document.getElementsByClassName('prev')[1].style.display = 'block';
				}
				if ( page == numOfPages ) {
					document.getElementsByClassName('next')[0].style.display = 'none';
					document.getElementsByClassName('next')[1].style.display = 'none';
				} else {
					document.getElementsByClassName('next')[0].style.display = 'block';
					document.getElementsByClassName('next')[1].style.display = 'block';
				}
			}
		}
	request.send();
	setInterval(function(){
	$('.gfirst').fadeIn(2000, function(){
	$('.gfirst').fadeOut(2000);
		});
	});
}
var masonryOptions = {
	itemSelector: '.grid-item',
	percentPosition: true,
	columnWidth: '.grid-sizer'
};
var grid = $('.grid');
function next() {
	grid.masonry('destroy');
	$(".rezultati").children('div').remove();
	page = page+1;
	search();
}
function prev(){
	grid.masonry('destroy');
	$(".rezultati").children('div').remove();
	page = page-1;
	search();
}
$('#type').change(function(){
 imageType = $('#type option:selected').val();
});
$('#orient').change(function(){
 orient = $('#orient option:selected').val();
});
$('#category').change(function(){
 category = $('#category option:selected').val();
});
$('#res').change(function(){
 res = $('#res option:selected').val();
});
$('#order').change(function(){
 order = $('#order option:selected').val();
});
var inner = $('.jumbotron').outerHeight();
var outer = $('.jumbotron1').outerHeight();
$('.as').click(function(){
	$('.advanced-search').slideToggle(500);
	$('.jumb-up').toggleClass('jumb-down');
});
var count = 0;
var images = ["img/bg1.jpg", "img/bg2.jpg", "img/bg3.jpg", "img/bg4.jpg"];
var image = $('.bg-jumb');
image.css("background-image", "url("+ images[count++] +")");
setInterval(function(){
	image.fadeOut(500, function(){
		image.css("background-image", "url("+ images[count++] +")");
		image.fadeIn(500);
	});
	if(count == images.length){
		count = 0;
	}
}, 5000);

// var box = document.getElementsByClassName('b-outer');
// for ( var b = 0; b < box.length; b++ ) {
// 	box[b].addEventListener("mouseover", function( event ) {
// 		var el = this.previousElementSibling.children[0];
// 		fadeIn(el);
// 	});
// 	box[b].addEventListener("mouseout", function( event ) {
// 		console.log('out');
// 	});
// }

$('.box').mouseover(function(){
	$(this).siblings('div').children('h4').fadeIn(700);
});
$('.box').mouseleave(function(){
	$(this).siblings('div').children('h4').fadeOut(700);
});
function categoryPicker(cat) {
	var value = cat.getAttribute("data-category-type");
	category = value;
	searchClean();
}
function fadeIn(el) {
  el.style.opacity = 0;
  el.style.display = 'block';
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 1000;
    last = +new Date();
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
}
