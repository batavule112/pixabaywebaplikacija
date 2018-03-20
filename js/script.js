var page = 1;
var pageV = 1;
var imageType = "all";
var videoType = "all";
var orient = "all";
var category = "all";
var categoryV = "all";
var res = 12;
var resV = 12;
var order = "popular";
var orderV = "popular";
var grid = $('.grid');
var gridv = $('.gridv');
var numOfPagesInputDelay = null;
var request = new XMLHttpRequest();
var paginationp = document.getElementsByClassName('pagip');
for ( var p = 0; p < paginationp.length; p++) {
	paginationp[p].style.display = 'none';
}
var paginationv = document.getElementsByClassName('pagiv');
for ( var v = 0; v < paginationv.length; v++) {
	paginationv[v].style.display = 'none';
}
function searchClean() {
	grid.masonry('destroy');
	page = 1;
	search();
}
document.getElementById('search').addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
    searchClean();
    } 
});
function search() {
	document.getElementsByClassName('grid')[0].classList.remove('fadeIn');
	numOfPagesInputDelay = null;
	var url = "https://pixabay.com/api/?key=7964595-ef854d08be69ff790495f4514&order="+ order +"&page="+ page +"&per_page="+ res +"&category="+ category +"&orientation="+ orient +"&image_type="+ imageType +"&q=";
	var inputSearch = document.getElementById('search').value;
	request.open('GET', url + inputSearch, true);
	request.onload = function(){
		if(this.status === 200){
			var data = JSON.parse(this.responseText);
			var string = "";
			for(var i = 0; i<data.hits.length; i++) {
			var content = data.hits[i];
			string += "<div class='col-md-3 col-sm-6 grid-item'>";
			string += "<a class='center' href='"+ content.webformatURL +"' data-fancybox='images' data-caption='Tags: "+content.tags+"<br>Submited by: "+content.user+"'>";
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
			document.getElementsByClassName('grid')[0].innerHTML = string;
			document.getElementsByClassName('grid')[0].classList.add('fadeIn');
				grid.imagesLoaded().progress( function() {
				  grid.masonry(masonryOptions);
				});
				var numOfPages = Math.round(data.totalHits / res);
				document.getElementsByClassName('track')[0].innerHTML = page+" / "+numOfPages;
				document.getElementsByClassName('nmbpg')[0].value = null;
				document.getElementsByClassName('nmbpg')[0].setAttribute('placeholder', page +" / " + numOfPages);
				for ( var p = 0; p < paginationp.length; p++) {
					paginationp[p].style.display = 'none';
					if ( numOfPages > 1 ) {
						paginationp[p].style.display = 'flex';
					} else  paginationp[p].style.display = 'none';
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
	document.getElementsByClassName('gfirst')[0].style.display = 'block';
}
document.getElementsByClassName('nmbpg')[0].addEventListener('keyup', function(){
	if(numOfPagesInputDelay != null) clearTimeout(numOfPagesInputDelay); 
	page = Number(document.getElementsByClassName('nmbpg')[0].value);
	grid.masonry('destroy');
	numOfPagesInputDelay = setTimeout(search, 1000);
	if ( page > 42 ) {
		page = 42;
	}
	if ( page < 1 ) {
		page = 1;
	}
	if ( isNaN(page) === true ) {
		page = 1;
	}
})
var masonryOptions = {
	itemSelector: '.grid-item',
	percentPosition: true,
	columnWidth: '.grid-item'
};
function next() {
	grid.masonry('destroy');
	page = page+1;
	search();
}
function prev(){
	grid.masonry('destroy');
	page = page-1;
	search();
}
$('.page-item').click(function(){
$("html, body").animate({
	scrollTop: $('.jumbotron').outerHeight()
}, 1500)
});
function valueChange() {
	imageType = document.getElementById('type').value;
	orient = document.getElementById('orient').value;
	category = document.getElementById('category').value;
	res = document.getElementById('res').value;
	order = document.getElementById('order').value;
	videoType = document.getElementById('vtype').value;
	categoryV = document.getElementById('category-v').value;
	orderV = document.getElementById('order-v').value;
	resV = document.getElementById('res-v').value;
}
$('.as').click(function(){
	$('.advanced-search').slideToggle(500);
});
$('.vas').click(function(){
	$('.advanced-search-v').slideToggle(500);
});
var box = document.getElementsByClassName('b-outer');
for ( var b = 0; b < box.length; b++ ) {
	box[b].addEventListener("mouseover", function() {
		this.children[1].classList.add('half-fade');
		this.previousElementSibling.children[0].classList.add('fadeIn');
	});
	
	box[b].addEventListener("mouseout", function() {
		this.children[1].classList.remove('half-fade');
		this.previousElementSibling.children[0].classList.remove('fadeIn');
	});
}
function categoryPicker(cat) {
	var value = cat.getAttribute("data-category-type");
	category = value;
	searchClean();
}
$('.click').click(function(){
	$('.all-the-stuff').toggleClass('flip');
	height();
});
function height() {
	if ( $('.all-the-stuff').hasClass("flip") ) {
		$('.front').addClass('main');
	} else 
		$('.front').removeClass('main');
	if ( !$('.all-the-stuff').hasClass("flip") ) {
		$('.back').addClass('main');
	} else 
		$('.back').removeClass('main');
}
function searchCleanV() {
	gridv.masonry('destroy');
	pageV = 1;
	searchV();
}
document.getElementById('searchVid').addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
    searchCleanV()
    } 
});
function searchV() {
	document.getElementsByClassName('gridv')[0].classList.remove('fadeIn');
	numOfPagesInputDelay = null;
	var url = "https://pixabay.com/api/videos/?key=7964595-ef854d08be69ff790495f4514&page="+ pageV +"&video_type="+ videoType +"&category="+ categoryV +"&order="+  orderV +"&per_page="+ resV +"&q=";
	var inputSearch = document.getElementById('searchVid').value;
	request.open('GET', url + inputSearch, true);
	request.onload = function(){
		if(this.status === 200){
			var data = JSON.parse(this.responseText);
			var string = "";
			for(var i = 0; i<data.hits.length; i++) {
			var content = data.hits[i];
			var sizep = "200x150";
			string += "<div class='col-md-3 col-sm-6 grid-item'>";
			string += "<a class='iframe' data-fancybox='videos' href='"+ content.videos.medium.url +"'>";
			string += "<img src='https://i.vimeocdn.com/video/"+ content.picture_id +"_"+ sizep +".jpg'/>";
			string += "</a>";
			string += "<div class='info1'>";
			string += "<div class='likes'>";
			string += "<i class='fas fa-thumbs-up'></i>"
			string += "<h6>" + content.likes + "</h6>";
			string += "</div>";
			string += "<div class='rest'>";
			string += "<i class='fas fa-eye'></i>";
			string += "<h6>" + content.views + "</h6>";
			string += "</div>";
			string += "</div>";
			string += "</div>"; 
			}
			document.getElementsByClassName('gridv')[0].innerHTML = string;
			document.getElementsByClassName('gridv')[0].classList.add('fadeIn');
			gridv.imagesLoaded().progress( function() {
				  gridv.masonry(masonryOptions);
				});
			$('.iframe').fancybox();
			var numOfPages = Math.round(data.totalHits / resV);
				document.getElementsByClassName('track-v')[0].innerHTML = pageV+" / "+numOfPages;
				document.getElementsByClassName('nmbvd')[0].value = null;
				document.getElementsByClassName('nmbvd')[0].setAttribute('placeholder', pageV +" / " + numOfPages);
				for ( var v = 0; v < paginationv.length; v++) {
					paginationv[v].style.display = 'none';
					if ( numOfPages > 1 ) {
						paginationv[v].style.display = 'flex';
					} else  paginationv[v].style.display = 'none';
				}
				if ( pageV == 1 ) {
					document.getElementsByClassName('prev-v')[0].style.display = 'none';
					document.getElementsByClassName('prev-v')[1].style.display = 'none';
				} else {
					document.getElementsByClassName('prev-v')[0].style.display = 'block';
					document.getElementsByClassName('prev-v')[1].style.display = 'block';
				}
				if ( pageV == numOfPages ) {
					document.getElementsByClassName('next-v')[0].style.display = 'none';
					document.getElementsByClassName('next-v')[1].style.display = 'none';
				} else {
					document.getElementsByClassName('next-v')[0].style.display = 'block';
					document.getElementsByClassName('next-v')[1].style.display = 'block';
				}
			}
		}
	request.send();
}
document.getElementsByClassName('nmbvd')[0].addEventListener('keyup', function(){
	if(numOfPagesInputDelay != null) clearTimeout(numOfPagesInputDelay); 
	pageV = Number(document.getElementsByClassName('nmbvd')[0].value);
	gridv.masonry('destroy');
	numOfPagesInputDelay = setTimeout(searchV, 1000);
	if ( pageV > 42 ) {
		pageV = 42;
	}
	if ( pageV < 1 ) {
		pageV = 1;
	}
	if ( isNaN(pageV) === true ) {
		pageV = 1;
	}
})
function nextV() {
	gridv.masonry('destroy');
	pageV = pageV+1;
	searchV();
}
function prevV(){
	gridv.masonry('destroy');
	pageV = pageV-1;
	searchV();
}

window.onload = function() {
	videosBg();
	photosBg();
}
function videosBg() {
	var url = "https://pixabay.com/api/?key=7964595-ef854d08be69ff790495f4514&per_page=4&category=nature&orientation=horizontal&image_type=photo&q=mountain";
	var request1 = new XMLHttpRequest;
	request1.open("get", url, true);
	request1.onload = function(){
		if(this.status === 200){
			var data = JSON.parse(this.responseText);
			var string = "";
			for(var i = 0; i<data.hits.length; i++) {
			var content = data.hits[i];
			string += "<div class='bg-"+ [i] +" vidBg'>";
			string += "<img src='"+ content.webformatURL +"'>";
			string += "</div>";
			document.getElementById('bg-video').innerHTML = string;
			}
		}
	}
	request1.send();
}

function photosBg() {
	var url = "https://pixabay.com/api/?key=7964595-ef854d08be69ff790495f4514&per_page=12&category=backgrounds&orientation=horizontal&image_type=photo&q=";
	request.open("get", url, true);
	request.onload = function(){
		if(this.status === 200){
			var data = JSON.parse(this.responseText);
			var string = "";
			string += "<div class='slider-top'>";
			string += "<div class='slika'>";
			for(var i = 0; i<data.hits.length; i++) {
			var content = data.hits[i];
			string += "<div class='slike sl"+ [i] +"'>";
			string += "<img src='"+ content.webformatURL +"'>";
			string += "</div>";
			if ((i+1) % 4 == 0) {
				string += "</div>";
				string += "</div>";
				string += "<div class='slider-top'>";
				string += "<div class='slika'>";
			}
			document.getElementById('upper-slider').innerHTML = string;
			}
		}
	}
	request.send();
}

