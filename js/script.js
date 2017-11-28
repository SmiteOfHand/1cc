// STEP ONE
// Generate default list from data above
const videosContainer = document.querySelector('.videos-container');
const searchBox = document.querySelector('#searchbox');
const spoilers = document.querySelector('#spoilers');
const yearSelect = document.querySelectorAll('.year-select');
const yearLabel = document.querySelector('.year-label');
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

function generateVideos(vids) {
  videosContainer.innerHTML = vids
    .map(video => {
      const yt = (video.youtube.length > 0) ? `<a href='https://www.youtube.com/watch?v=${video.youtube}' target="_blank"><img class="icon-large" src="img/yt_icon_rgb.png"></a>` : '';
      const tw = (video.twitchv.length > 0) ? `<a href='https://www.twitch.tv/videos/${video.twitchv}?t=${video.twitcht}' target="_blank"><img src="img/GlitchBadge_Purple_32px.png"></a>` : '';

      const onecc = video.onecc ? `<span class="onecc${spoilers.checked ? '' : ' hidden'}">🎅</span>` : `<span class="onecc${spoilers.checked ? '' : ' hidden'}">☠️</span>`;
      return `<div class="game-tile">
                  <div class="game-info-top">
                    <h2>${video.game}</h2>
                    <h3>${video.year} • ${video.dev}</h3>
                  </div>
                  <span class="game-marathon">M${video.marathon}</span>
                  <div class="game-img" data-img="${video.title}" data-gif="${video.gif}"></div>
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

// 1cc example
//activeVideos = videos.filter(v => v.onecc);

// Search example
//activeVideos = videos.filter(v => v.game.toLowerCase().includes('metal'));

// Complex search example
// let search = 'a';
// activeVideos = videos.filter(v => v.game.toLowerCase().includes(search) || v.dev.toLowerCase().includes(search) || v.player.toLowerCase().includes(search) || v.alttext.toLowerCase().includes(search));

generateVideos(activeVideos);

function searchVideos() {
  if(this.value.length == 0) {
    activeVideos = videos[activeYear];
  } else {
    //if(this.value.length < 3) return;

    const s = this.value.toLowerCase();
    activeVideos = videos[activeYear].filter(v => v.game.toLowerCase().includes(s) || v.dev.toLowerCase().includes(s) || v.player.toLowerCase().includes(s) || v.alttext.toLowerCase().includes(s));

  }
  generateVideos(activeVideos);
}

searchBox.addEventListener('change', searchVideos);
searchBox.addEventListener('keyup', searchVideos);
spoilers.addEventListener('click', function() {
  const onecc = document.querySelectorAll('.onecc');

  onecc.forEach(one => {
    one.classList.toggle('hidden');
  })
});

yearSelect.forEach(selection => selection.addEventListener('click', function() {
    console.log(selection.innerText);
    activeYear = selection.innerText;
    yearLabel.innerText = activeYear;
    activeVideos = videos[activeYear];
    generateVideos(activeVideos);
  }));
