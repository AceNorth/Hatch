import React, {Component} from 'react'

/*
current location
x: 41.889189...
y: -87.635707...
*/

//set up fence
  //set up markers from various distances outside the fence
let geofenceCheck(x,y) {

}

let markerCheck(x,y){
  let markerOne = [41.8841, -87.6354];
  let markerTwo = [41.8891, -87.6304];
  let radius = 0.0050;
  //(x - center_x)^2 + (y - center_y)^2 < radius^2
  //ex. (41.99999, -87.60000) (41.9999-41.8841)^2 + (-87.60000--87.6304) < 0.005^2
  // 0.01340964 + 0.00092416< .000025  ==> 0.0143338 < 0.000025 FALSE

  //41.888189, -87.6357 ==> true
  //41.885189, -87.6357 ==> true
  //41.880189, -87.6357 ==> false


  let fence = Math.pow(x-markerOne[0], 2) + Math.pow(y-markerOne[1], 2)
  if(fence < Math.pow(radius, 2)){
    return true
  }

}

//set up watchPosition

export default class LocationTest extends Component {

  constructor(props){
    super(props);
    this.state = {
      userPositionX: '',
      userPositionY: ''
    }
  }

  //when the user moves
  onLocationChange() {
    // what we do if the user is in the correct spot to retrieve their package
    // this.setState({ loading: false });
  }

  //when the user is within a marker
  onMarkerHit() {
    
  }

  componentDidMount() {
    this.updateCurrentPosition();
  }

  render(){
    return(
      <div>

      </div>
    )
  }
}



