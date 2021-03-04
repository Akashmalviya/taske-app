function convertDegToRad(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

 const getDistanceFromLatLonInKm =(point1, point2) =>{

  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;
  const earthRadius = 6371;
  const dLat = convertDegToRad(lat2 - lat1);
  const dLon = convertDegToRad(lon2 - lon1);
  const squarehalfChordLength =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(convertDegToRad(lat1)) * Math.cos(convertDegToRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const angularDistance = 2 * Math.atan2(Math.sqrt(squarehalfChordLength), Math.sqrt(1 - squarehalfChordLength));
  const distance = earthRadius * angularDistance;
  return distance;

}
module.exports = getDistanceFromLatLonInKm


const orgin =  [22.7209,75.9180];
const distaination=  [22.720800180069123,75.91777318344997];

console.log(getDistanceFromLatLonInKm(orgin,distaination));