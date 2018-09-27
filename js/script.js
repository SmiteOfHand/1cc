// STEP ONE
// Generate default list from data above
const videosContainer = document.querySelector('.videos-container');
const featuredContainer = document.querySelector('.featured-container');
const searchBox = document.querySelector('#searchbox');
const spoilers = document.querySelector('#spoilers');
const yearSelect = document.querySelectorAll('.year-select');
const yearLabel = document.querySelector('.year-label');
const randomVideo = document.querySelector('.random-video');
const switchVideosViewBtn = document.querySelector('.switch-videos-view');
const searchHelpText = `<p>ALL is search only. Type a developer, player, game, or release year in the old search box up there and see what happens.</p>`;
let activeVideos = [];
let activeYear = "2017";

// function strip(bandName) {
//   return bandName.replace(/^(a |the |an )/i, '').trim();
// }

// const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);

// document.querySelector('#bands').innerHTML =
//   sortedBands
//     .map(band => `<li>${band}</li>`)
//     .join('');

function generateVideosTiles(vids) {
  videosContainer.innerHTML = vids
    .map(video => {
      const yt = (video.youtube.length > 0) ? `<a href='https://www.youtube.com/watch?v=${video.youtube}' target="_blank"><img class="icon-large" src="img/yt_icon_rgb.png"></a>` : '';
      const tw = (video.twitchv.length > 0) ? `<a href='https://www.twitch.tv/videos/${video.twitchv}?t=${video.twitcht}' target="_blank"><img src="img/GlitchBadge_Purple_32px.png"></a>` : '';
      const gameImgLink = (video.youtube.length > 0) ? 
          `<a href='https://www.youtube.com/watch?v=${video.youtube}' target="_blank">` : 
          `<a href='https://www.twitch.tv/videos/${video.twitchv}?t=${video.twitcht}' target="_blank">`;

      const onecc = video.onecc ? `<span class="onecc${spoilers.checked ? '' : ' hidden'}">🔥</span>` : `<span class="onecc${spoilers.checked ? '' : ' hidden'}">☠️</span>`;
      return `<div class="game-tile">
                  <div class="game-info-top">
                    <h2>${video.game}</h2>
                    <h3>${video.year} • ${video.dev}</h3>
                  </div>
                  <span class="game-marathon">M${video.marathon}</span>
                  ${gameImgLink}<div class="game-img" data-img="${video.title}" data-gif="${video.gif}"></div></a>
                  <div class="game-info">
                    ${tw}
                    ${yt}
                    <h3>${onecc} 🕹️ ${video.player}</h3>
                  </div>
                </div>`;
        })
    .join('');

    wireEvents();
}

function generateVideosList(vids) {
  videosContainer.innerHTML = '<table class="game-table">' + vids
    .map(video => {
      const yt = (video.youtube.length > 0) ? `<a href='https://www.youtube.com/watch?v=${video.youtube}' target="_blank"><img class="icon-med" src="img/yt_icon_rgb.png"></a>` : '';
      const tw = (video.twitchv.length > 0) ? `<a href='https://www.twitch.tv/videos/${video.twitchv}?t=${video.twitcht}' target="_blank"><img src="img/GlitchIcon_Purple_24px.png"></a>` : '';
      const gameTitleLink = (video.youtube.length > 0) ? 
          `<a href='https://www.youtube.com/watch?v=${video.youtube}' target="_blank">` : 
          `<a href='https://www.twitch.tv/videos/${video.twitchv}?t=${video.twitcht}' target="_blank">`;

      const onecc = video.onecc ? `<span class="onecc${spoilers.checked ? '' : ' hidden'}">🔥</span>` : `<span class="onecc${spoilers.checked ? '' : ' hidden'}">☠️</span>`;
      return `<tr>
                <td class="game-table-title">${gameTitleLink}${video.game}</a></td>
                <td class="hide-mobile">${video.year}</td>
                <td class="hide-mobile">${video.dev}</td>
                <td>${tw} ${yt}</td>
                <td>${onecc}</td>
                <td class="game-table-title">${video.player}</td>
              </tr>`;
        })
    .join('') + '</table>';

    //wireEvents();
}

let generateVideos = generateVideosTiles;

