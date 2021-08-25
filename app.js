const video = document.querySelector('#video');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop')
const storeVid = document.querySelector('#vidStore');
var mediaRecorder;
var data = [];
const startCapt = async(displayMediaOptions) => {
    video.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    mediaRecorder = await new MediaRecorder(video.srcObject)
    console.log(mediaRecorder)
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

    startCapt().then(() => {
        mediaRecorder.start()
        mediaRecorder.ondataavailable = (e) => {
            data.push(e.data)
        }
    });
})
stopBtn.addEventListener('click', () => {

    stopCapt().then(() => {
        mediaRecorder.stop()
        mediaRecorder.onstop = (e) => {
            let blob = new Blob(data, { 'type': 'video/mp4' })
            data = [];
            let videoURL = window.URL.createObjectURL(blob);
            storeVid.src = videoURL;
        }
    });
})