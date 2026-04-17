import { Component, AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { fromLonLat } from 'ol/proj';
import { ILocation } from '../../../models/tours';
import XYZ from 'ol/source/XYZ.js';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  @Input() location!: ILocation;
  @ViewChild('map') mapDom!: ElementRef;
  map!: Map;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.map = new Map({
        target: this.mapDom.nativeElement,
        layers: [
          new TileLayer({
             source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
        //attributions: '© OpenStreetMap contributors'
      })
    })
        ],
        view: new View({
          center: fromLonLat([this.location.lng, this.location.lat]),
          zoom: 5,
        })
      });

      setTimeout(() => this.map.updateSize(), 100);
    });
  }
}
