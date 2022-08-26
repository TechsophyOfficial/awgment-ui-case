export default function Basename({ currentLocation = window.location.href }, config) {
    const container = `${config?.mfeContainerBasename}`
    if (container) {
        const url = currentLocation.includes(container) ? container : config?.publicUrl;
        return url;
    }
    return config?.publicUrl;
}