function wireEvents() {
  const gameTile = Array.from(document.querySelectorAll('.game-img'));

  function tileMouseOver() {
    const src = this.getAttribute('data-gif');
    this.style.backgroundImage="url('" + src + "')";
  }
  function tileMouseOut() {
    const src = this.getAttribute('data-img');
    this.style.backgroundImage="url('" + src + "')";
  }

  // EVENTS
  gameTile.forEach(tile => tile.addEventListener('mouseover', tileMouseOver));
  gameTile.forEach(tile => tile.addEventListener('mouseout', tileMouseOut));
  gameTile.forEach(tile => {
    // This is dumb. Should be able to call tileMouseOut directly. Figure it out, dummy.
    const src = tile.getAttribute('data-img');
    tile.style.backgroundImage="url('" + src + "')";
  });
}

// Plain example
activeVideos = videos[activeYear];

function switchVideosView() {
  if(switchVideosViewBtn.innerText == '☰') {
    switchVideosViewBtn.innerText = '🔳';
    generateVideos = generateVideosTiles;
  } else {
    switchVideosViewBtn.innerText = '☰';
    generateVideos = generateVideosList;
  }

  generateVideos(activeVideos);
}

// 1cc example
//activeVideos = videos.filter(v => v.onecc);

// Search example
//activeVideos = videos.filter(v => v.game.toLowerCase().includes('metal'));

// Complex search example
// let search = 'a';
// activeVideos = videos.filter(v => v.game.toLowerCase().includes(search) || v.dev.toLowerCase().includes(search) || v.player.toLowerCase().includes(search) || v.alttext.toLowerCase().includes(search));

generateVideos(activeVideos);

function filterVideos(searchText, year) {
  return videos[year].filter(v => v.game.toLowerCase().includes(searchText) || v.dev.toLowerCase().includes(searchText) || v.player.toLowerCase().includes(searchText) || v.alttext.toLowerCase().includes(searchText) || v.year.toString().toLowerCase().includes(searchText));
}

function filterVideosPlayer(player, year) {
  return videos[year].filter(v => v.player.toLowerCase().includes(player));
}

let MTRandom = new MersenneTwister();

function getRandomInt(max) {
  return Math.floor(MTRandom.genrand_res53() * max);

  //return Math.floor(Math.random() * Math.floor(max));
}


function getRandomVideo(seed) {

  if(seed != undefined) {
    MTRandom = new MersenneTwister(seed);
  }

  const randomYearIndex = marathonYears[0] - getRandomInt(marathonYears.length);
  const randomVideoIndex = getRandomInt(videos[randomYearIndex].length);

  console.log("randomYearIndex: " + randomYearIndex);
  console.log("randomVideoIndex: " + randomVideoIndex);
  console.log(videos[randomYearIndex][randomVideoIndex]);

  return [videos[randomYearIndex][randomVideoIndex]];
}

function generateRandomVideo() {
  clearSearch();
  activeYear = 'ALL';
  yearLabel.innerText = activeYear;

  activeVideos = getRandomVideo();
  generateVideos(activeVideos);
}


