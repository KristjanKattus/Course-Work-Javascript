import Aurelia from 'aurelia';
import { MyApp } from './my-app';
import 'jquery';
import 'popper.js';
import 'bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../static/site.css';


Aurelia
  .app(MyApp)
  .start();
