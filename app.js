const video = document.querySelector('#video');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop')
stopBtn.disabled = true;
const storeVid = document.querySelector('#vidStore');
const ssBtn = document.querySelector('#screenShot');
ssBtn.disabled = true;
const ss = document.querySelector('canvas');
var ssContext = ss.getContext('2d');
ss.width = 400;
ss.height = 400;
var mediaRecorder;
var data = [];
const startCapt = async(displayMediaOptions) => {
    video.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    mediaRecorder = await new MediaRecorder(video.srcObject)

}
const stopCapt = async() => {
    let tracks = video.srcObject.getTracks();
    tracks.forEach(track => track.stop())
    video.srcObject = null;
}

const displayMediaOptions = {
    video: {
        cursor: "always"
    },
    audio: false
}
startBtn.addEventListener('click', () => {
    stopBtn.disabled = false;
    ssBtn.disabled = false;
    ssBtn.style.cursor = 'pointer'
    stopBtn.style.cursor = 'pointer'
    startCapt().then(() => {
        mediaRecorder.start()
        mediaRecorder.ondataavailable = (e) => {

            data.push(e.data);

        }
    }).then(() => {

    })
})
stopBtn.addEventListener('click', () => {
    stopBtn.disabled = true;
    ssBtn.disabled = true;
    ssBtn.style.cursor = 'auto'
    stopBtn.style.cursor = 'auto'
    stopCapt().then(() => {
        mediaRecorder.stop()
        mediaRecorder.onstop = (e) => {

            console.log(data[0]);
            let blob = new Blob(data, { 'type': 'video/mp4' })
            data = [];
            let videoURL = window.URL.createObjectURL(blob);
            console.log(videoURL);
            storeVid.src = videoURL;
        }
    });
})
ssBtn.addEventListener('click', () => {
    ssContext.drawImage(video, 0, 0, ss.width, ss.height);
    const imageURL = ss.toDataURL('image/png');
    console.log(imageURL);
    let link = document.createElement('a');
    link.href = imageURL;
    let fileName = prompt('Enter image name')
    link.download = fileName;
    link.click();


})