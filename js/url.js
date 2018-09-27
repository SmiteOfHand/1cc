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