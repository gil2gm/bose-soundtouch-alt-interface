const stations = require('./tunein_stations.json');

getlistOnline = () => {
  `https://api.tunein.com/categories/music?
  formats=mp3,aac,ogg,flash,html,hls&
  serial=f3cf375c-c363-4357-a695-03d2b6a3166d&
  partnerId=RadioTime&version=4.1203&
  itemUrlScheme=secure&reqAttempt=1`
}

const result = [];

stations.Items.forEach(element => {
   const filter = element.Children.filter( item => item.Type === 'Station');

   result.push(...filter.map(function(station) {
      return {
        "favID": Number(station.GuideId.substring(1)),
        "channelName": station.AccessibilityTitle,
        "payload": `<ContentItem source='TUNEIN' type='stationurl' 
        location='/v1/playback/station/${station.GuideId}' sourceAccount='' isPresetable='true'>
          <itemName>${station.AccessibilityTitle}</itemName>
          <containerArt>${station.Image}</containerArt>
        </ContentItem>`
      };
    }));
});




exports.getList = result;