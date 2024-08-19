import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { createWorker } from 'tesseract.js';
import { ButtonDirective, ColComponent, RowComponent, CardBodyComponent, CardHeaderComponent, CardComponent, FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ocr-registration',
  standalone: true,
  imports: [ButtonDirective, RowComponent, ColComponent, CommonModule, CardBodyComponent, CardHeaderComponent, CardComponent,  FormDirective, FormLabelDirective, FormControlDirective],
  templateUrl: './ocr-registration.component.html',
  styleUrls: ['./ocr-registration.component.scss'] // Corrected styleUrls
})
export class OcrRegistrationComponent implements OnInit, OnDestroy {
  text: string = '';
  private stream: MediaStream | null = null;
  WIDTH = 640;
  HEIGHT = 480;
  isCaptured: boolean = false;
  captures: string[] = [];
  capturedImage: string = '';

  @ViewChild('videoElement') videoElement: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement: ElementRef<HTMLCanvasElement>;

  ngOnInit() {
    this.startVideo();
  }

  async recognizeText(path: string) {
    const worker = await createWorker('ind', 1, {
      logger: m => console.log(m), // Add logger here
    });
    const { data: { text } } = await worker.recognize(path);
    console.log(text);
    this.text = text;
    await worker.terminate();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const url: string = URL.createObjectURL(file);
      this.recognizeText(url);
    }
  }

  startVideo() {
    const constraints = { audio: false, video: true };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {
        this.stream = mediaStream;
        const video = this.videoElement.nativeElement;
        video.srcObject = mediaStream;
        video.onloadedmetadata = () => {
          video.play();
        };
      })
      .catch((err) => { console.log(err.name + ": " + err.message); });
  }

  capture() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
  
      // Convert to grayscale
      // for (let i = 0; i < data.length; i += 4) {
      //   const red = data[i];
      //   const green = data[i + 1];
      //   const blue = data[i + 2];
      //   const grayscale = red * 0.3 + green * 0.59 + blue * 0.11;
      //   data[i] = grayscale;
      //   data[i + 1] = grayscale;
      //   data[i + 2] = grayscale;
      // }

      // // Apply high contrast
      // for (let i = 0; i < data.length; i += 4) {
      //   const grayscale = data[i];
      //   const highContrast = grayscale > 128 ? 255 : 0;
      //   data[i] = highContrast;
      //   data[i + 1] = highContrast;
      //   data[i + 2] = highContrast;
      // }
  
      context.putImageData(imageData, 0, 0);
      this.capturedImage = canvas.toDataURL('image/jpg');
    }


  }

  ngOnDestroy() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }
}
