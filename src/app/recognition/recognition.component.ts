import { Component, OnInit, ElementRef } from '@angular/core';
import { ButtonDirective, ColComponent, RowComponent } from '@coreui/angular';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-recognition',
  standalone: true, 
  imports: [ButtonDirective, RowComponent, ColComponent],
  templateUrl: './recognition.component.html',
  styleUrl: './recognition.component.scss'
})
export class RecognitionComponent implements OnInit{
  title = 'face recognition';
  isDetecting = false;
  detectionInterval: any;
  canvas: HTMLCanvasElement;
  video: HTMLVideoElement;
  private stream: MediaStream | null = null;
  private queryImagesElements: HTMLImageElement[] = [];
  queryImage: ElementRef;
  labeledFaceDescriptors: any;
  imagePath:string;
  
  async ngOnInit() {
    await this.loadModels();
    this.startVideo();
  }

  async loadModels() {
    const MODEL_URL = '/assets/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
  }

  startVideo() {
    this.canvas = document.getElementById('overlay') as HTMLCanvasElement;
    var constraints = { audio: false, video: true }; 
    navigator.mediaDevices.getUserMedia(constraints)
    .then((mediaStream) => {
      this.stream = mediaStream;
      this.video = document.querySelector('video');
      this.video.srcObject = mediaStream;
      var videoObj = this.video;
      this.video.onloadedmetadata = function(e) {
        videoObj.play();
      };
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); });
  }

  async startDetection() {
    if (!this.isDetecting) {
      const labeledFaceDescriptors = await this.loadLabeledImages();
      console.log("value of labeledFaceDescriptors : "+labeledFaceDescriptors[0].label);
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
      this.isDetecting = true;
      this.video = document.getElementById('video') as HTMLVideoElement;
      const displaySize = { width: this.video.width, height: this.video.height };
      faceapi.matchDimensions(this.video, displaySize);

      // Perform asynchronous operation
      this.detectionInterval = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const matcherResult = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
        
        matcherResult.forEach((result, i) => {
          console.log(result.label);
          const box = resizedDetections[i].detection.box
          const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
          this.canvas.width = this.canvas.width;
          drawBox.draw(this.canvas);
          this.imagePath = 'assets/images/person/'+result.label+'.jpg';
        })
        faceapi.draw.drawFaceExpressions(this.canvas, resizedDetections);

        // try {
        //   console.log("draw detections loaded");
        //   this.canvas.width = this.canvas.width;
        //   faceapi.draw.drawDetections(this.canvas, resizedDetections);
        //   faceapi.draw.drawFaceLandmarks(this.canvas, resizedDetections);
        //   faceapi.draw.drawFaceExpressions(this.canvas, resizedDetections);
        // } catch (error) {
        //   console.log(error);
        // }
      }, 100); 
    }
  }

  stopDetection() {
    if (this.isDetecting) {
      clearInterval(this.detectionInterval);
      this.isDetecting = false;
      if (this.video && this.video.srcObject) {
        const stream = this.video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.readyState);
      }
    }
  }

  loadLabeledImages() {
    const labels = ['rahmat','arina','albi','jokowi', 'prabowo']
    return Promise.all(
      labels.map(async label => {
        const descriptions = []
        // for (let i = 1; i <= 2; i++) {
        //   const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`)
        //   const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        //   descriptions.push(detections.descriptor)
        // }
        const img = await faceapi.fetchImage('assets/images/person/'+label+'.jpg');
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        if(detections == undefined){
          console.log("detections.descriptor is null")
        }else{
          descriptions.push(detections.descriptor);
        }

  
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
    )
  }

  ngOnDestroy(){
    this.stopDetection();
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
      this.video = null;
    }
  }

}
