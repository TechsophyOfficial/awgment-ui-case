
export default function Basename({ currentLocation = window.location.href }) {
    console.log('currentLocation',currentLocation)
    const container = `${process.env.REACT_APP_MFE_CONTAINER_BASENAME}`
    console.log('container env',container)
     if (container) {
         const url = currentLocation.includes(container) ? container : process.env.PUBLIC_URL;
         console.log('selected url',url)
         return url;
     }
     return process.env.PUBLIC_URL;
  }