// UTIL
Date.prototype.getWeekNumber = function(){
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

function featuredVideo() {
  // <iframe width="560" height="315" src="https://www.youtube.com/embed/4uH85tHfReM?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  // <iframe src="https://player.twitch.tv/?video=92881752&autoplay=false&t=01h47m55s" height="315" width="560" frameborder="0" scrolling="no" muted="false" allowfullscreen="true"></iframe>



  /*<div class="featured-article">
    <h1>Osman (Cannon-Dancer)</h1>
    <p>The Osman (Cannon-Dancer) run was played by Macaw45 on day 1 of the 2017 1CC Marathon. Developed by Mitchell Corporation in 1996.  The featured video is swapped out weekly.</p>
  </div>*/

  //new Date().getWeekNumber()
  //Math.floor(m.genrand_res53() * 10)
  const today = new Date();
  const week = today.getWeekNumber();
  const year = today.getFullYear();
  const seed = Number(`${week}${year}`);

  console.log(seed);

  let featuredVideo = getRandomVideo(seed)[0];
  let featuredVideoIFrame;
  const playerLink = encodeURI(`http://1ccmarathon.com/index.html?y=ALL&s=${featuredVideo.player}`)
  let playerVideos = [];

  marathonYears.forEach(y => {
    playerVideos = [...playerVideos, ...filterVideosPlayer(featuredVideo.player.toLowerCase(), y)];
  });

  if(featuredVideo.youtube.length > 0) {
    featuredVideoIFrame = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${featuredVideo.youtube}?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  } else {
    //${video.twitchv}?t=${video.twitcht}
    featuredVideoIFrame = `<iframe src="https://player.twitch.tv/?video=${featuredVideo.twitchv}&autoplay=false&t=${featuredVideo.twitcht}" height="315" width="560" frameborder="0" scrolling="no" muted="false" allowfullscreen="true"></iframe>`;
  }

  let featuredHTMLBlock = `<div class="featured-video-container">${featuredVideoIFrame}<div class="featured-article">
    <h1>${featuredVideo.game}</h1>
    <p>This week's featured game is ${featuredVideo.game} played by ${featuredVideo.player} on day ${featuredVideo.day} of the ${featuredVideo.marathon} 1CC Marathon. Developed by ${featuredVideo.dev} in ${featuredVideo.year}.</p>
    <p><a href="${playerLink}">${featuredVideo.player}</a> has attempted ${playerVideos.length} game/s across all 1CC marathons.</p>
    <p class="featured-smol">Featured video is swapped weekly.</p>
  </div></div>`;

  featuredContainer.innerHTML = featuredHTMLBlock;
}
featuredVideo();

function clearSearch() {
  searchBox.value = '';
  featuredContainer.innerText = '';
}

function searchVideosEvent() {
  searchVideos(this.value);
}

function searchVideos(searchText) {
  //if(this.value.length < 3) return;
  const s = searchText.toLowerCase();

  if(activeYear == 'ALL') {
    if(s.length == 0) {
      videosContainer.innerHTML = searchHelpText;
      return;
    } else {
      activeVideos = [];
      marathonYears.forEach(year => {
        activeVideos = [...activeVideos, ...filterVideos(s, year)];
      });
    }
  } else {
    if(s.length == 0) {
      activeVideos = videos[activeYear];
    } else {
      activeVideos = filterVideos(s, activeYear);
    }
  }

  if(s.length > 0) {
    featuredContainer.innerHTML = '<p class="featured-search-shortcut">' + encodeURI(`http://1ccmarathon.com/index.html?y=${activeYear}&s=${searchText}`) + '</p>';
  } else {
    featuredContainer.innerHTML = '';
  }

  generateVideos(activeVideos);
}

searchBox.addEventListener('change', searchVideosEvent);
searchBox.addEventListener('keyup', searchVideosEvent);
spoilers.addEventListener('click', function() {
  const onecc = document.querySelectorAll('.onecc');

  onecc.forEach(one => {
    one.classList.toggle('hidden');
  })
});

randomVideo.addEventListener('click', function() {
  generateRandomVideo();
});

switchVideosViewBtn.addEventListener('click', function() {
  switchVideosView();
});

yearSelect.forEach(selection => selection.addEventListener('click', function() {
    clearSearch();
    activeYear = selection.innerText;
    yearLabel.innerText = activeYear;

    if(selection.innerText == 'ALL') {
      videosContainer.innerHTML = searchHelpText;
    } else {
      activeVideos = videos[activeYear];
      generateVideos(activeVideos);
    }
  }));

window.onscroll = function() {
  const navMenuTier = document.querySelector('.nav-dropdown-tier2');

  if(window.pageYOffset == 0) {
    navMenuTier.classList.remove('hide-mobile');
  } else {
    navMenuTier.classList.add('hide-mobile');
  }
}

let urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('y')) {
  const yearUrlString = urlParams.get('y').toUpperCase();

  if(yearUrlString == 'ALL') {
    activeYear = yearUrlString;
    yearLabel.innerText = yearUrlString;

    if(!urlParams.has('s')) {
      videosContainer.innerHTML = searchHelpText;
    }
  } else if (marathonYears.includes(yearUrlString)) {
    activeYear = yearUrlString;
    yearLabel.innerText = activeYear;

    activeVideos = videos[activeYear];
    generateVideos(activeVideos);
  }
}

if(urlParams.has('s')) {
  const searchUrlString = urlParams.get('s');
  searchBox.value = searchUrlString;
  searchVideos(searchUrlString);
}